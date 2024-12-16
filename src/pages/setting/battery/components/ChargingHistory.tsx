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
  방전충전: string;
  일시: string;
  시간: string;
  SOC구간: string;
  방전에너지: string;
  시간당에너지: string;
  방전파워: string;
  배터리스트레스: string;
  FROM: string;
  TO: string;
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
        grid: {
          left: '5%',
          right: '5%',
          top: '5%',
          bottom: '15%'
        },
        xAxis: {
          type: 'category',
          data: ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10', 'H11', 'H12'],
          axisLine: {
            lineStyle: { color: '#666' }
          },
          axisLabel: { color: '#999' }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: { color: '#666' }
          },
          axisLabel: { color: '#999' },
          splitLine: {
            lineStyle: { color: '#333' }
          }
        },
        series: [{
          data: [45, 44, 43, 40, 40, 40, 40, 39, 39, 38, 38, 37],
          type: 'line',
          smooth: true,
          lineStyle: {
            color: '#98FB98'  // 연한 녹색
          },
          itemStyle: {
            color: '#98FB98'
          }
        }]
      };
      chart.setOption(option);

      return () => chart.dispose();
    }
  }, []);

  return <div ref={chartRef} className="h-[350px] w-full" />;
};

const ChargingHistory: React.FC = () => {
  const { t: trans } = useTranslation('translation');
  const [selectedType, setSelectedType] = useState<string>('전체');
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [selectedRow, setSelectedRow] = useState<ChargingHistory | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const dummyData: ChargingHistory[] = [
    { id: 1, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ023', 방전충전: '방전', 일시: '2023-12-28 18:28', 시간: '2.1h', SOC구간: '45%→37%', 방전에너지: '0.5 kWh', 시간당에너지: '0.24 kWh/h', 방전파워: '0.3 kW', 배터리스트레스: '낮음', FROM: '충남 아산시', TO: '충남 아산시' },
    { id: 2, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ023', 방전충전: '충전', 일시: '2023-12-27 15:39', 시간: '3.0h', SOC구간: '37%→85%', 방전에너지: '5.8 kWh', 시간당에너지: '1.93 kWh/h', 방전파워: '2.1 kW', 배터리스트레스: '중간', FROM: '충남 아산시', TO: '충남 아산시' },
    { id: 3, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ023', 방전충전: '방전', 일시: '2023-12-26 14:19', 시간: '4.2h', SOC구간: '94%→32%', 방전에너지: '7.3 kWh', 시간당에너지: '1.74 kWh/h', 방전파워: '1.8 kW', 배터리스트레스: '높음', FROM: '경북 포항시', TO: '경북 포항시' },
    { id: 4, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ023', 방전충전: '충전', 일시: '2023-12-25 11:39', 시간: '2.6h', SOC구간: '32%→94%', 방전에너지: '7.2 kWh', 시간당에너지: '2.77 kWh/h', 방전파워: '3.0 kW', 배터리스트레스: '중간', FROM: '경북 포항시', TO: '경북 포항시' },
    { id: 5, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ023', 방전충전: '방전', 일시: '2023-12-24 15:18', 시간: '7.5h', SOC구간: '92%→30%', 방전에너지: '7.4 kWh', 시간당에너지: '0.99 kWh/h', 방전파워: '1.1 kW', 배터리스트레스: '높음', FROM: '울산 동구', TO: '울산 동구' },
    // ... 6-28번은 비슷한 패턴으로 계속됨
    { id: 29, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ023', 방전충전: '방전', 일시: '2023-11-30 15:16', 시간: '4.2h', SOC구간: '53%→23%', 방전에너지: '3.6 kWh', 시간당에너지: '0.86 kWh/h', 방전파워: '0.9 kW', 배터리스트레스: '중간', FROM: '경북 청도군', TO: '경북 청도군' },
    { id: 30, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ023', 방전충전: '충전', 일시: '2023-11-29 12:39', 시간: '3.2h', SOC구간: '82%→48%', 방전에너지: '3.9 kWh', 시간당에너지: '1.22 kWh/h', 방전파워: '1.3 kW', 배터리스트레스: '낮음', FROM: '경북 청도군', TO: '경북 청도군' },
    { id: 31, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ023', 방전충전: '방전', 일시: '2023-11-28 09:45', 시간: '5.1h', SOC구간: '95%→45%', 방전에너지: '6.0 kWh', 시간당에너지: '1.18 kWh/h', 방전파워: '1.2 kW', 배터리스트레스: '중간', FROM: '부산 기장군', TO: '부산 기장군' },
    { id: 32, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ023', 방전충전: '충전', 일시: '2023-11-27 14:20', 시간: '2.8h', SOC구간: '45%→95%', 방전에너지: '6.0 kWh', 시간당에너지: '2.14 kWh/h', 방전파워: '2.3 kW', 배터리스트레스: '낮음', FROM: '부산 기장군', TO: '부산 기장군' },
    { id: 33, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ023', 방전충전: '방전', 일시: '2023-11-26 10:30', 시간: '6.3h', SOC구간: '90%→35%', 방전에너지: '6.5 kWh', 시간당에너지: '1.03 kWh/h', 방전파워: '1.1 kW', 배터리스트레스: '중간', FROM: '부산 해운대구', TO: '부산 해운대구' }
  ];

  const columns = useMemo(() => [
    {
      name: '사업장',
      dataIndex: '사업장',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px',
      render: (row: ChargingHistory, dataIndex: string) => (
        <span className={row.방전충전 === '방전' ? 'text-sky-300' : 'text-green-300'}>
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
        <span className={row.방전충전 === '방전' ? 'text-sky-300' : 'text-green-300'}>
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
        <span className={row.방전충전 === '방전' ? 'text-sky-300' : 'text-green-300'}>
          {row[dataIndex as keyof ChargingHistory]}
        </span>
      )
    },
    {
      name: '방전/충전',
      dataIndex: '방전충전',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px',
      render: (row: ChargingHistory, dataIndex: string) => (
        <span className={row.방전충전 === '방전' ? 'text-sky-300' : 'text-green-300'}>
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
        <span className={row.방전충전 === '방전' ? 'text-sky-300' : 'text-green-300'}>
          {row[dataIndex as keyof ChargingHistory]}
        </span>
      )
    },
    {
      name: '방전(충전)시간',
      dataIndex: '시간',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px',
      render: (row: ChargingHistory, dataIndex: string) => (
        <span className={row.방전충전 === '방전' ? 'text-sky-300' : 'text-green-300'}>
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
        <span className={row.방전충전 === '방전' ? 'text-sky-300' : 'text-green-300'}>
          {row[dataIndex as keyof ChargingHistory]}
        </span>
      )
    },
    {
      name: '방전(충전) 에너지',
      dataIndex: '방전에너지',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '130px',
      render: (row: ChargingHistory, dataIndex: string) => (
        <span className={row.방전충전 === '방전' ? 'text-sky-300' : 'text-green-300'}>
          {row[dataIndex as keyof ChargingHistory]}
        </span>
      )
    },
    {
      name: '시간당 에너지',
      dataIndex: '시간당에너지',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px',
      render: (row: ChargingHistory, dataIndex: string) => (
        <span className={row.방전충전 === '방전' ? 'text-sky-300' : 'text-green-300'}>
          {row[dataIndex as keyof ChargingHistory]}
        </span>
      )
    },
    {
      name: '방전(충) 파워',
      dataIndex: '방전파워',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px',
      render: (row: ChargingHistory, dataIndex: string) => (
        <span className={row.방전충전 === '방전' ? 'text-sky-300' : 'text-green-300'}>
          {row[dataIndex as keyof ChargingHistory]}
        </span>
      )
    },
    {
      name: '배터리 스트레스',
      dataIndex: '배터리스트레스',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px',
      render: (row: ChargingHistory, dataIndex: string) => (
        <span className={row.방전충전 === '방전' ? 'text-sky-300' : 'text-green-300'}>
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
        <span className={row.방전충전 === '방전' ? 'text-sky-300' : 'text-green-300'}>
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
        <span className={row.방전충전 === '방전' ? 'text-sky-300' : 'text-green-300'}>
          {row[dataIndex as keyof ChargingHistory]}
        </span>
      )
    }
  ], []);

  const getFilteredData = useMemo(() => {
    switch (selectedType) {
      case '방전이력':
        return dummyData.filter(item => item.방전충전 === '방전');
      case '충전이력':
        return dummyData.filter(item => item.방전충전 === '충전');
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
                id="discharge" 
                name="type" 
                checked={selectedType === '방전이력'} 
                onChange={() => setSelectedType('방전이력')} 
              />
              <label htmlFor="discharge">방전이력</label>
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

          <div className="flex gap-1 items-center">
            <select className="bg-hw-dark-3 text-hw-white-1 py-0.5 px-2 rounded border-none outline-none min-w-[80px] h-6">
              <option value="">당월</option>
            </select>
            <input 
              type="text" 
              className="bg-hw-dark-3 text-hw-white-1 py-0.5 px-2 rounded border-none outline-none w-[80px] h-6"
              placeholder="From"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
            <input 
              type="text" 
              className="bg-hw-dark-3 text-hw-white-1 py-0.5 px-2 rounded border-none outline-none w-[80px] h-6"
              placeholder="To"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
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
            pageSize: 8,
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
            className="bg-hw-dark-1 rounded-lg p-6 w-[1000px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between mb-4">
              <div className="flex w-full">
                <div className="flex items-center gap-3 w-[calc(50%-1rem)]">
                  <span className="text-gray-500 text-2xl">•</span>
                  <h2 className="text-xl text-white">위치정보</h2>
                </div>
                <div className="flex items-center gap-3 pl-8">
                  <span className="text-gray-500 text-2xl">•</span>
                  <h2 className="text-xl text-white">시간대 별 Soc [%]</h2>
                </div>
              </div>
            </div>
            <div className="flex gap-8">
              <div className="w-1/2 h-[350px]">
                <DetailMap />
              </div>
              <div className="w-1/2 h-[350px]">
                <SocChart />
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