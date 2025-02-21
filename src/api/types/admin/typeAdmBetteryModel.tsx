export type typeAdmBetteryModelGroupList = {
    id: number,
    group_name: string,
};

export type typeAdmBetteryDeviceList = {
    id: number,
    device_name: string,
    description: string,
};

export type typeAdmBetteryCellTypeList = {
    id: number,
    cell_name: string,
    description: string,
};

export type typeAdmBatteryModelList = {
    id: number;
    model_name: string;
    device_type: number;  // 선택한 device id
    device_type_name?: string;    // optional로 변경
    model_group: number;  // 선택한 그룹 id
    model_group_name?: string;    // optional로 변경
    cell_type: number;    // 선택한 cell id
    cell_type_name?: string;      // optional로 변경
    pack_manufacturer: number;  // 선택한 업체 id
    pack_manufacturer_name?: string;  // optional로 변경
    series_cell_cnt: number;
    batt_temp_cnt: number;
    sys_temp_cnt: number;
    pack_nominal_capacity: number;
    pack_nominal_voltage: number;
    high_cell_v_limit: number;
    low_cell_v_limit: number;
    high_batt_temp_limit: number;
    low_batt_temp_limit: number;
    max_chg_current: number;
    max_dchg_current: number;
    cell_nominal_voltage: number;
    
    high_sys_temp_limit: number;
    low_sys_temp_limit: number;
    can_id: number;
    parallel_cell_cnt: number;
    pack_nominal_resistance: number;
    cell_avail_cycle: number;
    pack_init_price: number;
    fuel_efficiency: number;
};

