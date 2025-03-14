export type typeAdmBetteryDataConfigList = {
    id: number;
    device_name: string;
    pack_manufacturer: number;  // 회사 id
    cell: boolean;  // cell_v -> cell
    current: boolean;
    batt_temp: boolean;
    sys_temp: boolean;
    soc: boolean;
    sac: boolean;
    soh: boolean;
    pack_v: boolean;
    chg_sac: boolean;  // 추가
    dchg_sac: boolean;  // 추가
    saac: boolean;
    speed: boolean;
    mileage: boolean;
    car_state: boolean;
    acc_pedal_loc: boolean;
    sub_batt_volt: boolean;
    brake_state: boolean;  // break -> brake
    shift_state: boolean;
    outside_temp: boolean;
    fuel_state: boolean;
    chg_state: boolean;
    disp_soc: boolean;
    gps_lat: boolean;  // 추가
    gps_lon: boolean;  // 추가
    rpm: boolean;  // 추가
    can_id: number;  // boolean에서 number로 변경
    // API 응답에서만 사용되는 필드
    map_model_count?: number;  // 연계 모델 수
    registration_date?: string;  // 등록일자
};

