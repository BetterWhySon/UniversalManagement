import { create } from 'zustand';

interface FilterState {
    site: string;
    ship: string;
    storeFilterShip: (site: string, ship: string) => void;
}

const useMapFilterStore = create<FilterState>((set) => ({
    site: '',
    ship: '',
    storeFilterShip: (newSite, newShip) => set({ site: newSite, ship: newShip }),
    
}));

export default useMapFilterStore;
