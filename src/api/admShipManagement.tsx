import { create } from 'zustand';
// import axios, {AxiosError} from "axios";
import { api } from './api';
import { backendURL } from './URLs';
// import { useNavigate, usenavigation } from 'react-router-dom';
// import { useNavigation } from '@react-navigation/native';
import { userShipData, searchShipData } from '@/types/ship-management.type';

interface rtnMsg {
    errorMsg: string;    
}

interface AdmShipManagement {
    dataList: Array<userShipData> | null;    
    dataListShip: Array<searchShipData> | null;    
    rtnMsgUserShipCreate: rtnMsg | null;    
    
    storeUserShipDataList: (userId: string, trans: (key: string) => string) => void;    
    storeDataListShip: (site_id: string, keyword: string, trans: (key: string) => string) => void;  
    storeUserShipCreate: (user_id: string, ship_ids: number[], trans: (key: string) => string) => void;    // 선박리스트(배열)을 등록
}

const useAdmShipManagement = create<AdmShipManagement>((set) => ({
    dataList: null,                 // 사용자별 등록된 선박
    dataListShip: null,             // 사이트, 검색어로 검색된 선박
    rtnMsgUserShipCreate: null,     // 해당유저의 선박등록

    // 해당유저의 선박등록
    storeUserShipCreate: async (user_id: string, ship_ids: number[], trans) => {    
        try {
          // const idData = {"id": "init"}
          const token = localStorage.getItem("token");
          const response = await api.post(backendURL + 'adm_ship_management/',{
              "action": "create",
              "user_id": user_id,
              "ship_id": ship_ids,
          }, {
          headers:{
              Authorization: "Bearer " + token ,
          },            
          });
          
          if (response.status === 200) {
              const dataList: rtnMsg = response.data
              set({ rtnMsgUserShipCreate: dataList });                
          } else {
              alert(trans('shipCannotBeCreated'));      //선박을 생성 할 수 없습니다.
          }
        } catch (error) {
            console.log(error);
            alert(trans('shipCannotBeCreated'));      //선박을 생성 할 수 없습니다.
        }
    },


    // 선박 검색 (사이트, 검색어)
    storeDataListShip: async (site_id: string, keyword: string, trans) => {    
        try {
          // const idData = {"id": "init"}
          const token = localStorage.getItem("token");
          const response = await api.post(backendURL + 'adm_ship_management/',{
              "action": "search",
              "site_id": site_id?Number(site_id):'',
              "keyword": keyword,
          }, {
          headers:{
              Authorization: "Bearer " + token ,
          },            
          });
          
          if (response.status === 200) {
              const dataList: Array<searchShipData> = response.data.dataList
              set({ dataListShip: dataList });                
          } else {
            alert(trans('shipCannotBeRetrieve'));      //선박을 조회 할 수 없습니다.
          }
        } catch (error) {
            console.log(error);
            alert(trans('shipCannotBeRetrieve'));      //선박을 조회 할 수 없습니다.
        }
    },

    // 사용자별 등록된 선박 리스트
    storeUserShipDataList: async (userId: string, trans) => {    
        try {
            // const idData = {"id": "init"}
            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'adm_ship_management/',{
                "action": "info",
                "user_id": userId,
            }, {
            headers:{
                Authorization: "Bearer " + token ,
            },            
            });
            
            if (response.status === 200) {
                const dataList: Array<userShipData> = response.data.dataList
                set({ dataList: dataList });                
            } else {
                alert(trans('shipCannotBeRetrieve'));      //선박을 조회 할 수 없습니다.
            }
        } catch (error) {
            console.log(error);
            alert(trans('shipCannotBeRetrieve'));      //선박을 조회 할 수 없습니다.            
        }
    },
}));

export default useAdmShipManagement;

