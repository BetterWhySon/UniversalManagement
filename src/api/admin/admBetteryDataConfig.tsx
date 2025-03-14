import { create } from 'zustand';
import { api } from '@/api/api';
import { backendURL_admin } from '../URLs';
import { typeAdmBetteryDataConfigList } from '@/api/types/admin/typeAdmBetteryDataConfig';

interface AdmBetteryDataConfig {
    dataListBetteryDataConfig: Array<typeAdmBetteryDataConfigList> | null;
    storeBetteryDataConfigList: (trans: (key: string) => string, customer_id: number) => void;

    rtnMsg_create: rtnMsg | null;
    storeBetteryDataConfigCreate: (
        device_name: string,
        pack_manufacturer: number,
        cell: boolean,
        current: boolean,
        batt_temp: boolean,
        sys_temp: boolean,
        soc: boolean,
        sac: boolean,
        soh: boolean,
        pack_v: boolean,
        chg_sac: boolean,
        dchg_sac: boolean,
        saac: boolean,
        speed: boolean,
        mileage: boolean,
        car_state: boolean,
        acc_pedal_loc: boolean,
        sub_batt_volt: boolean,
        brake_state: boolean,
        shift_state: boolean,
        outside_temp: boolean,
        fuel_state: boolean,
        chg_state: boolean,
        disp_soc: boolean,
        gps_lat: boolean,
        gps_lon: boolean,
        rpm: boolean,
        can_id: number,
        trans: (key: string) => string
    ) => void;

    rtnMsg_delete: rtnMsg | null;
    storeBetteryDataConfigDelete: (id: string, trans: (key: string) => string) => void;

    rtnMsg_edit: rtnMsg | null;
    storeBetteryDataConfigEdit: (
        id: string,
        device_name: string,
        pack_manufacturer: number,
        cell: boolean,
        current: boolean,
        batt_temp: boolean,
        sys_temp: boolean,
        soc: boolean,
        sac: boolean,
        soh: boolean,
        pack_v: boolean,
        chg_sac: boolean,
        dchg_sac: boolean,
        saac: boolean,
        speed: boolean,
        mileage: boolean,
        car_state: boolean,
        acc_pedal_loc: boolean,
        sub_batt_volt: boolean,
        brake_state: boolean,
        shift_state: boolean,
        outside_temp: boolean,
        fuel_state: boolean,
        chg_state: boolean,
        disp_soc: boolean,
        gps_lat: boolean,
        gps_lon: boolean,
        rpm: boolean,
        can_id: number,
        trans: (key: string) => string
    ) => void;
}

interface rtnMsg {
    error: number;
}

const getErrorMessage = (error: number, trans: (key: string) => string) => {
    switch (error) {
        case 1:
            return trans('이미 등록된 항목입니다.');
        case 2:
            return trans('필수 입력 필드를 확인해주세요.');
        case 3:
            return trans('이미 처리된 ID 입니다.');
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
        alert(trans('관리자 권한이 없습니다.'));
        return true;
    }
    return false;
};

