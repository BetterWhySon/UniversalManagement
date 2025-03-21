import React, { useState } from 'react';
import AlarmCard from './components/AlarmCard';

const PolicyCompliancePage: React.FC<{ alarmType?: string }> = ({ alarmType }) => {
  const [selectedCards, setSelectedCards] = useState<boolean[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const alarms = [
    {
      workplace: "A사업장",
      groupName: "그룹1",
      deviceName: "BMS-01",
      application: "ESS",
      packId: "PK-2021-001",
      packModel: "LG-ESS100",
      user: "김영식",
      contact: "010-4827-7782",
      alarmLevel: "경고",
      alarmContent: "모듈온도 고온",
      alarmTime: "24.09.02. 14:28:55",
      measureData: {
        value: "68°C",
        range: "22 ~ 59°C",
        duration: "46시간 58분",
        confirmed: "미확인"
      }
    },
    {
      workplace: "A사업장",
      groupName: "그룹1",
      deviceName: "BMS-02",
      application: "ESS",
      packId: "PK-2021-002",
      packModel: "LG-ESS100",
      user: "이철수",
      contact: "010-2345-6789",
      alarmLevel: "관리",
      alarmContent: "충전량 저하",
      alarmTime: "24.09.01. 10:15:30",
      measureData: {
        value: "85%",
        range: "95% 이상",
        duration: "72시간 40분",
        confirmed: "미확인"
      }
    },
    {
      workplace: "B사업장",
      groupName: "그룹2",
      deviceName: "BMS-03",
      application: "ESS",
      packId: "PK-2021-003",
      packModel: "SS-ESS200",
      user: "박지성",
      contact: "010-9876-5432",
      alarmLevel: "위험",
      alarmContent: "과충전 감지",
      alarmTime: "24.09.03. 08:45:22",
      measureData: {
        value: "4.25V",
        range: "3.2 ~ 4.2V",
        duration: "8시간 15분",
        confirmed: "미확인"
      }
    },
    {
      workplace: "B사업장",
      groupName: "그룹2",
      deviceName: "BMS-04",
      application: "ESS",
      packId: "PK-2021-004",
      packModel: "SS-ESS200",
      user: "정민호",
      contact: "010-1122-3344",
      alarmLevel: "위험",
      alarmContent: "셀 전압 이상",
      alarmTime: "24.09.03. 09:15:22",
      measureData: {
        value: "4.5V",
        range: "3.2 ~ 4.2V",
        duration: "12시간 30분",
        confirmed: "미확인"
      }
    },
    {
      workplace: "C사업장",
      groupName: "그룹3",
      deviceName: "BMS-05",
      application: "EV",
      packId: "PK-2022-001",
      packModel: "SL-EV100",
      user: "김태희",
      contact: "010-5566-7788",
      alarmLevel: "관리",
      alarmContent: "충전주기 이상",
      alarmTime: "24.09.02. 12:30:45",
      measureData: {
        value: "주 3회",
        range: "주 1-2회",
        duration: "3주간",
        confirmed: "확인"
      }
    },
    {
      workplace: "C사업장",
      groupName: "그룹3",
      deviceName: "BMS-06",
      application: "EV",
      packId: "PK-2022-002",
      packModel: "SL-EV100",
      user: "이지은",
      contact: "010-9900-1122",
      alarmLevel: "위험",
      alarmContent: "통신 오류",
      alarmTime: "24.09.04. 07:30:45",
      measureData: {
        value: "Timeout",
        range: "N/A",
        duration: "2시간 45분",
        confirmed: "미확인"
      }
    },
    {
      workplace: "D사업장",
      groupName: "그룹4",
      deviceName: "BMS-07",
      application: "UPS",
      packId: "PK-2022-003",
      packModel: "HW-UPS50",
      user: "최수진",
      contact: "010-3344-5566",
      alarmLevel: "경고",
      alarmContent: "충전 이상",
      alarmTime: "24.09.03. 12:10:33",
      measureData: {
        value: "충전 중단",
        range: "정상 충전",
        duration: "36시간 20분",
        confirmed: "미확인"
      }
    },
  ];

  // 알람 유형에 따라 필터링된 알람 데이터
  const filteredAlarms = alarmType 
    ? alarms.filter(alarm => alarm.alarmLevel === alarmType)
    : alarms;

  // 컴포넌트 초기화 시 선택 상태 배열 설정
  React.useEffect(() => {
    setSelectedCards(new Array(filteredAlarms.length).fill(false));
  }, [filteredAlarms.length]);

  // 개별 카드 선택 처리
  const handleCardSelect = (index: number, selected: boolean) => {
    const newSelectedCards = [...selectedCards];
    newSelectedCards[index] = selected;
    setSelectedCards(newSelectedCards);
    
    // 모든 카드가 선택되었는지 확인
    setIsAllSelected(newSelectedCards.every(card => card));
  };

  // 전체 선택/해제 처리
  const handleToggleAllSelect = () => {
    const newAllSelected = !isAllSelected;
    setIsAllSelected(newAllSelected);
    setSelectedCards(new Array(filteredAlarms.length).fill(newAllSelected));
  };

  // 선택된 카드 확인 처리
  const handleConfirmSelected = () => {
    // 선택된 카드에 대한 확인 처리 로직
    console.log('선택된 카드 확인 처리:', selectedCards);
    
    // 여기서 선택된 카드에 대한 확인 API 호출 등의 처리를 추가할 수 있습니다.
    // 확인 후 선택 상태 초기화
    setSelectedCards(new Array(filteredAlarms.length).fill(false));
    setIsAllSelected(false);
  };

  return (
    <div className="p-6 bg-hw-dark-1">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl text-white">
          {alarmType ? `${alarmType} 알람 상세` : '전기차 관리정책 준수율 상세'}
        </h1>
        <div className="flex gap-2">
          <button 
            onClick={handleToggleAllSelect}
            className="px-3 py-1.5 bg-blue-700 text-white rounded hover:bg-blue-800"
          >
            {isAllSelected ? '전체 해제' : '전체 선택'}
          </button>
          <button
            onClick={handleConfirmSelected}
            className="px-3 py-1.5 bg-blue-700 text-white rounded hover:bg-blue-800"
            disabled={!selectedCards.some(selected => selected)}
          >
            확인
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAlarms.map((alarm, index) => (
          <AlarmCard 
            key={index} 
            {...alarm} 
            isSelected={selectedCards[index]}
            onSelect={(selected) => handleCardSelect(index, selected)}
          />
        ))}
      </div>
    </div>
  );
};

export default PolicyCompliancePage; 