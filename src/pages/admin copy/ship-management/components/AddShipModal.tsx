import TextInput from '@/components/input/TextInput';
import { useTranslation } from 'react-i18next';

type DefaultValues = {
  siteId: string;
  siteName: string;
  shipId: string;
  shipName: string;
  shipNameForeign: string;
};

export default function AddShipModal({ siteId, siteName, shipId, shipName, shipNameForeign }: DefaultValues) {
  const { t: trans } = useTranslation('translation');
  return (
    <>
      <h2 className='text-hw-white-1 text-[18px] leading-[18px] font-normal flex items-center xs:text-xl xs:leading-none mb-4 xs:mb-8 h-9 xs:h-fit transition-all'>
        {shipName ? trans('editShip') : trans('addShip')}
      </h2>
      <div className='flex flex-col gap-4 xs:gap-8 w-full'>
        <TextInput label={trans('siteName')} name='siteName' readOnly defaultValue={siteName} />
        <div className='flex flex-col xs:flex-row gap-5'>
          <TextInput label={trans('shipName') + " (*)"} name='shipName' defaultValue={shipName} />
          <TextInput label={trans('shipNameForeign') + " (*)"} name='shipNameForeign' defaultValue={shipNameForeign} />
        </div>
      </div>
      <TextInput type='hidden' label='' name='siteId' defaultValue={siteId} />
      <TextInput type='hidden' label='' name='shipId' defaultValue={shipId} />
    </>
  );
}
