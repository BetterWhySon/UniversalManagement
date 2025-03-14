export interface typeAdmBatteryMapModelList {
    id: number;                                   // 배터리 모델 ID
    name: string;                                // 배터리 모델명
    referred_manufacturer: number;               // 회사 ID
    referred_manufacturer_name: string;          // 회사 이름
    referred_model_object: number;              // 모델 object ID
    referred_model_object_name: string;         // 모델 object 이름
    referred_model_data_config: number;         // 모델 Data Config ID
    referred_model_data_config_name: string;    // 모델 Data Config 이름
    referred_model_custom: number;              // 모델 Custom ID
    referred_model_custom_name: string;         // 모델 Custom 이름
    object_count: number;                       // 소속 배터리 수
    registration_date?: string;                 // 등록일자
} 