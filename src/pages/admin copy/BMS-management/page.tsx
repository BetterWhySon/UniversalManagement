import { Cancel, Circle, Edit, Plus, SmallClose } from '@/components/icons';
import ModalWrapper from '@/components/modal/ModalWrapper';
import TableData from '@/components/table/TableData';
import { TEXT_ALIGN } from '@/enums/table';
import { cn } from '@/helpers/class-name.helper';
import { UserManagementData } from '@/types/user-management.type';
import { useMemo, useState, useEffect } from 'react';
import AddBmsModelModal from './components/AddBmsModelModal';
import EditUserModal from './components/EditUserModal';
import './style.scss';
import useAdmBmsModelManagement from '@/api/admBmsModelManagement';
import useAdmUserManagementUserEdit from '@/api/admUserManagementUserEdit';
import { POPUP_TYPE } from '@/constants/admManagement.constant';
import useAdmBmsModelCreate from '@/api/admBmsModelCreate';
import useAdmBmsModelDelete from '@/api/admBmsModelDelete';
import useAdmBmsModelEdit from '@/api/admBmsModelEdit';
import { bmsModelData, bmsModelType } from '@/types/bms-model.type';
import { useTranslation } from 'react-i18next';
import { backendURL } from '@/api/URLs';
import useAccessInfoStore from '@/api/accessInfoStore';

const pagination = {
  total: 10,
  pageSize: 20,
};

const defaultValues = {
  id: 0,
  modelID: 0,     // index
  modelName: "",
  modelType: "",  // '액침식'
  imagePath: "",    
};

