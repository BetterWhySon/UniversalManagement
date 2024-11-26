import { create } from 'zustand';
// import axios from "axios";
import { api } from './api';
import { backendURL } from './URLs';

interface AdmEssManagementSiteEdit {    
    errorMsg_siteEdit: rtnMsg | null;    
    storeSiteEdit: ( site_name: string, site_name_foreign: string, coordinate_x: string, coordinate_y: string, site_id: string, trans: (key: string) => string) => void;    
}

interface rtnMsg {
    error: string;    

}

// const { storeEssReload } = useNeedAdmEssReload();

const useAdmEssManagementSiteEdit = create<AdmEssManagementSiteEdit>((set) => ({
    errorMsg_siteEdit: null,
    storeSiteEdit: async ( site_name: string, site_name_foreign: string, coordinate_x: string, coordinate_y: string, site_id: string, trans) => {    
        try {
            // const idData = {"id": "init"}
            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'adm_ess_management/',{
                "id": "site" ,
                "action": "modify",
                "site_name": site_name,
                "site_name_foreign": site_name_foreign,                
                "site_id": site_id,
                "coordinate_x": coordinate_x,
                "coordinate_y": coordinate_y,
            }, {
            headers:{
                Authorization: "Bearer " + token ,
            },            
            });
            
            if (response.status === 200) {
                const errorMsg: rtnMsg = response.data
                set({ errorMsg_siteEdit: errorMsg });
                // useNeedAdmEssReload()
                alert(trans('siteHasBeenModified'));   //'사이트를 수정했습니다.'
            } else {
                alert(trans('siteCannotBeModified'));   //'사이트를 수정 할 수 없습니다.'
            }
        } catch (error) {
            console.log(error);
            alert(trans('siteCannotBeModified'));   //'사이트를 수정 할 수 없습니다.'
        }
    },
}));

export default useAdmEssManagementSiteEdit;

