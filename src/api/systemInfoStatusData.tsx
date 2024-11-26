import { create } from 'zustand';
import { SystemInfoRtBmsType, SystemInfoRtRackType } from '@/types/systemInfoRt.type';


interface SystemInfoStatusData {    
  systemInfoRtBmsData: SystemInfoRtBmsType | null;   
  setSystemInfoRtBmsData: (newData: SystemInfoRtBmsType | null) => void;
}

const useSystemInfoStatusData = create<SystemInfoStatusData>((set, get) => ({
  systemInfoRtBmsData: null,     
  setSystemInfoRtBmsData: (newData: SystemInfoRtBmsType | null) => set({ systemInfoRtBmsData: newData }),  
}));

export default useSystemInfoStatusData;

