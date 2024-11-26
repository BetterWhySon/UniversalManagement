export type ChartData = {
  title: string;
  total: string;
  unit: string;
  pieData: {
    name: string;
    value: number;
  }[];
};

export type TimeChartData = {
  title: string;
  total: number;
  pieData: {
    name: string;
    value: number;
  }[];
};
