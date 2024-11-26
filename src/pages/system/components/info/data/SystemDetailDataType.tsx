import { create } from 'zustand';


interface SystemDetailDataType {    
    detailDataTypes: any;    
    storeCheck: (id: number) => void;    
    storeUnCheck: (id: number) => void;    
    storeReset: () => void;
}

// interface rtnMsg {
//     error: string;    
// }

const RACK_DETAIL_TITLE = [
    // title순서 지킬것 (배열 index로 데이터 처리)
    {
      title: 'Rack NO.',
      checked: true,
      // keyName: "name",
    },
    {
      title: 'Status',
      checked: true,
      // keyName: "status",
    },
    {
      title: 'Alarm Status',
      checked: true,
      // keyName: "status",
    },
    {
      title: 'Voltage',
      checked: true,
      // keyName: "voltage",
    },
    {
      title: 'Current',
      checked: true,
      // keyName: "current",
    },
    {
      title: 'SOC',
      checked: true,
    },
    {
      title: 'SOH',
      checked: true,
    },
    {
      title: 'Max CHG Crt',
      checked: true,
    },
    {
      title: 'Max DCHG Crt',
      checked: true,
    },
    {
      title: 'Max Cell Vol',
      checked: true,
    },
    {
      title: 'Min Cell Vol',
      checked: true,
    },
    {
      title: 'Avg Cell Vol',
      checked: true,
    },
    {
      title: 'Max Cell Temp',
      checked: true,
    },
    {
      title: 'Min Cell Temp',
      checked: true,
    },
    {
      title: 'Avg Cell Temp',
      checked: true,
    },
    {
      title: 'Balancing',
      checked: true,
    },
    {
      title: 'Fan',
      checked: true,
    },
    // 'Rack NO.',
    // 'Status',
    // 'Voltage',
    // 'Current',
    // 'SOC',
    // 'SOH',
    // 'A. Ch Current',
    // 'A. Dch Current',
    // 'Max Cell Vol',
    // 'Min Cell Vol',
    // 'Avg Cell Vol',
    // 'Max. Cell Temp',
    // 'Min. Cell Temp',
    // 'Avg. Cell Temp',
    // 'Balancing',
    // 'Fan',
  ];

const useSystemDetailDataType = create<SystemDetailDataType>((set, get) => ({
    detailDataTypes: RACK_DETAIL_TITLE,
    storeCheck: async (index: number) => {  
        let tmp = [...get().detailDataTypes];
        tmp[index].checked = true;
        set({ detailDataTypes: tmp});
    },
    storeUnCheck: async (index: number) => {    
        let tmp = [...get().detailDataTypes];
        tmp[index].checked = false;
        set({ detailDataTypes: tmp});
    },
    storeReset: async () => {      
      let tmp = get().detailDataTypes.map((item: any) => ({
          ...item,
          checked: true,
      }));      
      set({ detailDataTypes: tmp });
  },
}));

export default useSystemDetailDataType;

