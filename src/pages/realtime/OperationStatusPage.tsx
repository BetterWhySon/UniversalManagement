import React from 'react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import TableData from '@/components/table/TableData';
import { TEXT_ALIGN } from '@/enums/table';

interface GroupSummary {
  name: string;
  전기차운영대수: string;
  배터리운영대수: string;
  배터리설치용량: string;
  배터리누적방전용량: string;
  운영효율: string;
}

interface BatteryOperation {
  사업장: string;
  그룹: string;
  기기no: string;
  배터리번호: string;
  실시간상태정보: string;
  SOC: string;
  전압: string;
  전류: string;
  온도: string;
  저항: string;
  SOC변화: string;
  전압변화: string;
  온도변화: string;
  용량변화: string;
  이상알람: string;
  관리알람: string;
  기타: string;
}

const pagination = {
  total: 0,
  pageSize: 8,
};

const OperationStatusPage: React.FC = () => {
  const { t: trans } = useTranslation('translation');

  const summaryData = {
    total: {
      전기차운영대수: "200대",
      배터리운영대수: "200대",
      배터리설치용량: "20,000kWh"
    },
    groups: [
      {
        name: "그룹 1",
        전기차운영대수: "30대",
        배터리운영대수: "30대",
        배터리설치용량: "3,000kWh",
        배터리누적방전용량: "3,000kWh",
        운영효율: "86%"
      },
      {
        name: "그룹 2",
        전기차운영대수: "40대",
        배터리운영대수: "40대",
        배터리설치용량: "4,200kWh",
        배터리누적방전용량: "4,000kWh",
        운영효율: "74%"
      },
      {
        name: "그룹 3",
        전기차운영대수: "50대",
        배터리운영대수: "50대",
        배터리설치용량: "6,000kWh",
        배터리누적방전용량: "5,000kWh",
        운영효율: "55%"
      },
      {
        name: "그룹 4",
        전기차운영대수: "20대",
        배터리운영대수: "20대",
        배터리설치용량: "2,800kWh",
        배터리누적방전용량: "2,000kWh",
        운영효율: "66%"
      },
      {
        name: "그룹 5",
        전기차운영대수: "15대",
        배터리운영대수: "15대",
        배터리설치용량: "1,500kWh",
        배터리누적방전용량: "1,500kWh",
        운영효율: "92%"
      },
      {
        name: "그룹 6",
        전기차운영대수: "25대",
        배터리운영대수: "25대",
        배터리설치용량: "2,500kWh",
        배터리누적방전용량: "2,300kWh",
        운영효율: "78%"
      },
      {
        name: "그룹 7",
        전기차운영대수: "35대",
        배터리운영대수: "35대",
        배터리설치용량: "3,500kWh",
        배터리누적방전용량: "3,200kWh",
        운영효율: "82%"
      },
      {
        name: "그룹 8",
        전기차운영대수: "45대",
        배터리운영대수: "45대",
        배터리설치용량: "4,500kWh",
        배터리누적방전용량: "4,100kWh",
        운영효율: "88%"
      },
      {
        name: "그룹 9",
        전기차운영대수: "28대",
        배터리운영대수: "28대",
        배터리설치용량: "2,800kWh",
        배터리누적방전용량: "2,600kWh",
        운영효율: "76%"
      },
      {
        name: "그룹 10",
        전기차운영대수: "32대",
        배터리운영대수: "32대",
        배터리설치용량: "3,200kWh",
        배터리누적방전용량: "3,000kWh",
        운영효율: "84%"
      }
    ]
  };

  const [batteryDetailData] = useState([
    { id: 1, 사업장: "서울 사업장", 그룹: "그룹 1", 기기no: "DEV001", 배터리번호: "BAT001", 실시간상태정보: "정상", SOC: "85%", 전압: "48.2V", 전류: "12A", 온도: "25°C", 저항: "0.5Ω", SOC변화: "+2%", 전압변화: "+0.1V", 온도변화: "+1°C", 용량변화: "-0.1kWh", 이상알람: "-", 관리알람: "-", 기타: "-" },
    { id: 2, 사업장: "부산 사업장", 그룹: "그룹 2", 기기no: "DEV002", 배터리번호: "BAT002", 실시간상태정보: "충전중", SOC: "45%", 전압: "47.8V", 전류: "15A", 온도: "28°C", 저항: "0.6Ω", SOC변화: "+5%", 전압변화: "+0.2V", 온도변화: "+2°C", 용량변화: "-0.2kWh", 이상알람: "온도상승", 관리알람: "점검필요", 기타: "-" },
    { id: 3, 사업장: "대구 사업장", 그룹: "그룹 3", 기기no: "DEV003", 배터리번호: "BAT003", 실시간상태정보: "방전중", SOC: "65%", 전압: "48.0V", 전류: "-10A", 온도: "24°C", 저항: "0.4Ω", SOC변화: "-3%", 전압변화: "-0.1V", 온도변화: "0°C", 용량변화: "-0.3kWh", 이상알람: "-", 관리알람: "-", 기타: "-" },
    { id: 4, 사업장: "인천 사업장", 그룹: "그룹 4", 기기no: "DEV004", 배터리번호: "BAT004", 실시간상태정보: "대기", SOC: "90%", 전압: "48.5V", 전류: "0A", 온도: "22°C", 저항: "0.5Ω", SOC변화: "0%", 전압변화: "0V", 온도변화: "-1°C", 용량변화: "0kWh", 이상알람: "-", 관리알람: "-", 기타: "-" },
    { id: 5, 사업장: "광주 사업장", 그룹: "그룹 5", 기기no: "DEV005", 배터리번호: "BAT005", 실시간상태정보: "충전중", SOC: "30%", 전압: "47.5V", 전류: "18A", 온도: "29°C", 저항: "0.7Ω", SOC변화: "+6%", 전압변화: "+0.3V", 온도변화: "+3°C", 용량변화: "-0.2kWh", 이상알람: "과전류", 관리알람: "주의", 기타: "-" },
    { id: 6, 사업장: "대전 사업장", 그룹: "그룹 6", 기기no: "DEV006", 배터리번호: "BAT006", 실시간상태정보: "방전중", SOC: "70%", 전압: "48.1V", 전류: "-8A", 온도: "26°C", 저항: "0.5Ω", SOC변화: "-2%", 전압변화: "-0.1V", 온도변화: "+1°C", 용량변화: "-0.1kWh", 이상알람: "-", 관리알람: "-", 기타: "-" },
    { id: 7, 사업장: "울산 사업장", 그룹: "그룹 7", 기기no: "DEV007", 배터리번호: "BAT007", 실시간상태정보: "충전중", SOC: "55%", 전압: "47.9V", 전류: "14A", 온도: "27°C", 저항: "0.6Ω", SOC변화: "+4%", 전압변화: "+0.2V", 온도변화: "+2°C", 용량변화: "-0.2kWh", 이상알람: "-", 관리알람: "점검필요", 기타: "-" },
    { id: 8, 사업장: "세종 사업장", 그룹: "그룹 8", 기기no: "DEV008", 배터리번호: "BAT008", 실시간상태정보: "대기", SOC: "95%", 전압: "48.6V", 전류: "0A", 온도: "23°C", 저항: "0.4Ω", SOC변화: "0%", 전압변화: "0V", 온도변화: "-1°C", 용량변화: "0kWh", 이상알람: "-", 관리알람: "-", 기타: "-" },
    { id: 9, 사업장: "제주 사업장", 그룹: "그룹 9", 기기no: "DEV009", 배터리번호: "BAT009", 실시간상태정보: "충전중", SOC: "40%", 전압: "47.7V", 전류: "16A", 온도: "28°C", 저항: "0.6Ω", SOC변화: "+5%", 전압변화: "+0.2V", 온도변화: "+2°C", 용량변화: "-0.2kWh", 이상알람: "온도상승", 관리알람: "주의", 기타: "-" },
    { id: 10, 사업장: "경기 사업장", 그룹: "그룹 10", 기기no: "DEV010", 배터리번호: "BAT010", 실시간상태정보: "방전중", SOC: "75%", 전압: "48.2V", 전류: "-9A", 온도: "25°C", 저항: "0.5Ω", SOC변화: "-2%", 전압변화: "-0.1V", 온도변화: "+1°C", 용량변화: "-0.1kWh", 이상알람: "-", 관리알람: "-", 기타: "-" },
    { id: 11, 사업장: "강원 사업장", 그룹: "��룹 1", 기기no: "DEV011", 배터리번호: "BAT011", 실시간상태정보: "정상", SOC: "82%", 전압: "48.3V", 전류: "11A", 온도: "26°C", 저항: "0.5Ω", SOC변화: "+2%", 전압변화: "+0.1V", 온도변화: "+1°C", 용량변화: "-0.1kWh", 이상알람: "-", 관리알람: "-", 기타: "-" },
    { id: 12, 사업장: "충북 사업장", 그룹: "그룹 2", 기기no: "DEV012", 배터리번호: "BAT012", 실시간상태정보: "충전중", SOC: "48%", 전압: "47.9V", 전류: "14A", 온도: "27°C", 저항: "0.6Ω", SOC변화: "+4%", 전압변화: "+0.2V", 온도변화: "+2°C", 용량변화: "-0.2kWh", 이상알람: "-", 관리알람: "-", 기타: "-" },
    { id: 13, 사업장: "충남 사업장", 그룹: "그룹 3", 기기no: "DEV013", 배터리번호: "BAT013", 실시간상태정보: "방전중", SOC: "68%", 전압: "48.1V", 전류: "-9A", 온도: "25°C", 저항: "0.5Ω", SOC변화: "-2%", 전압변화: "-0.1V", 온도변화: "+1°C", 용량변화: "-0.1kWh", 이상알람: "-", 관리알람: "-", 기타: "-" },
    { id: 14, 사업장: "전북 사업장", 그룹: "그룹 4", 기기no: "DEV014", 배터리번호: "BAT014", 실시간상태정보: "대기", SOC: "92%", 전압: "48.5V", 전류: "0A", 온도: "23°C", 저항: "0.4Ω", SOC변화: "0%", 전압변화: "0V", 온도변화: "-1°C", 용량변화: "0kWh", 이상알람: "-", 관리알람: "-", 기타: "-" },
    { id: 15, 사업장: "전남 사업장", 그룹: "그룹 5", 기기no: "DEV015", 배터리번호: "BAT015", 실시간상태정보: "충전중", SOC: "35%", 전압: "47.6V", 전류: "16A", 온도: "28°C", 저항: "0.6Ω", SOC변화: "+5%", 전압변화: "+0.2V", 온도변화: "+2°C", 용량변화: "-0.2kWh", 이상알람: "온도상승", 관리알람: "주의", 기타: "-" },
    { id: 16, 사업장: "경북 사업장", 그룹: "그룹 6", 기기no: "DEV016", 배터리번호: "BAT016", 실시간상태정보: "정상", SOC: "88%", 전압: "48.4V", 전류: "10A", 온도: "24°C", 저항: "0.5Ω", SOC변화: "+2%", 전압변화: "+0.1V", 온도변화: "+1°C", 용량변화: "-0.1kWh", 이상알람: "-", 관리알람: "-", 기타: "-" },
    { id: 17, 사업장: "경남 사업장", 그룹: "그룹 7", 기기no: "DEV017", 배터리번호: "BAT017", 실시간상태정보: "충전중", SOC: "42%", 전압: "47.7V", 전류: "15A", 온도: "27°C", 저항: "0.6Ω", SOC변화: "+4%", 전압변화: "+0.2V", 온도변화: "+2°C", 용량변화: "-0.2kWh", 이상알람: "-", 관리알람: "-", 기타: "-" },
    { id: 18, 사업장: "서울중구 사업장", 그룹: "그룹 8", 기기no: "DEV018", 배터리번호: "BAT018", 실시간상태정보: "방전중", SOC: "72%", 전압: "48.2V", 전류: "-8A", 온도: "25°C", 저항: "0.5Ω", SOC변화: "-2%", 전압변화: "-0.1V", 온도변화: "+1°C", 용량변화: "-0.1kWh", 이상알람: "-", 관리알람: "-", 기타: "-" },
    { id: 19, 사업장: "서울종로 사업장", 그룹: "그룹 9", 기기no: "DEV019", 배터리번호: "BAT019", 실시간상태정보: "대기", SOC: "94%", 전압: "48.6V", 전류: "0A", 온도: "22°C", 저항: "0.4Ω", SOC변화: "0%", 전압변화: "0V", 온도변화: "-1°C", 용량변화: "0kWh", 이상알람: "-", 관리알람: "-", 기타: "-" },
    { id: 20, 사업장: "서울마포 사업장", 그룹: "그룹 10", 기기no: "DEV020", 배터리번호: "BAT020", 실시간상태정보: "충전중", SOC: "38%", 전압: "47.6V", 전류: "17A", 온도: "28°C", 저항: "0.6Ω", SOC변화: "+5%", 전압변화: "+0.2V", 온도변화: "+2°C", 용량변화: "-0.2kWh", 이상알람: "과전류", 관리알람: "주의", 기타: "-" },
    { id: 21, 사업장: "부산중구 사업장", 그룹: "그룹 1", 기기no: "DEV021", 배터리번호: "BAT021", 실시간상태정보: "정상", SOC: "86%", 전압: "48.3V", 전류: "11A", 온도: "25°C", 저항: "0.5Ω", SOC변화: "+2%", 전압변화: "+0.1V", 온도변화: "+1°C", 용량변화: "-0.1kWh", 이상알람: "-", 관리알람: "-", 기타: "-" },
    { id: 22, 사업장: "부산해운대 사업장", 그룹: "그룹 2", 기기no: "DEV022", 배터리번호: "BAT022", 실시간상태정보: "충전중", SOC: "44%", 전압: "47.8V", 전류: "15A", 온도: "27°C", 저항: "0.6Ω", SOC변화: "+4%", 전압변화: "+0.2V", 온도변화: "+2°C", 용량변화: "-0.2kWh", 이상알람: "-", 관리알람: "-", 기타: "-" },
    { id: 23, 사업장: "대구중구 사업장", 그룹: "그룹 3", 기기no: "DEV023", 배터리번호: "BAT023", 실시간상태정보: "방전중", SOC: "70%", 전압: "48.1V", 전류: "-9A", 온도: "24°C", 저항: "0.5Ω", SOC변화: "-2%", 전압변화: "-0.1V", 온도변화: "+1°C", 용량변화: "-0.1kWh", 이상알람: "-", 관리알람: "-", 기타: "-" },
    { id: 24, 사업장: "인천중구 사업장", 그룹: "그룹 4", 기기no: "DEV024", 배터리번호: "BAT024", 실시간상태정보: "대기", SOC: "96%", 전압: "48.7V", 전류: "0A", 온도: "22°C", 저항: "0.4Ω", SOC변화: "0%", 전압변화: "0V", 온도변화: "-1°C", 용량변화: "0kWh", 이상알람: "-", 관리알람: "-", 기타: "-" },
    { id: 25, 사업장: "광주북구 사업장", 그룹: "그룹 5", 기기no: "DEV025", 배터리번호: "BAT025", 실시간상태정보: "충전중", SOC: "32%", 전압: "47.5V", 전류: "16A", 온도: "28°C", 저항: "0.6Ω", SOC변화: "+5%", 전압변화: "+0.2V", 온도변화: "+2°C", 용량변화: "-0.2kWh", 이상알람: "온도상승", 관리알람: "주의", 기타: "-" },
    { id: 26, 사업장: "대전중구 사업장", 그룹: "그룹 6", 기기no: "DEV026", 배터리번호: "BAT026", 실시간상태정보: "정상", SOC: "84%", 전압: "48.3V", 전류: "11A", 온도: "25°C", 저항: "0.5Ω", SOC변화: "+2%", 전압변화: "+0.1V", 온도변화: "+1°C", 용량변화: "-0.1kWh", 이상알람: "-", 관리알람: "-", 기타: "-" },
    { id: 27, 사업장: "울산중구 사업장", 그룹: "그룹 7", 기기no: "DEV027", 배터리번호: "BAT027", 실시간상태정보: "충전중", SOC: "46%", 전압: "47.8V", 전류: "14A", 온도: "27°C", 저항: "0.6Ω", SOC변화: "+4%", 전압변화: "+0.2V", 온도변화: "+2°C", 용량변화: "-0.2kWh", 이상알람: "-", 관리알람: "-", 기타: "-" },
    { id: 28, 사업장: "세종시 사업장", 그룹: "그룹 8", 기기no: "DEV028", 배터리번호: "BAT028", 실시간상태정보: "방전중", SOC: "74%", 전압: "48.2V", 전류: "-8A", 온도: "25°C", 저항: "0.5Ω", SOC변화: "-2%", 전압변화: "-0.1V", 온도변화: "+1°C", 용량변화: "-0.1kWh", 이상알람: "-", 관리알람: "-", 기타: "-" },
    { id: 29, 사업장: "제주시 사업장", 그룹: "그룹 9", 기기no: "DEV029", 배터리번호: "BAT029", 실시간상태정보: "대기", SOC: "98%", 전압: "48.8V", 전류: "0A", 온도: "22°C", 저항: "0.4Ω", SOC변화: "0%", 전압변화: "0V", 온도변화: "-1°C", 용량변화: "0kWh", 이상알람: "-", 관리알람: "-", 기타: "-" },
    { id: 30, 사업장: "경기수원 사업장", 그룹: "그룹 10", 기기no: "DEV030", 배터리번호: "BAT030", 실시간상태정보: "충전중", SOC: "36%", 전압: "47.6V", 전류: "16A", 온도: "28°C", 저항: "0.6Ω", SOC변화: "+5%", 전압변화: "+0.2V", 온도변화: "+2°C", 용량변화: "-0.2kWh", 이상알람: "과전류", 관리알람: "주의", 기타: "-" }
  ]);

  const columns = [
    {
      name: '사업장',
      dataIndex: '사업장',
      paddingInline: '24px',
      align: TEXT_ALIGN.LEFT,
      fixedWidth: '150px',
    },
    {
      name: '그룹',
      dataIndex: '그룹',
      paddingInline: '24px',
      align: TEXT_ALIGN.LEFT,
      fixedWidth: '130px',
    },
    {
      name: '기기 no.',
      dataIndex: '기기no',
      paddingInline: '24px',
      align: TEXT_ALIGN.LEFT,
      fixedWidth: '130px',
    },
    {
      name: '배터리 번호',
      dataIndex: '배터리번호',
      paddingInline: '24px',
      align: TEXT_ALIGN.LEFT,
      fixedWidth: '130px',
    },
    {
      name: '실시간 상태정보',
      dataIndex: '실시간태정보',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '150px',
    },
    {
      name: 'SOC',
      dataIndex: 'SOC',
      paddingInline: '24px',
      align: TEXT_ALIGN.RIGHT,
      fixedWidth: '100px',
    },
    {
      name: '전압',
      dataIndex: '전압',
      paddingInline: '24px',
      align: TEXT_ALIGN.RIGHT,
      fixedWidth: '100px',
    },
    {
      name: '전류',
      dataIndex: '전류',
      paddingInline: '24px',
      align: TEXT_ALIGN.RIGHT,
      fixedWidth: '100px',
    },
    {
      name: '온도',
      dataIndex: '온도',
      paddingInline: '24px',
      align: TEXT_ALIGN.RIGHT,
      fixedWidth: '100px',
    },
    {
      name: '저항',
      dataIndex: '저항',
      paddingInline: '24px',
      align: TEXT_ALIGN.RIGHT,
      fixedWidth: '100px',
    },
    {
      name: 'SOC 변화',
      dataIndex: 'SOC변화',
      paddingInline: '24px',
      align: TEXT_ALIGN.RIGHT,
      fixedWidth: '100px',
    },
    {
      name: '전압 변화',
      dataIndex: '전압변화',
      paddingInline: '24px',
      align: TEXT_ALIGN.RIGHT,
      fixedWidth: '100px',
    },
    {
      name: '온도 변화',
      dataIndex: '온도변화',
      paddingInline: '24px',
      align: TEXT_ALIGN.RIGHT,
      fixedWidth: '100px',
    },
    {
      name: '용량 변화',
      dataIndex: '용량변화',
      paddingInline: '24px',
      align: TEXT_ALIGN.RIGHT,
      fixedWidth: '100px',
    },
    {
      name: '이상알람',
      dataIndex: '이상알람',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px',
    },
    {
      name: '관리알람',
      dataIndex: '관리알람',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px',
    },
    {
      name: '기타',
      dataIndex: '기타',
      paddingInline: '24px',
      align: TEXT_ALIGN.CENTER,
      fixedWidth: '100px',
    },
  ];

  // 스크롤 관련 상태와 핸들러 추가
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="flex flex-col h-full bg-hw-dark-1">
      <div className="flex-shrink-0 px-[18px] lg:px-[55px] pt-3 lg:pt-5 pb-4">
        <div className='transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 w-full mb-4 h-fit md:h-5'>
          <h1 className='w-full text-hw-white-1 text-[16px] font-normal leading-4 lg:text-xl lg:leading-none'>
            실시간 운영현황
          </h1>
        </div>

        {/* 카드 영역 */}
        <div className="flex gap-4">
          {/* 배터리 종합현황 카드 - 고정 */}
          <div className="w-[300px] flex-shrink-0 bg-hw-dark-2 p-4 rounded-lg border-[4px] border-blue-500/50">
            <h2 className="text-hw-white-1 text-lg font-medium mb-4">배터리 종합현황</h2>
            <div className="space-y-5">
              <div className="flex justify-between items-center border-b border-gray-600/50 pb-3">
                <span className="text-gray-400 text-sm">전기차 운영 대수</span>
                <span className="text-blue-400 text-2xl font-bold">{summaryData.total.전기차운영대수}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-600/50 pb-3">
                <span className="text-gray-400 text-sm">배터리 운영 대수</span>
                <span className="text-green-400 text-2xl font-bold">{summaryData.total.배터리운영대수}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">배터리 설치 용량</span>
                <span className="text-yellow-400 text-2xl font-bold">{summaryData.total.배터리설치용량}</span>
              </div>
            </div>
          </div>

          {/* 그룹별 현황 카드들 - 스크롤 영역 */}
          <div 
            ref={scrollRef}
            className="flex-grow overflow-x-auto"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex gap-4 min-w-min cursor-grab active:cursor-grabbing select-none">
              {summaryData.groups.map((group, index) => (
                <div 
                  key={index} 
                  className="w-[250px] flex-shrink-0 bg-hw-dark-2 p-4 rounded-lg"
                >
                  <h3 className="text-hw-white-1 text-lg mb-2">{group.name}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">전기차 운영 대수</span>
                      <span className="text-hw-white-1">{group.전기차운영대수}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">배터리 운영 대수</span>
                      <span className="text-hw-white-1">{group.배터리운영대수}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">배터리 설치 용량</span>
                      <span className="text-hw-white-1">{group.배터리설치용량}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">배터리 누적방전용량</span>
                      <span className="text-hw-white-1">{group.배터리누적방전용량}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">운영효율</span>
                      <span className="text-hw-white-1">{group.운영효율}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 실시간 배터리 운영 현황 세부 테이블 */}
      <div className="flex-grow overflow-auto px-[18px] lg:px-[55px]">
        <h2 className="text-hw-white-1 text-lg mb-3">실시간 배터리 운영 현황 세부</h2>
        <div className="overflow-x-auto">
          <TableData<typeof batteryDetailData[0]>
            data={batteryDetailData}
            columns={columns}
            isPagination
            pagination={{
              total: batteryDetailData.length,
              pageSize: 8,
            }}
            paginationMarginTop='32px'
            emptyMessage='데이터가 없습니다.'
          />
        </div>
      </div>
    </div>
  );
};  

export default OperationStatusPage; 