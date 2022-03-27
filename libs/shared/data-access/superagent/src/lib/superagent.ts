import superagent, { Response, SuperAgentRequest } from 'superagent';

type RequestMethod = 'get' | 'del' | 'post' | 'put';
type Res =
    | {
          success: false;
          error?: any;
          data?: never;
      }
    | {
          success: true;
          data: any;
          error?: never;
      };

const FALSE = false as const;
const TRUE = true as const;

// eslint-disable-next-line max-lines-per-function
const createHandleErrors = ({
    API_ROOT,
    SESSION_ENDPOINT,
    getRefreshToken,
}: {
    API_ROOT: string;
    SESSION_ENDPOINT: string;
    getRefreshToken: () => string | null;
}) =>
    async function (this: Requests, err: { response: Response & { req: SuperAgentRequest } }): Promise<Res> {
        if (err && err.response && err.response.status === 401) {
            try {
                const { success, data } = await superagent
                    .post(`${API_ROOT}${SESSION_ENDPOINT}`)
                    .use(tokenPlugin(getRefreshToken))
                    .then(responseBody);

                if (!success) return { success: FALSE };
                localStorage.setItem('access_token', data.access_token);

                const req = err.response.req as SuperAgentRequest;
                const method = req.method.toLowerCase() as RequestMethod;
                const headers = (req as unknown as { header: Record<string, string> }).header;
                const _data = (req as unknown as { _data: Record<string, string> })._data;
                const url = req.url;
                // eslint-disable-next-line security/detect-object-injection
                return superagent[method](url)
                    .set(headers)
                    .set('Authorization', `Bearer ${data.access_token}`)
                    .send(_data)
                    .then(responseBody)
                    .catch(createHandleErrors({ API_ROOT, SESSION_ENDPOINT, getRefreshToken }));
            } catch (e) {
                return { success: FALSE, error: err.response?.body || err };
            }
        }
        return { success: FALSE, error: err.response?.body || err };
    };

const responseBody = (res: Response) => ({ success: TRUE, data: res.body });

const tokenPlugin =
    (getToken: () => string | null = () => '') =>
    (req: SuperAgentRequest) => {
        const token = getToken();
        if (token) {
            req.withCredentials();
            req.set('Access-Control-Request-Headers', 'Authorization');
            req.set('Authorization', `Bearer ${token}`);
        }
    };

export interface ISuperAgentOptions {
    API_ROOT: string;
    SESSION_ENDPOINT?: string;
    getAccessToken?: () => string | null;
    getRefreshToken?: () => string | null;
}
export type Requests = ReturnType<typeof configureSuperAgent>;

// eslint-disable-next-line max-lines-per-function
export const configureSuperAgent = ({
    API_ROOT,
    SESSION_ENDPOINT = '/session',
    getAccessToken = () => localStorage.getItem('access_token'),
    getRefreshToken = () => localStorage.getItem('refresh_token'),
}: ISuperAgentOptions) => {
    const handleErrors = createHandleErrors({ API_ROOT, SESSION_ENDPOINT, getRefreshToken });
    return {
        del: (url: string) =>
            superagent.del(`${API_ROOT}${url}`).use(tokenPlugin(getAccessToken)).then(responseBody).catch(handleErrors),
        get: (url: string) =>
            superagent.get(`${API_ROOT}${url}`).use(tokenPlugin(getAccessToken)).then(responseBody).catch(handleErrors),
        put: (url: string, body: Record<string | number | symbol, any>) =>
            superagent
                .put(`${API_ROOT}${url}`)
                .use(tokenPlugin(getAccessToken))
                .send(body)
                .then(responseBody)
                .catch(handleErrors),
        patch: (url: string, body: Record<string | number | symbol, any>) =>
            superagent
                .patch(`${API_ROOT}${url}`)
                .use(tokenPlugin(getAccessToken))
                .send(body)
                .then(responseBody)
                .catch(handleErrors),
        post: (url: string, body: Record<string | number | symbol, any> = {}) =>
            superagent
                .post(`${API_ROOT}${url}`)
                .use(tokenPlugin(getAccessToken))
                .send(body)
                .then(responseBody)
                .catch(handleErrors),
    };
};