export default function BMSManagementPage() {
  const {recvData, storeRecvData } = useAdmBmsModelManagement();    
  const [data, setData] = useState<bmsModelData[]>([]);
  const [modelTypeData, setModelTypeData] = useState<bmsModelType[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isEditBmsMoeld, setIsEditBmsMoeld] = useState<boolean>(false);
  // const [editUserIndex, setEditUserIndex] = useState<number>(-1);
  const { errorMsg_bmsModelCreat } = useAdmBmsModelCreate();
  const { errorMsg_bmsModelDelete } = useAdmBmsModelDelete();
  const { errorMsg_bmsModelEdit } = useAdmBmsModelEdit();
  // const { errorMsg_bmsModelEdit } = useAdmUserManagementUserEdit();  
  const { storeBmsModelDelete } = useAdmBmsModelDelete();  
  const { t: trans } = useTranslation('translation');
  const { connInfo } = useAccessInfoStore();

  useEffect(() => {
    storeRecvData(trans);
  },[]);

  useEffect(() => {   // 생성,수정,삭제 후 데이터 리로드 처리
    storeRecvData(trans);   
  },[errorMsg_bmsModelCreat, errorMsg_bmsModelDelete]);
  
  useEffect(() => {   // 생성,수정,삭제 후 데이터 리로드 처리
    console.log(errorMsg_bmsModelEdit);
    if(errorMsg_bmsModelEdit) {
      window.location.reload();
    }
    // storeRecvData();   
  },[errorMsg_bmsModelEdit]);

  useEffect(() => {    
    let _datas: Array<bmsModelData> = [];    
    let recvList = recvData?.bms_model
    recvList?.map((item, index) => {
      _datas.push({
        id: index,
        modelID: item.model_id,  
        modelName: item.model_name,
        modelType: item.model_type,
        imagePath: item.image_path,    
      })
    });    
    setData(_datas);

    let _modelTypeDatas: Array<bmsModelType> = [];    
    let recvModeltypes = recvData?.model_type
    recvModeltypes?.map((item, index) => {
      _modelTypeDatas.push({
        typeId: item.id ,
        typeName: item.name,  
      })
    });       
    setModelTypeData(_modelTypeDatas);    
  },[recvData]);

  useEffect(() => {
    if (isAddModalOpen) {// local서버 이외에서는 해당기능 사용불가
      if (!connInfo?.location?.includes('local')) {
        alert(trans('thisFeatureIsNotAvailableOnThisServer'));
        setIsAddModalOpen(false);
      }
    }
  }, [isAddModalOpen]);

  // if( !connInfo?.location?.includes('local') ) {
  //   alert(trans('thisFeatureIsNotAvailableOnThisServer'));   
  //   return;
  // }

  useEffect(() => {
    if (isEditModalOpen) {
      if (!connInfo?.location?.includes('local')) {
        alert(trans('thisFeatureIsNotAvailableOnThisServer'));
        setIsEditModalOpen(false);
      }
    }
  }, [isEditModalOpen]);

  const columns = useMemo(
    () => [
      {
        name: 'modelName',
        dataIndex: 'modelName',
        paddingInline: '24px',
        fixedWidth: '229px',
      },
      {
        name: 'modelType',
        dataIndex: 'modelType',
        paddingInline: '24px',
        fixedWidth: '130px',
      },
      {
        name: 'fileName',
        dataIndex: 'imagePath',
        align: TEXT_ALIGN.CENTER,
        mobileAlign: TEXT_ALIGN.LEFT,
        paddingInline: '24px',
        fixedWidth: '179px',        
      },     
      {
        name: 'image',
        dataIndex: 'image',
        paddingInline: '24px',
        fixedWidth: '179px',
        render: (row: bmsModelData) => (             
          <img className='leading-[128.57%] px-4 text-hw-white-1 items-center text-left h-8'
            src={backendURL + "media/" + row.imagePath}  alt="new" />          
        ),    
      },        
      {
        name:  'deleteEdit',
        dataIndex: 'correction',
        paddingInline: '24px',
        align: TEXT_ALIGN.CENTER,
        mobileAlign: TEXT_ALIGN.CENTER,
        fixedWidth: '175px',
        noPaddingBlock: true,
        render: (row: bmsModelData) => (
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

  const onClickEdit = (data: bmsModelData) => {
    console.log(data);        
    defaultValues.id = data.id
    defaultValues.modelID = data.modelID
    defaultValues.modelName = data.modelName
    defaultValues.modelType = data.modelType
    defaultValues.imagePath = data.imagePath    
    setIsEditModalOpen(true);    
  }

  const onClickDelete = (data: bmsModelData) => {
    if( !connInfo?.location?.includes('local') ) {
      alert(trans('thisFeatureIsNotAvailableOnThisServer'));   
      return;
    }
    if(window.confirm(trans('areYouDelete'))) {
        storeBmsModelDelete(data.modelID, trans)
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

  return (
    <main className='transition-all flex flex-col items-center w-full pt-5 px-0 lg:px-[55px] lg:pt-10 xs:pb-[74px] user-management__wrapper'>
      <div className='transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 w-full mb-8 md:mb-6 h-fit md:h-5 px-[18px] lg:px-0'>
        <h1 className='w-full text-hw-white-1  text-[16px] font-normal leading-4 lg:text-xl lg:leading-none'>
          {trans('essModel')}
        </h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className='py-[6px] pl-4 pr-6 rounded-lg bg-hw-orange-1 flex gap-2 items-center justify-center'>
          <Plus />
          <span className='text-hw-white-1 font-light text-base leading-[125%] whitespace-nowrap'>{trans('addEss')}</span>
        </button>
      </div>

      {/* PC DATA TABLE */}
      <div className='w-full hidden xs:block px-[18px] lg:px-0'>
        <TableData
          data={data}
          columns={columns}
          // emptyMessage='사이트를 선택해 주세요.'
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
                    {item.render ? item.render(row) : row[item.dataIndex as string] || ''}
                  {/* {item.render ? item.render(row, item.dataIndex) : row[item.dataIndex as string] || ''} */}
                </span>
              ))}
            </li>
          ))}
        </ul>
      </div>

      {isAddModalOpen && (
        <ModalWrapper onClose={() => setIsAddModalOpen(false)} defaultValues={addUserDefaultValues} popupType={POPUP_TYPE.BMS_MODEL} isCreateMode={true} >  
          <AddBmsModelModal modelTypeData={modelTypeData} modelName={""} modelID={defaultValues.modelID} 
                            modelType={defaultValues.modelType} imagePath={defaultValues.imagePath} />
        </ModalWrapper>
      )}
      {isEditModalOpen && (
        <ModalWrapper onClose={() => setIsEditModalOpen(false)} defaultValues={defaultValues} popupType={POPUP_TYPE.BMS_MODEL} isCreateMode={false} >
          <AddBmsModelModal modelTypeData={modelTypeData} modelName={defaultValues.modelName} modelID={defaultValues.modelID} 
                            modelType={defaultValues.modelType} imagePath={defaultValues.imagePath} />
        </ModalWrapper>
      )}
    </main>
  );
}
