import { create } from 'zustand';
// import axios from "axios";
import { api } from './api';
import { backendURL } from './URLs';


interface AdmUserManagementUserDelete {    
    errorMsg_UserDelete: rtnMsg | null;    
    storeUserDelete: ( username/*userId*/: string, trans: (key: string) => string) => void;    
}

interface rtnMsg {
    error: string;    

}

// const { storeEssReload } = useNeedAdmEssReload();

const useAdmUserManagementUserDelete = create<AdmUserManagementUserDelete>((set) => ({
    errorMsg_UserDelete: null,
    storeUserDelete: async (username/*userId*/: string, trans) => {    
        try {
            // const idData = {"id": "init"}
            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'adm_user_management/',{
                "id": "delete" ,
                "username": username,
            }, {
            headers:{
                Authorization: "Bearer " + token ,
            },            
            });
            
            if (response.status === 200) {
                const errorMsg: rtnMsg = response.data
                set({ errorMsg_UserDelete: errorMsg });
                // useNeedAdmEssReload()
                if(errorMsg.error != "0") { 
                    alert(trans('userCannotBeDeleted'));    // '사용자를 삭제 할 수 없습니다.'
                } else {
                    alert(trans('userHasBeenDeleted'));      //'사용자를 삭제했습니다.'
                }
                
            } else {
                alert(trans('userCannotBeDeleted'));        // '사용자를 삭제 할 수 없습니다.'
            }
        } catch (error) {
            console.log(error);
            alert(trans('userCannotBeDeleted'));        // '사용자를 삭제 할 수 없습니다.'
        }
    },
}));

export default useAdmUserManagementUserDelete;

