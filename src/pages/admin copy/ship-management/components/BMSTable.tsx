import { useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import AddBMSModal from './AddBMSModal';
import { OverflowX, TEXT_ALIGN } from '@/enums/table';
import TableWrapper from './TableWrapper';
import TableData from '@/components/table/TableData';
import { ThreeDot } from '@/components/icons';
import { BMS_TABLE_NAME, SHIP_TABLE_NAME, SITE_TABLE_NAME } from '@/constants/ship-management.constant';
import ModalWrapper from '@/components/modal/ModalWrapper';
import useAdmEssManagement from '@/api/admEssManagement';
import { POPUP_TYPE } from '@/constants/admManagement.constant';
import { Edit, SmallClose } from '@/components/icons';
import useAdmEssManagementBmsDelete from '@/api/admEssManagementBmsDelete';
import { useTranslation } from 'react-i18next';

// const DRAFT_DATA = Array.from(Array(12)).map((item, index: number) => {
//   return {
//     id: index + 1,
//     bmsID: 'TEST01',
//     numbersOfRack: '3',
//     specNo: '2',
//     correction: '',
//   };
// });

type BMSTableData = {
  id: number;
  bmsID: number;
  bmsName: string;
  alias: string;
  aliasForeign: string;
  capacity: number;
  numbersOfRack: number;
  modelId: number;
  modelName: string;
  siteName: string;
  siteId: string;
  shipName: string;
  shipId: string;


  correction: string;
};

const defaultValues = {    
  bmsID: 0,
  bmsName: '',
  alias: '',
  aliasForeign: '',
  specNumber: '',
  capacity: 0,
  rackCount: 0,
  modelId: 0,
  modelName: '', 
  siteName: '',
  siteId: '',
  shipName: '',
  shipId: '',
};

export default function BMSTable() {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [data, setData] = useState<BMSTableData[]>([]);
  const { dataList, storeDataList } = useAdmEssManagement();  
  const { selectSite, storeSeletSite } = useAdmEssManagement();  
  const { selectShip, storeSeletShip } = useAdmEssManagement();  
  const { storeBmsDelete } = useAdmEssManagementBmsDelete();  
  const { t: trans, i18n } = useTranslation('translation');
  const [defaultValuesState, setDefaultValuesState] = useState(defaultValues);
  const currentLanguage = i18n.language;
  
  useEffect(() => {
    // console.log("SiteTable", dataList)
    setFilterData()
  }, [dataList]);
  
  useEffect(() => {   
    setFilterData()     
  },[selectShip]);

  useEffect(() => {   
    // console.log("BMSTable - isAddModalOpen : "+ isAddModalOpen);
    defaultValues.bmsID = 0;
    defaultValues.bmsName = '';
    defaultValues.alias = '';
    defaultValues.capacity = 0;
    defaultValues.rackCount = 0;
    defaultValues.modelId = 0;
    defaultValues.modelName = '';
    defaultValues.siteId = '';
    defaultValues.siteName = '';
    defaultValues.shipId = '';
    defaultValues.shipName = '';
  },[isAddModalOpen]);

  const setFilterData = () => {
    if (!dataList || dataList.length === 0) {
      return;
    }
    let _data: Array<BMSTableData> = [];
    let defaultValuesCopy = { ...defaultValues };
    var nId: number = 0    
    dataList.map((site, siteIndex) => {
      if (siteIndex === selectSite) {        
        defaultValuesCopy.siteName = site.siteName;
        defaultValuesCopy.siteId = site.site_id;
        site.shipList.map((ship, shipIndex) => {            
          if (shipIndex === selectShip) {                   
            defaultValuesCopy.shipName = ship.shipName;
            defaultValuesCopy.shipId = ship.ship_id;
            ship.bmsList.map((BMS) => {                
              _data.push({
                id: nId + 1,
                bmsID: BMS.bms_id,
                bmsName: BMS.bmsName,
                alias: BMS.alias,
                aliasForeign: BMS.alias_foreign,
                capacity: BMS.capacity,
                numbersOfRack: BMS.rack_count,
                modelId: BMS.model_id,
                modelName: BMS.model_name,
                siteName: site.siteName,
                siteId: site.site_id,
                shipName: ship.shipName,
                shipId: ship.ship_id,
                correction: "",
              })
              nId++
            })
          }
        })
      }
    })
    setData(_data);  
    setDefaultValuesState(defaultValuesCopy);   
  };

  const [searchParams, setSearchParams] = useSearchParams();

  const columns = [
    {
      name: trans('essName'),
      // dataIndex: 'bmsName',
      dataIndex: currentLanguage == 'kr' ? 'alias' : 'aliasForeign' ,
      paddingInline: '32px',
    },
    {
      name: trans('rack'),
      dataIndex: 'numbersOfRack',
      align: TEXT_ALIGN.CENTER,
      paddingInline: '1px',
    },
    {
      name: trans('essModel'),
      dataIndex: 'modelName',
      align: TEXT_ALIGN.CENTER,
      paddingInline: '24px',
    },
    {
      name: trans('deleteEdit'),
      // name: trans('delete') + trans('edit'),
      // name:'삭제&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;수정',
      dataIndex: 'correction',
      align: TEXT_ALIGN.CENTER,
      width: '1%',
      paddingInline: '24px',
      noPaddingBlock: true,
      render: (row: BMSTableData, dataIndex: string) => (
        <div>
          <button onClick={() => onClickDelete(row)}
            className='leading-[128.57%] px-2 text-hw-white-1 items-center text-left h-8'>
            <SmallClose />
          </button>
          <button onClick={() => onClickEdit(row)}
            className='leading-[128.57%] px-2 text-hw-white-1 items-center text-left h-8'>
            <Edit width={20} height={20} stroke='#CACCCE' />
          </button>
        </div>
      ),
    },
  ];
  
  const onClickEdit = (data: BMSTableData) => {
    console.log(data);    
    setDefaultValuesState({
      bmsID: data.bmsID,
      bmsName: data.bmsName,
      alias: data.alias,
      aliasForeign: data.aliasForeign,
      specNumber: '',
      capacity: data.capacity,
      rackCount: data.numbersOfRack,
      modelId: data.modelId,
      modelName: data.modelName,
      siteId: data.siteId,
      siteName: data.siteName,
      shipId: data.shipId,
      shipName: data.shipName      
    });
    setIsEditModalOpen(true);
  }
  
  const onClickDelete = (data: BMSTableData) => {
    if(window.confirm(trans('areYouDelete'))) {          
        storeBmsDelete(data.bmsID, trans)
      }
      else {
      }
  };

  const emptyMessage = useMemo(() => {    
    if (!searchParams.get(SHIP_TABLE_NAME)) return '선박을 선택해 주세요.';
    return '';
  }, [searchParams.get(SITE_TABLE_NAME), searchParams.get(SHIP_TABLE_NAME)]);

  const onClickRow = (rowIndex: number) => {
    if (searchParams.get(BMS_TABLE_NAME) === (rowIndex + 1).toString()) {
      searchParams.delete(BMS_TABLE_NAME);
      setSearchParams(searchParams);
      return;
    }
    searchParams.set(BMS_TABLE_NAME, (rowIndex + 1).toString());
    setSearchParams(searchParams);
  };

  const refresh = () => {
    
  }

  return (
    <div className='bms__table'>
      <TableWrapper onAdd={() => setIsAddModalOpen(true)} title={trans('ess')} height='736px'>
        <TableData
          data={data}
          columns={columns}
          onSelectRow={onClickRow}
          // selectedRow={Number(searchParams.get(BMS_TABLE_NAME))}
          selectedRow={0}
          emptyMessage={trans('msgShipSelect')}
          overflowX={OverflowX.HIDDEN}
        />
      </TableWrapper>
      {isAddModalOpen && (
        <ModalWrapper onClose={() => setIsAddModalOpen(false)} defaultValues={defaultValues} popupType={POPUP_TYPE.BMS} isCreateMode={true} >
          <AddBMSModal bmsID={0} bmsName={''} alias={''} aliasForeign={''}  specNumber={''} capacity={0} rackCount={0} 
          modelId={0}  modelName={''} siteName={defaultValuesState.siteName} siteId={defaultValuesState.siteId} shipName={defaultValuesState.shipName} shipId={defaultValuesState.shipId} />
        </ModalWrapper>
      )}

      {isEditModalOpen && (
        <ModalWrapper onClose={() => setIsEditModalOpen(false)} defaultValues={defaultValues} popupType={POPUP_TYPE.BMS} isCreateMode={false} >
          <AddBMSModal bmsID={defaultValuesState.bmsID} bmsName={defaultValuesState.bmsName} alias={defaultValuesState.alias} aliasForeign={defaultValuesState.aliasForeign} specNumber={defaultValuesState.specNumber} capacity={defaultValuesState.capacity} rackCount={defaultValuesState.rackCount} 
          modelId={defaultValuesState.modelId}  modelName={defaultValuesState.modelName} siteName={defaultValuesState.siteName} siteId={defaultValuesState.siteId} shipName={defaultValuesState.shipName} shipId={defaultValuesState.shipId} />
        </ModalWrapper>
      )}
    </div>
  );
}
