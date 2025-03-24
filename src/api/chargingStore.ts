import { create } from 'zustand';

interface ChargingStore {
  selectedStatus: string | null;
  selectedChargingType: string | null;
  setSelectedStatus: (status: string | null) => void;
  setSelectedChargingType: (type: string | null) => void;
}

const useChargingStore = create<ChargingStore>((set) => ({
  selectedStatus: null,
  selectedChargingType: null,
  setSelectedStatus: (status) => set({ selectedStatus: status }),
  setSelectedChargingType: (type) => set({ selectedChargingType: type }),
}));

export default useChargingStore; 