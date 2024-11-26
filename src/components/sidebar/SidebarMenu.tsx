import { SidebarMenuLevel } from '@/enums/sidebar-level.enum';
import { cn } from '@/helpers/class-name.helper';
import { SidebarMenuType, SubmenuItem } from '@/types/sidebar-menu.type';
import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Arrow } from '../icons';
import { IShip_userSystemInfo, IBMS_userSystemInfo } from '@/types/sidebar-menu.type';
import useSidebarDepthData from '@/components/sidebar/data/SidebarDepthData';
import { SidebarDepthDataType } from '@/types/sidebar-menu.type';
import { useTranslation } from 'react-i18next';

type Props = {
    data: IBMS_userSystemInfo;
    open: any;
    siteName: string;
    siteNameForeign: string;
    siteId: string;
    shipName: string;
    shipId: string;
    shipNameForeign: string;
    handleOpen: (id: string, level: SidebarMenuLevel) => void;
};

export default function SidebarMenu({ data, open, siteName, siteId, siteNameForeign, shipName, shipId, shipNameForeign, handleOpen }: Props) {
    const location = useLocation();
    const pathname = useMemo(() => location.pathname, [location.pathname]);
    const pathParts = pathname.split('/');
    const { sidebarDepthData, storeSidebarDepthData } = useSidebarDepthData();
    const { i18n } = useTranslation('translation');
    const currentLanguage = i18n.language;

    const handleOpenMenu = () => {
        handleOpen(data?.bms_name, SidebarMenuLevel.MENU);
    };
    const handleClickBMS = () => {
        let tmp: SidebarDepthDataType = {
            EXTRA: siteName || '',
            SUPER: shipName || '',
            MENU: data.bms_name || '',
            MENU_ID: data.bms_id || 0
        };
        storeSidebarDepthData(tmp?.EXTRA, tmp?.SUPER, tmp?.MENU, tmp?.MENU_ID);
    };
    const handleClickRack = () => {
        // let tmp: SidebarDepthDataType = {
        //   EXTRA: siteName || '',
        //   SUPER: shipName || '',
        //   MENU: data.bms_name || '',
        //   MENU_ID: data.bms_id || 0
        // };
        // storeSidebarDepthData(tmp?.EXTRA, tmp?.SUPER, tmp?.MENU, tmp?.MENU_ID);
    };

    return (
        <li className={cn('mx-2 pl-9 pr-2 lg:pr-2 duration-300', open.menu === (currentLanguage == 'kr' ? data.bms_name : data.alias_foreign) && 'bg-hw-dark-1 duration-300')}>
            <div
                className={cn(
                    'w-full py-1 select-none flex items-center justify-between text-[16px]',
                    pathname.includes('/system') &&
                    !pathname.includes('/rack') &&
                    data.bms_id + '' === pathParts[pathParts.length - 1] &&
                    'text-hw-orange-1',
                )}>
                <Link to={`/system/${data.bms_id}`} className='text-[14px] leading-[20x] font-light' onClick={handleClickBMS}>
                    {currentLanguage == 'kr' ? data.bms_name : data.alias_foreign}
                </Link>

                <div
                    className={cn('rotate-0 transition-all duration-100', open.menu === (currentLanguage == 'kr' ? data.bms_name : data.alias_foreign) && 'rotate-180 duration-300')}
                    // className={cn('rotate-0 transition-all duration-100', open.menu === data.bms_name && 'rotate-180 duration-300')}
                    onClick={handleOpenMenu}>
                    <Arrow
                        className={
                            pathname.includes('/system') &&
                                !pathname.includes('/rack') &&
                                // currentLanguage == 'kr' ? data.bms_name : data.alias_foreign === pathParts[pathParts.length - 1]
                                data.bms_name === pathParts[pathParts.length - 1]
                                ? 'stroke-hw-orange-1'
                                : 'stroke-hw-white-1'
                        }
                    />
                </div>
            </div>
            <ul
                className={cn(
                    'max-h-0 transition-all duration-200 delay-100 overflow-hidden',
                    open.menu === data?.bms_name && `max-h-[${data?.rack_count * 32}px] duration-200 delay-0`,
                )}>
                {Array.from({ length: data.rack_count }).map((_, index) => (
                    <li
                        key={index}
                        className={cn(
                            'text-[14px] select-none leading-[20px] pl-6 text-hw-white-1 font-light h-8 flex items-center',
                            location.pathname.includes('/rack') &&
                            data.bms_id + '' === pathParts[2] &&
                            Number(index + 1) === Number(pathParts[pathParts.length - 1]) &&
                            'text-hw-orange-1',
                            location.pathname.includes('/cell') &&
                            Number(data.bms_id) === Number(pathParts[2]) &&
                            Number(index + 1) === Number(pathParts[pathParts.length - 2]) &&
                            'text-hw-orange-1',
                        )}>
                        <Link to={`/system/${data.bms_id}/rack/${index + 1}`} className=' w-full h-full flex items-center' onClick={handleClickRack}>
                            Rack {index + 1}
                        </Link>
                    </li>
                ))}
            </ul>
        </li>
    );
}
