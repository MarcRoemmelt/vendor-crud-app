import { useModal } from '@mr/shared/ui/use-modal';

import { LoginForm } from './LoginForm/LoginForm';
import { useEffect } from 'react';
import { useAuthStore } from './AuthProvider';
import {
    CustomerRegisterKey,
    DynamicCustomerRegister,
    DynamicVendorRegister,
    VendorRegisterKey,
} from './dynamicComponents';

const vendorRegister = {
    component: DynamicVendorRegister,
    key: VendorRegisterKey,
};
const customerRegister = {
    component: DynamicCustomerRegister,
    key: CustomerRegisterKey,
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
