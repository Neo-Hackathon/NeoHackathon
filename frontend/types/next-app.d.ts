import 'next/app';

declare global {
    interface Window {
        ethereum?: any;
    }
}