import { create } from 'zustand';
import { api } from '@/api/api';
import { backendURL } from '../URLs';
import { typeCstBattery } from '@/api/types/customer/typeCstBattery';

interface CstBattery {
    dataListBattery: Array<typeCstBattery> | null;
    storeBatteryList: (trans: (key: string) => string) => void;
    rtnMsg_assign: rtnMsg | null;
    storeBatteryAssign: (site_id: number, group_id: number, battery_id_list: number[], trans: (key: string) => string) => void;
    rtnMsg_release: rtnMsg | null;
    storeBatteryRelease: (battery_id_list: number[], trans: (key: string) => string) => void;
    // rtnMsg_delete: rtnMsg | null;
    // storeBatteryDelete: (battery_id: number, trans: (key: string) => string) => void;
}

interface rtnMsg {
    error: number;
}

const getErrorMessage = (error: number, trans: (key: string) => string) => {
    switch (error) {
        case 1:
            return trans('이미 등록된 배터리입니다.');
        case 2:
            return trans('필수 입력 필드를 확인해주세요.');
        case 3:
            return trans('존재하지 않는 배터리입니다.');
        case 4:
            return trans('서버오류(RDB) 입니다.');
        case 5:
            return trans('서버오류(View) 입니다.');
        default:
            return trans('데이터를 처리할 수 없습니다.');
    }
};

const checkAuthError = (status: number, trans: (key: string) => string) => {
    if (status === 401) {
        alert(trans('인증이 만료되었습니다. 다시 로그인해주세요.'));
        localStorage.clear();
        window.location.href = '/login';
        return true;
    }
    if (status === 403) {
        alert(trans('접근 권한이 없습니다.'));
        return true;
    }
    return false;
};

const useCstBattery = create<CstBattery>((set) => ({
    dataListBattery: null,
    rtnMsg_assign: null,
    rtnMsg_release: null,
    // rtnMsg_delete: null,

    storeBatteryList: async (trans) => {
        try {
            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'init_batteries/', {
                action: 'whole'
            }, {
                headers: { Authorization: "Bearer " + token },
            });

            if (checkAuthError(response.status, trans)) return;

            if (response.status === 200) {
                if (response.data.error === 0) {
                    const dataList: Array<typeCstBattery> = response.data.data;
                    set({ dataListBattery: dataList });
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('배터리 목록을 조회할 수 없습니다.'));
            }
        } catch (error) {
            console.error(error);
            alert(trans('배터리 목록을 조회할 수 없습니다.'));
        }
    },

    storeBatteryAssign: async (site_id, group_id, battery_id_list, trans) => {
        try {
            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'manage_battery/', {
                action: 'assign',
                site_id,
                group_id,
                battery_id_list
            }, {
                headers: { Authorization: "Bearer " + token },
            });

            if (checkAuthError(response.status, trans)) return;

            if (response.status === 200) {
                if (response.data.error === 0) {
                    set({ rtnMsg_assign: response.data });
                    alert(trans('배터리를 등록했습니다.'));
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('배터리를 등록할 수 없습니다.'));
            }
        } catch (error) {
            console.error(error);
            alert(trans('배터리를 등록할 수 없습니다.'));
        }
    },

    storeBatteryRelease: async (battery_id_list, trans) => {
        try {
            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'manage_battery/', {
                action: 'release',
                battery_id_list
            }, {
                headers: { Authorization: "Bearer " + token },
            });

            if (checkAuthError(response.status, trans)) return;

            if (response.status === 200) {
                if (response.data.error === 0) {
                    set({ rtnMsg_release: response.data });
                    alert(trans('배터리 등록을 해제했습니다.'));
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('배터리 등록을 해제할 수 없습니다.'));
            }
        } catch (error) {
            console.error(error);
            alert(trans('배터리 등록을 해제할 수 없습니다.'));
        }
    },

    // storeBatteryDelete: async (battery_id, trans) => {
    //     try {
    //         const token = localStorage.getItem("token");
    //         const response = await api.post(backendURL + 'manage_battery/', {
    //             action: 'delete',
    //             battery_id
    //         }, {
    //             headers: { Authorization: "Bearer " + token },
    //         });

    //         if (checkAuthError(response.status, trans)) return;

    //         if (response.status === 200) {
    //             if (response.data.error === 0) {
    //                 set({ rtnMsg_delete: response.data });
    //                 alert(trans('배터리를 삭제했습니다.'));
    //             } else {
    //                 alert(getErrorMessage(response.data.error, trans));
    //             }
    //         } else {
    //             alert(trans('배터리를 삭제할 수 없습니다.'));
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         alert(trans('배터리를 삭제할 수 없습니다.'));
    //     }
    // }
}));

export default useCstBattery; 