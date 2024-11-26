import { create } from 'zustand';
// import axios from "axios";
import { api } from './api';
import { backendURL } from './URLs';


interface AdmEssManagementShipDelete {    
    errorMsg_shipDelete: rtnMsg | null;    
    storeShipDelete: ( ship_name: string, ship_id: string, trans: (key: string) => string ) => void;    
}

interface rtnMsg {
    error: string;    

}

// const { storeEssReload } = useNeedAdmEssReload();

const useAdmEssManagementShipDelete = create<AdmEssManagementShipDelete>((set) => ({
    errorMsg_shipDelete: null,
    storeShipDelete: async ( ship_name: string, ship_id: string, trans) => {    
        try {
            // const idData = {"id": "init"}
            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'adm_ess_management/',{
                "id": "ship" ,
                "action": "delete",
                "ship_name": ship_name,
                "ship_id": ship_id,
            }, {
            headers:{
                Authorization: "Bearer " + token ,
            },            
            });
            
            if (response.status === 200) {
                const errorMsg: rtnMsg = response.data
                if( errorMsg.error === '23503' ) {
                    alert(trans('shipCannotBeDeletedChild'));    //'하위 데이터를 삭제 후. 다시 실행해 주세요.'
                    return;
                }
                set({ errorMsg_shipDelete: errorMsg });
                // useNeedAdmEssReload()
                alert(trans('shipHasBeenDeleted'));    //'선박을 삭제했습니다.'
            } else {
                alert(trans('shipCannotBeDeleted'));    //'선박을 삭제 할 수 없습니다.'
            }
        } catch (error) {
            console.log(error);
            alert(trans('shipCannotBeDeleted'));    //'선박을 삭제 할 수 없습니다.'
        }
    },
}));

export default useAdmEssManagementShipDelete;

