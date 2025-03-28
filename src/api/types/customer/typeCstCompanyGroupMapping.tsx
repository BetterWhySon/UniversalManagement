export interface typeCstGroup {
    'pack_manager_id': number;
    'site_id': number; 
    'code': string; 
    'site_name': string;
    'address_main': string;
    'description': string;
    'groups': Array<{
        'group_id': number;
        'code': string;
        'group_name': string;
        'address_main': string;
        'description': string;
    }>;
} 

export interface typeCstUnassignedGroup {
    'group_id': number;
    'code': string;
    'group_name': string;
    'address_main': string;
    'address_sub': string;
    'description': string;
}

