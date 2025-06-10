import { create } from 'zustand';
import { api } from '@/api/api';
import { backendURL } from '../URLs';
import { typeCstCompany } from '@/api/types/customer/typeCstCompany';

interface CstCompany {
    dataListCompany: Array<typeCstCompany> | null;
    storeCompanyList: (trans: (key: string) => string) => void;

    rtnMsg_create: rtnMsg | null;
    storeCompanyCreate: (
        site_name: string,
        zipno: string,
        address_main: string,
        address_road: string,
        address_sub: string,
        description: string,
        trans: (key: string) => string
    ) => void;

    rtnMsg_update: rtnMsg | null;
    storeCompanyUpdate: (
        site_id: number,
        site_name: string,
        zipno: string,
        address_main: string,
        address_road: string,
        address_sub: string,
        description: string,
        trans: (key: string) => string
    ) => void;

    rtnMsg_delete: rtnMsg | null;
    storeCompanyDelete: (
        site_id: number,
        trans: (key: string) => string
    ) => void;
}

interface rtnMsg {
    error: number;
}

const getErrorMessage = (error: number, trans: (key: string) => string) => {
    switch (error) {
        case 1:
            return trans('이미 등록된 사업장입니다.');
        case 2:
            return trans('필수 입력 필드를 확인해주세요.');
        case 3:
            return trans('존재하지 않는 사업장입니다.');
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

const useCstCompany = create<CstCompany>((set) => ({
    dataListCompany: null,

    storeCompanyList: async (trans) => {
        try {
            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'init_sites/', {}, {
                headers: { Authorization: "Bearer " + token },
            });

            if (checkAuthError(response.status, trans)) return;

            if (response.status === 200) {
                if (response.data.error === 0) {
                    const dataList: Array<typeCstCompany> = response.data.data;
                    set({ dataListCompany: dataList });
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('사업장 목록을 조회할 수 없습니다.'));
            }
        } catch (error) {
            console.error(error);
            alert(trans('사업장 목록을 조회할 수 없습니다.'));
        }
    },

    rtnMsg_create: null,
    storeCompanyCreate: async (
        site_name,
        zipno,
        address_main,
        address_road,
        address_sub,
        description,
        trans
    ) => {
        try {
            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'manage_site/', {
                action: 'create',
                site_name,
                zipno,
                address_main,
                address_road,
                address_sub,
                description
            }, {
                headers: { Authorization: "Bearer " + token },
            });

            if (checkAuthError(response.status, trans)) return;

            if (response.status === 200) {
                if (response.data.error === 0) {
                    set({ rtnMsg_create: response.data });
                    alert(trans('사업장을 생성했습니다.'));
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('사업장을 생성할 수 없습니다.'));
            }
        } catch (error) {
            console.error(error);
            alert(trans('사업장을 생성할 수 없습니다.'));
        }
    },

    rtnMsg_update: null,
    storeCompanyUpdate: async (
        site_id,
        site_name,
        zipno,
        address_main,
        address_road,
        address_sub,
        description,
        trans
    ) => {
        try {
            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'manage_site/', {
                action: 'modify',
                site_id,
                site_name,
                zipno,
                address_main,
                address_road,
                address_sub,
                description
            }, {
                headers: { Authorization: "Bearer " + token },
            });

            if (checkAuthError(response.status, trans)) return;

            if (response.status === 200) {
                if (response.data.error === 0) {
                    set({ rtnMsg_update: response.data });
                    alert(trans('사업장을 수정했습니다.'));
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('사업장을 수정할 수 없습니다.'));
            }
        } catch (error) {
            console.error(error);
            alert(trans('사업장을 수정할 수 없습니다.'));
        }
    },

    rtnMsg_delete: null,
    storeCompanyDelete: async (site_id, trans) => {
        try {
            const token = localStorage.getItem("token");
            const response = await api.post(backendURL + 'manage_site/', {
                action: 'delete',
                site_id
            }, {
                headers: { Authorization: "Bearer " + token },
            });

            if (checkAuthError(response.status, trans)) return;

            if (response.status === 200) {
                if (response.data.error === 0) {
                    set({ rtnMsg_delete: response.data });
                    alert(trans('사업장을 삭제했습니다.'));
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('사업장을 삭제할 수 없습니다.'));
            }
        } catch (error) {
            console.error(error);
            alert(trans('사업장을 삭제할 수 없습니다.'));
        }
    }
}));

export default useCstCompany; 