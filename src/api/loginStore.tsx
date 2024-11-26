import { create } from 'zustand';

interface LoginState {
    username: string;
    isAdminUser: boolean;
    isLevel1: boolean;
    isLevel2: boolean;
    storeUsername: (username: string) => void;
    storeIsAdminUser: (isAdminUser: boolean) => void;
    storeIsLevel1: (isLevel1: boolean) => void;
    storeIsLevel2: (isLevel2: boolean) => void;
}

const useLoginStore = create<LoginState>((set) => ({
    username: '',
    isAdminUser: false,
    isLevel1: false,
    isLevel2: false,
    storeUsername: (username) => set({ username }),
    storeIsAdminUser: (isAdminUser) => set({ isAdminUser }),
    storeIsLevel1: (isLevel1) => set({ isLevel1 }),
    storeIsLevel2: (isLevel2) => set({ isLevel2 }),
}));

export default useLoginStore;
