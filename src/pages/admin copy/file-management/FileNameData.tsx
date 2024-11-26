import { create } from 'zustand';

interface FileNameData {    
  fileNameData: string | null;       
  storeFileNameData: (fileName: string) => void;      
}

const useFileNameData = create<FileNameData>((set, get) => ({
  fileNameData: null,   
  storeFileNameData: (fileName: string) => set({ fileNameData: fileName }),
}));

export default useFileNameData;

