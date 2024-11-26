import TextInput from '@/components/input/TextInput';
import { useTranslation } from 'react-i18next';

type DefaultValues = {
  siteName: string;
  siteNameForeign: string;
  xPos: number;
  yPos: number;
  siteId: string;
};

// type TableWrapper = {
//   title: string;
//   onAdd: () => void;
//   children: React.ReactNode;
// };
// export default function AddSiteModal({ title, onAdd, children }: TableWrapper) {
export default function AddSiteModal({ siteName, siteNameForeign, xPos, yPos, siteId }: DefaultValues) {
  const { t: trans } = useTranslation('translation');
  return (
    <>
      <h2 className='text-hw-white-1 text-[18px] leading-[18px] font-normal flex items-center xs:text-xl xs:leading-none mb-4 xs:mb-8 h-9 xs:h-fit transition-all'>
        {siteName ? trans('editSite') : trans('addSite')}
      </h2>
      <div className='flex flex-col gap-4 xs:gap-8 w-full'>
        <div className='flex flex-col xs:flex-row gap-5'>
          <TextInput label={trans('siteName') + " (*)"} name='siteName' defaultValue={siteName} />
          <TextInput label={trans('siteNameForeign') + " (*)"} name='siteNameForeign' defaultValue={siteNameForeign} />
        </div>
        <div className='flex flex-col xs:flex-row gap-5'>
          <TextInput label={trans('xPos') + " (*)"} name='xPos' defaultValue={'' + xPos} />
          <TextInput label={trans('yPos') + " (*)"} name='yPos' defaultValue={'' + yPos} />
        </div>
        <TextInput type='hidden' label='' name='siteId' defaultValue={siteId} />
      </div>
    </>
  );
}
