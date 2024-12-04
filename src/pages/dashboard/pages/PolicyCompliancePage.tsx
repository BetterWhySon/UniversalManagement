import React from 'react';
import AlarmCard from './components/AlarmCard';

const PolicyCompliancePage: React.FC = () => {
  const alarms = [
    {
      dongHo: "202동 1002호",
      carNumber: "48러1187",
      owner: "김영식",
      contact: "010-4827-7782",
      alarmLevel: "경고",
      alarmContent: "모듈온도 고온",
      alarmTime: "24.09.02. 14:28:55",
      measureData: {
        value: "68°C",
        range: "22 ~ 59°C",
        duration: "46시간 58분",
        status: "진행중"
      }
    },
    {
        dongHo: "202동 1002호",
        carNumber: "48러1187",
        owner: "김영식",
        contact: "010-4827-7782",
        alarmLevel: "경고",
        alarmContent: "모듈온도 고온",
        alarmTime: "24.09.02. 14:28:55",
        measureData: {
          value: "68°C",
          range: "22 ~ 59°C",
          duration: "46시간 58분",
          status: "진행중"
        }
      },
      {
        dongHo: "202동 1002호",
        carNumber: "48러1187",
        owner: "김영식",
        contact: "010-4827-7782",
        alarmLevel: "경고",
        alarmContent: "모듈온도 고온",
        alarmTime: "24.09.02. 14:28:55",
        measureData: {
          value: "68°C",
          range: "22 ~ 59°C",
          duration: "46시간 58분",
          status: "진행중"
        }
      },
      {
        dongHo: "202동 1002호",
        carNumber: "48러1187",
        owner: "김영식",
        contact: "010-4827-7782",
        alarmLevel: "경고",
        alarmContent: "모듈온도 고온",
        alarmTime: "24.09.02. 14:28:55",
        measureData: {
          value: "68°C",
          range: "22 ~ 59°C",
          duration: "46시간 58분",
          status: "진행중"
        }
      },
      {
        dongHo: "202동 1002호",
        carNumber: "48러1187",
        owner: "김영식",
        contact: "010-4827-7782",
        alarmLevel: "경고",
        alarmContent: "모듈온도 고온",
        alarmTime: "24.09.02. 14:28:55",
        measureData: {
          value: "68°C",
          range: "22 ~ 59°C",
          duration: "46시간 58분",
          status: "진행중"
        }
      },
      {
        dongHo: "202동 1002호",
        carNumber: "48러1187",
        owner: "김영식",
        contact: "010-4827-7782",
        alarmLevel: "경고",
        alarmContent: "모듈온도 고온",
        alarmTime: "24.09.02. 14:28:55",
        measureData: {
          value: "68°C",
          range: "22 ~ 59°C",
          duration: "46시간 58분",
          status: "진행중"
        }
      },
      {
        dongHo: "202동 1002호",
        carNumber: "48러1187",
        owner: "김영식",
        contact: "010-4827-7782",
        alarmLevel: "경고",
        alarmContent: "모듈온도 고온",
        alarmTime: "24.09.02. 14:28:55",
        measureData: {
          value: "68°C",
          range: "22 ~ 59°C",
          duration: "46시간 58분",
          status: "진행중"
        }
      },
      {
        dongHo: "202동 1002호",
        carNumber: "48러1187",
        owner: "김영식",
        contact: "010-4827-7782",
        alarmLevel: "경고",
        alarmContent: "모듈온도 고온",
        alarmTime: "24.09.02. 14:28:55",
        measureData: {
          value: "68°C",
          range: "22 ~ 59°C",
          duration: "46시간 58분",
          status: "진행중"
        }
      },
      
  ];

  return (
    <div className="p-6 bg-hw-dark-1">
      <h1 className="text-2xl text-white mb-6">전기차 관리정책 준수율 상세</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {alarms.map((alarm, index) => (
          <AlarmCard key={index} {...alarm} />
        ))}
      </div>
    </div>
  );
};

export default PolicyCompliancePage; 