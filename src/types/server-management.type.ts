export type admServerManagement = {
  id: number;
  server: string, // ( 'local' or 'cloud' or 'backup'),
  restore_status: boolean,
  cpu_usage: number,
  memory_usage: number,
  check_cpu_memory: string,
  check_service: string,
  network_status: string
};

