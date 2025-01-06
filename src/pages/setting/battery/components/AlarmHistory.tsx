import React, { useState, useMemo } from 'react';
import { TEXT_ALIGN } from '@/enums/table';
import { useTranslation } from 'react-i18next';
import TableData from '@/components/table/TableData';

interface AlarmHistory {
  id: number;
  사업장: string;
  그룹: string;
  기기: string;
  팩ID: string;
  알람구분: string;
  알람레벨: string;
  발생일시: string;
  알람내용: string;
  측정데이터: string;
  정상범위: string;
  해제일시: string;
  해제측정데이터: string;
  알람지속시간: string;
  알람상태정보: string;
}

interface AlarmHistoryProps {
  pageSize?: number;
}

const AlarmHistory: React.FC<AlarmHistoryProps> = ({ pageSize = 8 }) => {
  const { t: trans } = useTranslation('translation');
  const [selectedType, setSelectedType] = useState<string>('전체');
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');

  const dummyData: AlarmHistory[] = [
    { id: 1, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기: 'VABJ023', 팩ID: 'B01', 알람구분: '과전압', 알람레벨: '경고', 발생일시: '2023-12-28 18:28', 알람내용: '배터리 과전압 발생', 측정데이터: '4.25V', 정상범위: '2.5V~4.2V', 해제일시: '2023-12-28 19:28', 해제측정데이터: '4.15V', 알람지속시간: '1h', 알람상태정보: '해제' },
    { id: 2, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기: 'VABJ023', 팩ID: 'B02', 알람구분: '저전압', 알람레벨: '위험', 발생일시: '2023-12-27 15:39', 알람내용: '배터리 저전압 발생', 측정데이터: '2.4V', 정상범위: '2.5V~4.2V', 해제일시: '2023-12-27 16:39', 해제측정데이터: '3.2V', 알람지속시간: '1h', 알람상태정보: '해제' },
    { id: 3, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기: 'VABJ023', 팩ID: 'B03', 알람구분: '과온도', 알람레벨: '경고', 발생일시: '2023-12-26 14:19', 알람내용: '배터리 과온도 발생', 측정데이터: '45℃', 정상범위: '-10℃~40℃', 해제일시: '2023-12-26 15:19', 해제측정데이터: '38℃', 알람지속시간: '1h', 알람상태정보: '해제' },
    { id: 4, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기: 'VABJ023', 팩ID: 'B04', 알람구분: '저온도', 알람레벨: '위험', 발생일시: '2023-12-25 11:39', 알람내용: '배터리 저온도 발생', 측정데이터: '-15℃', 정상범위: '-10℃~40℃', 해제일시: '2023-12-25 13:39', 해제측정데이터: '-5℃', 알람지속시간: '2h', 알람상태정보: '해제' },
    { id: 5, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기: 'VABJ023', 팩ID: 'B05', 알람구분: '과전류', 알람레벨: '경고', 발생일시: '2023-12-24 15:18', 알람내용: '배터리 과전류 발생', 측정데이터: '110A', 정상범위: '0A~100A', 해제일시: '2023-12-24 16:18', 해제측정데이터: '95A', 알람지속시간: '1h', 알람상태정보: '해제' },
    { id: 6, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기: 'VABJ023', 팩ID: 'B01', 알람구분: '통신이상', 알람레벨: '경고', 발생일시: '2023-12-23 19:24', 알람내용: 'BMS 통신 이상', 측정데이터: 'Error', 정상범위: 'Normal', 해제일시: '2023-12-23 20:24', 해제측정데이터: 'Normal', 알람지속시간: '1h', 알람상태정보: '해제' },
    { id: 7, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기: 'VABJ023', 팩ID: 'B02', 알람구분: '과전압', 알람레벨: '위험', 발생일시: '2023-12-22 14:59', 알람내용: '배터리 과전압 발생', 측정데이터: '4.3V', 정상범위: '2.5V~4.2V', 해제일시: '2023-12-22 15:59', 해제측정데이터: '4.1V', 알람지속시간: '1h', 알람상태정보: '해제' },
    { id: 8, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기: 'VABJ023', 팩ID: 'B03', 알람구분: '저전압', 알람레벨: '경고', 발생일시: '2023-12-21 12:00', 알람내용: '배터리 저전압 발생', 측정데이터: '2.45V', 정상범위: '2.5V~4.2V', 해제일시: '2023-12-21 13:00', 해제측정데이터: '3.0V', 알람지속시간: '1h', 알람상태정보: '해제' },
    { id: 9, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기: 'VABJ023', 팩ID: 'B04', 알람구분: '과온도', 알람레벨: '위험', 발생일시: '2023-12-20 15:16', 알람내용: '배터리 과온도 발생', 측정데이터: '48℃', 정상범위: '-10℃~40℃', 해제일시: '2023-12-20 17:16', 해제측정데이터: '39℃', 알람지속시간: '2h', 알람상태정보: '해제' },
    { id: 10, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기: 'VABJ023', 팩ID: 'B05', 알람구분: '저온도', 알람레벨: '경고', 발생일시: '2023-12-19 12:39', 알람내용: '배터리 저온도 발생', 측정데이터: '-12℃', 정상범위: '-10℃~40℃', 해제일시: '2023-12-19 14:39', 해제측정데이터: '-8℃', 알람지속시간: '2h', 알람상태정보: '해제' },
    { id: 11, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기: 'VABJ023', 팩ID: 'B01', 알람구분: '과전류', 알람레벨: '위험', 발생일시: '2023-12-18 08:19', 알람내용: '배터리 과전류 발생', 측정데이터: '120A', 정상범위: '0A~100A', 해제일시: '2023-12-18 09:19', 해제측정데이터: '90A', 알람지속시간: '1h', 알람상태정보: '해제' },
    { id: 12, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기: 'VABJ023', 팩ID: 'B02', 알람구분: '통신이상', 알람레벨: '경고', 발생일시: '2023-12-17 17:48', 알람내용: 'BMS 통신 이상', 측정데이터: 'Error', 정상범위: 'Normal', 해제일시: '2023-12-17 18:48', 해제측정데이터: 'Normal', 알람지속시간: '1h', 알람상태정보: '해제' },
    { id: 13, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기: 'VABJ023', 팩ID: 'B03', 알람구분: '과전압', 알람레벨: '위험', 발생일시: '2023-12-16 15:18', 알람내용: '배터리 과전압 발생', 측정데이터: '4.28V', 정상범위: '2.5V~4.2V', 해제일시: '2023-12-16 16:18', 해제측정데이터: '4.15V', 알람지속시간: '1h', 알람상태정보: '해제' },
    { id: 14, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기: 'VABJ023', 팩ID: 'B04', 알람구분: '저전압', 알람레벨: '경고', 발생일시: '2023-12-15 19:24', 알람내용: '배터리 저전압 발생', 측정데이터: '2.48V', 정상범위: '2.5V~4.2V', 해제일시: '2023-12-15 20:24', 해제측정데이터: '3.1V', 알람지속시간: '1h', 알람상태정보: '해제' },
    { id: 15, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기: 'VABJ023', 팩ID: 'B05', 알람구분: '과온도', 알람레벨: '위험', 발생일시: '2023-12-14 14:59', 알람내용: '배터리 과온도 발생', 측정데이터: '46℃', 정상범위: '-10℃~40℃', 해제일시: '2023-12-14 16:59', 해제측정데이터: '38℃', 알람지속시간: '2h', 알람상태정보: '해제' },
    { id: 16, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기: 'VABJ023', 팩ID: 'B01', 알람구분: '저온도', 알람레벨: '경고', 발생일시: '2023-12-13 12:00', 알람내용: '배터리 저온도 발생', 측정데이터: '-11℃', 정상범위: '-10℃~40℃', 해제일시: '2023-12-13 13:00', 해제측정데이터: '-7℃', 알람지속시간: '1h', 알람상태정보: '해제' },
    { id: 17, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기: 'VABJ023', 팩ID: 'B02', 알람구분: '과전류', 알람레벨: '위험', 발생일시: '2023-12-12 15:16', 알람내용: '배터리 과전류 발생', 측정데이터: '115A', 정상범위: '0A~100A', 해제일시: '2023-12-12 16:16', 해제측정데이터: '95A', 알람지속시간: '1h', 알람상태정보: '해제' },
    { id: 18, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기: 'VABJ023', 팩ID: 'B03', 알람구분: '통신이상', 알람레벨: '경고', 발생일시: '2023-12-11 12:39', 알람내용: 'BMS 통신 이상', 측정데이터: 'Error', 정상범위: 'Normal', 해제일시: '2023-12-11 13:39', 해제측정데이터: 'Normal', 알람지속시간: '1h', 알람상태정보: '해제' },
    { id: 19, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기: 'VABJ023', 팩ID: 'B04', 알람구분: '과전압', 알람레벨: '위험', 발생일시: '2023-12-10 08:19', 알람내용: '배터리 과전압 발생', 측정데이터: '4.26V', 정상범위: '2.5V~4.2V', 해제일시: '2023-12-10 09:19', 해제측정데이터: '4.18V', 알람지속시간: '1h', 알람상태정보: '해제' },
    { id: 20, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기: 'VABJ023', 팩ID: 'B05', 알람구분: '저전압', 알람레벨: '경고', 발생일시: '2023-12-09 17:48', 알람내용: '배터리 저전압 발생', 측정데이터: '2.47V', 정상범위: '2.5V~4.2V', 해제일시: '2023-12-09 18:48', 해제측정데이터: '3.0V', 알람지속시간: '1h', 알람상태정보: '해제' },
    { id: 21, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기: 'VABJ023', 팩ID: 'B01', 알람구분: '과온도', 알람레벨: '위험', 발생일시: '2023-12-08 18:28', 알람내용: '배터리 과온도 발생', 측정데이터: '47℃', 정상범위: '-10℃~40℃', 해제일시: '2023-12-08 20:28', 해제측정데이터: '39℃', 알람지속시간: '2h', 알람상태정보: '해제' },
    { id: 22, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기: 'VABJ023', 팩ID: 'B02', 알람구분: '저온도', 알람레벨: '경고', 발생일시: '2023-12-07 15:39', 알람내용: '배터리 저온도 발생', 측정데이터: '-13℃', 정상범위: '-10℃~40℃', 해제일시: '2023-12-07 16:39', 해제측정데이터: '-9℃', 알람지속시간: '1h', 알람상태정보: '해제' },
    { id: 23, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기: 'VABJ023', 팩ID: 'B03', 알람구분: '과전류', 알람레벨: '위험', 발생일시: '2023-12-06 14:19', 알람내용: '배터리 과전류 발생', 측정데이터: '118A', 정상범위: '0A~100A', 해제일시: '2023-12-06 15:19', 해제측정데이터: '95A', 알람지속시간: '1h', 알람상태정보: '해제' },
    { id: 24, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기: 'VABJ023', 팩ID: 'B04', 알람구분: '통신이상', 알람레벨: '경고', 발생일시: '2023-12-05 11:39', 알람내용: 'BMS 통신 이상', 측정데이터: 'Error', 정상범위: 'Normal', 해제일시: '2023-12-05 12:39', 해제측정데이터: 'Normal', 알람지속시간: '1h', 알람상태정보: '해제' },
    { id: 25, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기: 'VABJ023', 팩ID: 'B05', 알람구분: '과전압', 알람레벨: '위험', 발생일시: '2023-12-04 15:18', 알람내용: '배터리 과전압 발생', 측정데이터: '4.27V', 정상범위: '2.5V~4.2V', 해제일시: '2023-12-04 16:18', 해제측정데이터: '4.16V', 알람지속시간: '1h', 알람상태정보: '해제' },
    { id: 26, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기: 'VABJ023', 팩ID: 'B01', 알람구분: '저전압', 알람레벨: '경고', 발생일시: '2023-12-03 19:24', 알람내용: '배터리 저전압 발생', 측정데이터: '2.46V', 정상범위: '2.5V~4.2V', 해제일시: '2023-12-03 20:24', 해제측정데이터: '3.1V', 알람지속시간: '1h', 알람상태정보: '해제' },
    { id: 27, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기: 'VABJ023', 팩ID: 'B02', 알람구분: '과온도', 알람레벨: '위험', 발생일시: '2023-12-02 14:59', 알람내용: '배터리 과온도 발생', 측정데이터: '45℃', 정상범위: '-10℃~40℃', 해제일시: '2023-12-02 16:59', 해제측정데이터: '38℃', 알람지속시간: '2h', 알람상태정보: '해제' },
    { id: 28, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기: 'VABJ023', 팩ID: 'B03', 알람구분: '저온도', 알람레벨: '경고', 발생일시: '2023-12-01 12:00', 알람내용: '배터리 저온도 발생', 측정데이터: '-11℃', 정상범위: '-10℃~40℃', 해제일시: '2023-12-01 13:00', 해제측정데이터: '-8℃', 알람지속시간: '1h', 알람상태정보: '해제' },
    { id: 29, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기: 'VABJ023', 팩ID: 'B04', 알람구분: '과전류', 알람레벨: '위험', 발생일시: '2023-11-30 15:16', 알람내용: '배터리 과전류 발생', 측정데이터: '112A', 정상범위: '0A~100A', 해제일시: '2023-11-30 16:16', 해제측정데이터: '98A', 알람지속시간: '1h', 알람상태정보: '해제' },
    { id: 30, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기: 'VABJ023', 팩ID: 'B05', 알람구분: '통신이상', 알람레벨: '경고', 발생일시: '2023-11-29 12:39', 알람내용: 'BMS 통신 이상', 측정데이터: 'Error', 정상범위: 'Normal', 해제일시: '2023-11-29 13:39', 해제측정데이터: 'Normal', 알람지속시간: '1h', 알람상태정보: '해제' },
    { id: 31, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기: 'VABJ023', 팩ID: 'B01', 알람구분: '과전압', 알람레벨: '위험', 발생일시: '2023-11-28 09:45', 알람내용: '배터리 과전압 발생', 측정데이터: '4.29V', 정상범위: '2.5V~4.2V', 해제일시: '2023-11-28 10:45', 해제측정데이터: '4.17V', 알람지속시간: '1h', 알람상태정보: '해제' },
    { id: 32, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기: 'VABJ023', 팩ID: 'B02', 알람구분: '저전압', 알람레벨: '경고', 발생일시: '2023-11-27 14:20', 알람내용: '배터리 저전압 발생', 측정데이터: '2.45V', 정상범위: '2.5V~4.2V', 해제일시: '2023-11-27 15:20', 해제측정데이터: '3.2V', 알람지속시간: '1h', 알람상태정보: '해제' },
    { id: 33, 사업장: 'FF캠핑카', 그룹: 'Bayrun 640', 기기: 'VABJ023', 팩ID: 'B03', 알람구분: '과온도', 알람레벨: '위험', 발생일시: '2023-11-26 10:30', 알람내용: '배터리 과온도 발생', 측정데이터: '44℃', 정상범위: '-10℃~40℃', 해제일시: '2023-11-26 12:30', 해제측정데이터: '39℃', 알람지속시간: '2h', 알람상태정보: '해제' }
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
      name: '기기',
      dataIndex: '기기',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px'
    },
    {
      name: '팩ID',
      dataIndex: '팩ID',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '80px'
    },
    {
      name: '알람 구분',
      dataIndex: '알람구분',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px',
      group: '이상알람',
      headerStyle: { color: 'red' }
    },
    {
      name: '알람 level',
      dataIndex: '알람레벨',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px',
      group: '이상알람',
      headerStyle: { color: 'red' }
    },
    {
      name: '발생일시',
      dataIndex: '발생일시',
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
      name: '조정데이터',
      dataIndex: '해제측정데이터',
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
      name: '알람 상태정보',
      dataIndex: '알람상태정보',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '120px'
    }
  ], []);

  const getFilteredData = useMemo(() => {
    switch (selectedType) {
      case '관리알람':
        return dummyData.filter(item => item.알람레벨 === '관리알람');
      case '이상알람':
        return dummyData.filter(item => item.알람레벨 === '이상알람');
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

          <div className="flex gap-1 items-center ml-4">
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
    </div>
  );
};

export default AlarmHistory; 