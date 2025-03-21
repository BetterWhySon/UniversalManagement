import React from 'react';

interface DataItem {
  label: string;
  value: number | string;
}

const RealTimeData: React.FC = () => {
  const timestamp = "25.01.17 15:27:33";

  const mainData: DataItem[][] = [
    [
      { label: '셀 전압 (최대)', value: 10 },
      { label: '셀 전압 (평균)', value: 10 },
      { label: '셀 전압 (최소)', value: 10 },
      { label: '전류', value: 10 },
      { label: '셀(모듈) 온도 (최대)', value: 30 },
      { label: '셀(모듈) 온도 (평균)', value: 30 },
      { label: '셀(모듈) 온도 (최소)', value: 30 },
      { label: '시스템 온도 (최대)', value: 30 },
      { label: '시스템 온도 (평균)', value: 50 },
      { label: '시스템 온도 (최소)', value: 60 },
    ],
    [
      { label: 'soc Bms 잔량', value: 10 },
      { label: 'soc 전류 적산치', value: 10 },
      { label: '충전 전류 적산량', value: 10 },
      { label: '사용 전류 적산량', value: 10 },
      { label: '팩 전압', value: 30 },
      { label: '배터리 수명(SOH)', value: 30 },
      { label: '전류 절대값 적산치', value: 30 },
    ],
    [
      { label: '누적주행거리', value: 10 },
      { label: '시동 상태', value: 10 },
      { label: '액셀 페달위치', value: 10 },
      { label: '보조배터리전압', value: 10 },
      { label: '브레이크 상태', value: 30 },
      { label: '연료 잔량', value: 30 },
      { label: '충전기 상태', value: 30 },
      { label: '계기판 잔량', value: 30 },
      { label: '대기온도', value: 50 },
      { label: '현 기어 위치', value: 60 },
    ],
    [
      { label: 'lon GPS 위도', value: 10 },
      { label: 'lat GPS 경도', value: 10 },
      { label: '속도', value: 10 },
    ],
  ];

  const customData: { label: string; value: number }[] = Array.from({ length: 40 }, (_, i) => ({
    label: 'Custom1',
    value: 39
  }));

  const DataRow = ({ item }: { item: DataItem }) => (
    <div className="flex items-center">
      <div className="px-2 py-1 rounded w-[220px]">
        <span className="text-white text-base">{item.label}</span>
      </div>
      <div className="bg-[#1e1e1e] px-3 py-1 rounded w-[80px] text-right ml-2">
        <span className="text-white text-base">{item.value}</span>
      </div>
    </div>
  );

  return (
    <div className="pb-8">
      <div className="bg-hw-dark-2 rounded-lg p-5 mb-5">
        <div className="flex justify-between items-center mb-4">
          <div className="text-white text-xl">배터리 상태정보 : 사용중</div>
          <div className="text-white text-lg">timestamp : {timestamp}</div>
        </div>
        
        <div className="grid grid-cols-4 gap-8">
          {mainData.map((column, colIndex) => (
            <div key={colIndex} className="space-y-2">
              {column.map((item, itemIndex) => (
                <DataRow key={itemIndex} item={item} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <h3 className="text-white text-[19px] mb-4">실시간 CUSTOM DATA</h3>
      <div className="bg-hw-dark-2 rounded-lg p-5">
        <div className="grid grid-cols-4 gap-8">
          {Array.from({ length: Math.ceil(customData.length / 10) }, (_, colIndex) => (
            <div key={colIndex} className="space-y-2">
              {customData.slice(colIndex * 10, (colIndex + 1) * 10).map((item, itemIndex) => (
                <DataRow key={itemIndex} item={item} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RealTimeData; 