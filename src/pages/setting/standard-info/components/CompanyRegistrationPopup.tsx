import React, { useState } from 'react';

declare global {
  interface Window {
    daum: any;
  }
}

interface CompanyRegistrationPopupProps {
  onClose: () => void;
  onSave: (data: {
    code: string;
    company: string;
    postcode: string;
    address: string;
    roadAddress: string;
    detailAddress: string;
    description: string;
  }) => void;
  initialData?: {
    code: string;
    company: string;
    postcode: string;
    address: string;
    roadAddress?: string;
    detailAddress: string;
    description: string;
  };
  mode?: 'create' | 'edit';
}

const CompanyRegistrationPopup: React.FC<CompanyRegistrationPopupProps> = ({ 
  onClose, 
  onSave, 
  initialData,
  mode = 'create' 
}) => {
  const [formData, setFormData] = useState({
    code: initialData?.code || '',
    company: initialData?.company || '',
    postcode: initialData?.postcode || '',
    address: initialData?.address || '',
    roadAddress: initialData?.roadAddress || '',
    detailAddress: initialData?.detailAddress || '',
    description: initialData?.description || ''
  });

  const handlePostcode = () => {
    new window.daum.Postcode({
      oncomplete: (data: any) => {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
        let addr = ''; // 주소 변수
        let extraAddr = ''; // 참고항목 변수

        // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
        if (data.userSelectedType === 'R') { // 도로명 주소를 선택했을 경우
          addr = data.roadAddress;
        } else { // 지번 주소를 선택했을 경우(J)
          addr = data.jibunAddress;
        }

        // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
        if (data.userSelectedType === 'R') {
          // 법정동명이 있을 경우 추가한다. (법정리는 제외)
          // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
          if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }
          // 건물명이 있고, 공동주택일 경우 추가한다.
          if (data.buildingName !== '' && data.apartment === 'Y') {
            extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
          }
          // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
          if (extraAddr !== '') {
            extraAddr = ' (' + extraAddr + ')';
          }
          // 조합된 참고항목을 주소변수에 넣는다.
          addr += extraAddr;
        }

        // 우편번호와 주소 정보를 해당 필드에 넣는다.
        setFormData(prev => ({
          ...prev,
          postcode: data.zonecode,
          address: addr,
          roadAddress: data.roadAddress
        }));
      }
    }).open();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 필수 필드 검증
    if (!formData.postcode || !formData.address) {
      alert('사업장 주소를 입력해주세요.');
      return;
    }
    
    try {
      await onSave({
        code: formData.code,
        company: formData.company,
        postcode: formData.postcode,
        address: formData.address.replace(`(${formData.postcode}) `, ''),  // 우편번호를 제외한 순수 주소만 전달
        roadAddress: formData.roadAddress,
        detailAddress: formData.detailAddress,
        description: formData.description
      });
      onClose(); // 저장 성공 시 팝업 닫기
    } catch (error) {
      console.error('저장 중 오류가 발생했습니다:', error);
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-hw-dark-2 rounded-lg w-[600px]">
        <div className="flex justify-between items-center p-4 border-b border-gray-600">
          <h2 className="text-lg text-white">{mode === 'create' ? '신규 등록' : '사업장 수정'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form noValidate onSubmit={handleSubmit}>
          <div className="p-6">
            <div className="space-y-4">
              {mode === 'edit' && (
                <div className="flex items-center">
                  <label className="w-32 text-white">코드 :</label>
                  <input
                    type="text"
                    className="flex-1 h-10 text-base px-4 bg-gray-700 rounded-lg outline-none border-none text-white cursor-not-allowed opacity-70"
                    value={formData.code}
                    disabled
                  />
                </div>
              )}

              <div className="flex items-center">
                <label className="w-32 text-white">사업장 :</label>
                <input
                  type="text"
                  className="flex-1 h-10 text-base px-4 bg-hw-dark-1 rounded-lg outline-none border-none text-white"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  required
                />
              </div>

              <div className="flex">
                <label className="w-32 text-white mt-2">사업장 주소 :</label>
                <div className="flex-1 space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="w-32 h-10 text-base px-4 bg-hw-dark-1 rounded-lg outline-none border-none text-white required:border-red-500 cursor-pointer"
                      placeholder="우편번호"
                      value={formData.postcode}
                      required
                      readOnly
                      onClick={handlePostcode}
                    />
                    <button
                      type="button"
                      onClick={handlePostcode}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      우편번호 검색
                    </button>
                  </div>
                  <input
                    type="text"
                    className="w-full h-10 text-base px-4 bg-hw-dark-1 rounded-lg outline-none border-none text-white required:border-red-500 cursor-pointer"
                    value={formData.address}
                    required
                    readOnly
                    onClick={handlePostcode}
                    placeholder="주소"
                  />
                  {formData.roadAddress && (
                    <div className="flex gap-2 w-full text-xs text-gray-400 px-2">
                      <span>도로명: {formData.roadAddress}</span>
                    </div>
                  )}
                  <input
                    type="text"
                    className="w-full h-10 text-base px-4 bg-hw-dark-1 rounded-lg outline-none border-none text-white"
                    value={formData.detailAddress}
                    onChange={(e) => setFormData({...formData, detailAddress: e.target.value})}
                    placeholder="상세주소"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <label className="w-32 text-white">설명 :</label>
                <input
                  type="text"
                  className="flex-1 h-10 text-base px-4 bg-hw-dark-1 rounded-lg outline-none border-none text-white"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 p-6 border-t border-gray-600">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-hw-orange-1 text-hw-orange-1 rounded hover:bg-hw-orange-1/10"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-hw-orange-1 text-white rounded hover:bg-hw-orange-1/90"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyRegistrationPopup; 