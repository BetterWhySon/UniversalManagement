import React, { useState, useMemo } from 'react';
import { TEXT_ALIGN } from '@/enums/table';
import { useTranslation } from 'react-i18next';
import TableData from '@/components/table/TableData';
import DeviceSelectPopup from '@/pages/setting/battery/components/DeviceSelectPopup';

interface AlarmHistory {
  id: number;
  사업장: string;
  그룹: string;
  기기명: string;
  어플리케이션: string;
  알람구분: string;
  알람LEVEL: string;
  일시: string;
  알람내용: string;
  측정데이터: string;
  정상범위: string;
  해제일시: string;
  해제시데이터: string;
  알람지속시간: string;
  확인여부: string;
}

interface AlarmHistoryProps {
  pageSize?: number;
  showDeviceSelect?: boolean;
}

const AlarmHistory: React.FC<AlarmHistoryProps> = ({ pageSize = 8, showDeviceSelect = false }) => {
  const { t: trans } = useTranslation('translation');
  const [selectedType, setSelectedType] = useState<string>('전체');
  const [selectedConfirmStatus, setSelectedConfirmStatus] = useState<string>('전체');
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [isDeviceSelectPopupOpen, setIsDeviceSelectPopupOpen] = useState(false);
  const [selectedDevices, setSelectedDevices] = useState<{[company: string]: string[]}>({});
  const [selections, setSelections] = useState<any[]>([]);

  const handleDeviceSelect = (selections: any[], selectedDevices: {[company: string]: string[]}) => {
    setSelections(selections);
    setSelectedDevices(selectedDevices);
    setIsDeviceSelectPopupOpen(false);
  };

  const dummyData: AlarmHistory[] = [
    { id: 1, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ023', 어플리케이션: 'BMS', 알람구분: '과전압', 알람LEVEL: '경고', 일시: '2023-12-28 18:28', 알람내용: '배터리 과전압 발생', 측정데이터: '4.25V', 정상범위: '2.5V~4.2V', 해제일시: '2023-12-28 19:28', 해제시데이터: '4.15V', 알람지속시간: '1h', 확인여부: '확인완료' },
    { id: 2, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ023', 어플리케이션: 'BMS', 알람구분: '저전압', 알람LEVEL: '위험', 일시: '2023-12-27 15:39', 알람내용: '배터리 저전압 발생', 측정데이터: '2.4V', 정상범위: '2.5V~4.2V', 해제일시: '2023-12-27 16:39', 해제시데이터: '3.2V', 알람지속시간: '1h', 확인여부: '미확인' },
    { id: 3, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ023', 어플리케이션: 'BMS', 알람구분: '과온도', 알람LEVEL: '경고', 일시: '2023-12-26 14:19', 알람내용: '배터리 과온도 발생', 측정데이터: '45℃', 정상범위: '-10℃~40℃', 해제일시: '2023-12-26 15:19', 해제시데이터: '38℃', 알람지속시간: '1h', 확인여부: '확인완료' },
    { id: 4, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ024', 어플리케이션: 'MCU', 알람구분: '통신이상', 알람LEVEL: '위험', 일시: '2023-12-25 11:39', 알람내용: 'MCU 통신 이상', 측정데이터: 'Error', 정상범위: 'Normal', 해제일시: '2023-12-25 13:39', 해제시데이터: 'Normal', 알람지속시간: '2h', 확인여부: '미확인' },
    { id: 5, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ025', 어플리케이션: 'BMS', 알람구분: '과전류', 알람LEVEL: '경고', 일시: '2023-12-24 15:18', 알람내용: '배터리 과전류 발생', 측정데이터: '110A', 정상범위: '0A~100A', 해제일시: '2023-12-24 16:18', 해제시데이터: '95A', 알람지속시간: '1h', 확인여부: '확인완료' },
    { id: 6, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ023', 어플리케이션: 'BMS', 알람구분: '통신이상', 알람LEVEL: '경고', 일시: '2023-12-23 19:24', 알람내용: 'BMS 통신 이상', 측정데이터: 'Error', 정상범위: 'Normal', 해제일시: '2023-12-23 20:24', 해제시데이터: 'Normal', 알람지속시간: '1h', 확인여부: '미확인' },
    { id: 7, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ023', 어플리케이션: 'BMS', 알람구분: '과전압', 알람LEVEL: '위험', 일시: '2023-12-22 14:59', 알람내용: '배터리 과전압 발생', 측정데이터: '4.3V', 정상범위: '2.5V~4.2V', 해제일시: '2023-12-22 15:59', 해제시데이터: '4.1V', 알람지속시간: '1h', 확인여부: '미확인' },
    { id: 8, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ023', 어플리케이션: 'BMS', 알람구분: '저전압', 알람LEVEL: '경고', 일시: '2023-12-21 12:00', 알람내용: '배터리 저전압 발생', 측정데이터: '2.45V', 정상범위: '2.5V~4.2V', 해제일시: '2023-12-21 13:00', 해제시데이터: '3.0V', 알람지속시간: '1h', 확인여부: '미확인' },
    { id: 9, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ023', 어플리케이션: 'BMS', 알람구분: '과온도', 알람LEVEL: '위험', 일시: '2023-12-20 15:16', 알람내용: '배터리 과온도 발생', 측정데이터: '48℃', 정상범위: '-10℃~40℃', 해제일시: '2023-12-20 17:16', 해제시데이터: '39℃', 알람지속시간: '2h', 확인여부: '미확인' },
    { id: 10, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ023', 어플리케이션: 'BMS', 알람구분: '저온도', 알람LEVEL: '경고', 일시: '2023-12-19 12:39', 알람내용: '배터리 저온도 발생', 측정데이터: '-12℃', 정상범위: '-10℃~40℃', 해제일시: '2023-12-19 14:39', 해제시데이터: '-8℃', 알람지속시간: '2h', 확인여부: '미확인' },
    { id: 11, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ023', 어플리케이션: 'BMS', 알람구분: '과전류', 알람LEVEL: '위험', 일시: '2023-12-18 08:19', 알람내용: '배터리 과전류 발생', 측정데이터: '120A', 정상범위: '0A~100A', 해제일시: '2023-12-18 09:19', 해제시데이터: '90A', 알람지속시간: '1h', 확인여부: '미확인' },
    { id: 12, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ023', 어플리케이션: 'BMS', 알람구분: '통신이상', 알람LEVEL: '경고', 일시: '2023-12-17 17:48', 알람내용: 'BMS 통신 이상', 측정데이터: 'Error', 정상범위: 'Normal', 해제일시: '2023-12-17 18:48', 해제시데이터: 'Normal', 알람지속시간: '1h', 확인여부: '미확인' },
    { id: 13, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ023', 어플리케이션: 'BMS', 알람구분: '과전압', 알람LEVEL: '위험', 일시: '2023-12-16 15:18', 알람내용: '배터리 과전압 발생', 측정데이터: '4.28V', 정상범위: '2.5V~4.2V', 해제일시: '2023-12-16 16:18', 해제시데이터: '4.15V', 알람지속시간: '1h', 확인여부: '미확인' },
    { id: 14, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ023', 어플리케이션: 'BMS', 알람구분: '저전압', 알람LEVEL: '경고', 일시: '2023-12-15 19:24', 알람내용: '배터리 저전압 발생', 측정데이터: '2.48V', 정상범위: '2.5V~4.2V', 해제일시: '2023-12-15 20:24', 해제시데이터: '3.1V', 알람지속시간: '1h', 확인여부: '미확인' },
    { id: 15, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ023', 어플리케이션: 'BMS', 알람구분: '과온도', 알람LEVEL: '위험', 일시: '2023-12-14 14:59', 알람내용: '배터리 과온도 발생', 측정데이터: '46℃', 정상범위: '-10℃~40℃', 해제일시: '2023-12-14 16:59', 해제시데이터: '38℃', 알람지속시간: '2h', 확인여부: '미확인' },
    { id: 16, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ023', 어플리케이션: 'BMS', 알람구분: '저온도', 알람LEVEL: '경고', 일시: '2023-12-13 12:00', 알람내용: '배터리 저온도 발생', 측정데이터: '-11℃', 정상범위: '-10℃~40℃', 해제일시: '2023-12-13 13:00', 해제시데이터: '-7℃', 알람지속시간: '1h', 확인여부: '미확인' },
    { id: 17, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ023', 어플리케이션: 'BMS', 알람구분: '과전류', 알람LEVEL: '위험', 일시: '2023-12-12 15:16', 알람내용: '배터리 과전류 발생', 측정데이터: '115A', 정상범위: '0A~100A', 해제일시: '2023-12-12 16:16', 해제시데이터: '95A', 알람지속시간: '1h', 확인여부: '미확인' },
    { id: 18, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ023', 어플리케이션: 'BMS', 알람구분: '통신이상', 알람LEVEL: '경고', 일시: '2023-12-11 12:39', 알람내용: 'BMS 통신 이상', 측정데이터: 'Error', 정상범위: 'Normal', 해제일시: '2023-12-11 13:39', 해제시데이터: 'Normal', 알람지속시간: '1h', 확인여부: '미확인' },
    { id: 19, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ023', 어플리케이션: 'BMS', 알람구분: '과전압', 알람LEVEL: '위험', 일시: '2023-12-10 08:19', 알람내용: '배터리 과전압 발생', 측정데이터: '4.26V', 정상범위: '2.5V~4.2V', 해제일시: '2023-12-10 09:19', 해제시데이터: '4.18V', 알람지속시간: '1h', 확인여부: '미확인' },
    { id: 20, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ023', 어플리케이션: 'BMS', 알람구분: '저전압', 알람LEVEL: '경고', 일시: '2023-12-09 17:48', 알람내용: '배터리 저전압 발생', 측정데이터: '2.47V', 정상범위: '2.5V~4.2V', 해제일시: '2023-12-09 18:48', 해제시데이터: '3.0V', 알람지속시간: '1h', 확인여부: '미확인' },
    { id: 21, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ023', 어플리케이션: 'BMS', 알람구분: '과온도', 알람LEVEL: '위험', 일시: '2023-12-08 18:28', 알람내용: '배터리 과온도 발생', 측정데이터: '47℃', 정상범위: '-10℃~40℃', 해제일시: '2023-12-08 20:28', 해제시데이터: '39℃', 알람지속시간: '2h', 확인여부: '미확인' },
    { id: 22, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ023', 어플리케이션: 'BMS', 알람구분: '저온도', 알람LEVEL: '경고', 일시: '2023-12-07 15:39', 알람내용: '배터리 저온도 발생', 측정데이터: '-13℃', 정상범위: '-10℃~40℃', 해제일시: '2023-12-07 16:39', 해제시데이터: '-9℃', 알람지속시간: '1h', 확인여부: '미확인' },
    { id: 23, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ023', 어플리케이션: 'BMS', 알람구분: '과전류', 알람LEVEL: '위험', 일시: '2023-12-06 14:19', 알람내용: '배터리 과전류 발생', 측정데이터: '118A', 정상범위: '0A~100A', 해제일시: '2023-12-06 15:19', 해제시데이터: '95A', 알람지속시간: '1h', 확인여부: '미확인' },
    { id: 24, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ023', 어플리케이션: 'BMS', 알람구분: '통신이상', 알람LEVEL: '경고', 일시: '2023-12-05 11:39', 알람내용: 'BMS 통신 이상', 측정데이터: 'Error', 정상범위: 'Normal', 해제일시: '2023-12-05 12:39', 해제시데이터: 'Normal', 알람지속시간: '1h', 확인여부: '미확인' },
    { id: 25, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ023', 어플리케이션: 'BMS', 알람구분: '과전압', 알람LEVEL: '위험', 일시: '2023-12-04 15:18', 알람내용: '배터리 과전압 발생', 측정데이터: '4.27V', 정상범위: '2.5V~4.2V', 해제일시: '2023-12-04 16:18', 해제시데이터: '4.16V', 알람지속시간: '1h', 확인여부: '미확인' },
    { id: 26, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ023', 어플리케이션: 'BMS', 알람구분: '저전압', 알람LEVEL: '경고', 일시: '2023-12-03 19:24', 알람내용: '배터리 저전압 발생', 측정데이터: '2.46V', 정상범위: '2.5V~4.2V', 해제일시: '2023-12-03 20:24', 해제시데이터: '3.1V', 알람지속시간: '1h', 확인여부: '미확인' },
    { id: 27, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ023', 어플리케이션: 'BMS', 알람구분: '과온도', 알람LEVEL: '위험', 일시: '2023-12-02 14:59', 알람내용: '배터리 과온도 발생', 측정데이터: '45℃', 정상범위: '-10℃~40℃', 해제일시: '2023-12-02 16:59', 해제시데이터: '38℃', 알람지속시간: '2h', 확인여부: '미확인' },
    { id: 28, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ023', 어플리케이션: 'BMS', 알람구분: '저온도', 알람LEVEL: '경고', 일시: '2023-12-01 12:00', 알람내용: '배터리 저온도 발생', 측정데이터: '-11℃', 정상범위: '-10℃~40℃', 해제일시: '2023-12-01 13:00', 해제시데이터: '-8℃', 알람지속시간: '1h', 확인여부: '미확인' },
    { id: 29, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ023', 어플리케이션: 'BMS', 알람구분: '과전류', 알람LEVEL: '위험', 일시: '2023-11-30 15:16', 알람내용: '배터리 과전류 발생', 측정데이터: '112A', 정상범위: '0A~100A', 해제일시: '2023-11-30 16:16', 해제시데이터: '98A', 알람지속시간: '1h', 확인여부: '미확인' },
    { id: 30, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ023', 어플리케이션: 'BMS', 알람구분: '통신이상', 알람LEVEL: '경고', 일시: '2023-11-29 12:39', 알람내용: 'BMS 통신 이상', 측정데이터: 'Error', 정상범위: 'Normal', 해제일시: '2023-11-29 13:39', 해제시데이터: 'Normal', 알람지속시간: '1h', 확인여부: '미확인' },
    { id: 31, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ023', 어플리케이션: 'BMS', 알람구분: '과전압', 알람LEVEL: '위험', 일시: '2023-11-28 09:45', 알람내용: '배터리 과전압 발생', 측정데이터: '4.29V', 정상범위: '2.5V~4.2V', 해제일시: '2023-11-28 10:45', 해제시데이터: '4.17V', 알람지속시간: '1h', 확인여부: '미확인' },
    { id: 32, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ023', 어플리케이션: 'BMS', 알람구분: '저전압', 알람LEVEL: '경고', 일시: '2023-11-27 14:20', 알람내용: '배터리 저전압 발생', 측정데이터: '2.45V', 정상범위: '2.5V~4.2V', 해제일시: '2023-11-27 15:20', 해제시데이터: '3.2V', 알람지속시간: '1h', 확인여부: '미확인' },
    { id: 33, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기명: 'VABJ023', 어플리케이션: 'BMS', 알람구분: '과온도', 알람LEVEL: '위험', 일시: '2023-11-26 10:30', 알람내용: '배터리 과온도 발생', 측정데이터: '44℃', 정상범위: '-10℃~40℃', 해제일시: '2023-11-26 12:30', 해제시데이터: '39℃', 알람지속시간: '2h', 확인여부: '미확인' }
  ];

  const columns = useMemo(() => [
    {
      name: '사업장',
      dataIndex: '사업장',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px'
    },
    {
      name: '그룹',
      dataIndex: '그룹',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px'
    },
    {
      name: '기기명',
      dataIndex: '기기명',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px'
    },
    {
      name: '어플리케이션',
      dataIndex: '어플리케이션',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px'
    },
    {
      name: '알람구분',
      dataIndex: '알람구분',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px',
      group: '이상알람',
      headerStyle: { color: 'red' }
    },
    {
      name: '알람LEVEL',
      dataIndex: '알람LEVEL',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px',
      group: '이상알람',
      headerStyle: { color: 'red' }
    },
    {
      name: '일시',
      dataIndex: '일시',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '150px',
      group: '이상알람',
      headerStyle: { color: 'red' }
    },
    {
      name: '알람내용',
      dataIndex: '알람내용',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '200px',
      group: '이상알람'
    },
    {
      name: '측정데이터',
      dataIndex: '측정데이터',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px',
      group: '이상알람'
    },
    {
      name: '정상범위',
      dataIndex: '정상범위',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px',
      group: '이상알람'
    },
    {
      name: '해제일시',
      dataIndex: '해제일시',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '150px',
      group: '알람해제'
    },
    {
      name: '해제시 데이터',
      dataIndex: '해제시데이터',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px',
      group: '알람해제'
    },
    {
      name: '알람지속시간',
      dataIndex: '알람지속시간',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px',
      group: '알람해제'
    },
    {
      name: '확인여부',
      dataIndex: '확인여부',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px'
    }
  ], []);

  const getFilteredData = useMemo(() => {
    let filteredData = dummyData;
    
    // 알람 타입 필터링
    if (selectedType !== '전체') {
      filteredData = filteredData.filter(item => item.알람LEVEL === selectedType);
    }
    
    // 확인여부 필터링
    if (selectedConfirmStatus !== '전체') {
      filteredData = filteredData.filter(item => item.확인여부 === selectedConfirmStatus);
    }
    
    return filteredData;
  }, [selectedType, selectedConfirmStatus, dummyData]);

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
                id="management" 
                name="type" 
                checked={selectedType === '관리알람'} 
                onChange={() => setSelectedType('관리알람')} 
              />
              <label htmlFor="management">관리알람</label>
            </div>
            <div className="flex items-center space-x-2">
              <input 
                type="radio" 
                id="error" 
                name="type" 
                checked={selectedType === '이상알람'} 
                onChange={() => setSelectedType('이상알람')} 
              />
              <label htmlFor="error">이상알람</label>
            </div>
          </div>

          {showDeviceSelect && (
            <>
              <button 
                className="bg-blue-600 text-white px-2 py-0.5 rounded h-6 border border-blue-500 min-w-[90px] hover:bg-blue-700 transition-colors flex items-center justify-center mx-2"
                onClick={() => setIsDeviceSelectPopupOpen(true)}
              >
                기기선택
              </button>

              {selections.length > 0 && (
                <span className="text-blue-400 font-medium whitespace-normal leading-tight">
                  ({selections.map(sel => sel.device).join(', ')})
                </span>
              )}
            </>
          )}

          <div className="flex gap-1 items-center ml-2">
            <select className="bg-hw-dark-3 text-hw-white-1 py-0.5 px-2 rounded border-none outline-none min-w-[80px] h-6 text-center">
              <option value="day">일간</option>
              <option value="week">주간</option>
              <option value="month">월간</option>
              <option value="year">년간</option>
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

          <select 
            className="bg-hw-dark-3 text-hw-white-1 py-0.5 px-2 rounded border-none outline-none min-w-[120px] h-6 text-center ml-2"
            value={selectedConfirmStatus}
            onChange={(e) => setSelectedConfirmStatus(e.target.value)}
          >
            <option value="전체">전체</option>
            <option value="확인완료">확인된 알람</option>
            <option value="미확인">미확인 알람</option>
          </select>

          <button className="px-2 py-0.5 rounded bg-hw-orange-1 text-white h-6">
            조회
          </button>
        </div>
      </div>

      <div className="flex-1">
        <TableData<AlarmHistory>
          data={getFilteredData}
          columns={columns}
          isPagination
          pagination={{
            total: getFilteredData.length,
            pageSize: pageSize,
          }}
          paginationMarginTop="4px"
          emptyMessage={trans('데이터가 없습니다.')}
        />
      </div>

      {showDeviceSelect && (
        <DeviceSelectPopup
          isOpen={isDeviceSelectPopupOpen}
          onClose={() => setIsDeviceSelectPopupOpen(false)}
          onSelect={handleDeviceSelect}
          conditionType="기기"
          pageType="device"
          allowInfiniteSelection={true}
        />
      )}
    </div>
  );
};

export default AlarmHistory; 