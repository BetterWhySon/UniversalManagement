import { Play } from '@/components/icons';
import { CARD_TYPE } from '@/constants/dashboard.constant';

export type CardData = {
    name: String;
    name_foreign: String;
    id: number;
    title: {
      line1: String;
      line2: String;
      line3: String;
      line1_foreign: String;
      line2_foreign: String;
      line3_foreign: String;
      line3_id: number;
    };
    trans: number;
    battery: {
      typeNum: number;
      icon: String; // <Play />
    };
    percentage: number;
    parameters: {
        id: number;
        label: String;
        value: number;
    }[];
    type: number;
    action: {
      icon: String; // <Check />
      label: String;
    };
    status:{
      id: number;
      item: string;
    };
    alarms: {    
      level: number;
      alarm_id: string;
      alarm_item: string;
      rack_num: number;
      start_time: number;    
    }[];
    rackAlarms: {    
      level: number;
      alarm_id: string;
      alarm_item: string;
      rack_num: number;
      start_time: number;    
    }[];
  };

