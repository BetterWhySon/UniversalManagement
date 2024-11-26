import SidebarSubMenu from './sidebar-submenu';

const SIDEBAR_MENU_DATA = [
  {
    id: 1,
    title: '어업지도선 1호',
    submenu: Array.from(Array(5)).map((item, index) => {
      return {
        id: index,
        title: `시스템명${index + 1}`,
        list: Array.from(Array(5)).map((item, idx) => {
          return {
            id: idx,
            title: 'Rack #' + `${idx + 1}`.padStart(2, '0'),
          };
        }),
      };
    }),
  },
  {
    id: 2,
    title: '어업지도선 1호',
    submenu: Array.from(Array(5)).map((item, index) => {
      return {
        id: index + 5,
        title: `시스템명${index + 6}`,
        list: Array.from(Array(5)).map((item, idx) => {
          return {
            id: idx,
            title: 'Rack #' + `${idx + 1}`.padStart(2, '0'),
          };
        }),
      };
    }),
  },
];

type SubmenuItem = {
  id: number;
  title: string;
};

type SidebarSubMenu = {
  id: number;
  title: string;
  list: SubmenuItem[];
};

export default function SidebarMenu() {
  return (
    <>
      {SIDEBAR_MENU_DATA.map((menu: any) => (
        <ul key={menu.id}>
          <li className='px-6 mb-2 h-5'>
            <span className='text-[14px] font-light text-hw-white-2 leading-5 lg:leading-[18px]'>{menu.title}</span>
          </li>
          {menu.submenu.map((submenu: SidebarSubMenu, index: number) => (
            <SidebarSubMenu key={index} data={submenu} />
          ))}
        </ul>
      ))}
    </>
  );
}
