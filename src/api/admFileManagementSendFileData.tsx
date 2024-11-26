import { create } from 'zustand';

interface SendFileData {
  sendFileData: File | null;
  setProgress: ((progress: number) => void) | null;
  storeSendFileData: (file: File | null, setProgress?: (progress: number) => void) => void;
}

const useAdmSendFileData = create<SendFileData>((set, get) => ({
  sendFileData: null,
  setProgress: null,
  storeSendFileData: (file: File | null, setProgress: (progress: number) => void = () => {}) => {
    set({ sendFileData: file, setProgress });
  },
}));

export default useAdmSendFileData;