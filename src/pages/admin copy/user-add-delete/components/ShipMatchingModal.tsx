/* eslint-disable jsx-a11y/label-has-associated-control */
import TextInput from '@/components/input/TextInput';
import { ShipManagementData } from '@/types/ship-management.type';
import { useFormContext } from 'react-hook-form';
import { /*Cancel, Circle, */Edit, SmallClose, Plus } from '@/components/icons';
import TableDataPopup from '@/components/table/TableDataPopup';
import TableData from '@/components/table/TableData';
import { useMemo, useState, useEffect } from 'react';
import { TEXT_ALIGN } from '@/enums/table';
import ShipMatchingAddModal from './ShipMatchingAddModal';
import ModalWrapper from '@/components/modal/ModalWrapper';
import { POPUP_TYPE } from '@/constants/admManagement.constant';
import useAdmShipManagement from '@/api/admShipManagement';
import { userShipData } from '@/types/ship-management.type';
import useSelectedShipIdsStore from './SelectedShip';
import { useTranslation } from 'react-i18next';

type EditShipModalProps = {
  shipData: ShipManagementData;
};
const pagination = {
  total: 10,
  pageSize: 8,
};

const defaultValues = {
  // siteName: '', 
  // xPos: 0,
  // yPos: 0,
  // siteId: ''
};

