import { useFormContext } from 'react-hook-form';
import { Cancel, Circle, /*Edit, SmallClose, Plus, CheckBox*/ } from '@/components/icons';
import TableDataPopup from '@/components/table/TableDataPopup';
import { useMemo, useState, useEffect } from 'react';
import useAdmShipManagement from '@/api/admShipManagement';
import FilterDropdown from '@/pages/admin/status/components/FilterDropdown';
import { Filter } from '@/types/dropdown-filter.type';
import useAdmEssManagement from '@/api/admEssManagement';
import { searchShipData } from '@/types/ship-management.type';
import useSelectedShipIdsStore from './SelectedShip';
import { useTranslation } from 'react-i18next';

export const SITE_FILTERS = {
  name: 'searchSite',     // name 필드를 key로 활용중, 변경하지 마시요
  selected: "선택",  
  values: [],
};

type SiteTableData = {
  id: number;
  site: string
  siteId: string;
  coordinateX: number;
  coordinateY: number;
  correction: string;
};
  
export default function ShipMatchingModal() {
  const { dataList,  storeDataList } = useAdmEssManagement();  // site  
  const { dataListShip, storeDataListShip } = useAdmShipManagement();  // ship 조회 결과  
  const [siteFilter, setSiteFilter] = useState<Filter>(SITE_FILTERS);
  const [data, setData] = useState<SiteTableData[]>([]);    // site
  const { t: trans, i18n } = useTranslation('translation');
  const [selectSite, setSelectSite] = useState("");
  const [selectSiteId, setSelectSiteId] = useState("");
  const { register, setValue } = useFormContext();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [paginationL, setPaginationL] = useState({
    total: 0,
    pageSize: 8,
  });
  const { selectedIds, addShipId, removeShipId } = useSelectedShipIdsStore();    // zustand를 통한 selectedShipIds 배열처리
  const currentLanguage = i18n.language;

  const columns = useMemo(
    () => [
      {
        name: 'site',
        dataIndex: currentLanguage == 'kr' ? 'site_name' : 'site_name_foreign' ,
        // dataIndex: 'site_name',
        paddingInline: '24px',
        fixedWidth: '229px',
      },
      {
        name: 'ship',
        dataIndex: currentLanguage == 'kr' ? 'ship_name' : 'ship_name_foreign' ,
        // dataIndex: 'ship_name',
        paddingInline: '24px',
        fixedWidth: '130px',
      },     
      {
        name:  'select',
        dataIndex: 'correction',
        paddingInline: '24px',        
        fixedWidth: '175px',
        noPaddingBlock: true,
        render: (row: searchShipData) => (
          <div>
          <button type='button' onClick={() => onClickSelect(row.ship_id)}
            className='leading-[128.57%] px-1 text-hw-white-1 items-center text-left h-8'>
              { selectedIds.includes(row.ship_id)? (<Circle />) : (<Cancel />) }
          </button>          
        </div>
        ),
      }    
    ],
    [selectedIds],
  );

  useEffect(() => {
    storeDataList(trans);  // site 조회
  },[]);

  // 사이트 리스트 조회
  useEffect(() => {
    if (!dataList || dataList.length === 0) {
      return;
    }
    console.log("_data", dataList);

    let _data: Array<SiteTableData> = [];
    var nId: number = 0
    _data.push({
      id: 0,
      site: '전체',
      siteId: '',
      coordinateX: 0,
      coordinateY: 0,
      correction: "",
    });
    dataList.map((site) => {
      _data.push({
        id: nId + 1,
        site: site.siteName,
        siteId: site.site_id,
        coordinateX: site.coordinate_x,
        coordinateY: site.coordinate_y,
        correction: "",
      })
      nId++
    })
    setData(_data);
    console.log(data);

    const newValues = _data.map(item => item.site) ?? [];
    const newBMSFilters = { ...SITE_FILTERS,selected: trans('select'), values: newValues };    
    setSiteFilter(newBMSFilters); 
  },[dataList]);

  // 선박 리스트 조회
  useEffect(() => {
    if (!dataListShip || dataListShip.length === 0) {
      return;
    }
    console.log("_data", dataListShip);

    // 상태를 업데이트할 때 불변성을 유지하는 방식으로 변경
    setPaginationL(prevPagination => ({
      ...prevPagination,
      total: dataListShip.length,
    }));    
  },[dataListShip]);

  useEffect(() => {    
    console.log(selectSite);
    // let recvList = modelTypeData
    data?.map((item) => {      
      if(item.site === selectSite ) {
        setSelectSiteId(item.siteId)
        // setValue('selectedSiteId', item.siteId);  // input에 입력  
      }
    });     
  },[selectSite, setValue]);

  const onClickSelect = (shipId: number) => {
    if (selectedIds.includes(shipId)) {
      removeShipId(shipId);
    } else {
      addShipId(shipId);
    }
  };

  // input이 변경될때마다 호출
  const handleInputChange = (event: any) => {
    console.log(event.target.value);
    setSearchKeyword(event.target.value);
    // setSelectSiteId(event.target.value); // 입력 필드의 최신 값을 상태에 저장
  };

  // 선박 조회
  const handleButtonClick = () => {    
    storeDataListShip(selectSiteId, searchKeyword, trans);    
  };

  return (
    <div>
  <h1 className='w-full text-hw-white-1 text-[16px] font-normal leading-4 lg:text-xl lg:leading-none mb-6'>
  {trans('addShip')}
  </h1>
    <div className="flex items-center space-x-4"> {/* Flex 컨테이너 추가 */}
      <FilterDropdown key={0} title={''} filter={siteFilter} callback_Site={setSelectSite} callback_Ship={setSelectSite} callback_BMS={setSelectSite} callback={setSelectSite} />
      <input
        type='text'
        onChange={handleInputChange}              
        className='w-full md:w-[160px] h-[32px] px-4 py-[11px] outline-none rounded-lg bg-hw-dark-1 text-[14px] font-light leading-[18px] text-hw-white-2'
      />
      <button type='button' onClick={handleButtonClick} className='mt-[16px] md:mt-0 px-6 py-[6px] rounded-lg bg-hw-orange-1 text-hw-white-1 text-base font-light leading-[125%] flex-shrink-0 min-w-[100px]'>
      {trans('search')}
      </button>
      {/* <input onChange={handleInputChange} type='hidden' name='selectedSiteId' value={selectSiteId}/> */}
      {/* <TextInput label='' name='selectedSiteId' defaultValue={''} onChange={handleInputChange}/>     */}
    </div>
    <div className='w-full hidden xs:block px-[18px] lg:px-0'>
      <TableDataPopup 
        data={dataListShip?dataListShip:[]}
        columns={columns}
        // emptyMessage='사용자를 등록해 주세요.'
        isPagination
        pagination={paginationL}
        paginationMarginTop='32px'
      />
    </div>
  </div>


  );
}
