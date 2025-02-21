export type typeAdmBetteryDataConfigList = {
    id: number;
    device_name: string;
    object_type: number;  // 선택한 모델 object id
    cell: boolean;
    current: boolean;
    batt_temp: boolean;
    sys_temp: boolean;
    soc: boolean;
    sac: boolean;
    soh: boolean;
    pack_v: boolean;
    chg_sac: boolean;
    dchg_sac: boolean;
    saac: boolean;
    speed: boolean;
    mileage: boolean;
    car_state: boolean;
    acc_pedal_loc: boolean;
    sub_batt_volt: boolean;
    brake_state: boolean;
    shift_state: boolean;
    outside_temp: boolean;
    fuel_state: boolean;
    chg_state: boolean;
    disp_soc: boolean;
    gps_lat: boolean;
    gps_lon: boolean;
    rpm: boolean;
};

