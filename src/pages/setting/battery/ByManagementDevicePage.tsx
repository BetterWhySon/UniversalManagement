import React from 'react';

const ByManagementDevicePage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">관리기기별 조회</h1>
      <div className="bg-white rounded-lg p-6">
        <div className="grid gap-4">
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold mb-4">배터리 관리기기 분석</h2>
            {/* 필터 섹션 */}
            <div className="mb-6 p-4 bg-gray-50 rounded">
              {/* 필터 컨텐츠 */}
            </div>
            {/* 데이터 표시 영역 */}
            <div className="border rounded">
              {/* 데이터 테이블이나 차트가 들어갈 자리 */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ByManagementDevicePage; 