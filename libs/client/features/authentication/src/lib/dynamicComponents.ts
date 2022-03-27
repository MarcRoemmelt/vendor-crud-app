import dynamic from 'next/dynamic';

export const DynamicCustomerRegister = dynamic(() => import('./CustomerRegister'));
export const DynamicVendorRegister = dynamic(() => import('./VendorRegister'));
export const VendorRegisterKey = 'vendor-register';
export const CustomerRegisterKey = 'vendor-register';
