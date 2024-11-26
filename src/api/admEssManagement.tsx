import { create } from 'zustand';
// import axios from "axios";
import { api } from './api';
import { backendURL } from './URLs';

interface AdmEssManagement {
    dataList: Array<ISite_admEssManagement> | null;    
    selectSite: number,
    selectShip: number,
    // dataList_filter: Array<ISite_admEssManagement> | null;    
    storeDataList: (trans: (key: string) => string) => void;
    storeSeletSite: (index:number) => void;
    storeSeletShip: (index:number) => void;
}

interface IBMS_admEssManagement {
    bmsName: string;
    bmsName_foreign: string;
    bms_id: number;
    model_id: number;
    model_name: string;
    rack_count: number;
    capacity: number;
    alias: string;
    alias_foreign: string;
}
interface IShip_admEssManagement {
    shipName: string;
    shipName_foreign: string;
    ship_id: string;
    bmsList: Array<IBMS_admEssManagement>;
}
interface ISite_admEssManagement {
    siteName: string;    
    siteName_foreign: string;        
    site_id: string;
    coordinate_x: number;
    coordinate_y: number;
    shipList: Array<IShip_admEssManagement>;
}

const useAdmEssManagement = create<AdmEssManagement>((set) => ({
    dataList: null,
    selectSite: -1,
    selectShip: -1,

    storeSeletSite: (index: number) => set({selectSite: index}),
    storeSeletShip: (index: number) => set({selectShip: index}),
    storeDataList: async (trans) => {
    
        try {
            // const idData = {"id": "init"}
            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'adm_ess_management/',{
                "id": "init"
            }, {
            headers:{
                Authorization: "Bearer " + token ,
            },            
            });
            
            if (response.status === 200) {
                const dataList: Array<ISite_admEssManagement> = response.data.dataList
                
                set({ dataList: dataList });            
                let _filters: Array<string> = [];
                _filters.push("전체")
                dataList.map((item) => {
                    _filters.push(item.siteName);
                });
                // SITE_FILTERS.values = [];
                // SITE_FILTERS.values = _filters;
            } else {
                alert(trans('sitesCannotBeRetrieve'));  //사이트를 조회 할 수 없습니다.
            }
        } catch (error) {
            console.log(error);
            alert(trans('sitesCannotBeRetrieve'));  //사이트를 조회 할 수 없습니다.            
        }
    },
}));

export default useAdmEssManagement;

