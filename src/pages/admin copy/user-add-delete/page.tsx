import { Cancel, Circle } from '@/components/icons';
import ModalWrapper from '@/components/modal/ModalWrapper';
import TableData from '@/components/table/TableData';
import { TEXT_ALIGN } from '@/enums/table';
import { cn } from '@/helpers/class-name.helper';
import { UserManagementData } from '@/types/user-management.type';
import { useMemo, useState, useEffect } from 'react';
import ShipMatchingModal from './components/ShipMatchingModal';
import './style.scss';
import useAdmUserAddDelete from '@/api/admUserAddDelete';
import { POPUP_TYPE } from '@/constants/admManagement.constant';

import ShipMatchingAddModal from './components/ShipMatchingAddModal';
import { useTranslation } from 'react-i18next';

// const DRAFT_DATA = Array.from(Array(12)).map((_, index: number) => {
//   return {
//     id: index,
//     userID: 'betterwhy',
//     name: '배터와이',
//     contact: '010 1234 5678',
//     email: 'better@email.com',
//     admin: index % 2 === 0,
//     correction: '',
//     currentPassword: '12345678',
//   };
// });

type userHistoryData = {
  id: number;     // index

  action: string;
  admin_id: string;
  admin_name: string;
  timestamp: string;

  userID: string;
  name: string;
  contact: string;
  email: string;
  shipCount: number;
  admin: boolean;
  level1: boolean;
  level2: boolean;
  correction: string;
  currentPassword: string;  
};


const pagination = {
  total: 0,
  pageSize: 10,
};

const defaultValues = {
  // siteName: '',
  // xPos: 0,
  // yPos: 0,
  // siteId: ''
};

