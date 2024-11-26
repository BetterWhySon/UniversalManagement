export const enum PeriodType_StatisticsTab {
    BASIC = 0,
    HOUR = 1,
    WEEK = 2,
}

export const enum PeriodType_StatisticsDataFilter {
    DAILY = 0,
    WEEKLY = 1,
    MONTHLY = 2,
    ACC = 3,
}
export const enum PeriodType_StatisticsDataFilterBasic {
    SOCCHANGE = 0,
    TEMPCHANGE = 1,
    STRESSCHANGE = 2,
}

export type StatisticsData = {
    timestamp: string[],
    last_soc: number[],         // 변화
    avg_temp: number[],         // 변화
    avg_stress: number[],       // 변화
    chg_power_rate: number[],   // 파워사용률
    dchg_power_rate: number[],  // 파워사용률
    chg_time: number,
    dchg_time: number,
    rest_time: number,
    chg_power: number,
    dchg_power: number,

    chg_energy: number[],
    dchg_energy: number[],
    chg_stress: number[],
    dchg_stress: number[] 
  };


  export type StatisticsData2 = {    
    chg_time: number[],
    dchg_time: number[],    
    chg_power: number[],
    dchg_power: number[],
    chg_energy: number[],
    dchg_energy: number[],
    chg_stress: number[],
    dchg_stress: number[] 
  };

 