import { create } from 'zustand';
import axios, {AxiosError} from "axios";
import { api } from './api';
import { backendURL } from './URLs';
// import { useNavigate, usenavigation } from 'react-router-dom';
// import { useNavigation } from '@react-navigation/native';

// const navigate = useNavigate();
// const navigation = useNavigation();
interface AdmUserManagement {
    dataList: Array<IUser_admUserManagement> | null;    
    
    storeDataList: (trans: (key: string) => string) => void;    
}

interface IUser_admUserManagement {
    id: string;    
    name: string;
    phonenumber: string;
    email: string;
    is_admin: boolean;
    level1: boolean;
    level2: boolean;
    ships: number;

    // shipList: Array<IShip_admEssManagement>;
}

const useAdmUserManagement = create<AdmUserManagement>((set) => ({
    dataList: null,
    
    storeDataList: async (trans) => {    
        try {
            // const idData = {"id": "init"}
            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'adm_user_management/',{
                "id": "init"
            }, {
            headers:{
                Authorization: "Bearer " + token ,
            },            
            });
            
            if (response.status === 200) {
                const dataList: Array<IUser_admUserManagement> = response.data.dataList
                set({ dataList: dataList });                
            } else {
                alert(trans('userCannotBeRetrieve'));   //'사용자를 조회 할 수 없습니다.'
            }
        } catch (error) {
            console.log(error);
            alert(trans('userCannotBeRetrieve'));   //'사용자를 조회 할 수 없습니다.'
        }
    },
}));

export default useAdmUserManagement;

