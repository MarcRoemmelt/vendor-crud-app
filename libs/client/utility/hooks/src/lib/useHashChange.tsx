/* eslint-disable max-lines-per-function */
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useHashChange = (cb: (hash?: string) => void) => {
    const router = useRouter();

    useEffect(() => {
        const _cb = (url: string) => {
            if (url.indexOf('#') === -1) return cb();
            const hash = url.split('#').pop() ?? '';
            cb(hash);
        };
        router.events.on('hashChangeStart', _cb);

        return () => {
            router.events.off('hashChangeStart', _cb);
        };
    }, [cb, router.events]);
};
