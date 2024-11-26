import React, { useState } from 'react';
import TextEditPopup from '@/components/popup/TextEditPopup';

interface AlarmData {
  dong: string;
  ho: string;
  carNumber: string;
  name: string;
  phone: string;
  alarmContent: string;
  alarmTime: string;
  elapsedTime: string;
  measurementData: string;
  normalRange: string;
}

interface BatteryAlarmCardProps {
  alarm: AlarmData;
}

const BatteryAlarmCard: React.FC<BatteryAlarmCardProps> = ({ alarm }) => {
  const [actionInput, setActionInput] = useState('');
  const [inspectionInput, setInspectionInput] = useState('');
  const [isActionPopupOpen, setIsActionPopupOpen] = useState(false);
  const [isInspectionPopupOpen, setIsInspectionPopupOpen] = useState(false);

  return (
    <div className="bg-hw-dark-2 p-4 rounded-lg border border-hw-gray-5 w-full">
      <h2 className="text-hw-white-1 text-xl mb-2 flex items-center">
        <span className="mr-2">🔋</span> 배터리 알람 정보
      </h2>
      <div className="grid grid-cols-2 gap-1 text-hw-white-1">
        <div className="bg-gray-700 py-1 px-2 rounded">
          <div className="text-gray-400 text-sm">동/호수</div>
          <div>{`${alarm.dong}동 ${alarm.ho}호`}</div>
        </div>
        <div className="bg-gray-700 py-1 px-2 rounded">
          <div className="text-gray-400 text-sm">차량번호</div>
          <div>{alarm.carNumber}</div>
        </div>
        <div className="bg-gray-700 py-1 px-2 rounded">
          <div className="text-gray-400 text-sm">차주</div>
          <div>{alarm.name}</div>
        </div>
        <div className="bg-gray-700 py-1 px-2 rounded">
          <div className="text-gray-400 text-sm">연락처</div>
          <div>{alarm.phone}</div>
        </div>
        <div className="bg-gray-700 py-1 px-2 rounded">
          <div className="text-gray-400 text-sm">이상알람 내용</div>
          <div>{alarm.alarmContent}</div>
        </div>
        <div className="bg-gray-700 py-1 px-2 rounded">
          <div className="text-gray-400 text-sm">경과시간</div>
          <div>{alarm.elapsedTime}</div>
        </div>
        <div className="bg-gray-700 py-1 px-2 rounded col-span-2">
          <div className="text-gray-400 text-sm">발생일시</div>
          <div>{alarm.alarmTime}</div>
        </div>
        <div className="bg-gray-700 py-1 px-2 rounded">
          <div className="text-gray-400 text-sm">측정 Data</div>
          <div>{alarm.measurementData}</div>
        </div>
        <div className="bg-gray-700 py-1 px-2 rounded">
          <div className="text-gray-400 text-sm">정상 범위</div>
          <div>{alarm.normalRange}</div>
        </div>
      </div>
      <div className="mt-2">
        <div className="text-hw-white-1 text-sm mb-1">조치내용</div>
        <input
          type="text"
          value={actionInput}
          onClick={() => setIsActionPopupOpen(true)}
          readOnly
          className="w-full px-2 py-1 bg-gray-700 text-hw-white-1 border border-hw-gray-5 rounded cursor-pointer"
          placeholder="조치내용을 입력하세요"
        />
      </div>
      <div className="mt-2">
        <div className="text-hw-white-1 text-sm mb-1">제조사 점검 결과</div>
        <input
          type="text"
          value={inspectionInput}
          onClick={() => setIsInspectionPopupOpen(true)}
          readOnly
          className="w-full px-2 py-1 bg-gray-700 text-hw-white-1 border border-hw-gray-5 rounded cursor-pointer"
          placeholder="제조사 점검 결과를 입력하세요"
        />
      </div>
      {isActionPopupOpen && (
        <TextEditPopup
          title="조치내용"
          initialText={actionInput}
          onSave={(text) => {
            setActionInput(text);
            setIsActionPopupOpen(false);
          }}
          onCancel={() => setIsActionPopupOpen(false)}
        />
      )}
      {isInspectionPopupOpen && (
        <TextEditPopup
          title="제조사 점검 결과"
          initialText={inspectionInput}
          onSave={(text) => {
            setInspectionInput(text);
            setIsInspectionPopupOpen(false);
          }}
          onCancel={() => setIsInspectionPopupOpen(false)}
        />
      )}
    </div>
  );
};

export default BatteryAlarmCard;