export default function UserAddDeletePage() {
  const { dataList, storeDataList } = useAdmUserAddDelete();
  const [data, setData] = useState<userHistoryData[]>([]);
  // const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  // const [isEditUser, setIsEditUser] = useState<boolean>(false);
  const [isShipMatching, setIsShipMatching] = useState<boolean>(false);
  const [editUserIndex, setEditUserIndex] = useState<number>(-1);
  // const { errorMsg_userCreat } = useAdmUserManagementUserCreate();
  // const { errorMsg_UserDelete } = useAdmUserManagementUserDelete();
  // const { errorMsg_userEdit } = useAdmUserManagementUserEdit();
  // const { storeUserDelete } = useAdmUserManagementUserDelete();
  const { t: trans } = useTranslation('translation');

  useEffect(() => {
    storeDataList(trans);
  }, []);

  // useEffect(() => {   // 생성,수정,삭제 후 데이터 리로드 처리
  //   storeDataList(trans);
  // }, [errorMsg_userCreat, errorMsg_UserDelete, errorMsg_userEdit]);

  // useEffect(() => {   // 생성,수정,삭제 후 데이터 리로드 처리
  //   console.log(isShipMatching);
  //   if (!isShipMatching) { // 찿이 닫히면 false리턴
  //     storeDataList(trans);
  //   }
  // }, [isShipMatching]);

  useEffect(() => {
    let _datas: Array<userHistoryData> = [];

    dataList?.map((item, index) => {
      _datas.push({
        id: index,

        action: trans(item.action),
        admin_id: item.admin_id,
        admin_name: item.admin_name,
        timestamp: item.timestamp,

        userID: item.user_id,
        name: item.user_name,
        contact: item.user_phonenumber,
        email: item.user_email,
        shipCount: item.user_ships,
        admin: item.is_admin,
        level1: item.level1,
        level2: item.level2,
        correction: "",
        currentPassword: "",
      })      
    });
    setData(_datas);
    pagination.total = _datas.length;
  }, [dataList]);

  const columns = useMemo(
    () => [
      {
        name: 'createDelete', // 추가, 삭제
        dataIndex: 'action',
        paddingInline: '24px',
        fixedWidth: '229px',
        align: TEXT_ALIGN.CENTER,
      },
      {
        name: 'createDeleteProgressUserId', // 추가,삭제 진행 사용자 ID
        dataIndex: 'admin_id',
        paddingInline: '24px',
        fixedWidth: '229px',
        align: TEXT_ALIGN.CENTER,
      },
      {
        name: 'createDeleteProgressUserName', // 추가,삭제 진행 사용자 이름
        dataIndex: 'admin_name',
        paddingInline: '24px',
        fixedWidth: '229px',
        align: TEXT_ALIGN.CENTER,
      },
      {
        name: 'date', // 날짜 시간
        dataIndex: 'timestamp',
        paddingInline: '24px',
        fixedWidth: '229px',
        align: TEXT_ALIGN.CENTER,
      },

      {
        name: 'username',
        dataIndex: 'userID',
        paddingInline: '24px',
        fixedWidth: '229px',
        align: TEXT_ALIGN.CENTER,
      },
      {
        name: 'name',
        dataIndex: 'name',
        paddingInline: '24px',
        fixedWidth: '130px',
        align: TEXT_ALIGN.CENTER,
      },
      {
        name: 'tel',
        dataIndex: 'contact',
        align: TEXT_ALIGN.CENTER,
        mobileAlign: TEXT_ALIGN.LEFT,
        paddingInline: '24px',
        fixedWidth: '179px',
      },
      {
        name: 'email',
        dataIndex: 'email',
        paddingInline: '24px',
        fixedWidth: '130px',
      },
      {
        name: 'ship',
        dataIndex: 'shipCount',
        paddingInline: '24px',
        fixedWidth: '130px',
        render: (row: userHistoryData, dataIndex: string) => (
          <div>
            <button onClick={() => onClickShipCount(row)}
              className='leading-[128.57%] px-2 text-hw-white-1 items-center text-left h-8'>
              {row.shipCount}
            </button>
          </div>
        ),
      },
      {
        name: 'admin',
        dataIndex: 'admin',
        paddingInline: '24px',
        align: TEXT_ALIGN.CENTER,
        mobileAlign: TEXT_ALIGN.CENTER,
        fixedWidth: '183px',
        noPaddingBlock: true,
        render: (row: userHistoryData, dataIndex: string) => {
          if (row[dataIndex as keyof userHistoryData])
            return (
              <div className='flex justify-center w-full py-0 xs:py-3'>
                <Circle />
              </div>
            );
          return (
            <div className='flex justify-center w-full py-0 xs:py-3'>
              <Cancel />
            </div>
          );
        },
      },     
      {
        name: 'userLevel2',
        dataIndex: 'level2',
        paddingInline: '24px',
        align: TEXT_ALIGN.CENTER,
        mobileAlign: TEXT_ALIGN.CENTER,
        fixedWidth: '183px',
        noPaddingBlock: true,
        render: (row: userHistoryData, dataIndex: string) => {
          if (row[dataIndex as keyof userHistoryData])
            return (
              <div className='flex justify-center w-full py-0 xs:py-3'>
                <Circle />
              </div>
            );
            return (
              <div className='flex justify-center w-full py-0 xs:py-3'>
                <Cancel />
              </div>
            );
        },
      },
      {
        name: 'userLevel1',
        dataIndex: 'level1',
        paddingInline: '24px',
        align: TEXT_ALIGN.CENTER,
        mobileAlign: TEXT_ALIGN.CENTER,
        fixedWidth: '183px',
        noPaddingBlock: true,
        render: (row: userHistoryData, dataIndex: string) => {
          if (row[dataIndex as keyof userHistoryData])
            return (
              <div className='flex justify-center w-full py-0 xs:py-3'>
                <Circle />
              </div>
            );
            return (
              <div className='flex justify-center w-full py-0 xs:py-3'>
                <Cancel />
              </div>
            );
        },
      }, 
    ],
    [],
  );

  

  const onClickShipCount = (data: userHistoryData) => {
    console.log(data);
    setEditUserIndex(data.id) // id = seleted index    
    setIsShipMatching(true);
  };


  // const addUserDefaultValues = useMemo(() => {
  //   return {
  //     userID: '',
  //     password: '',
  //     verifyPassword: '',
  //     name: '',
  //     contact: '',
  //     isAdmin: false,
  //     email: '',
  //   };
  // }, []);

  // const editUserDefaultValues = useMemo(() => {
  //   return {
  //     userID: '',
  //     currentPassword: '',
  //     newPassword: '',
  //     verifyPassword: '',
  //     name: '',
  //     contact: '',
  //     isAdmin: false,
  //     email: '',
  //   };
  // }, []);

  return (
    <main className='transition-all flex flex-col items-center w-full pt-5 px-0 lg:px-[55px] lg:pt-10 xs:pb-[74px] user-management__wrapper'>
      <div className='transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 w-full mb-8 md:mb-6 h-fit md:h-5 px-[18px] lg:px-0'>
        <h1 className='w-full text-hw-white-1  text-[16px] font-normal leading-4 lg:text-xl lg:leading-none'>
          {trans('userAddDeleteHistory')}
        </h1>        
      </div>
      {/* PC DATA TABLE */}
      <div className='w-full hidden xs:block px-[18px] lg:px-0'>
        <TableData
          data={data}
          columns={columns}
          // emptyMessage='사용자를 등록해 주세요.'
          isPagination
          pagination={pagination}
          paginationMarginTop='32px'
        />
      </div>

      {/* MOBILE DATA TABLE */}
      <div className='w-full block xs:hidden relative'>
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
      </div>
      
      {isShipMatching && (
        <ModalWrapper onClose={() => setIsShipMatching(false)} defaultValues={defaultValues} popupType={POPUP_TYPE.SHIP_MATCHING} isCreateMode={false} >
          {/* <ShipMatchingModal shipData={data[editUserIndex]} /> */}
          <ShipMatchingModal shipData={data[editUserIndex]} />
        </ModalWrapper>
      )}

      {/* {isShipMatching && (
        <ModalWrapper onClose={() => setIsShipMatching(false)} defaultValues={defaultValues} popupType={POPUP_TYPE.SHIP_MATCHINGADD} isCreateMode={true} >
          <ShipMatchingAddModal />
        </ModalWrapper>
      )} */}

    </main>
  );
}


// {editUserIndex >= 0 && (
//   <ModalWrapper onClose={() => setEditUserIndex(-1)} defaultValues={editUserDefaultValues} popupType={POPUP_TYPE.SITE} isCreateMode={false} >
//    {/* <ModalWrapper onClose={() => setEditUserIndex(-1)} defaultValues={editUserDefaultValues}> */}
//     <EditUserModal userData={data[editUserIndex]} />
//   </ModalWrapper>
// )}

