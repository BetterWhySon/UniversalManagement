import { useTranslation } from 'react-i18next';

type TableWrapper = {
  title: string;
  onAdd: () => void;
  children: React.ReactNode;
  height?: string;
};
export default function TableWrapper({ title, onAdd, children, height = '100%' }: TableWrapper) {
  const { t: trans } = useTranslation('translation');
  return (
    <div
      style={{ height }}
      className='bg-transparent xs:bg-hw-dark-2 xs:rounded-lg xs:pt-[15px] w-full h-full overflow-hidden'>
      <div className='flex justify-between items-center px-[18px] xs:pl-8 xs:pr-2 mb-4 xs:mb-3'>
        <h2 className='text-hw-white-1 text-lg leading-none'>{title}</h2>
        <button onClick={onAdd} className='px-6 py-2 text-base font-light leading-[125%] text-hw-orange-1'>
          {trans('add')}
        </button>
      </div>
      {children}
    </div>
  );
}
