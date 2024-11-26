
import { create } from 'zustand';
import { api } from './api';
import { backendURL } from './URLs';

interface AdmUserManagementUserCreate {    
    errorMsg_userCreat: rtnMsg | null;    
    storeUserCreate: ( username/*userId*/: string, password: string, first_name/*userName*/: string, phonenumber: string, email: string, is_staff: boolean, userLevel2: boolean, userLevel1: boolean,trans: (key: string) => string) => void;    
}

interface rtnMsg {
    error: string;    
}

const useAdmUserManagementUserCreate = create<AdmUserManagementUserCreate>((set) => ({
    errorMsg_userCreat: null,
    storeUserCreate: async ( username/*userId*/: string, password: string, first_name/*userName*/: string, phonenumber: string, email: string, is_staff: boolean, userLevel2: boolean, userLevel1: boolean, trans) => {    
        try {
            // const idData = {"id": "init"}
            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'adm_user_management/',{
                "id": "create" ,
                "username": username,   // userId
                "password": password,
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
                set({ errorMsg_userCreat: errorMsg }); 
                if(errorMsg.error == "3") { 
                    alert(trans('canNotUseThisId'));       //'사용할 수 없는 아이디 입니다.'
                } else if(errorMsg.error == "4") { 
                    alert(trans('userDataCannotBeCreated'));    //'유저 데이터를 생성 할 수 없습니다.'
                } else if(errorMsg.error == "9") { 
                    alert(trans('dataCreationError'));      //'데이터 생성 오류 입니다.'
                } else {
                    alert(trans('userHasBeenCreated'));      //'사용자를 생성했습니다.'
                }
            } else {
                alert(trans('userCannotBeCreated')); // '사용자를 생성 할 수 없습니다.'
            }
        } catch (error) {
            console.log(error);
            alert(trans('userCannotBeCreated')); // '사용자를 생성 할 수 없습니다.'
        }
    },
}));

export default useAdmUserManagementUserCreate;

