import { create } from 'zustand';
// import axios from "axios";
import { api } from './api';
import { backendURL } from './URLs';

interface AdmUserManagementUserEdit {    
    errorMsg_userEdit: rtnMsg | null;    
    storeUserEdit: (username/*userId*/: string, old_password: string, new_password: string, first_name/*userName*/: string, phonenumber: string, email: string, is_staff: boolean, userLevel2: boolean, userLevel1: boolean, trans: (key: string) => string) => void;    
}

interface rtnMsg {
    error: string;    

}

// const { storeEssReload } = useNeedAdmEssReload();

const useAdmUserManagementUserEdit = create<AdmUserManagementUserEdit>((set) => ({
    errorMsg_userEdit: null,
    storeUserEdit: async (username/*userId*/: string, old_password: string, new_password: string, first_name/*userName*/: string, phonenumber: string, email: string, is_staff: boolean, userLevel2: boolean, userLevel1: boolean, trans) => {    
        try {
            // const idData = {"id": "init"}
            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'adm_user_management/',{
                "id": "modify" ,
                "username": username,   // userId
                "old_password": old_password,
                "new_password": new_password,
                "first_name": first_name, // userName
                "phonenumber": phonenumber,
                "email": email,
                "is_staff": is_staff,
                "level1": userLevel1,
                "level2": userLevel2,
            }, {
            headers:{
                Authorization: "Bearer " + token ,
            },            
            });
            
            if (response.status === 200) {
                const errorMsg: rtnMsg = response.data
                set({ errorMsg_userEdit: errorMsg });
                if(errorMsg.error == "2") { 
                    alert(trans('pleaseCheckYourExistingPassword'));       // '기존 비밀번호를 확인해 주세요'
                } else {
                    alert(trans('userHasBeenModified'));      //'사용자 정보를 수정했습니다.'
                }
            } else {
                alert(trans('userCannotBeModified'));        //'사용자를 수정 할 수 없습니다.'
            }
        } catch (error) {
            console.log(error);
            alert(trans('userCannotBeModified'));        //'사용자를 수정 할 수 없습니다.'
        }
    },
}));

export default useAdmUserManagementUserEdit;

