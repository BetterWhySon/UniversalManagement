import { create } from 'zustand';
import axios, {AxiosError} from "axios";
import { api } from './api';
import { backendURL } from './URLs';
import { fileManagement_file } from '@/types/file-management.type';

interface AdmFileManagementGroup {
    dataListFile: Array<fileManagement_file> | null;        
    storeListFile: (groupId: string, trans: (key: string) => string) => void;    

    errorMsg_creat: rtnMsg | null;    
    storeFileCreate: ( fileName: string, groupId: string, trans: (key: string) => string) => void;    
    errorMsg_delete: rtnMsg | null;    
    storeFileDelete: ( fileId: string, trans: (key: string) => string) => void;    
    errorMsg_edit: rtnMsg | null;    
    storeFileEdit: (fileId: string, fileName: string, trans: (key: string) => string) => void;    
}
interface rtnMsg {
    error: string;    
}

const useAdmFileManagement = create<AdmFileManagementGroup>((set) => ({
    dataListFile: null,
    
    storeListFile: async (groupId: string, trans) => {    
        try {
            // const idData = {"id": "init"}
            if( groupId == "" ) 
                return ;

            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'adm_file_management/',{
                "id": "file" ,
                "action": "list" ,
                "group_id": groupId ,
            }, {
            headers:{
                Authorization: "Bearer " + token ,
            },            
            });
            
            if (response.status === 200) {
                const dataList: Array<fileManagement_file> = response.data.dataList.file_data
                set({ dataListFile: dataList });                
            } else {
                alert(trans('groupCannotBeRetrieve'));   //'폴더(그룹)를 조회 할 수 없습니다.'
            }
        } catch (error) {
            console.log(error);
            alert(trans('groupCannotBeRetrieve'));   //'폴더(그룹)를 조회 할 수 없습니다.'
        }
    },

    errorMsg_creat: null,
    storeFileCreate: async ( fileName: string, groupId: string, trans ) => {    
        try {
            // const idData = {"id": "init"}
            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'adm_file_management/',{
                "id": "file" ,
                "action": "create" ,
                "file_name": fileName,   
                "group_id": groupId,   
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
                alert(trans('groupHasBeenCreated')); // '파일을 생성했습니다.'
            } else {
                alert(trans('groupCannotBeCreated')); // '파일를 생성 할 수 없습니다.'
            }
        } catch (error) {
            console.log(error);
            alert(trans('groupCannotBeCreated')); // '파일를 생성 할 수 없습니다.'
        }
    },

    errorMsg_delete: null,
    storeFileDelete: async (fileId: string, trans) => {    
        try {
            // const idData = {"id": "init"}
            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'adm_file_management/',{
                "id": "file" ,
                "action": "delete" ,
                "file_id": fileId,
            }, {
            headers:{
                Authorization: "Bearer " + token ,
            },            
            });
            
            if (response.status === 200) {
                const errorMsg: rtnMsg = response.data
                set({ errorMsg_delete: errorMsg });
                // useNeedAdmEssReload()
                if(errorMsg.error != "0") { 
                    alert(trans('groupCannotBeDeleted'));    // '파일을 삭제 할 수 없습니다.'
                } else {
                    alert(trans('groupHasBeenDeleted')); // '파일을 삭제했습니다.'
                }
            } else {
                alert(trans('groupCannotBeDeleted'));        // '파일을 삭제 할 수 없습니다.'
            }
        } catch (error) {
            console.log(error);
            alert(trans('groupCannotBeDeleted'));        // '파일을 삭제 할 수 없습니다.'
        }
    },

    errorMsg_edit: null,
    storeFileEdit: async (fileId: string, fileName: string, trans) => {    
        try {
            // const idData = {"id": "init"}
            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'adm_file_management/',{
                "id": "file" ,
                "action": "modify" ,
                "file_id": fileId,   // userId
                "file_name": fileName,  
            }, {
            headers:{
                Authorization: "Bearer " + token ,
            },            
            });
            
            if (response.status === 200) {
                const errorMsg: rtnMsg = response.data
                set({ errorMsg_edit: errorMsg });                
                alert(trans('groupHasBeenModified')); // '파일을 수정했습니다.'
            } else {
                alert(trans('groupCannotBeModified'));        //'파일을 수정 할 수 없습니다.'
            }
        } catch (error) {
            console.log(error);
            alert(trans('groupCannotBeModified'));        //'파일을 수정 할 수 없습니다.'
        }
    },    
}));

export default useAdmFileManagement;

