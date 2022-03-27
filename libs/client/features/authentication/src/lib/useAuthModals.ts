import { useModal } from '@mr/shared/ui/use-modal';

import { LoginForm } from './LoginForm/LoginForm';
import { useEffect } from 'react';
import { useAuthStore } from './AuthProvider';
import VendorRegister from './VendorRegister';
import CustomerRegister from './CustomerRegister';

const vendorRegister = {
    component: VendorRegister,
    key: VendorRegister.key,
};
const customerRegister = {
    component: CustomerRegister,
    key: CustomerRegister.key,
};
const login = {
    component: LoginForm,
    key: LoginForm.key,
};

// eslint-disable-next-line max-lines-per-function
export const useAuthModals = () => {
    const store = useAuthStore();

    const v = useModal({ ...vendorRegister });
    const c = useModal({ ...customerRegister });
    const l = useModal({ ...login });

    useEffect(() => {
        switch (store.activeModal) {
            case login.key:
                c.state.isOpen && c.dismiss();
                v.state.isOpen && v.dismiss();
                l.present();
                break;
            case vendorRegister.key:
                l.state.isOpen && l.dismiss();
                c.state.isOpen && c.dismiss();
                v.present();
                break;
            case customerRegister.key:
                l.state.isOpen && l.dismiss();
                v.state.isOpen && v.dismiss();
                c.present();
                break;
        }
        return () => {
            l.state.isOpen && l.dismiss();
            v.state.isOpen && v.dismiss();
            c.state.isOpen && c.dismiss();
        };
    }, [c, l, store.activeModal, v]);
};
