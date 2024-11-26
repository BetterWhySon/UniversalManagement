import { useState, useEffect } from 'react';
import ModalWrapper from '@/components/modal/ModalWrapper';
import AddSiteModal from './AddSiteModal';
import TableWrapper from './TableWrapper';
import { useSearchParams } from 'react-router-dom';
import TableData from '@/components/table/TableData';
import { OverflowX, TEXT_ALIGN } from '@/enums/table';
import { SITE_TABLE_NAME } from '@/constants/ship-management.constant';
import useAdmEssManagement from '@/api/admEssManagement';
import { number } from 'echarts';
import {  Edit, SmallClose } from '@/components/icons';
import useAdmEssManagementSiteDelete from '@/api/admEssManagementSiteDelete';
import { CARD_TYPE } from '@/constants/dashboard.constant';
import { POPUP_TYPE } from '@/constants/admManagement.constant';
import { useTranslation } from 'react-i18next';

// const DRAFT_DATA = Array.from(Array(12)).map((_, index: number) => {
//   return {
//     id: index + 1,
//     site: '배터와이',
//     correction: '',
//   };
// });

type SiteTableData = {
  id: number;
  site: string
  siteForeign: string
  siteId: string;
  coordinateX: number;
  coordinateY: number;
  correction: string;
};
const defaultValues = {
  siteName: '',
  siteNameForeign: '',
  xPos: 0,
  yPos: 0,
  siteId: ''
};
export default function SiteTable() {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditSite, setIsEditSite] = useState<boolean>(false);
  const [data, setData] = useState<SiteTableData[]>([]);
  const { dataList, storeDataList } = useAdmEssManagement();
  const { selectSite, storeSeletSite } = useAdmEssManagement();
  const { storeSeletShip } = useAdmEssManagement();
  const { storeSiteDelete } = useAdmEssManagementSiteDelete();  
  const { t: trans, i18n } = useTranslation('translation');
  const currentLanguage = i18n.language;
  
  useEffect(() => {
    // pagination.total = data.length
  }, [data]);

  useEffect(() => {
    console.log("SiteTable dataList", dataList)
    setFilterData()
  }, [dataList]);

  const setFilterData = () => {
    if (!dataList || dataList.length === 0) {
      return;
    }
    console.log("_data", dataList);

    let _data: Array<SiteTableData> = [];
    var nId: number = 0
    dataList.map((site) => {
      _data.push({
        id: nId + 1,
        site: site.siteName,
        siteForeign: site.siteName_foreign,
        siteId: site.site_id,
        coordinateX: site.coordinate_x,
        coordinateY: site.coordinate_y,
        correction: "",
      })
      nId++
    })
    setData(_data);
    console.log(data);
  };

  const columns = [
    {
      name: trans('no.'),
      dataIndex: 'id',
      width: '1%',
      paddingInline: '32px',
    },
    {
      name: trans('site'),
      dataIndex: currentLanguage == 'kr' ? 'site' : 'siteForeign' ,
      paddingInline: '24px',
    },
    // {
    //   name: trans('siteForeign'),
    //   dataIndex: 'siteForeign',
    //   paddingInline: '24px',
    // },
    {
      name: trans('deleteEdit'),
      align: TEXT_ALIGN.CENTER,
      dataIndex: 'correction',
      width: '1%',
      paddingInline: '24px',
      noPaddingBlock: true,
      render: (row: SiteTableData, dataIndex: string) => (
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

  const onClickEdit = (data: SiteTableData) => {
    console.log(data);
    defaultValues.siteName = data.site
    defaultValues.siteNameForeign = data.siteForeign
    defaultValues.xPos = data.coordinateX
    defaultValues.yPos = data.coordinateY
    defaultValues.siteId = data.siteId
    setIsEditSite(true);
  }

  const onClickDelete = (data: SiteTableData) => {
    if(window.confirm(trans('areYouDeleteAndNoti01'))) {
        storeSiteDelete(data.site, data.siteId, trans)
      }
      else {
      }
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const onClickRow = (rowIndex: number) => {
    storeSeletSite(rowIndex);
    storeSeletShip(-1);  
  };
  
  return (
    <>
      <TableWrapper onAdd={() => setIsAddModalOpen(true)} title={trans('site')} height='736px'>
        <TableData
          data={data}
          columns={columns}
          onSelectRow={onClickRow}
          // selectedRow={Number(searchParams.get(SITE_TABLE_NAME))}
          emptyMessage={trans('msgSiteEmpty')}
          selectedRow={selectSite+1}
          overflowX={OverflowX.HIDDEN}
        />
      </TableWrapper>
      {/* 추가 */}
      {isAddModalOpen && (
        <ModalWrapper onClose={() => setIsAddModalOpen(false)} defaultValues={defaultValues} popupType={POPUP_TYPE.SITE} isCreateMode={true} >  
          <AddSiteModal siteName='' siteNameForeign='' xPos={0} yPos={0} siteId='999'/>
        </ModalWrapper>
      )}
      {/* 수정 */}
      {isEditSite && (
        <ModalWrapper onClose={() => setIsEditSite(false)} defaultValues={defaultValues} popupType={POPUP_TYPE.SITE} isCreateMode={false} >
          <AddSiteModal siteName={defaultValues.siteName} siteNameForeign={defaultValues.siteNameForeign} xPos={defaultValues.xPos} yPos={defaultValues.yPos} siteId={defaultValues.siteId} />
        </ModalWrapper>
      )}
    </>
  );
}



