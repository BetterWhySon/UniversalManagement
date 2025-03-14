export interface typeAdmModelCustomAlarmList {
    id: number;                           // 알람 ID
    referred_manufacturer: number;         // 선택한 업체 ID
    referred_manufacturer_name: string;    // 선택한 업체명
    name: string;                         // 알람명
    type: number;                         // 알람 타입 (0: INT, 1: FLOAT, 2: BOOLEAN)
    model_custom_count: number;           // 연계 제조사 지정데이터 수
    registration_date?: string;           // 등록일자
} 