import { cn } from '@/helpers/class-name.helper';
import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Arrow } from '../icons';

type SubmenuItem = {
  id: number;
  title: string;
};
type SidebarSubMenu = {
  id: number;
  title: string;
  list: SubmenuItem[];
};

export default function SidebarSubMenu({ data }: { data: SidebarSubMenu }) {
  const location = useLocation();
  const pathname = useMemo(() => location.pathname, [location.pathname]);
  const pathParts = pathname.split('/');
  const [openedMenu, setOpenedMenu] = useState(false);
  const handleOpenMenu = () => {
    setOpenedMenu((prev) => !prev);
  };
  return (
    <li className='w-full pl-6 pr-[26px] lg:pr-4'>
      <div
        className={cn(
          'w-full py-3 select-none flex items-center justify-between text-[16px]',
          pathname.includes('/system') &&
            !pathname.includes('/rack') &&
            Number(data.id + 1) === Number(pathParts[pathParts.length - 1]) &&
            'text-hw-orange-1',
        )}>
        <Link to={`/system/${data.id + 1}`} className='text-[16px] leading-[16px] font-light'>
          {data.title}
        </Link>

        <div className={cn('rotate-0 transition-all', openedMenu && 'rotate-180')} onClick={handleOpenMenu}>
          <Arrow
            className={
              pathname.includes('/system') &&
              !pathname.includes('/rack') &&
              Number(data.id + 1) === Number(pathParts[pathParts.length - 1])
                ? 'stroke-hw-orange-1'
                : 'stroke-hw-white-1'
            }
          />
        </div>
      </div>
      <ul className={cn('max-h-0 transition-all overflow-hidden', openedMenu && 'max-h-[160px]')}>
        {data?.list?.map((item: SubmenuItem) => (
          <li
            key={item.id}
            className={cn(
              'text-[14px] select-none leading-[18px] pl-4 text-hw-white-1 font-light h-8 flex items-center',
              location.pathname.includes('/rack') &&
                Number(data.id + 1) === Number(pathParts[2]) &&
                Number(item.id + 1) === Number(pathParts[pathParts.length - 1]) &&
                'text-hw-orange-1',
              location.pathname.includes('/cell') &&
                Number(data.id + 1) === Number(pathParts[2]) &&
                Number(item.id + 1) === Number(pathParts[pathParts.length - 2]) &&
                'text-hw-orange-1',
            )}>
            <Link to={`/system/${data.id + 1}/rack/${item.id + 1}`} className=' w-full h-full flex items-center'>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}
