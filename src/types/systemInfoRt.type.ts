export type SystemInfoRtBmsStatusType = {
  id: number;
  item: string;
};

// bms상태정보
export type SystemInfoRtBmsType = {
  mode: number;
  charger: string;
  status: Array<SystemInfoRtBmsStatusType>;
  voltage: number;
  current: number;
  soc: number;
  temperature: number;
  ach_current: number;
  adch_current: number;
  alarm_count: number;
  arack_cnt: string;
  timestamp: string;
  ems_humi:number;
  ems_heartcnt:number;
};

// 하당bms의 rack정보(배열))
export type SystemInfoRtRackType = {
  rack_num: number;  
  status: {id: number; item: string;};
  alarm_status: {id: number; item: string;};
  rbms_volt: number;
  rbms_crnt: number;
  rbms_soc: number;
  rbms_soh: number;
  rbms_crntmax_chg: number;
  rbms_crntmax_dchg: number;
  rbms_cell_max: number;
  rbms_cell_min: number;
  rbms_cell_avg: number;
  rbms_temp_max: number;
  rbms_temp_min: number;
  rbms_temp_avg: number;
  rbms_bal_sts: number;
  rbms_fan_act_sts: number;
}[];

// 해당 rack의 상태정보
export type SystemInfoRtRackDetailType = {
  [key: string]: any;     // 모든 데이터 형태로 key검색 허용
  rbms_heartcnt: number;
  rbms_posrly_sts: number;
  rbms_negrly_sts: number;
  rbms_prerly_sts: number;
  rbms_fusests_pos: number;
  rbms_fusests_neg: number;
  rbms_cell_maxch: number;
  rbms_cell_maxmoduleno: number;
  rbms_cell_minch: number;
  rbms_cell_minmoduleno: number;
  rbms_hvd_bat: number;
  rbms_hvd_pcs: number;
  rbms_temp_maxch: number;
  rbms_temp_maxmoduleno: number;
  rbms_temp_minch: number;
  rbms_temp_minmoduleno: number;
  rbms_isores_pos: number;
  rbms_isores_neg: number;
  rbms_alarmid_1: number;
  rbms_alarmid_2: number;
  rbms_alarmid_3: number;
  rbms_ptcid_1: number;
  rbms_ptcid_2: number;
  rbms_ptcid_3: number;
  rbms_pptcid_1: number;
  rbms_idle_sts: number;
  rbms_igk_rtn: number;
  rbms_fan_flt_sts: number;
  rbms_fw1_ver: number;
  rbms_fw2_ver: number;
};

// 해당 rack의 상태정보
export type SystemInfoRtRackDetailAlarmType = {
  level: number;
  alarm_id: string;
  alarm_item: string; 
  start_time: string; 
  alarm_id_int: number; 
  alarm_item_int: number; 
}[];


export type SystemInfoRtCellDetailType = {
  cell: number[];
  temp: number[];
  m_temp: number[];
};





// export type SystemInfoRtType = {
//   bms_data: {
//     mode: number;
//     status: number;
//     voltage: number;
//     current: number;
//     soc: number;
//     temperature: number;
//     ach_current: number;
//     adch_current: number;
//     alarm_count: number;
//     arack_cnt: string;
//   };
//   rack_data: {
//     rack_num: number;
//     rbms_ready: number;
//     rbms_volt: number;
//     rbms_crnt: number;
//     rbms_soc: number;
//     rbms_soh: number;
//     rbms_crntmax_chg: number;
//     rbms_crntmax_dchg: number;
//     rbms_cell_max: number;
//     rbms_cell_min: number;
//     rbms_cell_avg: number;
//     rbms_temp_max: number;
//     rbms_temp_min: number;
//     rbms_temp_avg: number;
//     rbms_bal_sts: number;
//     rbms_fan_act_sts: number;
//   }[];
// };





