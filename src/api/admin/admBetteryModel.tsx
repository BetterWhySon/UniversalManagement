import { create } from 'zustand';
import axios, { AxiosError } from "axios";
import { api } from '@/api/api';
import { backendURL_admin } from '../URLs';
import { typeAdmBetteryModelGroupList, typeAdmBetteryDeviceList, typeAdmBetteryCellTypeList, typeAdmBatteryModelList } from '@/api/types/admin/typeAdmBetteryModel';
// import { axiosInstance } from '../axios';

interface AdmBetteryModel {
    dataListBetteryModelGroup: Array<typeAdmBetteryModelGroupList> | null;        
    storeBetteryModelGroupList: (trans: (key: string) => string) => void;    
    rtnMsg_creat: rtnMsg | null;    
    storeBetteryModelGroupCreate: (group_name: string, trans: (key: string) => string) => void;    
    rtnMsg_delete: rtnMsg | null;    
    storeBetteryModelGroupDelete: (id: number, trans: (key: string) => string) => void;
    rtnMsg_edit: rtnMsg | null;    
    storeBetteryModelGroupEdit: (id: number, group_name: string, trans: (key: string) => string) => void;    

    dataListBetteryDevice: Array<typeAdmBetteryDeviceList> | null;
    storeBetteryDeviceList: (trans: (key: string) => string) => void;
    storeBetteryDeviceCreate: (device_name: string, description: string, trans: (key: string) => string) => void;
    storeBetteryDeviceDelete: (id: number, trans: (key: string) => string) => void;
    storeBetteryDeviceEdit: (id: number, device_name: string, description: string, trans: (key: string) => string) => void;

    dataListBetteryCellType: Array<typeAdmBetteryCellTypeList> | null;
    storeBetteryCellTypeList: (trans: (key: string) => string) => void;
    storeBetteryCellTypeCreate: (cell_name: string, description: string, trans: (key: string) => string) => void;
    storeBetteryCellTypeDelete: (id: number, trans: (key: string) => string) => void;
    storeBetteryCellTypeEdit: (id: number, cell_name: string, description: string, trans: (key: string) => string) => void;

    dataListBatteryModel: Array<typeAdmBatteryModelList> | null;
    storeBatteryModelList: (trans: (key: string) => string) => void;
    rtnMsg_create: rtnMsg | null;
    storeBatteryModelCreate: (modelData: Omit<typeAdmBatteryModelList, 'id'>, trans: (key: string) => string) => void;
    storeBatteryModelDelete: (id: number, trans: (key: string) => string) => void;
    storeBatteryModelEdit: (modelData: typeAdmBatteryModelList, trans: (key: string) => string) => void;
}
interface rtnMsg {
    error: number;    // string에서 number로 변경
}

