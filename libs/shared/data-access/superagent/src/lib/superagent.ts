import superagent, { Response, SuperAgentRequest } from 'superagent';

const handleErrors = async (err: any) => {
    if (err && err.response && err.response.status === 401) {
        // eslint-disable-next-line no-console
        console.log(err);
        // retry logic here!
    }
    return err;
};

const responseBody = (res: Response) => res.body;

const tokenPlugin =
    (getAccessToken: () => string = () => '') =>
    (req: SuperAgentRequest) => {
        const accessToken = getAccessToken();
        if (accessToken) {
            req.withCredentials().set('authorization', `Token ${accessToken}`);
        }
    };

export interface ISuperAgentOptions {
    API_ROOT: string;
    getAccessToken?: () => string;
}
export type Requests = ReturnType<typeof configureSuperAgent>;

// eslint-disable-next-line max-lines-per-function
export const configureSuperAgent = ({ API_ROOT, getAccessToken }: ISuperAgentOptions) => ({
    del: (url: string) =>
        superagent.del(`${API_ROOT}${url}`).use(tokenPlugin(getAccessToken)).then(responseBody).catch(handleErrors),
    get: (url: string) =>
        superagent.get(`${API_ROOT}${url}`).use(tokenPlugin(getAccessToken)).then(responseBody).catch(handleErrors),
    put: (url: string, body: Record<string | number | symbol, any>) =>
        superagent
            .put(`${API_ROOT}${url}`)
            .send(body)
            .use(tokenPlugin(getAccessToken))
            .then(responseBody)
            .catch(handleErrors),
    patch: (url: string, body: Record<string | number | symbol, any>) =>
        superagent
            .patch(`${API_ROOT}${url}`)
            .send(body)
            .use(tokenPlugin(getAccessToken))
            .then(responseBody)
            .catch(handleErrors),
    post: (url: string, body: Record<string | number | symbol, any> = {}) =>
        superagent
            .post(`${API_ROOT}${url}`)
            .send(body)
            .use(tokenPlugin(getAccessToken))
            .then(responseBody)
            .catch(handleErrors),
});
