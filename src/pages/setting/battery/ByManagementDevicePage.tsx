import React from 'react';
import ManagementPageTemplate from './components/ManagementPageTemplate';
const companies = [
    {
      name: "서울 사업장",
      groups: [
        { name: "그룹 A", devices: ["DEV001", "DEV002", "DEV003"] },
        { name: "그룹 B", devices: ["DEV004", "DEV005"] }
      ]
    },
    {
      name: "부산 사업장",
      groups: [
        { name: "그룹 A", devices: ["DEV006", "DEV007", "DEV008"] },
        { name: "그룹 B", devices: ["DEV009", "DEV010"] }
      ]
    },
    {
      name: "대구 사업장",
      groups: [
        { name: "그룹 A", devices: ["DEV011", "DEV012", "DEV013"] },
        { name: "그룹 B", devices: ["DEV014", "DEV015"] },
        { name: "그룹 C", devices: ["DEV016", "DEV017"] }
      ]
    },
    {
      name: "인천 사업장",
      groups: [
        { name: "그룹 A", devices: ["DEV018", "DEV019", "DEV020"] },
        { name: "그룹 B", devices: ["DEV021", "DEV022"] },
        { name: "그룹 C", devices: ["DEV023", "DEV024", "DEV025"] }
      ]
    }
  ];
  
  const mockData = [
    { id: 'VABJ001', before: 85, after: 92, beforeDiff: 5, afterDiff: 2, level: 'normal', average: 90, info: { company: '신일운수', group: '영업1팀', deviceId: 'VABJ001', user: '김영식', birthDate: '1975-05-21', gender: '남', contact: '010-1234-5678' } },
    { id: 'VABJ002', before: 78, after: 88, beforeDiff: -2, afterDiff: 3, level: 'warning', average: 85, info: { company: '신일운수', group: '영업2팀', deviceId: 'VABJ002', user: '이철수', birthDate: '1980-03-15', gender: '남', contact: '010-2345-6789' } },
    { id: 'VABJ003', before: 92, after: 95, beforeDiff: 8, afterDiff: 5, level: 'good', average: 93, info: { company: '신일운수', group: '영업1팀', deviceId: 'VABJ003', user: '박영희', birthDate: '1982-11-30', gender: '여', contact: '010-3456-7890' } },
    { id: 'VABJ004', before: 75, after: 82, beforeDiff: -5, afterDiff: -3, level: 'warning', average: 80, info: { company: '신일운수', group: '영업2팀', deviceId: 'VABJ004', user: '최민수', birthDate: '1978-07-25', gender: '남', contact: '010-4567-8901' } },
    { id: 'VABJ005', before: 88, after: 91, beforeDiff: 3, afterDiff: 1, level: 'normal', average: 89, info: { company: '신일운수', group: '영업1팀', deviceId: 'VABJ005', user: '정미영', birthDate: '1985-09-12', gender: '여', contact: '010-5678-9012' } },
    { id: 'VABJ006', before: 82, after: 87, beforeDiff: -1, afterDiff: 2, level: 'normal', average: 86, info: { company: '신일운수', group: '영업2팀', deviceId: 'VABJ006', user: '김민재', birthDate: '1983-12-05', gender: '남', contact: '010-6789-0123' } },
    { id: 'VABJ007', before: 79, after: 84, beforeDiff: -3, afterDiff: -1, level: 'warning', average: 83, info: { company: '신일운수', group: '영업1팀', deviceId: 'VABJ007', user: '이지원', birthDate: '1979-08-17', gender: '여', contact: '010-7890-1234' } },
    { id: 'VABJ008', before: 91, after: 94, beforeDiff: 6, afterDiff: 4, level: 'good', average: 92, info: { company: '신일운수', group: '영업2팀', deviceId: 'VABJ008', user: '박준호', birthDate: '1981-04-23', gender: '남', contact: '010-8901-2345' } },
    { id: 'VABJ009', before: 84, after: 89, beforeDiff: 2, afterDiff: 0, level: 'normal', average: 87, info: { company: '신일운수', group: '영업1팀', deviceId: 'VABJ009', user: '김서연', birthDate: '1984-10-08', gender: '여', contact: '010-9012-3456' } },
    { id: 'VABJ010', before: 77, after: 83, beforeDiff: -4, afterDiff: -2, level: 'warning', average: 81, info: { company: '신일운수', group: '영업2팀', deviceId: 'VABJ010', user: '최동훈', birthDate: '1977-06-14', gender: '남', contact: '010-0123-4567' } },
    { id: 'VABJ011', before: 86, after: 90, beforeDiff: 4, afterDiff: 1, level: 'normal', average: 88, info: { company: '신일운수', group: '영업1팀', deviceId: 'VABJ011', user: '정영', birthDate: '1986-02-19', gender: '여', contact: '010-1234-5679' } },
    { id: 'VABJ012', before: 93, after: 96, beforeDiff: 7, afterDiff: 6, level: 'good', average: 94, info: { company: '신일운수', group: '영업2팀', deviceId: 'VABJ012', user: '이태준', birthDate: '1982-12-01', gender: '남', contact: '010-2345-6780' } },
    { id: 'VABJ013', before: 81, after: 86, beforeDiff: 0, afterDiff: -1, level: 'normal', average: 84, info: { company: '신일운수', group: '영업1팀', deviceId: 'VABJ013', user: '김민지', birthDate: '1983-07-27', gender: '여', contact: '010-3456-7891' } },
    { id: 'VABJ014', before: 76, after: 81, beforeDiff: -6, afterDiff: -4, level: 'warning', average: 79, info: { company: '신일운수', group: '영업2팀', deviceId: 'VABJ014', user: '박성민', birthDate: '1980-01-11', gender: '남', contact: '010-4567-8902' } }
  ];
const ByManagementDevicePage = () => {
  return (
    <ManagementPageTemplate 
      title="관리기기별 조회"
      defaultChartType="비교차트"
      companies={companies}
      mockData={mockData}
      pageType="device"
    />
  );
};

export default ByManagementDevicePage; 