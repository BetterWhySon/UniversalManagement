import { create } from 'zustand';
import axios, { AxiosError } from "axios";
import { api } from './api';
import { backendURL } from './URLs';
// import { useNavigate, usenavigation } from 'react-router-dom';
// import { useNavigation } from '@react-navigation/native';

// const navigate = useNavigate();
// const navigation = useNavigation();
interface AdmUserAddDelete {
    dataList: Array<IUser_admUserAddDelete> | null;

    storeDataList: (trans: (key: string) => string) => void;
}

interface IUser_admUserAddDelete {
    action: string;
    admin_id: string;
    admin_name: string;
    timestamp: string;

    user_id: string,
    user_name: string,
    user_phonenumber: string,
    user_email: string,
    user_ships: number,
    is_admin: boolean    
    level1: boolean;
    level2: boolean;
}

const useAdmUserAddDelete = create<AdmUserAddDelete>((set) => ({
    dataList: null,

    storeDataList: async (trans) => {
        try {
            // const idData = {"id": "init"}
            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'adm_user_history/', {
                "id": "init"
            }, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });

            if (response.status === 200) {
                const dataList: Array<IUser_admUserAddDelete> = response.data.dataList
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

export default useAdmUserAddDelete;