const getErrorMessage = (error: number, trans: (key: string) => string) => {
    switch (error) {
        case 1:       // "1"에서 1로 변경
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

const useAdmBetteryModel = create<AdmBetteryModel>((set) => ({
    dataListBetteryModelGroup: null,
    rtnMsg_create: null,
    
    storeBetteryModelGroupList: async (trans) => {    
        try {
            const token = localStorage.getItem("token_admin");
            const response = await api.post(backendURL_admin + 'get_model_groups/', {}, {
                headers: { Authorization: "Bearer " + token },            
            });
            
            if (response.status === 200) {
                if (response.data.error === 0) {
                    const dataList: Array<typeAdmBetteryModelGroupList> = response.data.data;
                    set({ dataListBetteryModelGroup: dataList });
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('관리업체를 조회할 수 없습니다.'));
            }
        } catch (error) {
            console.error(error);
            alert(trans('관리업체를 조회할 수 없습니다.'));
        }
    },

    rtnMsg_creat: null,
    storeBetteryModelGroupCreate: async (group_name: string, trans) => {    
        try {
            const token = localStorage.getItem("token_admin");
            const response = await api.post(backendURL_admin + 'create_model_group/', {                
                group_name                
            }, {
                headers: { Authorization: "Bearer " + token },            
            });
            
            if (response.status === 200) {
                if (response.data.error === 0) {
                    set({ rtnMsg_creat: response.data });
                    alert(trans('관리자를 생성했습니다.'));
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('관리자를 생성할 수 없습니다.'));
            }
        } catch (error) {
            console.error(error);
            alert(trans('관리자를 생성할 수 없습니다.'));
        }
    },

    rtnMsg_delete: null,
    storeBetteryModelGroupDelete: async (id: number, trans) => {    
        try {
            const token = localStorage.getItem("token_admin");
            const response = await api.post(backendURL_admin + 'delete_model_group/', {
                id
            }, {
                headers: { Authorization: "Bearer " + token },            
            });
            
            if (response.status === 200) {
                if (response.data.error === 0) {
                    set({ rtnMsg_delete: response.data });
                    alert(trans('관리업체를 삭제했습니다.'));
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('관리업체를 삭제할 수 없습니다.'));
            }
        } catch (error) {
            console.error(error);
            alert(trans('관리업체를 삭제할 수 없습니다.'));
        }
    },

    rtnMsg_edit: null,
    storeBetteryModelGroupEdit: async (id: number, group_name: string, trans) => {    
        try {
            const token = localStorage.getItem("token_admin");
            const response = await api.post(backendURL_admin + 'update_model_group/', {
                id,
                group_name
            }, {
                headers: { Authorization: "Bearer " + token },            
            });
            
            if (response.status === 200) {
                if (response.data.error === 0) {
                    set({ rtnMsg_edit: response.data });
                    alert(trans('관리자를 수정했습니다.'));
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('관리자를 수정할 수 없습니다.'));
            }
        } catch (error) {
            console.error(error);
            alert(trans('관리자를 수정할 수 없습니다.'));
        }
    },    

    // Device 관련 함수들
    dataListBetteryDevice: null,

    storeBetteryDeviceList: async (trans) => {
        try {
            const token = localStorage.getItem("token_admin");
            const response = await api.post(backendURL_admin + 'get_model_devices/', {}, {
                headers: { Authorization: "Bearer " + token },
            });

            if (response.status === 200) {
                if (response.data.error === 0) {
                    const dataList: Array<typeAdmBetteryDeviceList> = response.data.data;
                    set({ dataListBetteryDevice: dataList });
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('기기종류를 조회할 수 없습니다.'));
            }
        } catch (error) {
            console.error(error);
            alert(trans('기기종류를 조회할 수 없습니다.'));
        }
    },

    storeBetteryDeviceCreate: async (device_name: string, description: string, trans) => {
        try {
            const token = localStorage.getItem("token_admin");
            const response = await api.post(backendURL_admin + 'create_model_device/', {
                device_name,
                description
            }, {
                headers: { Authorization: "Bearer " + token },
            });

            if (response.status === 200) {
                if (response.data.error === 0) {
                    alert(trans('기기종류를 생성했습니다.'));
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('기기종류를 생성할 수 없습니다.'));
            }
        } catch (error) {
            console.error(error);
            alert(trans('기기종류를 생성할 수 없습니다.'));
        }
    },

    storeBetteryDeviceDelete: async (id: number, trans) => {
        try {
            const token = localStorage.getItem("token_admin");
            const response = await api.post(backendURL_admin + 'delete_model_device/', {
                id
            }, {
                headers: { Authorization: "Bearer " + token },
            });

            if (response.status === 200) {
                if (response.data.error === 0) {
                    alert(trans('기기종류를 삭제했습니다.'));
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('기기종류를 삭제할 수 없습니다.'));
            }
        } catch (error) {
            console.error(error);
            alert(trans('기기종류를 삭제할 수 없습니다.'));
        }
    },

    storeBetteryDeviceEdit: async (id: number, device_name: string, description: string, trans) => {
        try {
            const token = localStorage.getItem("token_admin");
            const response = await api.post(backendURL_admin + 'update_model_device/', {
                id,
                device_name,
                description
            }, {
                headers: { Authorization: "Bearer " + token },
            });

            if (response.status === 200) {
                if (response.data.error === 0) {
                    alert(trans('기기종류를 수정했습니다.'));
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('기기종류를 수정할 수 없습니다.'));
            }
        } catch (error) {
            console.error(error);
            alert(trans('기기종류를 수정할 수 없습니다.'));
        }
    },

    // Cell Type 관련 함수들
    dataListBetteryCellType: null,

    storeBetteryCellTypeList: async (trans) => {
        try {
            const token = localStorage.getItem("token_admin");
            const response = await api.post(backendURL_admin + 'get_model_cells/', {}, {
                headers: { Authorization: "Bearer " + token },
            });

            if (response.status === 200) {
                if (response.data.error === 0) {
                    const dataList: Array<typeAdmBetteryCellTypeList> = response.data.data;
                    set({ dataListBetteryCellType: dataList });
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('셀 종류를 조회할 수 없습니다.'));
            }
        } catch (error) {
            console.error(error);
            alert(trans('셀 종류를 조회할 수 없습니다.'));
        }
    },

    storeBetteryCellTypeCreate: async (cell_name: string, description: string, trans) => {
        try {
            const token = localStorage.getItem("token_admin");
            const response = await api.post(backendURL_admin + 'create_model_cell/', {
                cell_name,
                description
            }, {
                headers: { Authorization: "Bearer " + token },
            });

            if (response.status === 200) {
                if (response.data.error === 0) {
                    alert(trans('셀 종류를 생성했습니다.'));
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('셀 종류를 생성할 수 없습니다.'));
            }
        } catch (error) {
            console.error(error);
            alert(trans('셀 종류를 생성할 수 없습니다.'));
        }
    },

    storeBetteryCellTypeDelete: async (id: number, trans) => {
        try {
            const token = localStorage.getItem("token_admin");
            const response = await api.post(backendURL_admin + 'delete_model_cell/', {
                id
            }, {
                headers: { Authorization: "Bearer " + token },
            });

            if (response.status === 200) {
                if (response.data.error === 0) {
                    alert(trans('셀 종류를 삭제했습니다.'));
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('셀 종류를 삭제할 수 없습니다.'));
            }
        } catch (error) {
            console.error(error);
            alert(trans('셀 종류를 삭제할 수 없습니다.'));
        }
    },

    storeBetteryCellTypeEdit: async (id: number, cell_name: string, description: string, trans) => {
        try {
            const token = localStorage.getItem("token_admin");
            const response = await api.post(backendURL_admin + 'update_model_cell/', {
                id,
                cell_name,
                description
            }, {
                headers: { Authorization: "Bearer " + token },
            });

            if (response.status === 200) {
                if (response.data.error === 0) {
                    alert(trans('셀 종류를 수정했습니다.'));
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('셀 종류를 수정할 수 없습니다.'));
            }
        } catch (error) {
            console.error(error);
            alert(trans('셀 종류를 수정할 수 없습니다.'));
        }
    },

    // Battery Model 관련 함수 추가
    dataListBatteryModel: null,

    storeBatteryModelList: async (trans) => {
        try {
            const token = localStorage.getItem("token_admin");
            const response = await api.post(backendURL_admin + 'get_model_objects/', {}, {
                headers: { Authorization: "Bearer " + token },
            });

            if (response.status === 200) {
                if (response.data.error === 0) {
                    const dataList: Array<typeAdmBatteryModelList> = response.data.data;
                    set({ dataListBatteryModel: dataList });
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

    storeBatteryModelCreate: async (modelData, trans) => {
        try {
            const token = localStorage.getItem("token_admin");
            const response = await api.post(backendURL_admin + 'create_model_object/', {
                model_name: modelData.model_name,
                device_type: modelData.device_type,
                model_group: modelData.model_group,
                cell_type: modelData.cell_type,
                pack_manufacturer: modelData.pack_manufacturer,
                series_cell_cnt: modelData.series_cell_cnt,
                batt_temp_cnt: modelData.batt_temp_cnt,
                sys_temp_cnt: modelData.sys_temp_cnt,
                pack_nominal_capacity: modelData.pack_nominal_capacity,
                pack_nominal_voltage: modelData.pack_nominal_voltage,
                high_cell_v_limit: modelData.high_cell_v_limit,
                low_cell_v_limit: modelData.low_cell_v_limit,
                high_batt_temp_limit: modelData.high_batt_temp_limit,
                low_batt_temp_limit: modelData.low_batt_temp_limit,
                max_chg_current: modelData.max_chg_current,
                max_dchg_current: modelData.max_dchg_current,
                cell_nominal_voltage: modelData.cell_nominal_voltage,
                high_sys_temp_limit: modelData.high_sys_temp_limit,
                low_sys_temp_limit: modelData.low_sys_temp_limit,
                can_id: modelData.can_id,
                parallel_cell_cnt: modelData.parallel_cell_cnt,
                pack_nominal_resistance: modelData.pack_nominal_resistance,
                cell_avail_cycle: modelData.cell_avail_cycle,
                pack_init_price: modelData.pack_init_price,
                fuel_efficiency: modelData.fuel_efficiency
            }, {
                headers: {
                    Authorization: "Bearer " + token,
                },            
            });
            
            if (response.status === 200) {
                if (response.data.error === 0) {
                    set({ rtnMsg_create: response.data });
                    alert(trans('배터리 모델을 생성했습니다.'));
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('배터리 모델을 생성할 수 없습니다.'));
            }
        } catch (error) {
            console.error(error);
            alert(trans('배터리 모델을 생성할 수 없습니다.'));
        }
    },

    storeBatteryModelDelete: async (id: number, trans) => {
        try {
            const token = localStorage.getItem("token_admin");
            const response = await api.post(backendURL_admin + 'delete_model_object/', {
                id
            }, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });

            if (response.status === 200) {
                if (response.data.error === 0) {
                    set({ rtnMsg_delete: response.data });
                    alert(trans('배터리 모델을 삭제했습니다.'));
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('배터리 모델을 삭제할 수 없습니다.'));
            }
        } catch (error) {
            console.error(error);
            alert(trans('배터리 모델을 삭제할 수 없습니다.'));
        }
    },

    storeBatteryModelEdit: async (modelData, trans) => {
        try {
            const token = localStorage.getItem("token_admin");
            const response = await api.post(backendURL_admin + 'update_model_object/', {
                id: modelData.id,
                model_name: modelData.model_name,
                device_type: modelData.device_type,
                model_group: modelData.model_group,
                cell_type: modelData.cell_type,
                pack_manufacturer: modelData.pack_manufacturer,
                series_cell_cnt: modelData.series_cell_cnt,
                batt_temp_cnt: modelData.batt_temp_cnt,
                sys_temp_cnt: modelData.sys_temp_cnt,
                pack_nominal_capacity: modelData.pack_nominal_capacity,
                pack_nominal_voltage: modelData.pack_nominal_voltage,
                high_cell_v_limit: modelData.high_cell_v_limit,
                low_cell_v_limit: modelData.low_cell_v_limit,
                high_batt_temp_limit: modelData.high_batt_temp_limit,
                low_batt_temp_limit: modelData.low_batt_temp_limit,
                max_chg_current: modelData.max_chg_current,
                max_dchg_current: modelData.max_dchg_current,
                cell_nominal_voltage: modelData.cell_nominal_voltage,
                high_sys_temp_limit: modelData.high_sys_temp_limit,
                low_sys_temp_limit: modelData.low_sys_temp_limit,
                can_id: modelData.can_id,
                parallel_cell_cnt: modelData.parallel_cell_cnt,
                pack_nominal_resistance: modelData.pack_nominal_resistance,
                cell_avail_cycle: modelData.cell_avail_cycle,
                pack_init_price: modelData.pack_init_price,
                fuel_efficiency: modelData.fuel_efficiency
            }, {
                headers: {
                    Authorization: "Bearer " + token,
                },            
            });
            
            if (response.status === 200) {
                if (response.data.error === 0) {
                    set({ rtnMsg_edit: response.data });
                    alert(trans('배터리 모델을 수정했습니다.'));
                } else {
                    alert(getErrorMessage(response.data.error, trans));
                }
            } else {
                alert(trans('배터리 모델을 수정할 수 없습니다.'));
            }
        } catch (error) {
            console.error(error);
            alert(trans('배터리 모델을 수정할 수 없습니다.'));
        }
    },
}));

export default useAdmBetteryModel;



