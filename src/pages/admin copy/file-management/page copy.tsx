import { Cancel, Circle, Edit, Plus, SmallClose } from '@/components/icons';
import ModalWrapper from '@/components/modal/ModalWrapper';
import TableData from '@/components/table/TableData';
import { TEXT_ALIGN } from '@/enums/table';
import { cn } from '@/helpers/class-name.helper';
import { useMemo, useState, useEffect } from 'react';
import AddFolderModal from './components/AddFolderModal';
import EditFolderModal from './components/EditFolderModal';
import './style.scss';
import { POPUP_TYPE } from '@/constants/admManagement.constant';
import useAdmUserManagementUserCreate from '@/api/admUserManagementUserCreate';
import useAdmUserManagementUserDelete from '@/api/admUserManagementUserDelete';
import useAdmUserManagementUserEdit from '@/api/admUserManagementUserEdit';
import { fileManagement_group } from '@/types/file-management.type';

import { useTranslation } from 'react-i18next';


// const GROUP_DATA = Array.from(Array(12)).map((_, index) => {
//   return {
//     id: index,
//     group_id: 123,
//     group_name: "한화 디자인 파일 001",
//     created_at: "2024-05-08 12:34:21",
//     update_at: "2024-05-08 12:34:21",
//   };
// });


type userData = {
  groupID: number;     // index
  groupName: string;
  name: string;
  contact: string;
  email: string;
  shipCount: number;
  admin: boolean;
  correction: string;
  currentPassword: string;
};


const pagination = {
  total: 10,
  pageSize: 20,
};

const defaultValues = {
  // siteName: '',
  // xPos: 0,
  // yPos: 0,
  // siteId: ''
};

