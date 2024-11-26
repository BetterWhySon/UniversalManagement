import { cn } from '@/helpers/class-name.helper';
import { SidebarMenuType, SidebarSuperMenuType } from '@/types/sidebar-menu.type';
import { Arrow } from '../icons';
import SidebarMenu from './SidebarMenu';
import { SidebarMenuLevel } from '@/enums/sidebar-level.enum';
import { IShip_userSystemInfo, IBMS_userSystemInfo } from '@/types/sidebar-menu.type';
import { useTranslation } from 'react-i18next';

type Props = {
    data: IShip_userSystemInfo;
    open: any;
    siteName: string;
    siteId: string;
    siteNameForeign: string;    
    handleOpen: (id: string, level: SidebarMenuLevel) => void;
};

export default function SidebarSuperMenu({ data, open, siteName, siteId, siteNameForeign,  handleOpen }: Props) {
    const { i18n } = useTranslation('translation');
    const currentLanguage = i18n.language;
    return (
        <ul>
            <li
                onClick={() => handleOpen(data.shipName, SidebarMenuLevel.SUPER)}
                className='pl-6 pr-4 h-12 cursor-pointer select-none w-full flex items-center justify-between'>
                <span className={cn('text-[16px] font-light leading-5 text-hw-white-1 lg:leading-[16px]')}>{currentLanguage == 'kr' ? data?.shipName : data?.shipName_foreign}</span>
                <div className={cn('rotate-0 transition-all duration-300', open.super === data?.shipName && 'rotate-180')}>
                    <Arrow className='stroke-hw-white-1' />
                </div>
            </li>
            <ul
                className={cn(
                    'w-full transition-all duration-200 delay-150 max-h-0 overflow-hidden',
                    open.super === data?.shipName && 'max-h-[200vh] duration-500',
                )}>
                {data?.bmsList.map((menu: IBMS_userSystemInfo, index: number) => (
                    <SidebarMenu key={menu.bms_id} data={menu} open={open} handleOpen={handleOpen} siteName={siteName} siteId={siteId} siteNameForeign={siteNameForeign} shipName={data?.shipName} shipId={''} shipNameForeign={data?.shipName_foreign}/>
                ))}
            </ul>
        </ul>
    );
}
