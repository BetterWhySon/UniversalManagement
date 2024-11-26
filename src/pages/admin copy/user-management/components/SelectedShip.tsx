import { create } from 'zustand';

interface SelectedShipIdsState {
  selectedIds: Array<number>;
  isValueChanged: boolean | null;
  isChangeNotify: boolean;
  addShipId: (shipId: number) => void;
  removeShipId: (shipId: number) => void;
  resetDatas: () => void;
}

export const useSelectedShipIdsStore = create<SelectedShipIdsState>((set) => ({
  selectedIds: [],
  isValueChanged: null,    
  isChangeNotify: false, // 비동기 완료 신호용
  addShipId: (shipId) =>
  set((state) => ({
      selectedIds: state.selectedIds.includes(shipId)
        ? state.selectedIds
        : [...state.selectedIds, shipId],
    })),
  removeShipId: (shipId) =>
    set((state) => ({
      selectedIds: state.selectedIds.filter((id) => id !== shipId),
      isValueChanged: !state.isValueChanged,
      isChangeNotify: true
    })),
  resetDatas: () => set({ selectedIds: [] }),
}));
export default useSelectedShipIdsStore;