import React from 'react';
import './style.scss';

interface ChargingStatus {
  carNumber: string;
  status: string;
  condition: 'Bad' | 'Normal' | 'Good';
  soc: number;
  temperature: number;
  voltage: number;
  chargeType: '급속' | '완속';
  capacity: string;
  chargingTime: string;
  remainingTime: string;
  warning: string;
}

const dummyData: ChargingStatus[] = [
  { carNumber: '17도5374', status: '충전중', condition: 'Bad', soc: 35, temperature: 62, voltage: 4.31, chargeType: '급속', capacity: '55.2Ah', chargingTime: '18분', remainingTime: '48분', warning: '주의' },
  { carNumber: '79루2801', status: '충전중', condition: 'Normal', soc: 48, temperature: 31, voltage: 4.21, chargeType: '완속', capacity: '8.1Ah', chargingTime: '2시간 14분', remainingTime: '4시간 22분', warning: '' },
  { carNumber: '62카1619', status: '충전완료', condition: 'Good', soc: 62, temperature: 29, voltage: 4.18, chargeType: '완속', capacity: '-', chargingTime: '3시간 47분', remainingTime: '2시간 29분', warning: '' },
  { carNumber: '36바7539', status: '충전완료', condition: 'Normal', soc: 28, temperature: 37, voltage: 4.25, chargeType: '완속', capacity: '-', chargingTime: '55분', remainingTime: '6시간 22분', warning: '' },
  { carNumber: '67호1145', status: '충전완료', condition: 'Normal', soc: 88, temperature: 42, voltage: 4.32, chargeType: '급속', capacity: '-', chargingTime: '8시간 22분', remainingTime: '42분', warning: '' },
  { carNumber: '81수6017', status: '충전완료', condition: 'Normal', soc: 89, temperature: 26, voltage: 4.31, chargeType: '완속', capacity: '-', chargingTime: '7시간 58분', remainingTime: '48분', warning: '' },
];

const MonitoringPage: React.FC = () => {
  return (
    <div className='monitoring-content bg-hw-dark-1 p-2 h-[calc(100vh-65px)]'>
      <div className='flex flex-col h-full space-y-1'>
        <div className='detail-table h-full'>
          <table>
            <thead>
              <tr>
                <th>차량번호</th>
                <th>충전진행</th>
                <th>상태정보</th>
                <th>SOC</th>
                <th>온도</th>
                <th>전압</th>
                <th>충전TYPE</th>
                <th>충전전류</th>
                <th>충전진행시간</th>
                <th>잔여충전시간<br/>(완료후 경과시간)</th>
                <th>이상알람</th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map((status, index) => (
                <tr key={index}>
                  <td>{status.carNumber}</td>
                  <td>{status.status}</td>
                  <td className={`status-${status.condition.toLowerCase()}`}>{status.condition}</td>
                  <td>{status.soc}%</td>
                  <td>{status.temperature}°C</td>
                  <td>{status.voltage}V</td>
                  <td>{status.chargeType}</td>
                  <td>{status.capacity}</td>
                  <td>{status.chargingTime}</td>
                  <td>{status.remainingTime}</td>
                  <td className={status.warning ? 'status-warning' : ''}>{status.warning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MonitoringPage;