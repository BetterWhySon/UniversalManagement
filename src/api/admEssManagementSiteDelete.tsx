import { create } from 'zustand';
// import axios from "axios";
import { api } from './api';
import { backendURL } from './URLs';


interface AdmEssManagementSiteDelete {    
    errorMsg_siteDelete: rtnMsg | null;    
    storeSiteDelete: ( site_name: string, site_id: string, trans: (key: string) => string) => void;    
}

interface rtnMsg {
    error: string;    

}

// const { storeEssReload } = useNeedAdmEssReload();

const useAdmEssManagementSiteDelete = create<AdmEssManagementSiteDelete>((set) => ({
    errorMsg_siteDelete: null,
    storeSiteDelete: async ( site_name: string, site_id: string, trans) => {    
        try {
            // const idData = {"id": "init"}
            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'adm_ess_management/',{
                "id": "site" ,
                "action": "delete",
                "site_name": site_name,
                "site_id": site_id,                
            }, {
            headers:{
                Authorization: "Bearer " + token ,
            },            
            });
            
            if (response.status === 200) {
                const errorMsg: rtnMsg = response.data
                if( errorMsg.error === '23503' ) {
                    alert(trans('siteCannotBeDeletedChild'));    //'하위 데이터를 삭제 후. 다시 실행해 주세요.'
                    return;
                }
                set({ errorMsg_siteDelete: errorMsg });
                // useNeedAdmEssReload()
                alert(trans('siteHasBeenDeleted'));    //'사이트를 삭제했습니다.'
                
            } else {
                alert(trans('siteCannotBeDeleted'));    //'사이트를 삭제 할 수 없습니다.'
            }
        } catch (error) {
            console.log(error);
            alert(trans('siteCannotBeDeleted'));    //'사이트를 삭제 할 수 없습니다.'
        }
    },
}));

export default useAdmEssManagementSiteDelete;

