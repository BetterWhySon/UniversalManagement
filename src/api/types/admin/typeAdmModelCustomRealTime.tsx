export interface typeAdmModelCustomRealTimeList {
    id: number;                           // 선택한 항목의 id
    referred_manufacturer: number;        // 선택한 업체의 id
    referred_manufacturer_name: string;   // 선택한 업체명
    name: string;                         // 데이터명
    type: number;                         // 데이터 타입 (0: INT, 1: FLOAT, 2: BOOLEAN)
    unit: string;                         // 단위
    model_custom_count: number;           // 연계 제조사 지정데이터 수
    registration_date?: string;           // 등록일자
} 