import { FormProvider, useForm } from 'react-hook-form';
import useAdmEssManagementSiteCreate from '@/api/admEssManagementSiteCreat';
import useAdmEssManagementSiteEdit from '@/api/admEssManagementSiteEdit';
import useAdmEssManagementShipCreate from '@/api/admEssManagementShipCreat';
import useAdmEssManagementShipEdit from '@/api/admEssManagementShipEdit';
import useAdmUserManagementUserCreate from '@/api/admUserManagementUserCreate';
import useAdmUserManagementUserEdit from '@/api/admUserManagementUserEdit';
import useAdmEssManagementBmsCreate from '@/api/admEssManagementBmsCreat';
import useAdmEssManagementBmsEdit from '@/api/admEssManagementBmsEdit';
import useAdmBmsModelCreate from '@/api/admBmsModelCreate';
import useAdmBmsModelEdit from '@/api/admBmsModelEdit';
import useAdmFolderManagement from '@/api/admFileManagementFolder';
import useAdmFileManagement from '@/api/admFileManagementFile';
import useAdmVersionManagement from '@/api/admFileManagementVersion';
import { POPUP_TYPE } from '@/constants/admManagement.constant';
import { useTranslation } from 'react-i18next';
import useLoginStore from '@/api/loginStore';
import useAdmSendFileData from '@/api/admFileManagementSendFileData';


