export interface typeCstGroup {
    group_id: number;                     // 그룹 리스트 요청에 의해 내려간 데이터에 포함된 'id'
    action: 'create' | 'modify' | 'delete';  // 'create', 'modify', 'delete' 중 하나
    group_name: string;
    code: string;
    zipno: string;
    address_main: string;
    address_sub: string;
    description: string;
    site_id: number;
    site_name: string;
} 