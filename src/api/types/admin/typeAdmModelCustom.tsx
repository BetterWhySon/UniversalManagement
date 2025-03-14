export interface typeAdmModelCustomList {
    id: number;                      // 선택한 항목의 id
    name: string;                    // 모델명
    referred_manufacturer: number;    // 선택한 업체의 id
    realtime_item: any[];            // 실시간 데이터 항목 리스트
    realtime_item_cnt: number;       // 리스트 개수
    alarm_item: any[];               // 알람 데이터 항목 리스트
    alarm_item_cnt: number;          // 리스트 개수
    device_item: any[];              // 장치 데이터 항목 리스트
    device_item_cnt: number;         // 리스트 개수
    configuration_item: any[];       // 설정 데이터 항목 리스트
    configuration_item_cnt: number;  // 리스트 개수
    specification_item: any[];       // 제원 데이터 항목 리스트
    specification_item_cnt: number;  // 리스트 개수
    registration_date?: string;      // 등록일자
    device_group?: string;           // 기기 그룹    
    map_model_count: number;      // 연계 모델 수
} 