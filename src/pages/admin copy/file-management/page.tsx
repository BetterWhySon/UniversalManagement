import { Cancel, Circle, Edit, Plus, SmallClose } from '@/components/icons';
import ModalWrapper from '@/components/modal/ModalWrapper';
import TableData from '@/components/table/TableData';
import { TEXT_ALIGN } from '@/enums/table';
import { cn } from '@/helpers/class-name.helper';
import { useMemo, useState, useEffect } from 'react';
import AddFolderModal from './components/AddFolderModal';
import FolderMain from './components/FolderMain';
import FileMain from './components/FileMain';
import './style.scss';
import { POPUP_TYPE } from '@/constants/admManagement.constant';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';


export default function FileManagementPage() {
  const location = useLocation();
  const pathname = useMemo(() => location.pathname, [location.pathname]);
  const pathParts = pathname.split('/');
  const navigate = useNavigate();
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const { t: trans } = useTranslation('translation');


  const addUserDefaultValues = useMemo(() => {
    return {
      userID: '',
      password: '',
      verifyPassword: '',
      name: '',
      contact: '',
      isAdmin: false,
      email: '',
    };
  }, []);
  
  return (
    <main className='wrapper'>
      <div className={cn('p-0 lg:pt-[40px] lg:pl-[55px] lg:pr-[56px] md:pb-[72px] transition-all')}>
        {/* breadcrumbs */}
        {/* <div className='transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 w-full mb-8 md:mb-6 h-fit md:h-5 px-[18px] lg:px-0'>
          <span className='pl-[18px] mt-5 lg:mr-0 lg:mt-0 lg:ml-0 transition-all inline-flex w-full relative mb-5 lg:mb-6'>
          <Link
            to={`/admin/file-management`}
            className={cn(
              'block text-[16px] leading-4 lg:text-[20px] lg:leading-5 font-normal',
              (location.pathname.includes('/cell') || location.pathname.includes('/rack')) &&
              'text-hw-white-2 font-[250]',
            )}>
            {trans('fileManagement')}
          </Link>
          {location.pathname.includes('/folder') && (
            <Link
              to={`/admin/file-management/rack/${pathParts[4]}`}
              className={cn(
                'block text-[16px] leading-4 lg:text-[20px] lg:leading-5',
                location.pathname.includes('/cell') && 'text-hw-white-2 font-[250]',
              )}>
              <span className='text-hw-white-2 mx-2'>/</span>              
              <span>폴더{`${pathParts[4]}`.padStart(2, '0')}</span>
            </Link>
          )}          
          </span>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className='py-[6px] pl-4 pr-6 rounded-lg bg-hw-orange-1 flex gap-2 items-center justify-center'>
            <Plus />
            <span className='text-hw-white-1 font-light text-base leading-[125%] whitespace-nowrap'>{trans('addFolder')}</span>
          </button>
        </div> */}

        {/* page content */}
        {!location.pathname.includes('/folder') ? (
          <FolderMain />
          // <ModalWrapper onClose={() => setIsAddModalOpen(false)} defaultValues={addUserDefaultValues} popupType={POPUP_TYPE.USER} isCreateMode={true} >
          //   <AddFolderModal />
          // </ModalWrapper>
        ) : (
          // <ModalWrapper onClose={() => setIsAddModalOpen(false)} defaultValues={addUserDefaultValues} popupType={POPUP_TYPE.USER} isCreateMode={true} >
          //   {/* <EditFolderModal /> */}
          // </ModalWrapper>
          <FileMain />
        )}
        {isAddModalOpen && (
          <ModalWrapper onClose={() => setIsAddModalOpen(false)} defaultValues={addUserDefaultValues} popupType={POPUP_TYPE.USER} isCreateMode={true} >
            <AddFolderModal />
          </ModalWrapper>
        )}
      </div>
    </main>
  );

}