export default function ShipMatchingModal({ shipData }: EditShipModalProps) {
  // const { register } = useFormContext();
  const { dataList, rtnMsgUserShipCreate, storeUserShipDataList, storeUserShipCreate } = useAdmShipManagement();
  const [isShipMatchingAddModalOpen, setIsShipMatchingAddModalOpen] = useState<boolean>(false);
  const [data, setData] = useState<userShipData[]>([]);
  // const [selectedShipIds, setSelectedShipIds] = useState<number[]>([]);
  const { selectedIds, isValueChanged, isChangeNotify, addShipId, removeShipId, resetDatas } = useSelectedShipIdsStore();    // zustand를 통한 selectedShipIds 배열처리
  const [isFirstRender, setIsFirstRender] = useState(true);
  const { t: trans, i18n } = useTranslation('translation');
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
        name: 'delete',
        dataIndex: 'correction',
        paddingInline: '24px',
        align: TEXT_ALIGN.CENTER,
        mobileAlign: TEXT_ALIGN.CENTER,
        fixedWidth: '175px',
        noPaddingBlock: true,
        render: (row: userShipData) => (
          <div>
            <button type='button' onClick={() => onClickDelete(row)}
              className='leading-[128.57%] px-4 text-hw-white-1 items-center text-left h-8'>
              <SmallClose />
            </button>
          </div>
        ),
      },
    ],
    [],
  );

  useEffect(() => {
    
  }, []);

  useEffect(() => {
    let _datas: Array<userShipData> = [];
    resetDatas(); // 유저선박 리스트 리셋
    dataList?.map((item, index) => {
      _datas.push({
        id: index,
        site_name: item.site_name,
        site_name_foreign: item.site_name_foreign,
        site_id: item.site_id,
        ship_name: item.ship_name,
        ship_name_foreign: item.ship_name_foreign,
        ship_id: item.ship_id,
      })
      addShipId(item.ship_id); //유저선박 리스트에 ship_id추가
    });
    console.log(selectedIds)

    setData(_datas);
    pagination.total = _datas.length;
  }, [dataList]);


  useEffect(() => {
    console.log("isValueChanged", isValueChanged)
    console.log("selectedIds", selectedIds)
    
    // 컴포넌트 최초 실행시에는 return 함
    if (isFirstRender) {
      setIsFirstRender(false);
      storeUserShipDataList(shipData.userID, trans); // 유저선박 조회
      return;
    }
    storeUserShipCreate(shipData.userID, selectedIds, trans) // 유저 선박 등록
    resetDatas();

  }, [isValueChanged]);

  // 선박등록후 리턴, 유저선박 리스트 갱신
  useEffect(() => {
    console.log(rtnMsgUserShipCreate)
    if (rtnMsgUserShipCreate) {
      storeUserShipDataList(shipData.userID, trans);
      resetDatas();
    }
  }, [rtnMsgUserShipCreate]);

  // 선박등록
  const sendShipList = () => {
    // console.log(selectedIds)
    storeUserShipCreate(shipData.userID, selectedIds, trans) // 유저 선박 등록
    setIsShipMatchingAddModalOpen(false);    // 창 닫음
  };

  // 선박삭제
  const onClickDelete = (data: userShipData) => {
    if (window.confirm(trans('areYouDelete'))) {
      removeShipId(data.ship_id)
    }
    else {
    }
  };

  return (
    // <main className='transition-all flex flex-col items-center w-full pt-5 px-0 lg:px-[55px] lg:pt-10 xs:pb-[74px] user-management__wrapper'>
    <div>
      <div
        className='bg-transparent xs:bg-hw-dark-2 xs:rounded-lg xs:pt-[15px] w-full h-full overflow-hidden'>
        <div className='flex justify-between items-center px-[18px] xs:pl-8 xs:pr-2 mb-4 xs:mb-3'>
          <h1 className='w-full text-hw-white-1  text-[16px] font-normal leading-4 lg:text-xl lg:leading-none'>
            {trans('shipManagement')}            
          </h1>
          <button
            type='button'
            onClick={() => setIsShipMatchingAddModalOpen(true)}
            className='py-[6px] pl-4 pr-6 rounded-lg bg-hw-orange-1 flex gap-2 items-center justify-center'>
            <Plus />
            <span className='text-hw-white-1 font-light text-base leading-[125%] whitespace-nowrap'>{trans('addShip')}</span>
          </button>
        </div>
      </div>

      {/* PC DATA TABLE */}
      <div className='w-full hidden xs:block px-[18px] lg:px-0'>
        <TableDataPopup
          data={data ? data : []}
          columns={columns}
          // emptyMessage='사용자를 등록해 주세요.'
          isPagination
          pagination={pagination}
          paginationMarginTop='32px'
        />
      </div>

      {/* MOBILE DATA TABLE */}
      {/* <div className='w-full block xs:hidden relative'>
        <div className='absolute top-0 z-10 py-2 bg-hw-dark-2 flex flex-wrap border-b border-hw-gray-5'>
          {columns.map((item, index) => (
            <span
              key={index}
              style={{ width: `${item.fixedWidth}`, textAlign: item.mobileAlign }}
              className='py-[6px] px-8 text-[16px] font-light leading-5 text-hw-white-2'>
              {item.name}
            </span>
          ))}
        </div>
        <ul className='w-full h-[calc(100vh-297px)] mt-[113px] overflow-y-auto'>
          {data.map((row: any) => (
            <li key={row.id} className='w-full h-[112px] py-2 transition-colors odd:bg-[#363E4B] flex flex-wrap'>
              {columns.map((item, index) => (
                <span
                  key={index}
                  style={{ width: `${item.fixedWidth}`, textAlign: item.mobileAlign }}
                  className={cn(
                    'py-[6px] px-[18px] text-[14px] font-light leading-5 text-hw-white-2',
                    item.render && 'px-6',
                  )}>
                  {item.render ? item.render(row, item.dataIndex) : row[item.dataIndex as string] || ''}
                </span>
              ))}
            </li>
          ))}
        </ul>
      </div> */}

      {/* {isAddModalOpen && (
        <ModalWrapper onClose={() => setIsAddModalOpen(false)} defaultValues={addUserDefaultValues} popupType={POPUP_TYPE.USER} isCreateMode={true} >  
          <AddUserModal />
        </ModalWrapper>
      )}
      {isEditUser && (
        <ModalWrapper onClose={() => setIsEditUser(false)} defaultValues={defaultValues} popupType={POPUP_TYPE.USER} isCreateMode={false} >
          <EditUserModal userData={data[editUserIndex]} />
        </ModalWrapper>
      )} */}
      {isShipMatchingAddModalOpen && (
        // <ModalWrapper onClose={() => setIsShipMatchingAddModalOpen(false)} defaultValues={defaultValues} popupType={POPUP_TYPE.SHIP_MATCHINGADD} isCreateMode={true} >
        <ModalWrapper onClose={() => sendShipList()} defaultValues={defaultValues} popupType={POPUP_TYPE.SHIP_MATCHINGADD} isCreateMode={true} >
          <ShipMatchingAddModal />
          {/* <ShipSelectionComponent /> */}
        </ModalWrapper>
      )}

    </div>
  );
}
