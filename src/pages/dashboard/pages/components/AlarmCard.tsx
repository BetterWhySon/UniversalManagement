import React, { useState } from 'react';
import TextEditPopup from '@/components/popup/TextEditPopup';

interface AlarmCardProps {
    dongHo: string;          // 동/호수
    carNumber: string;       // 차량번호
    owner: string;          // 차주
    contact: string;        // 연락처
    alarmLevel: string;     // 알람 LEVEL
    alarmContent: string;   // 이상알람 내용
    alarmTime: string;      // 발생시시
    measureData: {          // 측정 Data
      value: string;        // 측정값
      range: string;        // 정상 범위
      duration: string;     // 경과시간
      status: string;       // 알람 진행
    };
    memo?: string;          // MEMO 등록
    onMemoChange?: (memo: string) => void;  // memo 변경 콜백 추가
  }
  
  const AlarmCard: React.FC<AlarmCardProps> = ({
    dongHo,
    carNumber,
    owner,
    contact,
    alarmLevel,
    alarmContent,
    alarmTime,
    measureData,
    memo,
    onMemoChange
  }) => {
    const [isMemoPopupOpen, setIsMemoPopupOpen] = useState(false);
    const [memoInput, setMemoInput] = useState(memo || '');

    return (
      <div className="rounded-lg overflow-hidden bg-slate-800 shadow-lg border border-white">
        <table className="w-full text-sm border-separate" style={{ borderSpacing: 0 }}>
          <tbody>
            {/* 기본 정보 */}
            <tr>
              <th className="bg-gray-700 p-2 text-center border-r border-b border-gray-600/50 text-gray-400">동/호수</th>
              <th className="bg-gray-700 p-2 text-center border-r border-b border-gray-600/50 text-gray-400">차량번호</th>
              <th className="bg-gray-700 p-2 text-center border-r border-b border-gray-600/50 text-gray-400">차주</th>
              <th className="bg-gray-700 p-2 text-center border-b border-gray-600/50 text-gray-400">연락처</th>
            </tr>
            <tr className="border-b border-white/50">
              <td className="p-2 text-center border-r border-gray-600/50 text-white">{dongHo}</td>
              <td className="p-2 text-center border-r border-gray-600/50 text-white">{carNumber}</td>
              <td className="p-2 text-center border-r border-gray-600/50 text-white">{owner}</td>
              <td className="p-2 text-center text-white">{contact}</td>
            </tr>
  
            {/* 알람 정보 */}
            <tr>
              <th className="bg-gray-700 p-2 text-center border-r border-b border-gray-600/50 text-gray-400">알람 LEVEL</th>
              <th className="bg-gray-700 p-2 text-center border-r border-b border-gray-600/50 text-gray-400">이상알람 내용</th>
              <th className="bg-gray-700 p-2 text-center border-b border-gray-600/50 text-gray-400" colSpan={2}>발생시시</th>
            </tr>
            <tr className="border-b border-white/50">
              <td className="p-2 text-center border-r border-gray-600/50 text-white">
                <span className={alarmLevel === '경고' ? 'text-yellow-500' : 'text-red-500'}>
                  {alarmLevel}
                </span>
              </td>
              <td className="p-2 text-center border-r border-gray-600/50 text-white">{alarmContent}</td>
              <td className="p-2 text-center text-white" colSpan={2}>{alarmTime}</td>
            </tr>
  
            {/* 측정 Data */}
            <tr>
              <th className="bg-gray-700 p-2 text-center border-r border-b border-gray-600/50 text-gray-400">측정 Data</th>
              <th className="bg-gray-700 p-2 text-center border-r border-b border-gray-600/50 text-gray-400">정상 범위</th>
              <th className="bg-gray-700 p-2 text-center border-r border-b border-gray-600/50 text-gray-400">경과시간</th>
              <th className="bg-gray-700 p-2 text-center border-b border-gray-600/50 text-gray-400">알람 진행</th>
            </tr>
            <tr className={memo ? 'border-b border-white/50' : ''}>
              <td className="p-2 text-center border-r border-gray-600/50 text-white">{measureData.value}</td>
              <td className="p-2 text-center border-r border-gray-600/50 text-white">{measureData.range}</td>
              <td className="p-2 text-center border-r border-gray-600/50 text-white">{measureData.duration}</td>
              <td className="p-2 text-center text-white">
                <span className="text-yellow-500">{measureData.status}</span>
              </td>
            </tr>
  
            {/* 구분선 추가 */}
            <tr>
              <td colSpan={4} className="border-b border-gray-600"></td>
            </tr>
  
            {/* MEMO 입력 영역 */}
            <tr>
              <th className="p-1 pt-3 text-left text-gray-400" colSpan={4}>Memo</th>
            </tr>
            <tr>
              <td className="pt-0 px-2 pb-3" colSpan={4}>
                <input
                  type="text"
                  value={memoInput}
                  onClick={() => setIsMemoPopupOpen(true)}
                  readOnly
                  className="w-full px-2 py-1 bg-slate-700/30 text-white border border-gray-600 rounded cursor-pointer"
                  placeholder="메모를 입력하세요"
                />
              </td>
            </tr>
          </tbody>
        </table>

        {/* 메모 입력 팝업 */}
        {isMemoPopupOpen && (
          <TextEditPopup
            title="MEMO 등록"
            initialText={memoInput}
            onSave={(text) => {
              setMemoInput(text);
              onMemoChange?.(text);
              setIsMemoPopupOpen(false);
            }}
            onCancel={() => setIsMemoPopupOpen(false)}
          />
        )}
      </div>
    );
  };
  
  export default AlarmCard;