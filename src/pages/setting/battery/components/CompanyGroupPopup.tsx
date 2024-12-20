import React, { useState } from 'react';

interface Group {
  name: string;
  devices: string[];
}

interface Company {
  name: string;
  groups: Group[];
}

interface Selection {
  company: string;
  groups: string[];
}

interface CompanyGroupPopupProps {
  isOpen: boolean;
  onClose: () => void;
  companies: Company[];
  onSelect: (selections: Selection[], selectedGroups: {[company: string]: string[]}) => void;
  conditionType: '사업장' | '그룹' | '기기';
  title?: string;
}

const CompanyGroupPopup: React.FC<CompanyGroupPopupProps> = ({ isOpen, onClose, companies, onSelect, conditionType, title = '사업장/그룹 선택' }) => {
  const [searchText, setSearchText] = useState('');
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<{[company: string]: string[]}>({});

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCompanyCheck = (companyName: string) => {
    setSelectedCompanies(prev => {
      if (prev.includes(companyName)) {
        setSelectedGroups(groups => {
          const newGroups = { ...groups };
          delete newGroups[companyName];
          return newGroups;
        });
        return prev.filter(c => c !== companyName);
      } else {
        const company = companies.find(c => c.name === companyName);
        if (company) {
          setSelectedGroups(groups => ({
            ...groups,
            [companyName]: company.groups.map(g => g.name)
          }));
        }
        return [...prev, companyName];
      }
    });
  };

  const handleGroupCheck = (companyName: string, groupName: string) => {
    setSelectedGroups(prev => {
      const companyGroups = prev[companyName] || [];
      const newGroups = companyGroups.includes(groupName)
        ? companyGroups.filter(g => g !== groupName)
        : [...companyGroups, groupName];
      
      const updatedGroups = {
        ...prev,
        [companyName]: newGroups
      };

      const company = companies.find(c => c.name === companyName);
      if (company) {
        const allGroupsSelected = company.groups.every(g => 
          updatedGroups[companyName]?.includes(g.name)
        );

        if (allGroupsSelected) {
          setSelectedCompanies(prev => [...prev, companyName]);
        } else {
          setSelectedCompanies(prev => prev.filter(c => c !== companyName));
        }
      }

      return updatedGroups;
    });
  };

  const handleSelect = () => {
    const selections = selectedCompanies.map(company => ({
      company,
      groups: selectedGroups[company] || []
    }));
    onSelect(selections, selectedGroups);
    onClose();
  };

  const getCompanyCheckStatus = (companyName: string) => {
    const company = companies.find(c => c.name === companyName);
    if (!company) return 'none';

    const selectedGroupCount = selectedGroups[companyName]?.length || 0;
    if (selectedGroupCount === 0) return 'none';
    if (selectedGroupCount === company.groups.length) return 'full';
    return 'partial';
  };

  const highlightText = (text: string) => {
    if (!searchText) return <span>{text}</span>;
    
    return text.toLowerCase().includes(searchText.toLowerCase()) ? (
      <span className="text-green-400">{text}</span>
    ) : (
      <span>{text}</span>
    );
  };

  const handleAllCompanyCheck = () => {
    if (selectedCompanies.length === companies.length) {
      setSelectedCompanies([]);
      setSelectedGroups({});
    } else {
      const allCompanies = companies.map(c => c.name);
      const allGroups = companies.reduce((acc, company) => ({
        ...acc,
        [company.name]: company.groups.map(g => g.name)
      }), {});
      
      setSelectedCompanies(allCompanies);
      setSelectedGroups(allGroups);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-slate-800 p-6 rounded-lg border border-white w-[800px]"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg">{title}</h2>
          <div className="flex items-center">
            <input 
              type="text" 
              placeholder="검색어를 입력하세요." 
              className="bg-white px-2 py-0.5 rounded mr-2 text-sm w-[200px]"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button className="bg-blue-500 text-white px-3 py-0.5 rounded text-sm">
              확인
            </button>
          </div>
        </div>

        <div className="border border-gray-600 rounded h-[400px] overflow-auto">
          <table className="w-full text-white border-collapse">
            <colgroup>
              <col className="w-[30%]" />  {/* 사업장 */}
              <col className="w-[30%]" />  {/* 그룹명 */}
              <col className="w-[40%]" />  {/* 기기명 */}
            </colgroup>
            <thead className="bg-gray-700 sticky top-0">
              <tr>
                <th className="p-2 text-left border-b border-r border-gray-600">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedCompanies.length === companies.length}
                      onChange={handleAllCompanyCheck}
                      className={`
                        ${selectedCompanies.length === companies.length ? 'accent-blue-500' : ''}
                      `}
                    />
                    사업장
                  </div>
                </th>
                <th className="p-2 text-left border-b border-r border-gray-600">그룹명</th>
                <th className="p-2 text-left border-b border-gray-600">기기명</th>
              </tr>
            </thead>
            <tbody>
              {companies.map(company => {
                const deviceRows: JSX.Element[] = [];
                
                company.groups.forEach((group, groupIndex) => {
                  group.devices.forEach((device, deviceIndex) => {
                    deviceRows.push(
                      <tr 
                        key={`${company.name}-${group.name}-${device}`} 
                        className={`border-b border-gray-600 ${
                          selectedCompanies.includes(company.name) ? 'bg-blue-900/30' :
                          (selectedGroups[company.name] || []).includes(group.name) ? 'bg-blue-900/20' :
                          'hover:bg-gray-700'
                        }`}
                      >
                        {groupIndex === 0 && deviceIndex === 0 && (
                          <td 
                            className={`p-2 border-r border-gray-600 cursor-pointer`}
                            rowSpan={company.groups.reduce((acc, g) => acc + g.devices.length, 0)}
                            onClick={() => handleCompanyCheck(company.name)}
                          >
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={getCompanyCheckStatus(company.name) !== 'none'}
                                className={`
                                  ${getCompanyCheckStatus(company.name) === 'full' ? 'accent-blue-500' : 
                                    getCompanyCheckStatus(company.name) === 'partial' ? 'accent-gray-500' : ''}
                                `}
                                onChange={() => handleCompanyCheck(company.name)}
                                onClick={(e) => e.stopPropagation()}
                              />
                              {highlightText(company.name)}
                            </div>
                          </td>
                        )}
                        {deviceIndex === 0 && (
                          <td 
                            className={`p-2 border-r border-gray-600 cursor-pointer ${
                              conditionType === '사업장' ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            rowSpan={group.devices.length}
                            onClick={() => {
                              if (conditionType !== '사업장') {
                                handleGroupCheck(company.name, group.name);
                              }
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={(selectedGroups[company.name] || []).includes(group.name)}
                                onChange={() => handleGroupCheck(company.name, group.name)}
                                disabled={conditionType === '사업장'}
                                onClick={(e) => e.stopPropagation()}
                              />
                              {highlightText(group.name)}
                            </div>
                          </td>
                        )}
                        <td className="p-2">{device}</td>
                      </tr>
                    );
                  });
                });
                
                return deviceRows;
              })}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-white border border-gray-400 rounded hover:border-white"
          >
            취소
          </button>
          <button
            onClick={handleSelect}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            선택
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyGroupPopup; 