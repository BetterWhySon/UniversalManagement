import { create } from 'zustand';
import { api } from '@/api/api';
import { backendURL } from '../URLs';
import { typeCstGroup, typeCstUnassignedGroup } from '@/api/types/customer/typeCstCompanyGroupMapping';

interface CstCompanyGroupMapping {
    dataListCompanyGroup: Array<typeCstGroup> | null;
    storeCompanyGroupList: (trans: (key: string) => string) => void;

    dataListUnassignedGroup: Array<typeCstUnassignedGroup> | null;
    storeUnassignedGroupList: (site_id: number, trans: (key: string) => string) => void;

    rtnMsg_assign: rtnMsg | null;
    storeGroupAssign: (
        site_id: number,
        group_id_list: Array<number>,
        trans: (key: string) => string
    ) => void;

    rtnMsg_release: rtnMsg | null;
    storeGroupRelease: (
        site_id: number,
        group_id_list: Array<number>,
        trans: (key: string) => string
    ) => void;
}

interface rtnMsg {
    error: number;
}

const getErrorMessage = (error: number, trans: (key: string) => string) => {
    switch (error) {
        case 1:
            return trans('이미 할당된 그룹입니다.');
        case 2:
            return trans('필수 입력 필드를 확인해주세요.');
        case 3:
            return trans('존재하지 않는 사업장 또는 그룹입니다.');
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

const useCstCompanyGroupMapping = create<CstCompanyGroupMapping>((set) => ({
    dataListCompanyGroup: null,
    dataListUnassignedGroup: null,

    storeCompanyGroupList: async (trans) => {
        try {
            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'init_groupmap/', {}, {
                headers: { Authorization: "Bearer " + token },
            });

            if (checkAuthError(response.status, trans)) return;

            if (response.status === 200) {
                if (response.data.error === 0) {
                    const dataList: Array<typeCstGroup> = response.data.data;
                    set({ dataListCompanyGroup: dataList });
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('사업장-그룹 매핑 목록을 조회할 수 없습니다.'));
            }
        } catch (error) {
            console.error(error);
            alert(trans('사업장-그룹 매핑 목록을 조회할 수 없습니다.'));
        }
    },

    storeUnassignedGroupList: async (site_id, trans) => {
        try {
            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'get_unassigned_group/', {
                site_id
            }, {
                headers: { Authorization: "Bearer " + token },
            });

            if (checkAuthError(response.status, trans)) return;

            if (response.status === 200) {
                if (response.data.error === 0) {
                    const dataList: Array<typeCstUnassignedGroup> = response.data.data;
                    set({ dataListUnassignedGroup: dataList });
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('할당 가능한 그룹 목록을 조회할 수 없습니다.'));
            }
        } catch (error) {
            console.error(error);
            alert(trans('할당 가능한 그룹 목록을 조회할 수 없습니다.'));
        }
    },

    rtnMsg_assign: null,
    storeGroupAssign: async (site_id, group_id_list, trans) => {
        try {
            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'manage_groupmap/', {
                action: 'assign',
                site_id,
                group_id_list
            }, {
                headers: { Authorization: "Bearer " + token },
            });

            if (checkAuthError(response.status, trans)) return;

            if (response.status === 200) {
                if (response.data.error === 0) {
                    set({ rtnMsg_assign: response.data });
                    alert(trans('그룹을 할당했습니다.'));
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('그룹을 할당할 수 없습니다.'));
            }
        } catch (error) {
            console.error(error);
            alert(trans('그룹을 할당할 수 없습니다.'));
        }
    },

    rtnMsg_release: null,
    storeGroupRelease: async (site_id, group_id_list, trans) => {
        try {
            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'manage_groupmap/', {
                action: 'release',
                site_id,
                group_id_list
            }, {
                headers: { Authorization: "Bearer " + token },
            });

            if (checkAuthError(response.status, trans)) return;

            if (response.status === 200) {
                if (response.data.error === 0) {
                    set({ rtnMsg_release: response.data });
                    alert(trans('그룹 할당을 해제했습니다.'));
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('그룹 할당을 해제할 수 없습니다.'));
            }
        } catch (error) {
            console.error(error);
            alert(trans('그룹 할당을 해제할 수 없습니다.'));
        }
    }
}));

export default useCstCompanyGroupMapping; 