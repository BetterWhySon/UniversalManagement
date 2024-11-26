import { cn } from '@/helpers/class-name.helper';
import { useState, useEffect } from 'react';
import { Arrow } from '../icons';
import SidebarSuperMenu from './SidebarSuperMenu';
import { SidebarMenuLevel } from '@/enums/sidebar-level.enum';
import useUserSystemInfo from '@/api/userSystemInfo';
import { ISite_userSystemInfo } from '@/types/sidebar-menu.type';
import useSidebarDepthData from './data/SidebarDepthData';
import { useTranslation } from 'react-i18next';

export default function SidebarExtraMenu() {
  const { dataList, storeDataList } = useUserSystemInfo();
  const { sidebarDepthData, storeSidebarDepthData } = useSidebarDepthData();
  const { t: trans, i18n } = useTranslation('translation');
  const currentLanguage = i18n.language;

  const [open, setOpen] = useState({
    extra: "",     // site
    super: "",     // ship
    menu: "",     // bms
  });

  useEffect(() => {
    setOpen(prevState => ({
      ...prevState,
      extra: sidebarDepthData ? sidebarDepthData.EXTRA: "",
      super: sidebarDepthData ? sidebarDepthData.SUPER: "",
      menu: sidebarDepthData ? sidebarDepthData.MENU: "",
    }));
  }, [sidebarDepthData]);

  useEffect(() => {
    storeDataList(trans);
  },[]);

  // // useEffect(() => {    
  // // },[data]);

  useEffect(() => {    
    console.log(dataList);
  },[dataList]);

  const handleOpen = (id: string, level: SidebarMenuLevel) => {
    if (level === SidebarMenuLevel.EXTRA) {
      setOpen((prev) => ({
        extra: id === prev.extra ? "" : id,
        super: "",
        menu: "",
      }));
      return;
    }

    if (level === SidebarMenuLevel.SUPER) {
      setOpen((prev) => ({
        ...prev,
        super: id === prev.super ? "" : id,
        menu: "",
      }));
      return;
    }

    setOpen((prev) => ({
      ...prev,
      menu: id === prev.menu ? "" : id,
    }));
  };

  return (
    <div className='flex flex-col'>
      {/* {SIDEBAR_MENU_DATA.map((extraMenuItem: any, index: number) => ( */}
      {dataList?.map((extraMenuItem: any, index: number) => (
        <div key={index}>
          <div
            onClick={() => handleOpen(extraMenuItem.siteName, SidebarMenuLevel.EXTRA)}
            className='cursor-pointer select-none pl-4 pr-4 h-10 flex items-center justify-between'>
            <span className='font-light text-[16px] leading-4 text-hw-white-1'>{currentLanguage == 'kr' ? extraMenuItem.siteName : extraMenuItem.siteName_foreign}</span>
            <div
              className={cn(
                'rotate-0 transition-all duration-200',
                open.extra === extraMenuItem.siteName && 'rotate-180 duration-500',
              )}>
              <Arrow className='stroke-hw-white-1' />
            </div>
          </div>
          <div
            className={cn(
              'max-h-0 overflow-hidden transition-all duration-300',
              open.extra === extraMenuItem.siteName && 'max-h-[200vh] duration-500',
            )}>
            {extraMenuItem.shipList.map((superMenuItem: any, index: number) => (
              <SidebarSuperMenu open={open} handleOpen={handleOpen} key={index} data={superMenuItem} siteName={extraMenuItem.siteName} siteId={''} siteNameForeign = {extraMenuItem.siteName_foreign}/>
            ))}
          </div>
          {index < dataList.length - 1 && (
            <div className='hidden lg:block h-[2px] w-[calc(100%-16px)] mx-auto bg-hw-gray-7.5 my-4'></div>
          )}
        </div>
      ))}
    </div>
  );
}
