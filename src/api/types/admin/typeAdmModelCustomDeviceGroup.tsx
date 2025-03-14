interface DeviceInfo {
    id: number;      // 커스텀 디바이스 ID
    name: string;    // 커스텀 디바이스 이름
}

export interface typeAdmModelCustomDeviceGroupList {
    id: number;                           // 선택한 항목의 id
    referred_manufacturer: number;        // 선택한 업체의 id
    referred_manufacturer_name: string;   // 선택한 업체명
    name: string;                         // 그룹명
    device_list: number[];               // 선택한 커스텀 디바이스 id 리스트
    device_info: DeviceInfo[];           // 선택한 커스텀 디바이스 상세 정보
    description: string;                  // 설명
    model_custom_count: number;          // 소속 지정데이터 수
    registration_date?: string;           // 등록일자
} 