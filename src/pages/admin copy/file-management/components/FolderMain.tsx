import { Cancel, Circle, Edit, Plus, SmallClose } from '@/components/icons';
import ModalWrapper from '@/components/modal/ModalWrapper';
import TableData from '@/components/table/TableData';
import { TEXT_ALIGN } from '@/enums/table';
import { cn } from '@/helpers/class-name.helper';
import { useMemo, useState, useEffect } from 'react';
import AddFolderModal from './AddFolderModal';
import EditFolderModal from './EditFolderModal';
import useFileNameData from '../FileNameData';
import '../style.scss';
import { POPUP_TYPE } from '@/constants/admManagement.constant';
import useAdmFileManagementFolder from '@/api/admFileManagementFolder';
import { fileManagement_group } from '@/types/file-management.type';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAccessInfoStore from '@/api/accessInfoStore';

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
};

export default function FolderMain() {
  // const { dataList, storeDataList } = useAdmUserManagement();
  const [data, setData] = useState<fileManagement_group[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditFolder, setIsEditFolder] = useState<boolean>(false);
  const [isShipMatching, setIsShipMatching] = useState<boolean>(false);
  const [editUserIndex, setEditUserIndex] = useState<number>(-1);
  const { dataListGroup, storeListGroup, storeFolderDelete } = useAdmFileManagementFolder();
  const { errorMsg_creat, errorMsg_edit, errorMsg_delete } = useAdmFileManagementFolder();
  // const { errorMsg_userEdit } = useAdmUserManagementUserEdit();
  // const { storeUserDelete } = useAdmUserManagementUserDelete();
  const { t: trans } = useTranslation('translation');
  const navigate = useNavigate();
  const pathname = useMemo(() => location.pathname, [location.pathname]);
  const pathParts = pathname.split('/');
  const { storeFileNameData } = useFileNameData();
  const { connInfo } = useAccessInfoStore();

  useEffect(() => {
    // let _datas: Array<fileManagement_group> = [];
    // _datas.push({
    //   id: 2,
    //   group_id: 1,
    //   group_name: "디자인 파일",
    //   created_at: "2024-05-08 12:34:21",
    //   // update_at: "2024-05-08 12:34:21",
    // })
    // Array.from(Array(8)).map((item, index) => {
    //   _datas.push({
    //     id: index,
    //     group_id: 1,
    //     group_name: "한화 - 디자인 파일",
    //     created_at: "2024-05-08 12:34:21",
    //     // update_at: "2024-05-08 12:34:21",
    //   })
    // });
    // _datas.push({
    //   id: 2,
    //   group_id: 1,
    //   group_name: "2325한화 - 디자인 파일",
    //   created_at: "2024-05-08 12:34:21",
    //   // update_at: "2024-05-08 12:34:21",
    // })
    // _datas.push({
    //   id: 2,
    //   group_id: 1,
    //   group_name: "2325한화 - 디자인 파일",
    //   created_at: "2024-05-08 12:34:21",
    //   // update_at: "2024-05-08 12:34:21",
    // })
    // setData(_datas);
    storeListGroup(trans);
  }, []);

  useEffect(() => {
    storeListGroup(trans);
  }, [errorMsg_creat, errorMsg_edit, errorMsg_delete]);


  useEffect(() => {   // 생성,수정,삭제 후 데이터 리로드 처리
    console.log(dataListGroup);
    if (dataListGroup)
      setData(dataListGroup);
  }, [dataListGroup]);

  useEffect(() => {
    if (isAddModalOpen) {// local서버 이외에서는 해당기능 사용불가
      if (!connInfo?.location?.includes('local')) {
        alert(trans('thisFeatureIsNotAvailableOnThisServer'));
        setIsAddModalOpen(false);
      }
    }
  }, [isAddModalOpen]);

  useEffect(() => {
    if (isEditFolder) {
      if (!connInfo?.location?.includes('local')) {
        alert(trans('thisFeatureIsNotAvailableOnThisServer'));
        setIsEditFolder(false);
      }
    }
  }, [isEditFolder]);

  const columns = useMemo(
    () => [
      {
        name: 'folderName',
        dataIndex: 'group_name',
        align: TEXT_ALIGN.CENTER,
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
      // {
      //   name: 'updateDate',
      //   dataIndex: 'update_at',
      //   align: TEXT_ALIGN.CENTER,
      //   mobileAlign: TEXT_ALIGN.LEFT,
      //   paddingInline: '24px',
      //   fixedWidth: '179px',
      // },
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
            <button onClick={(event) => onClickDelete(row, event)}
              className='leading-[128.57%] px-2 text-hw-white-1 items-center text-left h-8'>
              <SmallClose />
            </button>
            <button onClick={(event) => onClickEdit(row, event)}
              className='leading-[128.57%] px-2 text-hw-white-1 items-center text-left h-8'>
              <Edit width={22} height={22} stroke='#CACCCE' />
            </button>
          </div>
        ),
      },
    ],
    [],
  );

  const onClickEdit = (data: fileManagement_group, event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // 상위로 이벤트 전파 중지
    console.log(data);
    setEditUserIndex(data.id) // id = seleted index    
    setIsEditFolder(true);
  }

  const onClickDelete = (data: fileManagement_group, event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // 상위로 이벤트 전파 중지    
    if( !connInfo?.location?.includes('local') ) {
      alert(trans('thisFeatureIsNotAvailableOnThisServer'));   
      return;
    }
    if (window.confirm(trans('areYouDeleteAndNoti01'))) {
      storeFolderDelete(data.id + "", trans)
    }
    else {
    }
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

  const onClickRow = (rowIndex: number) => {
    // storeSeletSite(rowIndex);
    // storeSeletShip(-1);  
    navigate(`/admin/file-management/folder/${data[rowIndex].id}`);
    // navigate(`/admin/file-management/folder/`)
    storeFileNameData(data[rowIndex].group_name);
  };

  return (
    <main className='transition-all flex flex-col items-center w-full px-0 '>
      {/* <div className='transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 w-full mb-8 md:mb-6 h-fit md:h-5 px-[18px] lg:px-0'>
        <h1 className='w-full text-hw-white-1  text-[16px] font-normal leading-4 lg:text-xl lg:leading-none'>
          {trans('fileManagement')}
        </h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className='py-[6px] pl-4 pr-6 rounded-lg bg-hw-orange-1 flex gap-2 items-center justify-center'>
          <Plus />
          <span className='text-hw-white-1 font-light text-base leading-[125%] whitespace-nowrap'>{trans('addFolder')}</span>
        </button>
      </div> */}
      <div className='transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 w-full mb-8 md:mb-6 h-fit md:h-5 px-[18px] lg:px-0'>
        <span className='pl-[18px] mt-5 lg:mr-0 lg:mt-0 lg:ml-0 transition-all inline-flex w-full relative mb-5 lg:mb-6'>
          <Link
            to={`/admin/file-management`}
            className={cn(
              'block text-[16px] leading-4 lg:text-[20px] lg:leading-5 font-normal',              
            )}>
            {trans('folderManagement')}
          </Link>          
        </span>
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
        <ModalWrapper onClose={() => setIsAddModalOpen(false)} defaultValues={""} popupType={POPUP_TYPE.FOLDER} isCreateMode={true} >
          <AddFolderModal />
        </ModalWrapper>
      )}
      {isEditFolder && (
        <ModalWrapper onClose={() => setIsEditFolder(false)} defaultValues={defaultValues} popupType={POPUP_TYPE.FOLDER} isCreateMode={false}>
          {data
            .filter((item) => item.id === editUserIndex)
            .map((item) => (
              <EditFolderModal key={item.id} folderData={item} />
            ))}
        </ModalWrapper>
      )}
    </main>
  );
}