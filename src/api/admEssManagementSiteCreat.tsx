import { create } from 'zustand';
import { api } from './api';
import { backendURL } from './URLs';

interface AdmEssManagementSiteCreate {    
    errorMsg_siteCreat: rtnMsg | null;    
    storeSiteCreate: ( site_name: string, site_name_foreign: string, coordinate_x: string, coordinate_y: string, trans: (key: string) => string ) => void;    
}

interface rtnMsg {
    errorMsg: string;    
}

const useAdmEssManagementSiteCreate = create<AdmEssManagementSiteCreate>((set) => ({
    errorMsg_siteCreat: null,
    storeSiteCreate: async ( site_name: string, site_name_foreign: string, coordinate_x: string, coordinate_y: string, trans) => {    
        try {
            // const idData = {"id": "init"}
            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'adm_ess_management/',{
                "id": "site" ,
                "action": "create",
                "site_name": site_name,
                "site_name_foreign": site_name_foreign,                
                "coordinate_x": coordinate_x,
                "coordinate_y": coordinate_y,
            }, {
            headers:{
                Authorization: "Bearer " + token ,
            },            
            });
            
            if (response.status === 200) {
                const errorMsg: rtnMsg = response.data
                set({ errorMsg_siteCreat: errorMsg });            
                alert(trans('siteHasBeenCreated'));    //'사이트를 생성했습니다.'
            } else {
                alert(trans('siteCannotBeCreated'));    //'사이트를 생성 할 수 없습니다.'
            }
        } catch (error) {
            console.log(error);
            alert(trans('siteCannotBeCreated'));    //'사이트를 생성 할 수 없습니다.'
        }
    },
}));

export default useAdmEssManagementSiteCreate;

