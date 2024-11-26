
import { create } from 'zustand';
import axios, {AxiosError} from "axios";
import { api } from './api';
import { backendURL } from './URLs';
import { fileManagement_group } from '@/types/file-management.type';

interface AdmFileManagementGroup {
    dataListGroup: Array<fileManagement_group> | null;        
    storeListGroup: (trans: (key: string) => string) => void;    

    errorMsg_creat: rtnMsg | null;    
    storeFolderCreate: ( groupName: string, trans: (key: string) => string) => void;    
    errorMsg_delete: rtnMsg | null;    
    storeFolderDelete: ( groupId: string, trans: (key: string) => string) => void;    
    errorMsg_edit: rtnMsg | null;    
    storeFolderEdit: (groupId: string, groupName: string, trans: (key: string) => string) => void;    
}
interface rtnMsg {
    error: string;    
}

const useAdmFolderManagement = create<AdmFileManagementGroup>((set) => ({
    dataListGroup: null,
    
    storeListGroup: async (trans) => {
        try {
            // const idData = {"id": "init"}
            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'adm_file_management/',{
                "id": "group" ,
                "action": "list" ,
            }, {
            headers:{
                Authorization: "Bearer " + token ,
            },            
            });
            
            if (response.status === 200) {
                const dataList: Array<fileManagement_group> = response.data.dataList.group_data
                set({ dataListGroup: dataList });                
            } else {
                alert(trans('folderCannotBeRetrieve'));   //'폴더(그룹)를 조회 할 수 없습니다.'
            }
        } catch (error) {
            console.log(error);
            alert(trans('folderCannotBeRetrieve'));   //'폴더(그룹)를 조회 할 수 없습니다.'
        }
    },

    errorMsg_creat: null,
    storeFolderCreate: async ( groupName: string, trans) => {    
        try {
            // const idData = {"id": "init"}
            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'adm_file_management/',{
                "id": "group" ,
                "action": "create" ,
                "group_name": groupName,
            }, {
            headers:{
                Authorization: "Bearer " + token ,
            },            
            });
            
            if (response.status === 200) {
                const errorMsg: rtnMsg = response.data
                set({ errorMsg_creat: errorMsg }); 
                // if(errorMsg.error == "3") { 
                //     alert(trans('canNotUseThisId'));       //'사용할 수 없는 아이디 입니다.'
                // } else if(errorMsg.error == "4") { 
                //     alert(trans('userDataCannotBeCreated'));    //'유저 데이터를 생성 할 수 없습니다.'
                // } else if(errorMsg.error == "9") { 
                //     alert(trans('dataCreationError'));      //'데이터 생성 오류 입니다.'
                // }
                alert(trans('folderHasBeenCreated')); // '폴더를 생성했습니다.'

            } else {
                alert(trans('folderCannotBeCreated')); // '폴더를 생성 할 수 없습니다.'
            }
        } catch (error) {
            console.log(error);
            alert(trans('folderCannotBeCreated')); // '폴더를 생성 할 수 없습니다.'
        }
    },

    errorMsg_delete: null,
    storeFolderDelete: async (groupId: string, trans) => {    
        try {
            // const idData = {"id": "init"}
            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'adm_file_management/',{
                "id": "group" ,
                "action": "delete" ,
                "group_id": groupId,
            }, {
            headers:{
                Authorization: "Bearer " + token ,
            },
            });
            
            if (response.status === 200) {
                const errorMsg: rtnMsg = response.data
                set({ errorMsg_delete: errorMsg });
                // if(errorMsg.error == "3") { 
                //     alert(trans('canNotUseThisId'));       //'사용할 수 없는 아이디 입니다.'
                // } else if(errorMsg.error == "4") { 
                //     alert(trans('userDataCannotBeCreated'));    //'유저 데이터를 생성 할 수 없습니다.'
                // } else if(errorMsg.error == "9") { 
                //     alert(trans('dataCreationError'));      //'데이터 생성 오류 입니다.'
                // }
                if(errorMsg.error != "0") { 
                    alert(trans('folderCannotBeDeleted'));    // '폴더를 삭제 할 수 없습니다.'
                } else {
                    alert(trans('folderHasBeenDeleted')); // '폴더를 삭제했습니다.'
                }
            } else {
                alert(trans('folderCannotBeDeleted'));        // '폴더를 삭제 할 수 없습니다.'
            }
        } catch (error) {
            console.log(error);
            alert(trans('folderCannotBeDeleted'));        // '폴더를 삭제 할 수 없습니다.'
        }
    },

    errorMsg_edit: null,
    storeFolderEdit: async (groupId: string, groupName: string, trans) => {    
        try {
            // const idData = {"id": "init"}
            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'adm_file_management/',{
                "id": "group" ,
                "action": "modify" ,                
                "group_id": groupId,
                "group_name": groupName,                
            }, {
            headers:{
                Authorization: "Bearer " + token ,
            },            
            });
            
            if (response.status === 200) {
                const errorMsg: rtnMsg = response.data
                set({ errorMsg_edit: errorMsg });                
                alert(trans('folderHasBeenModified')); // '폴더를 생성했습니다.'
            } else {
                alert(trans('folderCannotBeModified'));        //'폴더를 수정 할 수 없습니다.'
            }
        } catch (error) {
            console.log(error);
            alert(trans('folderCannotBeModified'));        //'폴더를 수정 할 수 없습니다.'
        }
    },    
}));

export default useAdmFolderManagement;

