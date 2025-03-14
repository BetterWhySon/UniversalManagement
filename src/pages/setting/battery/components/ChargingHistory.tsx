import React, { useState, useMemo, useRef, useEffect } from 'react';
import { TEXT_ALIGN } from '@/enums/table';
import { useTranslation } from 'react-i18next';
import TableData from '@/components/table/TableData';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import * as echarts from 'echarts';

interface ChargingHistory {
  id: number;
  사업장: string;
  그룹: string;
  기기명: string;
  어플리케이션: string;
  운영구분: string;
  일시: string;
  운영시간: string;
  SOC구간: string;
  주행거리: string;
  전력량: string;
  파워: string;
  스트레스: string;
  FROM: string;
  TO: string;
}

interface ChargingHistoryProps {
  pageSize?: number;
}

const DetailMap: React.FC = () => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('detail-map').setView([35.5383773, 129.3113596], 13);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapRef.current);

      L.marker([35.5383773, 129.3113596]).addTo(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return <div id="detail-map" className="h-full w-full rounded-lg" />;
};

const SocChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);
      const option = {
        backgroundColor: 'transparent',
        radar: {
          indicator: [
            { name: '충전 패턴 안정도', max: 100 },
            { name: '발열 재어 상', max: 100 },
            { name: '셀 밸런스 상', max: 100 },
            { name: '수명 건강도', max: 100 },
            { name: '중전 효율 지수', max: 100 },
            { name: '안전 상태', max: 100 }
          ],
          splitArea: {
            show: true,
            areaStyle: {
              color: ['rgba(0, 0, 0, 0.1)']
            }
          },
          axisLine: {
            lineStyle: {
              color: '#666'
            }
          },
          splitLine: {
            lineStyle: {
              color: '#666'
            }
          },
          name: {
            textStyle: {
              color: '#999',
              fontSize: 12
            }
          }
        },
        series: [{
          type: 'radar',
          data: [{
            value: [94, 92, 92, 84, 94, 92],
            name: '배터리 상태',
            areaStyle: {
              color: 'rgba(0, 150, 250, 0.3)'
            },
            lineStyle: {
              color: '#0096FA'
            },
            itemStyle: {
              color: '#0096FA'
            }
          }]
        }]
      };
      chart.setOption(option);

      return () => chart.dispose();
    }
  }, []);

  return <div ref={chartRef} className="h-[350px] w-full" />;
};

