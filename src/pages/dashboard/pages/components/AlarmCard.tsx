import React, { useState, useEffect } from 'react';
import TextEditPopup from '@/components/popup/TextEditPopup';

interface AlarmCardProps {
    workplace: string;       // 사업장
    groupName: string;       // 그룹명
    deviceName: string;      // 기기명
    application: string;     // 어플리케이션
    packId: string;          // 팩ID
    packModel: string;       // 팩모델
    user: string;            // 사용자
    contact: string;         // 연락처
    alarmLevel: string;      // 알람 LEVEL
    alarmContent: string;    // 이상알람 내용
    alarmTime: string;       // 발생일시
    measureData: {           // 측정 Data
      value: string;         // 측정값
      range: string;         // 정상 범위
      duration: string;      // 경과시간
      confirmed: string;     // 확인여부
    };
    memo?: string;           // MEMO 등록
    onMemoChange?: (memo: string) => void;  // memo 변경 콜백 추가
    isSelected?: boolean;    // 선택 상태
    onSelect?: (selected: boolean) => void;  // 선택 이벤트 콜백
}
  
const AlarmCard: React.FC<AlarmCardProps> = ({
    workplace,
    groupName,
    deviceName,
    application,
    packId,
    packModel,
    user,
    contact,
    alarmLevel,
    alarmContent,
    alarmTime,
    measureData,
    memo,
    onMemoChange,
    isSelected: propIsSelected,
    onSelect
}) => {
    const [isMemoPopupOpen, setIsMemoPopupOpen] = useState(false);
    const [memoInput, setMemoInput] = useState(memo || '');
    const [isSelected, setIsSelected] = useState(propIsSelected || false);

    // 카드 클릭 핸들러
    const handleCardClick = () => {
        const newSelectedState = !isSelected;
        setIsSelected(newSelectedState);
        onSelect?.(newSelectedState);
    };

    // props로 전달된 선택 상태가 변경되면 내부 상태도 업데이트
    useEffect(() => {
        if (propIsSelected !== undefined) {
            setIsSelected(propIsSelected);
        }
    }, [propIsSelected]);

    const headerBgClass = isSelected ? 'bg-[#FF6969]' : 'bg-gray-700';
    const headerTextClass = isSelected ? 'text-white' : 'text-gray-400';

    return (
      <div className={`rounded-lg overflow-hidden shadow-lg border border-white ${isSelected ? 'bg-[#FF6969]' : 'bg-slate-800'}`}>
        {/* 헤더 영역 */}
        <div className="px-2 py-1 bg-gray-800">
          <div className="text-white font-medium">배터리 알람 정보</div>
        </div>

        <div className="cursor-pointer" onClick={handleCardClick}>
          <table className="w-full text-sm border-separate" style={{ borderSpacing: 0 }}>
            <tbody>
              {/* 기본 정보 */}
              <tr>
                <th className={`${headerBgClass} p-2 text-center border-r border-b border-gray-600/50 ${headerTextClass}`}>사업장</th>
                <th className={`${headerBgClass} p-2 text-center border-r border-b border-gray-600/50 ${headerTextClass}`}>그룹명</th>
                <th className={`${headerBgClass} p-2 text-center border-r border-b border-gray-600/50 ${headerTextClass}`}>기기명</th>
                <th className={`${headerBgClass} p-2 text-center border-b border-gray-600/50 ${headerTextClass}`}>어플리케이션</th>
              </tr>
              <tr className="border-b border-white/50">
                <td className="p-2 text-center border-r border-gray-600/50 text-white">{workplace}</td>
                <td className="p-2 text-center border-r border-gray-600/50 text-white">{groupName}</td>
                <td className="p-2 text-center border-r border-gray-600/50 text-white">{deviceName}</td>
                <td className="p-2 text-center text-white">{application}</td>
              </tr>

              {/* 추가 정보 */}
              <tr>
                <th className={`${headerBgClass} p-2 text-center border-r border-b border-gray-600/50 ${headerTextClass}`}>팩ID</th>
                <th className={`${headerBgClass} p-2 text-center border-r border-b border-gray-600/50 ${headerTextClass}`}>팩모델</th>
                <th className={`${headerBgClass} p-2 text-center border-r border-b border-gray-600/50 ${headerTextClass}`}>사용자</th>
                <th className={`${headerBgClass} p-2 text-center border-b border-gray-600/50 ${headerTextClass}`}>연락처</th>
              </tr>
              <tr className="border-b border-white/50">
                <td className="p-2 text-center border-r border-gray-600/50 text-white">{packId}</td>
                <td className="p-2 text-center border-r border-gray-600/50 text-white">{packModel}</td>
                <td className="p-2 text-center border-r border-gray-600/50 text-white">{user}</td>
                <td className="p-2 text-center text-white">{contact}</td>
              </tr>
    
              {/* 알람 정보 */}
              <tr>
                <th className={`${headerBgClass} p-2 text-center border-r border-b border-gray-600/50 ${headerTextClass}`}>알람 LEVEL</th>
                <th className={`${headerBgClass} p-2 text-center border-r border-b border-gray-600/50 ${headerTextClass}`}>이상알람 내용</th>
                <th className={`${headerBgClass} p-2 text-center border-b border-gray-600/50 ${headerTextClass}`} colSpan={2}>발생일시</th>
              </tr>
              <tr className="border-b border-white/50">
                <td className="p-2 text-center border-r border-gray-600/50 text-white">
                  <span className={
                    alarmLevel === '경고' ? 'text-[#F4B183]' : 
                    alarmLevel === '위험' ? 'text-[#FF3535]' : 
                    alarmLevel === '관리' ? 'text-[#FFE699]' : 
                    'text-white'
                  }>
                    {alarmLevel}
                  </span>
                </td>
                <td className="p-2 text-center border-r border-gray-600/50 text-white">{alarmContent}</td>
                <td className="p-2 text-center text-white" colSpan={2}>{alarmTime}</td>
              </tr>
    
              {/* 측정 Data */}
              <tr>
                <th className={`${headerBgClass} p-2 text-center border-r border-b border-gray-600/50 ${headerTextClass}`}>측정 DATA</th>
                <th className={`${headerBgClass} p-2 text-center border-r border-b border-gray-600/50 ${headerTextClass}`}>정상 범위</th>
                <th className={`${headerBgClass} p-2 text-center border-r border-b border-gray-600/50 ${headerTextClass}`}>경과시간</th>
                <th className={`${headerBgClass} p-2 text-center border-b border-gray-600/50 ${headerTextClass}`}>확인여부</th>
              </tr>
              <tr className={memo ? 'border-b border-white/50' : ''}>
                <td className="p-2 text-center border-r border-gray-600/50 text-white">{measureData.value}</td>
                <td className="p-2 text-center border-r border-gray-600/50 text-white">{measureData.range}</td>
                <td className="p-2 text-center border-r border-gray-600/50 text-white">{measureData.duration}</td>
                <td className="p-2 text-center text-white">
                  <span className="text-yellow-500">{measureData.confirmed}</span>
                </td>
              </tr>
    
              {/* 구분선 추가 */}
              <tr>
                <td colSpan={4} className="border-b border-gray-600"></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* MEMO 입력 영역 - 클릭 영역에서 제외 */}
        <div onClick={(e) => e.stopPropagation()}>
          <table className="w-full text-sm border-separate" style={{ borderSpacing: 0 }}>
            <tbody>
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
        </div>

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