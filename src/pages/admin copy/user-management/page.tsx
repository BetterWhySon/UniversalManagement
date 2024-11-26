import { Cancel, Circle, Edit, Plus, SmallClose } from '@/components/icons';
import ModalWrapper from '@/components/modal/ModalWrapper';
import TableData from '@/components/table/TableData';
import { TEXT_ALIGN } from '@/enums/table';
import { cn } from '@/helpers/class-name.helper';
import { UserManagementData } from '@/types/user-management.type';
import { useMemo, useState, useEffect } from 'react';
import AddUserModal from './components/AddUserModal';
import EditUserModal from './components/EditUserModal';
import ShipMatchingModal from './components/ShipMatchingModal';
import './style.scss';
import useAdmUserManagement from '@/api/admUserManagement';
import { POPUP_TYPE } from '@/constants/admManagement.constant';
import useAdmUserManagementUserCreate from '@/api/admUserManagementUserCreate';
import useAdmUserManagementUserDelete from '@/api/admUserManagementUserDelete';
import useAdmUserManagementUserEdit from '@/api/admUserManagementUserEdit';
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

type userData = {
  id: number;     // index
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
  pageSize: 12,
};

const defaultValues = {
  // siteName: '',
  // xPos: 0,
  // yPos: 0,
  // siteId: ''
};

export default function UserManagementPage() {
  const {dataList, storeDataList } = useAdmUserManagement();    
  const [data, setData] = useState<UserManagementData[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditUser, setIsEditUser] = useState<boolean>(false);
  const [isShipMatching, setIsShipMatching] = useState<boolean>(false);
  const [editUserIndex, setEditUserIndex] = useState<number>(-1);
  const { errorMsg_userCreat } = useAdmUserManagementUserCreate();
  const { errorMsg_UserDelete } = useAdmUserManagementUserDelete();
  const { errorMsg_userEdit } = useAdmUserManagementUserEdit();  
  const { storeUserDelete } = useAdmUserManagementUserDelete();  
  const { t: trans } = useTranslation('translation');

  useEffect(() => {
  },[]);

  useEffect(() => {   // 생성,수정,삭제 후 데이터 리로드 처리
    storeDataList(trans);   
  },[errorMsg_userCreat, errorMsg_UserDelete, errorMsg_userEdit]);

  useEffect(() => {   // 생성,수정,삭제 후 데이터 리로드 처리
    console.log(isShipMatching);
    if(!isShipMatching) { // 찿이 닫히면 false리턴
      storeDataList(trans);   
    }    
  },[isShipMatching]);

  useEffect(() => {    
    let _datas: Array<userData> = [];    
    
    dataList?.map((item, index) => {
      _datas.push({
        id: index,
        userID: item.id,
        name: item.name,
        contact: item.phonenumber,
        email: item.email,
        shipCount: item.ships,
        admin: item.is_admin,
        level1: item.level1,
        level2: item.level2,
        correction: "",
        currentPassword: "",
      })
    });    
    setData(_datas);
    pagination.total = _datas.length; //
  },[dataList]);

  const columns = useMemo(
    () => [
      {
        name: 'username',
        dataIndex: 'userID',
        paddingInline: '24px',
        fixedWidth: '229px',
      },
      {
        name: 'name',
        dataIndex: 'name',
        paddingInline: '24px',
        fixedWidth: '130px',
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
        render: (row: UserManagementData, dataIndex: string) => (
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
        render: (row: UserManagementData, dataIndex: string) => {
          if (row[dataIndex as keyof UserManagementData])
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
        render: (row: UserManagementData, dataIndex: string) => {
          if (row[dataIndex as keyof UserManagementData])
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
        render: (row: UserManagementData, dataIndex: string) => {
          if (row[dataIndex as keyof UserManagementData])
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
        name:  'deleteEdit',
        dataIndex: 'correction',
        paddingInline: '24px',
        align: TEXT_ALIGN.CENTER,
        mobileAlign: TEXT_ALIGN.CENTER,
        fixedWidth: '175px',
        noPaddingBlock: true,
        render: (row: UserManagementData) => (
          <div>
          <button onClick={() => onClickDelete(row)}
            className='leading-[128.57%] px-2 text-hw-white-1 items-center text-left h-8'>
            <SmallClose />
          </button>
          <button onClick={() => onClickEdit(row)}
            className='leading-[128.57%] px-2 text-hw-white-1 items-center text-left h-8'>
            <Edit width={22} height={22} stroke='#CACCCE' />
          </button>
        </div>
        ),
      },
    ],
    [],
  );

  const onClickEdit = (data: userData) => {
    console.log(data);
    setEditUserIndex(data.id) // id = seleted index    
    setIsEditUser(true);
  }

  const onClickDelete = (data: userData) => {
    if(window.confirm(trans('areYouDelete'))) {
        storeUserDelete(data.userID, trans)
      }
      else {
      }
  };

  const onClickShipCount = (data: userData) => {
    console.log(data);
    setEditUserIndex(data.id) // id = seleted index    
    setIsShipMatching(true);    
  };

  
  const addUserDefaultValues = useMemo(() => {
    return {
      userID: '',
      password: '',
      verifyPassword: '',
      name: '',
      contact: '',
      isAdmin: false,
      email: '',
    };
  }, []);

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
          {trans('userManagement')}
        </h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className='py-[6px] pl-4 pr-6 rounded-lg bg-hw-orange-1 flex gap-2 items-center justify-center'>
          <Plus />
          <span className='text-hw-white-1 font-light text-base leading-[125%] whitespace-nowrap'>{trans('addUser')}</span>
        </button>
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

      {isAddModalOpen && (
        <ModalWrapper onClose={() => setIsAddModalOpen(false)} defaultValues={addUserDefaultValues} popupType={POPUP_TYPE.USER} isCreateMode={true} >  
          <AddUserModal />
        </ModalWrapper>
      )}
      {isEditUser && (
        <ModalWrapper onClose={() => setIsEditUser(false)} defaultValues={defaultValues} popupType={POPUP_TYPE.USER} isCreateMode={false} >
          <EditUserModal userData={data[editUserIndex]} />
        </ModalWrapper>
      )}
      {isShipMatching && (
        <ModalWrapper onClose={() => setIsShipMatching(false)} defaultValues={defaultValues} popupType={POPUP_TYPE.SHIP_MATCHING} isCreateMode={false} >
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