type ModalWrapper = {
  children: React.ReactNode;
  defaultValues?: any;
  onClose?: () => void;
  popupType: POPUP_TYPE;
  isCreateMode: boolean;
};
export default function ModalWrapper({ children, defaultValues, onClose, popupType, isCreateMode }: ModalWrapper) {
  const methods = useForm(defaultValues);
  const { storeSiteCreate } = useAdmEssManagementSiteCreate();
  const { storeSiteEdit } = useAdmEssManagementSiteEdit();
  const { storeShipCreate } = useAdmEssManagementShipCreate();
  const { storeShipEdit } = useAdmEssManagementShipEdit();
  const { storeBmsCreate } = useAdmEssManagementBmsCreate();
  const { storeBmsEdit } = useAdmEssManagementBmsEdit();
  const { storeUserCreate } = useAdmUserManagementUserCreate();
  const { storeUserEdit } = useAdmUserManagementUserEdit();
  const { storeBmsModelCreate } = useAdmBmsModelCreate();
  const { storeBmsModelEdit } = useAdmBmsModelEdit();
  const { storeFolderCreate, storeFolderEdit } = useAdmFolderManagement();
  const { storeFileCreate, storeFileEdit } = useAdmFileManagement();
  const { storeVersionCreate, storeVersionEdit } = useAdmVersionManagement();
  const { t: trans } = useTranslation('translation');
  const { username } = useLoginStore();
  const { sendFileData, setProgress } = useAdmSendFileData();
  const { dataListVersion } = useAdmVersionManagement();

  const onSubmit = (e: any, params: any) => {
    // const onSubmit = (e: any) => {
    if (popupType == POPUP_TYPE.SITE) {
      if (!e.siteName) {
        alert(trans('pleasEnterTheSiteName'));
        return;
      }
      if (!e.siteNameForeign) {
        alert(trans('pleasEnterTheSiteNameForeign'));
        return;
      }      
      if (!e.xPos) {
        alert(trans('pleasEnterTheXpos'));
        return;
      }
      if (!e.yPos) {
        alert(trans('pleasEnterTheYpos'));
        return;
      }

      if (isCreateMode) {
        storeSiteCreate(e.siteName, e.siteNameForeign, e.xPos, e.yPos, trans);
      } else {
        storeSiteEdit(e.siteName, e.siteNameForeign, e.xPos, e.yPos, e.siteId, trans);
      }
    } else if (popupType == POPUP_TYPE.SHIP) {
      if (!e.shipName) {
        alert(trans('pleasEnterTheShipName'));
        return;
      }
      if (!e.shipNameForeign) {
        alert(trans('pleasEnterTheShipNameForeign'));
        return;
      }

      if (isCreateMode) {
        storeShipCreate(e.siteId, e.shipName, e.shipNameForeign, trans);
      } else {
        storeShipEdit(e.shipId, e.shipName, e.shipNameForeign, trans);
      }
    } else if (popupType == POPUP_TYPE.BMS) {
      console.log(e);
      if (!e.siteName) {
        alert(trans('pleasEnterTheSiteName'));  //''
        return;
      }
      if (!e.shipName) {
        alert(trans('pleasEnterTheShipName'));
        return;
      }
      if (!e.bmsID) {
        alert(trans('pleasEnterTheEssId'));  
        return;
      }
      if (!e.alias) {
        alert(trans('pleasEnterTheEssName')); 
        return;
      }
      if (!e.aliasForeign) {
        alert(trans('pleasEnterTheEssNameForeign')); 
        return;
      }
      if (!e.capacity) {
        alert(trans('pleasEnterTheCapacity'));  
        return;
      }
      if (!e.numbersOfRack) {
        alert(trans('pleasEnterTheRackCount')); 
        return;
      }
      if (!e.specNumberHide) {
        alert(trans('pleaseSelectAEssModel'));  //'ESS모델을 선택해 주세요'
        return;
      }

      if (isCreateMode) {
        storeBmsCreate(e.shipId, e.specNumberHide/*모델ID*/, e.bmsID/*bmsId*/, e.alias/*bms별칭*/, e.aliasForeign/*bms별칭(영문)*/, e.numbersOfRack, e.capacity, trans);
      } else {
        storeBmsEdit(e.shipId, e.specNumberHide/*모델ID*/, e.bmsID/*bmsId*/, e.alias/*bms별칭*/, e.aliasForeign/*bms별칭(영문)*/,e.numbersOfRack, e.capacity, e.bms_id/*bms아이디*/, trans);
      }
    } else if (popupType == POPUP_TYPE.USER) {
      // 아이디
      if (!e.userID) {
        alert(trans('pleaseEnterYourId'));  //'아이디를 입력해 주세요.'
        return
      }
      // 비번 확인
      let pwCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;// 8자리 이상, 대소문자, 숫자, 특수문자 포함
      if (isCreateMode) {
        if (e.newPassword != e.verifyPassword) {
          alert(trans('passDoNotMatch'));  //'비밀번호와 비밀번호확인이 일치하지 않습니다.'
          return
        }
        if (pwCheck.test(e.newPassword)) {
        } else {
          // setValidateUserId(false);	//검증 실패 >> 에러메세지 출력
          alert(trans('passwordError')) // '비밀번호 오류 입니다.( 8자리 이상, 대소문자, 숫자, 특수문자 포함)'
          return
        }
      } else {
        // '새 비밀번호'와 '새 비밀번호 확인'에 문자열이 있다면 (비밀번호 변경)
        if( e.newPassword && e.verifyPassword ) {
          if (e.newPassword != e.verifyPassword) {
            alert(trans('passDoNotMatch'));  //'비밀번호와 비밀번호확인이 일치하지 않습니다.'
            return
          }
          if (pwCheck.test(e.newPassword)) {
          } else {
            // setValidateUserId(false);	//검증 실패 >> 에러메세지 출력
            alert(trans('passwordError')) // '비밀번호 오류 입니다.( 8자리 이상, 대소문자, 숫자, 특수문자 포함)'
            return
          }
        }
      }
      // 이름
      if (!e.name) {
        alert(trans('pleaseEnterYourName'));  //'이름을 입력해 주세요.'
        return
      }
      // 연락처
      if (!e.contact) {
        alert(trans('pleaseEnterYourContact'));  //'연락처를 입력해 주세요.'
        return
      }
      // 등급
      if (!e.isAdmin && !e.userLevel2 && !e.userLevel1 ) {
        alert(trans('pleaseEnterTheUserPermissions'));  //
        return
      }
      // 이메일
      if (!e.email) {
        alert(trans('pleaseEnterYourEmail'));  //'이메일을 입력해 주세요.'
        return
      }
      // let contactCheck = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
      // if (contactCheck.test(e.contact)) {
      //   //검증 성공          
      // } else {
      //   alert('연락처(전화번호) 오류 입니다.');
      //   return
      // }

      // let emailCheck = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
      // if (emailCheck.test(e.email)) {
      //   //검증 성공          
      // } else {
      //   alert('이메일형식 오류 입니다.');
      //   return
      // }

      if (isCreateMode) {
        storeUserCreate(e.userID, e.newPassword, e.name, e.contact, e.email, e.isAdmin, e.userLevel2, e.userLevel1, trans);
      } else {
        storeUserEdit(e.userID, e.password, e.newPassword, e.name, e.contact, e.email, e.isAdmin, e.userLevel2, e.userLevel1, trans);
      }

    } else if (popupType == POPUP_TYPE.SHIP_MATCHING) {


    } else if (popupType == POPUP_TYPE.SHIP_MATCHINGADD) {
      console.log(e)

    } else if (popupType == POPUP_TYPE.BMS_MODEL) {      
      if (!e.modelName) {
        alert(trans('pleasEnterTheEssName')); 
        return;
      }
      if (e.bmsModelType === '') {
        alert(trans('pleaseSelectAEssType'));   //'BMS타입을 선택해 주세요'
        return;
      }
      
      if (isCreateMode) {
        if (e.imageFile.length === 0) {
          alert(trans('pleaseSelectAImage'));   //'이미지를 선택해 주세요'
          return;
        }
        storeBmsModelCreate(e.modelName, e.bmsModelType, e.imageFile, trans)
      } else {
        storeBmsModelEdit(e.modelName, e.bmsModelType, e.modelId, e.imageFile, trans)
      }
    } else if (popupType == POPUP_TYPE.FOLDER) {
      if (e.group_name === '') {
        alert(trans('pleaseEnterTheFolderName'));   //'폴더명을 입력해 주세요'
        return;
      }
      if (isCreateMode) {
        storeFolderCreate(e.group_name, trans)
      } else {
        storeFolderEdit(e.group_id, e.group_name, trans)
      }

    } else if (popupType == POPUP_TYPE.FILE) {
      if (e.file_name === '') {
        alert(trans('pleaseEnterTheGroupName'));   //'폴더명을 입력해 주세요'
        return;
      }
      if (isCreateMode) {
        storeFileCreate(e.file_name, e.group_id, trans)
      } else {
        storeFileEdit(e.file_id, e.file_name, trans)
      }

    } else if (popupType == POPUP_TYPE.VERSION) {
      if (e.version_name === '') {
        alert(trans('pleaseEnterTheFileName'));   //'버전명을 입력해 주세요'
        return;
      }
      if (isCreateMode) {
        if (sendFileData == null) {
          alert(trans('pleaseSelectAFile'));   //'파일를 선택해 주세요'
          return;
        }
        // 중복된 버전인지 확인        
        const isDuplicate = dataListVersion?.some((versionData: any) => {
          return versionData.version_name === e.version_name;
        });

        if (isDuplicate) {
          alert(trans('thisIsADuplicateVersion'));   //중복된 버전 입니다.
          return; // 중복된 경우 함수를 빠져나옴
        }

        storeVersionCreate(e.version_name, e.file_id, e.file_name, sendFileData, username, setProgress || (() => { }), trans, onClose);
      } else {
        // 중복된 버전인지 확인                
        const isDuplicate = dataListVersion?.some((versionData: any) => {
          // const versionStr = e.file_name + '_' + e.version_name + '.' + extension;          
          return versionData.version_name === e.version_name && versionData.id != e.version_id;
        });

        if (isDuplicate) {
          alert(trans('thisIsADuplicateVersion'));   //중복된 버전 입니다.
          return; // 중복된 경우 함수를 빠져나옴
        }

        storeVersionEdit(e.version_id, e.version_name, e.file_name, e.save_file_name, sendFileData, setProgress || (() => { }), trans, onClose);
      }
    } else {

    }

    if (onClose && (popupType != POPUP_TYPE.VERSION)) {
      onClose();
    }
  };

  // 조건에 따른 max-width 클래스를 결정
  const modalWidthClass1 = popupType === POPUP_TYPE.VERSION_MAIN ? 'max-w-[1500px]' : 'max-w-[922px]';
  const modalWidthClass2 = popupType === POPUP_TYPE.VERSION_MAIN ? 'max-w-[1464px]' : 'max-w-[886px]';
  return (
    <FormProvider {...methods}>
      <div className='fixed w-full h-full top-0 right-0 left-0 flex items-center justify-center z-50'>
        <div onClick={onClose} className='relative z-50 w-full h-full bg-black bg-opacity-60'></div>
        <div className={`w-full ${modalWidthClass1} absolute z-50 px-[18px]`} onClick={(e) => e.stopPropagation()}>

          <div className={`bg-hw-dark-2 rounded-2xl xs:rounded-3xl p-4 pb-6 xs:pt-12 xs:px-10 xs:pb-10 ${modalWidthClass2} w-full transition-all relative`}>
            <button
              type='button'
              onClick={() => methods.reset()}
              className={`${methods.formState.isValid ? 'visible' : 'invisible'
                } py-2 px-6 rounded-lg text-hw-orange-1 font-light text-base leading-[125%] block xs:hidden absolute right-[18px] top-[18px]`}>
              {/* 삭제 */}
            </button>
            {children}
            <div className='flex justify-between items-center w-full mt-8 xs:mt-12'>
              <button
                type='button'
                onClick={() => methods.reset()}
                className={`${methods.formState.isValid ? 'visible' : 'invisible'
                  } py-2 px-6 rounded-lg text-hw-orange-1 font-light text-base leading-[125%] hidden xs:block`}>
                {/* 삭제 */}
              </button>
              <div className='w-full xs:w-fit flex items-center gap-2'>
                <button
                  type='button'
                  onClick={onClose}
                  className='py-2 px-6 w-full xs:w-[128px] rounded-lg text-hw-orange-1 font-light text-base leading-[125%] border border-[#E2E2E2]'>
                  {popupType === POPUP_TYPE.SHIP_MATCHINGADD || popupType === POPUP_TYPE.SHIP_MATCHING || popupType === POPUP_TYPE.VERSION_MAIN ? trans('close') : trans('cancel')}
                </button>

                {!(popupType === POPUP_TYPE.SHIP_MATCHINGADD || popupType === POPUP_TYPE.SHIP_MATCHING || popupType === POPUP_TYPE.VERSION_MAIN) && (
                  <button
                    type="submit"
                    onClick={(e) => {
                      e.stopPropagation();
                      methods.handleSubmit(onSubmit)();
                    }}
                    className='py-2 px-6 w-full xs:w-[128px] rounded-lg text-hw-white-1 font-light text-base leading-[125%] bg-hw-orange-1'>
                    {trans('save')}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