export default function FileManagementPage() {
  // const { dataList, storeDataList } = useAdmUserManagement();
  const [data, setData] = useState<fileManagement_group[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditFolder, setIsEditFolder] = useState<boolean>(false);
  const [isShipMatching, setIsShipMatching] = useState<boolean>(false);
  const [editUserIndex, setEditUserIndex] = useState<number>(-1);
  const { errorMsg_userCreat } = useAdmUserManagementUserCreate();
  const { errorMsg_UserDelete } = useAdmUserManagementUserDelete();
  const { errorMsg_userEdit } = useAdmUserManagementUserEdit();
  const { storeUserDelete } = useAdmUserManagementUserDelete();
  const { t: trans } = useTranslation('translation');

  useEffect(() => {    
  }, []);

  // useEffect(() => {   // 생성,수정,삭제 후 데이터 리로드 처리
  //   storeDataList(trans);   
  // },[errorMsg_userCreat, errorMsg_UserDelete, errorMsg_userEdit]);

  // useEffect(() => {   // 생성,수정,삭제 후 데이터 리로드 처리
  //   console.log(isShipMatching);
  //   if(!isShipMatching) { // 찿이 닫히면 false리턴
  //     storeDataList(trans);   
  //   }    
  // },[isShipMatching]);


  // useEffect(() => {
  //   let _datas: Array<userData> = [];

  //   dataList?.map((item, index) => {
  //     _datas.push({
  //       id: index,
  //       userID: item.id,
  //       name: item.name,
  //       contact: item.phonenumber,
  //       email: item.email,
  //       shipCount: item.ships,
  //       admin: item.is_admin,
  //       correction: "",
  //       currentPassword: "",
  //     })
  //   });
  //   setData(_datas);
  // }, [dataList]);

  // useEffect(() => {
  //   let _datas: Array<userData> = [];

  //   dataList?.map((item, index) => {
  //     _datas.push({
  //       id: index,
  //       userID: item.id,
  //       name: item.name,
  //       contact: item.phonenumber,
  //       email: item.email,
  //       shipCount: item.ships,
  //       admin: item.is_admin,
  //       correction: "",
  //       currentPassword: "",
  //     })
  //   });
  //   setData(_datas);
  // }, [dataList]);

  const columns = useMemo(
    () => [
      {
        name: 'folderName',
        dataIndex: 'group_name',
        align: TEXT_ALIGN.LEFT,
        mobileAlign: TEXT_ALIGN.LEFT,
        paddingInline: '24px',
        fixedWidth: '229px',
      },
      {
        name: 'createdDate',
        dataIndex: 'created_at',
        align: TEXT_ALIGN.CENTER,
        mobileAlign: TEXT_ALIGN.LEFT,
        paddingInline: '24px',
        fixedWidth: '179px',
      },
      {
        name: 'updateDate',
        dataIndex: 'update_at',
        align: TEXT_ALIGN.CENTER,
        mobileAlign: TEXT_ALIGN.LEFT,
        paddingInline: '24px',
        fixedWidth: '179px',
      },
      {
        name: 'deleteEdit',
        dataIndex: 'correction',
        paddingInline: '24px',
        align: TEXT_ALIGN.CENTER,
        mobileAlign: TEXT_ALIGN.CENTER,
        fixedWidth: '175px',
        noPaddingBlock: true,
        render: (row: fileManagement_group) => (
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

  const onClickEdit = (data: fileManagement_group) => {
    console.log(data);
    setEditUserIndex(data.id) // id = seleted index    
    setIsEditFolder(true);
  }

  const onClickDelete = (data: fileManagement_group) => {
    if (window.confirm(trans('areYouDelete'))) {
      // storeUserDelete(data.userID, trans)
    }
    else {
    }
  };

  // const onClickShipCount = (data: userData) => {
  //   console.log(data);
  //   setEditUserIndex(data.id) // id = seleted index    
  //   setIsShipMatching(true);
  // };


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

  const onClickRow = (rowIndex: number) => {
    // storeSeletSite(rowIndex);
    // storeSeletShip(-1);  
  };

  return (
    <main className='transition-all flex flex-col items-center w-full pt-5 px-0 lg:px-[55px] lg:pt-10 xs:pb-[74px] user-management__wrapper'>
      <div className='transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 w-full mb-8 md:mb-6 h-fit md:h-5 px-[18px] lg:px-0'>
        <h1 className='w-full text-hw-white-1  text-[16px] font-normal leading-4 lg:text-xl lg:leading-none'>
          {trans('fileManagement')}
        </h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className='py-[6px] pl-4 pr-6 rounded-lg bg-hw-orange-1 flex gap-2 items-center justify-center'>
          <Plus />
          <span className='text-hw-white-1 font-light text-base leading-[125%] whitespace-nowrap'>{trans('addFolder')}</span>
        </button>
      </div>

      {/* PC DATA TABLE */}
      <div className='w-full hidden xs:block px-[18px] lg:px-0'>
        <TableData
          data={data}// data={GROUP_DATA}
          columns={columns}
          onSelectRow={onClickRow}
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
                  {/* {item.render ? item.render(row, item.dataIndex) : row[item.dataIndex as string] || ''} */}
                </span>
              ))}
            </li>
          ))}
        </ul>
      </div>

      {isAddModalOpen && (
        <ModalWrapper onClose={() => setIsAddModalOpen(false)} defaultValues={addUserDefaultValues} popupType={POPUP_TYPE.USER} isCreateMode={true} >
          <AddFolderModal />
        </ModalWrapper>
      )}
      {isEditFolder && (
        <ModalWrapper onClose={() => setIsEditFolder(false)} defaultValues={defaultValues} popupType={POPUP_TYPE.USER} isCreateMode={false} >
          <EditFolderModal folderData={data[editUserIndex]} />
        </ModalWrapper>
      )}
    </main>
  );
}


// {editUserIndex >= 0 && (
//   <ModalWrapper onClose={() => setEditUserIndex(-1)} defaultValues={editUserDefaultValues} popupType={POPUP_TYPE.SITE} isCreateMode={false} >
//    {/* <ModalWrapper onClose={() => setEditUserIndex(-1)} defaultValues={editUserDefaultValues}> */}
//     <EditUserModal userData={data[editUserIndex]} />
//   </ModalWrapper>
// )}

