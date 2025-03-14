export interface typeAdmModelCustomDeviceControlList {
    id: number;                           // 선택한 항목의 id
    referred_manufacturer: number;        // 선택한 업체의 id
    referred_manufacturer_name: string;   // 선택한 업체명
    name: string;                         // 데이터명
    device_type: number;                  // 장치 타입 (0: 상태, 1: 상태&제어, 2: 제어)
    state_type: number;                   // 상태 타입 (0: INT, 1: FLOAT, 2: BOOLEAN)
    control_type: number;                 // 제어 타입 (0: INT, 1: FLOAT, 2: BOOLEAN)
    control_id: number;                   // 제어 ID
    icon_id: number;                      // 아이콘 ID
    group_custom_device_count: number;    // 연계 기기 그룹 수
    registration_date?: string;           // 등록일자
} 