const ChargingHistory: React.FC<ChargingHistoryProps> = ({ pageSize = 8 }) => {
  const { t: trans } = useTranslation('translation');
  const [selectedType, setSelectedType] = useState<string>('전체');
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [selectedRow, setSelectedRow] = useState<ChargingHistory | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const dummyData: ChargingHistory[] = [
    { id: 1, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ023', 어플리케이션: '캠핑카', 운영구분: '사용', 일시: '2023-12-28 18:28', 운영시간: '2.1h', SOC구간: '45%→37%', 주행거리: '85km', 전력량: '0.5 kWh', 파워: '0.3 kW', 스트레스: '낮음', FROM: '충남 아산시', TO: '충남 아산시' },
    { id: 2, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ023', 어플리케이션: '캠핑카', 운영구분: '충전', 일시: '2023-12-27 15:39', 운영시간: '3.0h', SOC구간: '37%→85%', 주행거리: '-', 전력량: '5.8 kWh', 파워: '2.1 kW', 스트레스: '중간', FROM: '충남 아산시', TO: '충남 아산시' },
    { id: 3, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ023', 어플리케이션: '캠핑카', 운영구분: '사용', 일시: '2023-12-26 14:19', 운영시간: '4.2h', SOC구간: '94%→32%', 주행거리: '156km', 전력량: '7.3 kWh', 파워: '1.8 kW', 스트레스: '높음', FROM: '경북 포항시', TO: '경북 포항시' },
    { id: 4, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ024', 어플리케이션: '캠핑카', 운영구분: '사용', 일시: '2023-12-25 11:39', 운영시간: '2.6h', SOC구간: '32%→94%', 주행거리: '-', 전력량: '7.2 kWh', 파워: '3.0 kW', 스트레스: '중간', FROM: '경북 포항시', TO: '경북 포항시' },
    { id: 5, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ024', 어플리케이션: '캠핑카', 운영구분: '사용', 일시: '2023-12-24 15:18', 운영시간: '7.5h', SOC구간: '92%→30%', 주행거리: '245km', 전력량: '7.4 kWh', 파워: '1.1 kW', 스트레스: '높음', FROM: '울산 동구', TO: '울산 동구' },
    { id: 6, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ024', 어플리케이션: '캠핑카', 운영구분: '충전', 일시: '2023-12-23 13:45', 운영시간: '2.8h', SOC구간: '30%→90%', 주행거리: '-', 전력량: '7.1 kWh', 파워: '2.7 kW', 스트레스: '중간', FROM: '울산 동구', TO: '울산 동구' },
    { id: 7, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ024', 어플리케이션: '캠핑카', 운영구분: '사용', 일시: '2023-12-22 09:30', 운영시간: '5.3h', SOC구간: '90%→35%', 주행거리: '-', 전력량: '6.5 kWh', 파워: '1.3 kW', 스트레스: '중간', FROM: '울산 동구', TO: '울산 동구' },
    { id: 8, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ024', 어플리케이션: '캠핑카', 운영구분: '충전', 일시: '2023-12-21 16:20', 운영시간: '2.5h', SOC구간: '35%→88%', 주행거리: '-', 전력량: '6.3 kWh', 파워: '2.6 kW', 스트레스: '낮음', FROM: '울산 동구', TO: '울산 동구' },
    { id: 9, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ025', 어플리케이션: '캠핑카', 운영구분: '사용', 일시: '2023-12-20 11:15', 운영시간: '6.1h', SOC구간: '88%→28%', 주행거리: '-', 전력량: '7.1 kWh', 파워: '1.2 kW', 스트레스: '높음', FROM: '부산 해운대구', TO: '부산 해운대구' },
    { id: 10, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ025', 어플리케이션: '캠핑카', 운영구분: '충전', 일시: '2023-12-19 14:40', 운영시간: '2.9h', SOC구간: '28%→92%', 주행거리: '-', 전력량: '7.6 kWh', 파워: '2.8 kW', 스트레스: '중간', FROM: '부산 해운대구', TO: '부산 해운대구' },
    { id: 11, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ025', 어플리케이션: '캠핑카', 운영구분: '사용', 일시: '2023-12-18 08:50', 운영시간: '4.8h', SOC구간: '92%→40%', 주행거리: '-', 전력량: '6.2 kWh', 파워: '1.4 kW', 스트레스: '중간', FROM: '부산 해운대구', TO: '부산 해운대구' },
    { id: 12, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ026', 어플리케이션: '캠핑카', 운영구분: '충전', 일시: '2023-12-17 17:25', 운영시간: '2.7h', SOC구간: '40%→95%', 주행거리: '-', 전력량: '6.6 kWh', 파워: '2.5 kW', 스트레스: '낮음', FROM: '부산 해운대구', TO: '부산 해운대구' },
    { id: 13, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ026', 어플리케이션: '캠핑카', 운영구분: '사용', 일시: '2023-12-16 12:10', 운영시간: '5.7h', SOC구간: '95%→33%', 주행거리: '-', 전력량: '7.4 kWh', 파워: '1.4 kW', 스트레스: '높음', FROM: '경남 창원시', TO: '경남 창원시' },
    { id: 14, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ026', 어플리케이션: '캠핑카', 운영구분: '충전', 일시: '2023-12-15 15:35', 운영시간: '2.4h', SOC구간: '33%→89%', 주행거리: '-', 전력량: '6.7 kWh', 파워: '2.9 kW', 스트레스: '중간', FROM: '경남 창원시', TO: '경남 창원시' },
    { id: 15, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ027', 어플리케이션: '캠핑카', 운영구분: '사용', 일시: '2023-12-14 10:45', 운영시간: '6.3h', SOC구간: '89%→31%', 주행거리: '-', 전력량: '6.9 kWh', 파워: '1.2 kW', 스트레스: '중간', FROM: '경남 창원시', TO: '경남 창원시' },
    { id: 16, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ027', 어플리케이션: '캠핑카', 운영구분: '충전', 일시: '2023-12-13 16:55', 운영시간: '2.6h', SOC구간: '31%→93%', 주행거리: '-', 전력량: '7.4 kWh', 파워: '3.0 kW', 스트레스: '낮음', FROM: '경남 창원시', TO: '경남 창원시' },
    { id: 17, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ027', 어플리케이션: '캠핑카', 운영구분: '사용', 일시: '2023-12-12 11:20', 운영시간: '5.9h', SOC구간: '93%→36%', 주행거리: '-', 전력량: '6.8 kWh', 파워: '1.2 kW', 스트레스: '높음', FROM: '경남 김해시', TO: '경남 김해시' },
    { id: 18, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ028', 어플리케이션: '캠핑카', 운영구분: '충전', 일시: '2023-12-11 14:30', 운영시간: '2.8h', SOC구간: '36%→91%', 주행거리: '-', 전력량: '6.6 kWh', 파워: '2.4 kW', 스트레스: '중간', FROM: '경남 김해시', TO: '경남 김해시' },
    { id: 19, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ028', 어플리케이션: '캠핑카', 운영구분: '사용', 일시: '2023-12-10 09:15', 운영시간: '5.5h', SOC구간: '91%→34%', 주행거리: '-', 전력량: '6.8 kWh', 파워: '1.3 kW', 스트레스: '중간', FROM: '경남 김해시', TO: '경남 김해시' },
    { id: 20, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ028', 어플리케이션: '캠핑카', 운영구분: '충전', 일시: '2023-12-09 15:45', 운영시간: '2.7h', SOC구간: '34%→90%', 주행거리: '-', 전력량: '6.7 kWh', 파워: '2.6 kW', 스트레스: '낮음', FROM: '경남 김해시', TO: '경남 김해시' },
    { id: 21, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ029', 어플리케이션: '캠핑카', 운영구분: '사용', 일시: '2023-12-08 10:30', 운영시간: '6.2h', SOC구간: '90%→32%', 주행거리: '-', 전력량: '6.9 kWh', 파워: '1.2 kW', 스트레스: '높음', FROM: '경남 양산시', TO: '경남 양산시' },
    { id: 22, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ029', 어플리케이션: '캠핑카', 운영구분: '충전', 일시: '2023-12-07 16:40', 운영시간: '2.5h', SOC구간: '32%→88%', 주행거리: '-', 전력량: '6.7 kWh', 파워: '2.68 kW', 스트레스: '중간', FROM: '경남 양산시', TO: '경남 양산시' },
    { id: 23, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ029', 어플리케이션: '캠핑카', 운영구분: '사용', 일시: '2023-12-06 11:25', 운영시간: '5.8h', SOC구간: '88%→35%', 주행거리: '-', 전력량: '6.3 kWh', 파워: '1.09 kW', 스트레스: '중간', FROM: '경남 양산시', TO: '경남 양산시' },
    { id: 24, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ030', 어플리케이션: '캠핑카', 운영구분: '충전', 일시: '2023-12-05 14:50', 운영시간: '2.6h', SOC구간: '35%→92%', 주행거리: '-', 전력량: '6.8 kWh', 파워: '2.62 kW', 스트레스: '낮음', FROM: '경남 양산시', TO: '경남 양산시' },
    { id: 25, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ030', 어플리케이션: '캠핑카', 운영구분: '사용', 일시: '2023-12-04 09:35', 운영시간: '5.6h', SOC구간: '92%→37%', 주행거리: '-', 전력량: '6.6 kWh', 파워: '1.18 kW', 스트레스: '높음', FROM: '경북 경주시', TO: '경북 경주시' },
    { id: 26, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ030', 어플리케이션: '캠핑카', 운영구분: '충전', 일시: '2023-12-03 15:20', 운영시간: '2.7h', SOC구간: '37%→89%', 주행거리: '-', 전력량: '6.2 kWh', 파워: '2.30 kW', 스트레스: '중간', FROM: '경북 경주시', TO: '경북 경주시' },
    { id: 27, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ031', 어플리케이션: '캠핑카', 운영구분: '사용', 일시: '2023-12-02 10:15', 운영시간: '6.0h', SOC구간: '89%→33%', 주행거리: '-', 전력량: '6.7 kWh', 파워: '1.12 kW', 스트레스: '중간', FROM: '경북 경주시', TO: '경북 경주시' },
    { id: 28, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ031', 어플리케이션: '캠핑카', 운영구분: '충전', 일시: '2023-12-01 16:45', 운영시간: '2.8h', SOC구간: '33%→90%', 주행거리: '-', 전력량: '6.8 kWh', 파워: '2.43 kW', 스트레스: '낮음', FROM: '경북 경주시', TO: '경북 경주시' },
    { id: 29, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ031', 어플리케이션: '캠핑카', 운영구분: '사용', 일시: '2023-11-30 11:30', 운영시간: '5.7h', SOC구간: '90%→36%', 주행거리: '-', 전력량: '6.4 kWh', 파워: '1.12 kW', 스트레스: '높음', FROM: '경북 포항시', TO: '경북 포항시' },
    { id: 30, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ032', 어플리케이션: '캠핑카', 운영구분: '충전', 일시: '2023-11-29 14:55', 운영시간: '2.6h', SOC구간: '36%→91%', 주행거리: '-', 전력량: '6.6 kWh', 파워: '2.54 kW', 스트레스: '중간', FROM: '경북 포항시', TO: '경북 포항시' },
    { id: 31, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ032', 어플리케이션: '캠핑카', 운영구분: '사용', 일시: '2023-11-28 09:40', 운영시간: '5.9h', SOC구간: '91%→34%', 주행거리: '-', 전력량: '6.8 kWh', 파워: '1.15 kW', 스트레스: '중간', FROM: '경북 포항시', TO: '경북 포항시' },
    { id: 32, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ032', 어플리케이션: '캠핑카', 운영구분: '충전', 일시: '2023-11-27 15:35', 운영시간: '2.7h', SOC구간: '34%→89%', 주행거리: '-', 전력량: '6.6 kWh', 파워: '2.44 kW', 스트레스: '낮음', FROM: '경북 포항시', TO: '경북 포항시' },
    { id: 33, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ033', 어플리케이션: '캠핑카', 운영구분: '사용', 일시: '2023-11-26 10:20', 운영시간: '6.1h', SOC구간: '89%→35%', 주행거리: '-', 전력량: '6.4 kWh', 파워: '1.05 kW', 스트레스: '높음', FROM: '경북 포항시', TO: '경북 포항시' }
  ];

  const columns = useMemo(() => [
    {
      name: '사업장',
      dataIndex: '사업장',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px',
      render: (row: ChargingHistory, dataIndex: string) => (
        <span className={row.운영구분 === '사용' ? 'text-sky-300' : 'text-green-300'}>
          {row[dataIndex as keyof ChargingHistory]}
        </span>
      )
    },
    {
      name: '그룹',
      dataIndex: '그룹',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px',
      render: (row: ChargingHistory, dataIndex: string) => (
        <span className={row.운영구분 === '사용' ? 'text-sky-300' : 'text-green-300'}>
          {row[dataIndex as keyof ChargingHistory]}
        </span>
      )
    },
    {
      name: '기기명',
      dataIndex: '기기명',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px',
      render: (row: ChargingHistory, dataIndex: string) => (
        <span className={row.운영구분 === '사용' ? 'text-sky-300' : 'text-green-300'}>
          {row[dataIndex as keyof ChargingHistory]}
        </span>
      )
    },
    {
      name: '어플리케이션',
      dataIndex: '어플리케이션',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px',
      render: (row: ChargingHistory, dataIndex: string) => (
        <span className={row.운영구분 === '사용' ? 'text-sky-300' : 'text-green-300'}>
          {row[dataIndex as keyof ChargingHistory]}
        </span>
      )
    },
    {
      name: '운영구분',
      dataIndex: '운영구분',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px',
      render: (row: ChargingHistory, dataIndex: string) => (
        <span className={row.운영구분 === '사용' ? 'text-sky-300' : 'text-green-300'}>
          {row[dataIndex as keyof ChargingHistory]}
        </span>
      )
    },
    {
      name: '일시',
      dataIndex: '일시',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '150px',
      render: (row: ChargingHistory, dataIndex: string) => (
        <span className={row.운영구분 === '사용' ? 'text-sky-300' : 'text-green-300'}>
          {row[dataIndex as keyof ChargingHistory]}
        </span>
      )
    },
    {
      name: '운영시간',
      dataIndex: '운영시간',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px',
      render: (row: ChargingHistory, dataIndex: string) => (
        <span className={row.운영구분 === '사용' ? 'text-sky-300' : 'text-green-300'}>
          {row[dataIndex as keyof ChargingHistory]}
        </span>
      )
    },
    {
      name: 'SOC 구간',
      dataIndex: 'SOC구간',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px',
      render: (row: ChargingHistory, dataIndex: string) => (
        <span className={row.운영구분 === '사용' ? 'text-sky-300' : 'text-green-300'}>
          {row[dataIndex as keyof ChargingHistory]}
        </span>
      )
    },
    {
      name: '주행거리',
      dataIndex: '주행거리',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px',
      render: (row: ChargingHistory, dataIndex: string) => (
        <span className={row.운영구분 === '사용' ? 'text-sky-300' : 'text-green-300'}>
          {row[dataIndex as keyof ChargingHistory]}
        </span>
      )
    },
    {
      name: '전력량',
      dataIndex: '전력량',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px',
      render: (row: ChargingHistory, dataIndex: string) => (
        <span className={row.운영구분 === '사용' ? 'text-sky-300' : 'text-green-300'}>
          {row[dataIndex as keyof ChargingHistory]}
        </span>
      )
    },
    {
      name: '파워',
      dataIndex: '파워',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px',
      render: (row: ChargingHistory, dataIndex: string) => (
        <span className={row.운영구분 === '사용' ? 'text-sky-300' : 'text-green-300'}>
          {row[dataIndex as keyof ChargingHistory]}
        </span>
      )
    },
    {
      name: '스트레스',
      dataIndex: '스트레스',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px',
      render: (row: ChargingHistory, dataIndex: string) => (
        <span className={row.운영구분 === '사용' ? 'text-sky-300' : 'text-green-300'}>
          {row[dataIndex as keyof ChargingHistory]}
        </span>
      )
    },
    {
      name: 'FROM',
      dataIndex: 'FROM',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '150px',
      render: (row: ChargingHistory, dataIndex: string) => (
        <span className={row.운영구분 === '사용' ? 'text-sky-300' : 'text-green-300'}>
          {row[dataIndex as keyof ChargingHistory]}
        </span>
      )
    },
    {
      name: 'TO',
      dataIndex: 'TO',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '150px',
      render: (row: ChargingHistory, dataIndex: string) => (
        <span className={row.운영구분 === '사용' ? 'text-sky-300' : 'text-green-300'}>
          {row[dataIndex as keyof ChargingHistory]}
        </span>
      )
    }
  ], []);

  const getFilteredData = useMemo(() => {
    switch (selectedType) {
      case '사용이력':
        return dummyData.filter(item => item.운영구분 === '사용');
      case '충전이력':
        return dummyData.filter(item => item.운영구분 === '충전');
      default:
        return dummyData;
    }
  }, [selectedType, dummyData]);

  return (
    <div className="flex flex-col">
      <div className="bg-hw-dark-2 py-1 px-2 rounded-lg text-hw-white-1 mb-0.5">
        <div className="flex flex-row items-center gap-2">
          <div className="flex flex-wrap space-x-2 items-center">
            <div className="flex items-center space-x-1">
              <input 
                type="radio" 
                id="all" 
                name="type" 
                checked={selectedType === '전체'} 
                onChange={() => setSelectedType('전체')} 
              />
              <label htmlFor="all">전체</label>
            </div>
            <div className="flex items-center space-x-2">
              <input 
                type="radio" 
                id="use" 
                name="type" 
                checked={selectedType === '사용이력'} 
                onChange={() => setSelectedType('사용이력')} 
              />
              <label htmlFor="use">사용이력</label>
            </div>
            <div className="flex items-center space-x-2">
              <input 
                type="radio" 
                id="charge" 
                name="type" 
                checked={selectedType === '충전이력'} 
                onChange={() => setSelectedType('충전이력')} 
              />
              <label htmlFor="charge">충전이력</label>
            </div>
          </div>

          <div className="flex gap-1 items-center ml-4">
            <select className="bg-hw-dark-3 text-hw-white-1 py-0.5 px-2 rounded border-none outline-none min-w-[80px] h-6 text-center">
              <option value="day">일</option>
              <option value="week">주</option>
              <option value="month">월</option>
              <option value="year">년</option>
            </select>
            <div 
              className="bg-hw-dark-3 text-hw-white-1 px-2 rounded h-full min-w-[140px] flex items-center cursor-pointer"
              onClick={(e) => {
                const input = e.currentTarget.querySelector('input');
                if (input) input.showPicker();
              }}
            >
              <input 
                type="date" 
                className="bg-transparent border-none outline-none w-full cursor-pointer text-center"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
            <span className="text-hw-white-1">~</span>
            <div 
              className="bg-hw-dark-3 text-hw-white-1 px-2 rounded h-full min-w-[140px] flex items-center cursor-pointer"
              onClick={(e) => {
                const input = e.currentTarget.querySelector('input');
                if (input) input.showPicker();
              }}
            >
              <input 
                type="date" 
                className="bg-transparent border-none outline-none w-full cursor-pointer text-center"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
          </div>

          <button className="px-2 py-0.5 rounded bg-hw-orange-1 text-white h-6">
            조회
          </button>
        </div>
      </div>

      <div className="flex-1">
        <TableData<ChargingHistory>
          data={getFilteredData}
          columns={columns}
          isPagination
          pagination={{
            total: getFilteredData.length,
            pageSize: pageSize,
          }}
          paginationMarginTop="4px"
          emptyMessage={trans('데이터가 없습니다.')}
          onClick={(row) => {
            setSelectedRow(row);
            setShowPopup(true);
          }}
        />
      </div>

      {showPopup && selectedRow && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowPopup(false)}
        >
          <div 
            className="bg-hw-dark-1 rounded-lg p-6 w-[1200px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between mb-4">
              <div className="flex w-full">
                <div className="flex items-center gap-3 w-[calc(33%-1rem)]">
                  <span className="text-gray-500 text-2xl">•</span>
                  <h3 className="text-white text-[19px] mb-3">위치정보</h3>
                </div>
                <div className="flex items-center gap-3 w-[calc(33%-1rem)]">
                  <span className="text-gray-500 text-2xl">•</span>
                  <h3 className="text-white text-[19px] mb-3">데이터</h3>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-500 text-2xl">•</span>
                  <h3 className="text-white text-[19px] mb-2">배터리 진단</h3>
                </div>
              </div>
            </div>
            <div className="flex gap-8">
              <div className="w-1/3 h-[400px]">
                <DetailMap />
              </div>
              {selectedRow.운영구분 === '사용' ? (
                <div className="w-1/4 h-[400px] bg-hw-dark-2 rounded-lg p-4">
                  <div className="space-y-2">
                    <div>
                      <h4 className="text-gray-400 text-xs mb-0.5">방전타입</h4>
                      <p className="text-white text-sm">스트레스</p>
                    </div>
                    <div>
                      <h4 className="text-gray-400 text-xs mb-0.5">고속/저속 반전</h4>
                      <p className="text-white text-sm">82점 (좋음)</p>
                    </div>
                    <div>
                      <h4 className="text-gray-400 text-xs mb-0.5">SOC구간</h4>
                      <p className="text-white text-sm">72% - 48% (24%)</p>
                    </div>
                    <div>
                      <h4 className="text-gray-400 text-xs mb-0.5">방전시간</h4>
                      <p className="text-white text-sm">19분</p>
                    </div>
                    <div>
                      <h4 className="text-gray-400 text-xs mb-0.5">주행거리</h4>
                      <p className="text-white text-sm">30.1km</p>
                    </div>
                    <div>
                      <h4 className="text-gray-400 text-xs mb-0.5">연비</h4>
                      <p className="text-white text-sm">6.54km/kWh</p>
                    </div>
                    <div>
                      <h4 className="text-gray-400 text-xs mb-0.5">최고속도</h4>
                      <p className="text-white text-sm">102km/h</p>
                    </div>
                    <div>
                      <h4 className="text-gray-400 text-xs mb-0.5">평균속도</h4>
                      <p className="text-white text-sm">95km/h</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-1/4 h-[400px] bg-hw-dark-2 rounded-lg p-4">
                  <div className="space-y-2">
                    <div>
                      <h4 className="text-gray-400 text-xs mb-0.5">충전타입</h4>
                      <p className="text-white text-sm">스트레스</p>
                    </div>
                    <div>
                      <h4 className="text-gray-400 text-xs mb-0.5">SOC구간</h4>
                      <p className="text-white text-sm">48% → 72% (24%)</p>
                    </div>
                    <div>
                      <h4 className="text-gray-400 text-xs mb-0.5">충전전력량</h4>
                      <p className="text-white text-sm">2.7kWh</p>
                    </div>
                    <div>
                      <h4 className="text-gray-400 text-xs mb-0.5">평균 파워</h4>
                      <p className="text-white text-sm">4.2 kW</p>
                    </div>
                    <div>
                      <h4 className="text-gray-400 text-xs mb-0.5">충전소요시간</h4>
                      <p className="text-white text-sm">39분</p>
                    </div>
                    <div>
                      <h4 className="text-gray-400 text-xs mb-0.5">충전후 대기시간</h4>
                      <p className="text-white text-sm">118분</p>
                    </div>
                  </div>
                </div>
              )}
              <div className="w-[calc(42%-1rem)] h-[400px]">
                <SocChart />
                <p className="text-center text-sm text-gray-400 mt-2">전반적으로 안정적인 충전 상태입니다. 특히 안전상태(94점)와 셀 밸런스(92점)가 우수합니다. 다만 수명건강도(84점)에 주의가 필요합니다.</p>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button 
                onClick={() => setShowPopup(false)} 
                className="px-4 py-2 bg-hw-orange-1 text-white rounded hover:bg-hw-orange-1/80"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChargingHistory; 