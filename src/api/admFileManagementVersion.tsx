import { create } from 'zustand';
import axios, { AxiosError } from "axios";
import { api, api_formData } from './api';
import { backendURL } from './URLs';
import { fileManagement_version } from '@/types/file-management.type';


// type ModalWrapper = {
//     children: React.ReactNode;
//     defaultValues?: any;
//     onClose?: () => void;
//     popupType: POPUP_TYPE;
//     isCreateMode: boolean;
//   };
//   export default function ModalWrapper({ children, defaultValues, onClose, popupType, isCreateMode }: ModalWrapper) {



interface AdmFileManagementVersion {
  dataListVersion: Array<fileManagement_version> | null;
  storeListVersion: (fileId: string, trans: (key: string) => string) => void;
  errorMsg_creat: rtnMsg | null;
  storeVersionCreate: (versionName: string, fileId: string, fileName: string, file: any, userName: string, setProgress: (progress: number) => void, trans: (key: string) => string, onClose?: () => void) => void;
  errorMsg_delete: rtnMsg | null;
  storeVersionDelete: (versionId: string, save_file_name: string, trans: (key: string) => string) => void;
  errorMsg_edit: rtnMsg | null;
  storeVersionEdit: (versionId: string, versionName: string, fileName: string, save_file_name: string, file: any, setProgress: (progress: number) => void, trans: (key: string) => string, onClose?: () => void) => void;
  storeVersionDownload: (fileName: string, trans: (key: string) => string, setProgress?: (progress: number) => void) => void;
}

interface rtnMsg {
  error: string;
}

const useAdmVersionManagement = create<AdmFileManagementVersion>((set) => ({
  dataListVersion: null,

  storeListVersion: async (fileId: string, trans) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.post(backendURL + 'adm_file_management/', {
        "id": "version",
        "action": "list",
        "file_id": fileId,
      }, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (response.status === 200) {
        const dataList: Array<fileManagement_version> = response.data.dataList.version_data
        set({ dataListVersion: dataList });
      } else {
        alert(trans('fileCannotBeRetrieve'));   //'버전을 조회 할 수 없습니다.'
      }
    } catch (error) {
      console.log(error);
      alert(trans('fileCannotBeRetrieve'));   //'버전을 조회 할 수 없습니다.'
    }
  },

  errorMsg_creat: null,
  storeVersionCreate: async (versionName: string, fileId: string, fileName: string, file: any, userName: string, setProgress: (progress: number) => void, trans, onClose?) => {
    try {
      const token = localStorage.getItem("token");
      var formData = new FormData();
      const da = {
        "id": "version",
        "action": "create",
        "file_id": fileId,
        "file_name": fileName,       // for save fileName query "file_name + version_name"
        "version_name": versionName,
        "user_name": userName,     // for user_id query
      }
      formData.append('file', file);
      console.log("file =", file);
      formData.append('json_data', JSON.stringify(da));

      console.log(formData);
      const response = await api_formData.post(backendURL + 'adm_file_management/', formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
          onUploadProgress: (progressEvent) => {
            if (setProgress && progressEvent.total) {
              const progress = (progressEvent.loaded / progressEvent.total) * 100;
              setProgress(progress);
            }
          },
        });

      if (response.status === 200) {
        const errorMsg: rtnMsg = response.data
        set({ errorMsg_creat: errorMsg });        
        alert(trans('fileHasBeenCreated')); // '버전을 생성했습니다.'
      } else {
        alert(trans('fileCannotBeCreated')); // '버전을 생성 할 수 없습니다.'
      }

      if(onClose) 
        onClose();

    } catch (error) {
      console.log(error);
      alert(trans('fileCannotBeCreated')); // '버전을 생성 할 수 없습니다.'

      if(onClose) 
        onClose();
    }
  },

  errorMsg_delete: null,
  storeVersionDelete: async (versionId: string, save_file_name: string, trans) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.post(backendURL + 'adm_file_management/', {
        "id": "version",
        "action": "delete",
        "version_id": versionId,
        "save_file_name": save_file_name,
      }, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (response.status === 200) {
        const errorMsg: rtnMsg = response.data
        set({ errorMsg_delete: errorMsg });
        if (errorMsg.error != "0") {
          alert(trans('fileCannotBeDeleted'));    // '버전을 삭제 할 수 없습니다.'
        } else {
          alert(trans('fileHasBeenDeleted')); // '버전을 생성했습니다.'
        }
      } else {
        alert(trans('fileCannotBeDeleted'));        // '버전을 삭제 할 수 없습니다.'
      }
    } catch (error) {
      console.log(error);
      alert(trans('filenCannotBeDeleted'));        // '버전을 삭제 할 수 없습니다.'
    }
  },

  errorMsg_edit: null,
  storeVersionEdit: async (versionId: string, versionName: string, fileName: string, save_file_name: string, file: any, setProgress: (progress: number) => void, trans, onClose) => {
    try {
      const token = localStorage.getItem("token");
      var formData = new FormData();
      const da = {
        "id": "version",
        "action": "modify",
        "version_id": versionId,   // userId
        "version_name": versionName,
        "file_name": fileName,       // for save fileName query "file_name + version_name"
        "save_file_name": save_file_name,
      }
      if (file) {    // 파일이 있으면 첨부(파일이 있으면 서버에서 변경)
        formData.append('file', file);
        console.log("file =", file);
      }
      formData.append('json_data', JSON.stringify(da));

      console.log(formData);
      const response = await api_formData.post(backendURL + 'adm_file_management/', formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
          onUploadProgress: (progressEvent) => {
            if (setProgress && progressEvent.total) {
              const progress = (progressEvent.loaded / progressEvent.total) * 100;
              setProgress(progress);
            }
          },
        });

      if (response.status === 200) {
        const errorMsg: rtnMsg = response.data
        set({ errorMsg_edit: errorMsg });        
        alert(trans('fileHasBeenModified')); // '버전을 수정했습니다.'
      } else {
        alert(trans('fileCannotBeModified'));        //'버전을 수정 할 수 없습니다.'
      }

      if(onClose) 
        onClose();

    } catch (error) {
      console.log(error);
      alert(trans('fileCannotBeModified'));        //'버전을 수정 할 수 없습니다.'

      if(onClose)
        onClose();
    }
  },

  storeVersionDownload: async (fileName: string, trans, setProgress) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get(backendURL + 'download/', {
        params: {
          file_name: fileName,
        },
        headers: {
          Authorization: "Bearer " + token,
        },
        responseType: 'blob', // Important
        onDownloadProgress: (progressEvent) => {
            if (setProgress && progressEvent.total) {
              const progress = (progressEvent.loaded / progressEvent.total) * 100;
              setProgress(progress);
              if (progress === 100) {
                setTimeout(() => setProgress(0), 2000); // 2초 후에 progress bar 숨기기                
              }
            }
          },
      });

      if (response.status === 200) {
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = fileName; // or you can use a different file name here
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);

        // alert(trans('downloadIsComplete'));
      } else {
        alert(trans('fileCouldNotBeDownloaded'));
      }
    } catch (error) {
      console.log(error);
      alert(trans('errorOccurredWhileDownloadingTheFile'));
    }
  }
}));

export default useAdmVersionManagement;