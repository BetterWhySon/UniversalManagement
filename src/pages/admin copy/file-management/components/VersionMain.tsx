import { Cancel, Circle, Edit, Plus, SmallClose, ChevronFilterDownInactive, CellDetailArrowDown, ChevronDown, ChevronFilterDownActive, } from '@/components/icons';
import ModalWrapper from '@/components/modal/ModalWrapper';
import TableData from '@/components/table/TableData';
import { TEXT_ALIGN } from '@/enums/table';
import { cn } from '@/helpers/class-name.helper';
import { useMemo, useState, useEffect } from 'react';
import AddVersionModal from './AddVersionModal';
import EditVersionModal from './EditVersionModal';
import '../style.scss';
import { POPUP_TYPE } from '@/constants/admManagement.constant';
import { fileManagement_file, fileManagement_version } from '@/types/file-management.type';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAdmVersionManagement from '@/api/admFileManagementVersion'
import useAdmSendFileData from '@/api/admFileManagementSendFileData';
import useAccessInfoStore from '@/api/accessInfoStore';

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
type EditFileModalProps = {
  fileData: fileManagement_file;
};

export default function VersionMain({ fileData }: EditFileModalProps) {
  // const { dataList, storeDataList } = useAdmUserManagement();
  const [data, setData] = useState<fileManagement_version[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditFile, setIsEditFile] = useState<boolean>(false);
  const [isVersionMain, setIsVersionMain] = useState<boolean>(false);
  const [editUserIndex, setEditUserIndex] = useState<number>(-1);
  const [progress, setProgress] = useState<number>(0);
  const { t: trans } = useTranslation('translation');
  const navigate = useNavigate();
  const pathname = useMemo(() => location.pathname, [location.pathname]);
  const pathParts = pathname.split('/');
  useAdmVersionManagement
  const { dataListVersion, storeListVersion, storeVersionDelete, storeVersionDownload, errorMsg_creat, errorMsg_delete, errorMsg_edit } = useAdmVersionManagement();
  const [progressMap, setProgressMap] = useState<{ [key: number]: number }>({});
  const { storeSendFileData } = useAdmSendFileData();
  const { connInfo } = useAccessInfoStore();

  useEffect(() => {
    storeListVersion(fileData.id + "", trans);
  }, []);

  useEffect(() => {
    console.log(dataListVersion);
    if (dataListVersion != null)
      setData(dataListVersion);
  }, [dataListVersion]);


  useEffect(() => {
    storeListVersion(fileData.id + "", trans);
    storeSendFileData(null)// 전송한 파일 초기화
  }, [errorMsg_creat, errorMsg_edit, errorMsg_delete]);

  useEffect(() => {
    if (isAddModalOpen) { // local서버 이외에서는 해당기능 사용불가
      if (!connInfo?.location?.includes('local')) {
        alert(trans('thisFeatureIsNotAvailableOnThisServer'));
        setIsAddModalOpen(false);
      }
    }
  }, [isAddModalOpen]);

  useEffect(() => {
    if (isEditFile) {
      if (!connInfo?.location?.includes('local')) {
        alert(trans('thisFeatureIsNotAvailableOnThisServer'));
        setIsEditFile(false);
      }
    }
  }, [isEditFile]);

  const columns = useMemo(
    () => [
      {
        name: 'fileName',
        dataIndex: 'save_file_name',
        align: TEXT_ALIGN.LEFT,
        mobileAlign: TEXT_ALIGN.LEFT,
        paddingInline: '24px',
        fixedWidth: '229px',
      },
      {
        name: 'versionName',
        dataIndex: 'version_name',
        align: TEXT_ALIGN.CENTER,
        mobileAlign: TEXT_ALIGN.LEFT,
        paddingInline: '24px',
        fixedWidth: '229px',
      },
      {
        name: 'uploaderId',
        dataIndex: 'user_name',
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
        name: 'downloadDeleteEdit',
        dataIndex: 'correction',
        paddingInline: '24px',
        align: TEXT_ALIGN.CENTER,
        mobileAlign: TEXT_ALIGN.CENTER,
        fixedWidth: '175px',
        noPaddingBlock: true,
        render: (row: fileManagement_version) => (
          <div className='flex items-center'>
            <div className='relative w-[25%] mr-2'>
              {progressMap[row.id] > 0 && (
                <div className='progress-bar '>
                  <div className='progress' style={{ width: `${Math.floor(progressMap[row.id])}%`, marginRight: '16px' }}>
                    {Math.floor(progressMap[row.id])}%
                  </div>
                </div>
              )}
            </div>
            <div className='flex items-center space-x-2'>
              <button type='button' onClick={() => onClickDown(row)}
                className='leading-[128.57%] px-2 text-hw-white-1 items-center text-left h-8'>
                <CellDetailArrowDown />
              </button>
              <button type='button' onClick={() => onClickDelete(row)}
                className='leading-[128.57%] px-2 text-hw-white-1 items-center text-left h-8'>
                <SmallClose />
              </button>
              <button type='button' onClick={() => onClickEdit(row)}
                className='leading-[128.57%] px-2 text-hw-white-1 items-center text-left h-8'>
                <Edit width={22} height={22} stroke='#CACCCE' />
              </button>
            </div>
          </div>
        ),
      },
    ],
    [progressMap],
  );

  const onClickDown = (data: fileManagement_version) => {
    console.log(data);
    const fileName = data.save_file_name; // Ensure data contains the file_name

    storeVersionDownload(fileName, trans, (progress) => {
      setProgressMap((prev) => ({ ...prev, [data.id]: progress }));
    });
  }

  const onClickEdit = (data: fileManagement_version) => {
    console.log(data);
    setEditUserIndex(data.id) // id = seleted index    
    setIsEditFile(true);
  }

  const onClickDelete = (data: fileManagement_version) => {    
    if( !connInfo?.location?.includes('local') ) {
      alert(trans('thisFeatureIsNotAvailableOnThisServer'));   
      return;
    }
    if (window.confirm(trans('areYouDelete'))) {
      storeVersionDelete(data.id + "", data.save_file_name, trans)
    }
    else {
    }
  };

  const addUserDefaultValues = useMemo(() => {
    // return {
    //   userID: '',
    //   password: '',
    //   verifyPassword: '',
    //   name: '',
    //   contact: '',
    //   isAdmin: false,
    //   email: '',
    // };
  }, []);

  return (
    <main className='transition-all flex flex-col items-center w-full px-0 '>
      <div className='transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 w-full mb-8 md:mb-6 h-fit md:h-5 px-[18px] lg:px-0'>
        <span className='pl-[18px] mt-5 lg:mr-0 lg:mt-0 lg:ml-0 transition-all inline-flex w-full relative mb-5 lg:mb-6'>
          <Link
            to={`/admin/file-management`}
            className={cn(
              'block text-[16px] leading-4 lg:text-[20px] lg:leading-5 font-normal',
              (location.pathname.includes('/cell') || location.pathname.includes('/rack')) &&
              'text-hw-white-2 font-[250]',
            )}>
            {trans('fileManagement')}
          </Link>
        </span>
        <button
          type='button'
          onClick={() => setIsAddModalOpen(true)}
          className='py-[6px] pl-4 pr-6 rounded-lg bg-hw-orange-1 flex gap-2 items-center justify-center'>
          <Plus />
          <span className='text-hw-white-1 font-light text-base leading-[125%] whitespace-nowrap'>{trans('addFile')}</span>
        </button>
      </div>
      {/* PC DATA TABLE */}
      <div className='w-full hidden xs:block px-[18px] lg:px-0'>
        <TableData
          data={data}// data={GROUP_DATA}
          columns={columns}
          // onSelectRow={onClickRow}
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
        <ModalWrapper onClose={() => setIsAddModalOpen(false)} defaultValues={addUserDefaultValues} popupType={POPUP_TYPE.VERSION} isCreateMode={true} >
          <AddVersionModal fileId={fileData.id + ""} fileName={fileData.file_name} />
        </ModalWrapper>
      )}
      {isEditFile && (
        <ModalWrapper onClose={() => setIsEditFile(false)} defaultValues={defaultValues} popupType={POPUP_TYPE.VERSION} isCreateMode={false} >
          {data
            .filter((item) => item.id === editUserIndex)
            .map((item) => (
              <EditVersionModal key={item.id} versionData={item} />
            ))}
          {/* <EditFileModal fileData={data[editUserIndex]} /> */}
        </ModalWrapper>
      )}
      {/* {isVersionMain && (
        <ModalWrapper onClose={() => setIsVersionMain(false)} defaultValues={defaultValues} popupType={POPUP_TYPE.SHIP_MATCHING} isCreateMode={false} >
          <VersionMain />
        </ModalWrapper>
      )} */}
    </main>
  );
}


