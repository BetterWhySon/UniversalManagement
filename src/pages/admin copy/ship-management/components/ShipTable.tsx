import { useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import ModalWrapper from '@/components/modal/ModalWrapper';
import AddShipModal from './AddShipModal';
import TableWrapper from './TableWrapper';
import TableData from '@/components/table/TableData';
import { OverflowX, TEXT_ALIGN } from '@/enums/table';
import { ThreeDot } from '@/components/icons';
import { BMS_TABLE_NAME, SHIP_TABLE_NAME, SITE_TABLE_NAME } from '@/constants/ship-management.constant';
import useAdmEssManagement from '@/api/admEssManagement';
import { POPUP_TYPE } from '@/constants/admManagement.constant';
import { Edit, SmallClose } from '@/components/icons';
import useAdmEssManagementShipDelete from '@/api/admEssManagementShipDelete';
import { useTranslation } from 'react-i18next';

type ShipTableData = {
  siteId: string;
  siteName: string;
  id: number;
  shipId: string;
  ship: string;
  shipForeign: string;
  correction: string;
};

const defaultValues = {
  siteId: '',
  siteName: '',
  shipId: '',
  shipName: '',
  shipNameForeign: '',
};

export default function ShipTable() {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false); // 추가
  const [isEditShip, setIsEditShip] = useState<boolean>(false);         // 수정
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState<ShipTableData[]>([]);
  const { dataList, storeDataList } = useAdmEssManagement();
  const { selectSite, storeSeletSite } = useAdmEssManagement();
  const { selectShip, storeSeletShip } = useAdmEssManagement();
  const { storeShipDelete } = useAdmEssManagementShipDelete();
  const { t: trans, i18n } = useTranslation('translation');
  const currentLanguage = i18n.language;

  currentLanguage
  useEffect(() => {
    console.log("currentLanguage = ", currentLanguage)
    
  }, []);
  useEffect(() => {
    // pagination.total = data.length
  }, [data]);

  useEffect(() => {
    // console.log("SiteTable", dataList)
    setFilterData()
  }, [dataList]);

  useEffect(() => {
    // console.log("siteTable", selectSite);
    setFilterData()
  }, [selectSite]);

  useEffect(() => {

  }, [selectShip]);


  const setFilterData = () => {
    if (!dataList || dataList.length === 0) {
      return;
    }
    // console.log(dataList);

    let _data: Array<ShipTableData> = [];
    var nId: number = 0
    dataList.map((site, index) => {
      if (index === selectSite) {
        defaultValues.siteId = site.site_id;
        defaultValues.siteName = site.siteName;
        site.shipList.map((ship) => {
          _data.push({
            id: nId + 1,
            ship: ship.shipName,
            shipForeign: ship.shipName_foreign,
            shipId: ship.ship_id,
            siteId: site.site_id,
            siteName: site.siteName,
            correction: "",
          })
          nId++
        })
      }
    })
    setData(_data);
  };


  const columns = [
    {
      name: trans('no.'),
      dataIndex: 'id',
      width: '1%',
      paddingInline: '32px',
    },
    {
      name: trans('shipName'),
      dataIndex: currentLanguage == 'kr' ? 'ship' : 'shipForeign' ,
      paddingInline: '24px',
    },
    // {
    //   name: trans('shipNameForeign'),
    //   dataIndex: 'shipForeign',
    //   paddingInline: '24px',
    // },
    {
      name: trans('deleteEdit'),
      dataIndex: 'correction',
      align: TEXT_ALIGN.CENTER,
      width: '1%',
      paddingInline: '24px',
      noPaddingBlock: true,
      render: (row: ShipTableData, dataIndex: string) => (
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
  const onClickEdit = (data: ShipTableData) => {
    console.log(data);
    defaultValues.siteId = data.siteId
    defaultValues.siteName = data.siteName
    defaultValues.shipId = data.shipId
    defaultValues.shipName = data.ship
    defaultValues.shipNameForeign = data.shipForeign
    setIsEditShip(true);
  }

  const onClickDelete = (data: ShipTableData) => {
    if(window.confirm(trans('areYouDeleteAndNoti01'))) {
      storeShipDelete(data.ship, data.shipId, trans)
    }
    else {
    }
  };

  // const DRAFT_DATA = Array.from(Array(12)).map((item, index: number) => {
  //   return {
  //     id: index + 1,
  //     ship: '배터와이',
  //     correction: '',
  //   };
  // });

  useEffect(() => {
    if (searchParams.get(SITE_TABLE_NAME)) {
      setData(data);
      return;
    }
    setData([]);
  }, [searchParams.get(SITE_TABLE_NAME)]);

  const emptyMessage = useMemo(() => {
    if (!searchParams.get(SITE_TABLE_NAME)) return trans('msgSiteSelect');
    return '';
  }, [searchParams.get(SITE_TABLE_NAME)]);

  const onClickRow = (rowIndex: number) => {

    storeSeletShip(rowIndex);
    // if (searchParams.get(SHIP_TABLE_NAME) === (rowIndex + 1).toString()) {
    //   searchParams.delete(SHIP_TABLE_NAME);
    //   searchParams.delete(BMS_TABLE_NAME);
    //   setSearchParams(searchParams);
    //   return;
    // }
    // searchParams.set(SHIP_TABLE_NAME, (rowIndex + 1).toString());
    // setSearchParams(searchParams);
  };

  return (
    <>
      <TableWrapper onAdd={() => setIsAddModalOpen(true)} title={trans('ship')} height='736px'>
        <TableData
          data={data}
          columns={columns}
          onSelectRow={onClickRow}
          // selectedRow={Number(searchParams.get(SHIP_TABLE_NAME))}
          selectedRow={selectShip + 1}
          emptyMessage={trans('msgSiteSelect')}
          overflowX={OverflowX.HIDDEN}
        />
      </TableWrapper>
      {isAddModalOpen && (
        <ModalWrapper onClose={() => setIsAddModalOpen(false)} defaultValues={defaultValues} popupType={POPUP_TYPE.SHIP} isCreateMode={true} >
          <AddShipModal siteId={defaultValues.siteId} siteName={defaultValues.siteName} shipId='' shipName='' shipNameForeign='' />
        </ModalWrapper>
      )}
      {isEditShip && (
        <ModalWrapper onClose={() => setIsEditShip(false)} defaultValues={defaultValues} popupType={POPUP_TYPE.SHIP} isCreateMode={false} >
          <AddShipModal siteId={defaultValues.siteId} siteName={defaultValues.siteName} shipId={defaultValues.shipId} shipName={defaultValues.shipName} shipNameForeign={defaultValues.shipNameForeign} />
        </ModalWrapper>
      )}
    </>
  );
}
