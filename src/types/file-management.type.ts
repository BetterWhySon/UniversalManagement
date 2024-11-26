export type fileManagement_group = {
  id: number;
  group_name: string;
  created_at: string;
  // update_at: string;  
};

export type fileManagement_file = {
  id: number;
  file_name: string;
  group_id: number;
  group_name: string;
  created_at: string;
  // update_at: string;  
};

export type fileManagement_version = {
  id: number;
  version_name: string;
  file_id: number;
  file_name: string;
  group_id: number;
  group_name: string;
  user_id: number;
  user_name: string;
  created_at: string;
  save_file_name: string;
  // update_at: string;  
};