const useAdmBetteryDataConfig = create<AdmBetteryDataConfig>((set) => ({
    dataListBetteryDataConfig: null,

    storeBetteryDataConfigList: async (trans, customer_id) => {
        try {
            const token = localStorage.getItem("token_admin");
            const response = await api.post(backendURL_admin + 'get_model_data_configs/', {
                customer_id
            }, {
                headers: { Authorization: "Bearer " + token },
            });

            if (checkAuthError(response.status, trans)) return;

            if (response.status === 200) {
                if (response.data.error === 0) {
                    const dataList: Array<typeAdmBetteryDataConfigList> = response.data.data;
                    set({ dataListBetteryDataConfig: dataList });
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('데이터를 조회할 수 없습니다.'));
            }
        } catch (error) {
            console.error('API Error:', error);
            alert(trans('데이터를 조회할 수 없습니다.'));
        }
    },

    rtnMsg_create: null,
    storeBetteryDataConfigCreate: async (
        device_name, pack_manufacturer, cell, current, batt_temp, sys_temp,
        soc, sac, soh, pack_v, chg_sac, dchg_sac, saac, speed, mileage,
        car_state, acc_pedal_loc, sub_batt_volt, brake_state, shift_state,
        outside_temp, fuel_state, chg_state, disp_soc, gps_lat, gps_lon, rpm, can_id, trans
    ) => {
        try {
            const token = localStorage.getItem("token_admin");
            const response = await api.post(backendURL_admin + 'create_model_data_config/', {
                device_name,
                pack_manufacturer,
                cell,
                current,
                batt_temp,
                sys_temp,
                soc,
                sac,
                soh,
                pack_v,
                chg_sac,
                dchg_sac,
                saac,
                speed,
                mileage,
                car_state,
                acc_pedal_loc,
                sub_batt_volt,
                brake_state,
                shift_state,
                outside_temp,
                fuel_state,
                chg_state,
                disp_soc,
                gps_lat,
                gps_lon,
                rpm,
                can_id
            }, {
                headers: { Authorization: "Bearer " + token },
            });

            if (checkAuthError(response.status, trans)) return;

            if (response.status === 200) {
                if (response.data.error === 0) {
                    set({ rtnMsg_create: response.data });
                    alert(trans('표준 데이터가 등록되었습니다.'));
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('표준 데이터를 등록할 수 없습니다.'));
            }
        } catch (error) {
            console.error(error);
            alert(trans('표준 데이터를 등록할 수 없습니다.'));
        }
    },

    rtnMsg_delete: null,
    storeBetteryDataConfigDelete: async (id, trans) => {
        try {
            const token = localStorage.getItem("token_admin");
            const response = await api.post(backendURL_admin + 'delete_model_data_config/', {
                "id": id
            }, {
                headers: { Authorization: "Bearer " + token },
            });

            if (checkAuthError(response.status, trans)) return;

            if (response.status === 200) {
                if (response.data.error === 0) {
                    set({ rtnMsg_delete: response.data });
                    alert(trans('표준 데이터를 삭제했습니다.'));
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('표준 데이터를 삭제할 수 없습니다.'));
            }
        } catch (error) {
            console.error(error);
            alert(trans('표준 데이터를 삭제할 수 없습니다.'));
        }
    },

    rtnMsg_edit: null,
    storeBetteryDataConfigEdit: async (
        id, device_name, pack_manufacturer, cell, current, batt_temp, sys_temp,
        soc, sac, soh, pack_v, chg_sac, dchg_sac, saac, speed, mileage,
        car_state, acc_pedal_loc, sub_batt_volt, brake_state, shift_state,
        outside_temp, fuel_state, chg_state, disp_soc, gps_lat, gps_lon, rpm, can_id, trans
    ) => {
        try {
            const token = localStorage.getItem("token_admin");
            const response = await api.post(backendURL_admin + 'update_model_data_config/', {
                id,
                device_name,
                pack_manufacturer,
                cell,
                current,
                batt_temp,
                sys_temp,
                soc,
                sac,
                soh,
                pack_v,
                chg_sac,
                dchg_sac,
                saac,
                speed,
                mileage,
                car_state,
                acc_pedal_loc,
                sub_batt_volt,
                brake_state,
                shift_state,
                outside_temp,
                fuel_state,
                chg_state,
                disp_soc,
                gps_lat,
                gps_lon,
                rpm,
                can_id
            }, {
                headers: { Authorization: "Bearer " + token },
            });

            if (checkAuthError(response.status, trans)) return;

            if (response.status === 200) {
                if (response.data.error === 0) {
                    set({ rtnMsg_edit: response.data });
                    alert(trans('표준 데이터를 수정했습니다.'));
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('표준 데이터를 수정할 수 없습니다.'));
            }
        } catch (error) {
            console.error(error);
            alert(trans('표준 데이터를 수정할 수 없습니다.'));
        }
    },
}));

export default useAdmBetteryDataConfig; 