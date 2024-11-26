import TextInput from '@/components/input/TextInput';
import FilterDropdown from '@/pages/admin/status/components/FilterDropdown';
import { useState, useEffect } from 'react';
import useAdmBmsModelManagement from '@/api/admBmsModelManagement';
import { bmsModelData } from '@/types/bms-model.type';
import { Filter } from '@/types/dropdown-filter.type';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export const BMS_FILTERS = {
  name: 'bmsModel',     // name 필드를 key로 활용중, 변경하지 마시요
  selected: '선택',
  values: [],
};

type DefaultValues = {
  bmsID: number;
  bmsName: string;
  alias: string;  
  aliasForeign: string;
  specNumber: string;
  capacity: number;
  rackCount: number;
  modelId: number;
  modelName: string;
  siteName: string;
  siteId: string;
  shipName: string;
  shipId: string;
};

export default function AddBMSModal({ bmsID, bmsName, alias, aliasForeign, specNumber, capacity, rackCount, modelId, modelName, siteName, siteId, shipName, shipId }: DefaultValues) {
  const [selectSpecNumber, setSelectSpecNumber] = useState("");
  const { recvData, storeRecvData } = useAdmBmsModelManagement();
  // const [selectBmsModel, setSelectBmsModel] = useState("");
  const [bmsFilter, setBmsFilter] = useState<Filter>(BMS_FILTERS);
  const { register, setValue } = useFormContext();
  // const [selectModelId, setSelectModelId] = useState(0);
  const { t: trans } = useTranslation('translation');

  useEffect(() => {
    let recvList = recvData?.bms_model
    recvList?.map((item) => {
      if (item.model_name === selectSpecNumber) {
        setValue('specNumberHide', item.model_id);
      }
    });
    // setValue('specNumberHide', selectSpecNumber);
  }, [selectSpecNumber, setValue]);

  useEffect(() => {
    storeRecvData(trans);
  }, []);

  useEffect(() => {
    let recvList = recvData?.bms_model;
    const newValues = recvList?.map(item => item.model_name) ?? [];
    const newBMSFilters = { ...BMS_FILTERS, selected: trans('select'), values: newValues };
    if (modelName) {
      newBMSFilters.selected = modelName;
      setModelId();
    }
    setBmsFilter(newBMSFilters);
  }, [recvData]);

  const setModelId = () => {
    // 모델아이디 찾아서 input에 set함
    let recvList = recvData?.bms_model
    recvList?.map((item) => {
      if (item.model_name === modelName) {
        setValue('specNumberHide', item.model_id);
      }
    });
  };

  return (
    <>
      <h2 className='text-hw-white-1 text-[18px] leading-[18px] font-normal flex items-center xs:text-xl xs:leading-none mb-4 xs:mb-8 h-9 xs:h-fit transition-all'>
        {bmsName ? trans('editEss') : trans('addEss') }
      </h2>
      <div className='flex flex-col gap-4 xs:gap-8 w-full'>
        <div className='flex flex-col xs:flex-row gap-4 xs:gap-5'>
          <TextInput label={trans('siteName')} name='siteName' readOnly defaultValue={siteName} />
          <TextInput label={trans('shipName')} name='shipName' readOnly defaultValue={shipName} />
        </div>
        <div className='flex flex-col xs:flex-row gap-4 xs:gap-5'>
          <TextInput label={trans('essId') + " (*)"} name='bmsID' defaultValue={bmsName} />          
        </div>
        <div className='flex flex-col xs:flex-row gap-4 xs:gap-5'>          
          <TextInput label={trans('essName')+ " (*)"} name='alias' defaultValue={alias} />
          <TextInput label={trans('essNameForeign')+ " (*)"} name='aliasForeign' defaultValue={aliasForeign} />
        </div>
        <div className='flex flex-col xs:flex-row gap-4 xs:gap-5'>
          <TextInput label={trans('capacity')+ " (*)"} name='capacity' defaultValue={capacity + ''} />
          <TextInput label={trans('rackCnt')+ " (*)"} name='numbersOfRack' defaultValue={rackCount + ''} />
        </div>
        <div className='flex flex-col xs:flex-row gap-4 xs:gap-5'>
          <FilterDropdown key={0} title={trans('essModel')+ " (*)"} filter={bmsFilter} callback_Site={setSelectSpecNumber} callback_Ship={setSelectSpecNumber} callback_BMS={setSelectSpecNumber} callback={setSelectSpecNumber} />
        </div>
        <div className='flex flex-col xs:flex-row gap-4 xs:gap-5'>
          <TextInput type='hidden' label='' name='specNumberHide' defaultValue={selectSpecNumber} />
          <TextInput type='hidden' label='' name='shipId' defaultValue={shipId} />
          <TextInput type='hidden' label='' name='bms_id' defaultValue={bmsID + ''} />
        </div>
      </div>
    </>
  );

}
