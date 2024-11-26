/* eslint-disable jsx-a11y/label-has-associated-control */
import TextInput from '@/components/input/TextInput';
import { useFormContext } from 'react-hook-form';
import FilterDropdown from '@/pages/admin/status/components/FilterDropdown';
import { useState, useEffect } from 'react';
import { Filter } from '@/types/dropdown-filter.type';
import { bmsModelType } from '@/types/bms-model.type';
import { useTranslation } from 'react-i18next';
import { backendURL } from '@/api/URLs';


export const BMSMODEL_FILTERS = {
  name: 'bmsModel',     // name 필드를 key로 활용중, 변경하지 마시요
  selected: "선택",
  // values: ["공랭","액침"],
  values: [],
};

interface AddBmsModelModalProps {
  modelName: string;
  modelID: number;
  modelType: string;
  imagePath: string;
  modelTypeData: bmsModelType[];
}

// export default function AddBmsModelModal(bmsModelType) {
const AddBmsModelModal: React.FC<AddBmsModelModalProps> = ({ modelTypeData, modelName, modelID, modelType, imagePath }) => {
  const [selectBmsModel, setSelectBmsModel] = useState("");
  const [imgBase64, setImgBase64] = useState<string[]>([]); // 파일 base64 (화면표출용)
  const [imgFile, setImgFile] = useState(null);	//파일 (전송용)
  const [bmsModelFilter, setBmsModelFilter] = useState<Filter>(BMSMODEL_FILTERS);
  const { register, setValue } = useFormContext();
  const { t: trans } = useTranslation('translation');

  useEffect(() => {
    const newValues = modelTypeData.map(item => item.typeName) ?? [];
     newValues.map((item, index) => {
      item == '공랭식' ? newValues[index] = trans('airCooling')
        : item == '액침식' ? newValues[index] = trans('immersionCooling') : item
    });
    const newBMSModelFilters = { ...BMSMODEL_FILTERS, selected: trans('select'), values: newValues };
    if (modelName) {
      newBMSModelFilters.selected = modelType;
      let recvList = modelTypeData
      recvList?.map((item) => {
        if (item.typeName === modelType) {
          setValue('bmsModelType', item.typeId);
        }
      });
    }
    // newBMSModelFilters.selected = modelName
    setBmsModelFilter(newBMSModelFilters);
    // bms 이미지 초기출력
    if( modelName )
      loadInitialImage(backendURL + "media/" + imagePath);
  }, []);

  useEffect(() => {
    console.log(selectBmsModel);
    let newSelectBmsModel: string
    selectBmsModel == 'Aur Cooling' ? newSelectBmsModel = "공랭식"
      : selectBmsModel == 'Immersion Cooling' ? newSelectBmsModel = "액침식" : newSelectBmsModel = selectBmsModel
    let recvList = modelTypeData
    recvList?.map((item) => {
      if (trans(item.typeName) === newSelectBmsModel) {
        setValue('bmsModelType', item.typeId);
      }
    });
    // BMSMODEL_FILTERS.selected = selectBmsModel;        
  }, [selectBmsModel, setValue]);

  // const handleChangeFile = (event: any) => {
  //   console.log(event.target.files)
  //   setImgFile(event.target.files);
  //   //fd.append("file", event.target.files)
  //   setImgBase64([]);
  //   for (var i = 0; i < event.target.files.length; i++) {
  //     if (event.target.files[i]) {
  //       let reader = new FileReader();
  //       reader.readAsDataURL(event.target.files[i]); // 1. 파일을 읽어 버퍼에 저장합니다.
  //       // 파일 상태 업데이트
  //       reader.onloadend = () => {
  //         // 2. 읽기가 완료되면 아래코드가 실행됩니다.
  //         const base64 = reader.result;
  //         console.log(base64)
  //         if (base64) {
  //           //  images.push(base64.toString())
  //           var base64Sub = base64.toString()

  //           setImgBase64(imgBase64 => [...imgBase64, base64Sub]);
  //           //  setImgBase64(newObj);
  //           // 파일 base64 상태 업데이트
  //           //  console.log(images)
  //         }
  //       }
  //     }
  //   }

  // }

  // 초기 이미지 로드 함수
  const loadInitialImage = async (url: string) => {
    try {
      const response = await fetch(url, {
        mode: 'cors',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await response.blob();
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64 = reader.result;
        if (typeof base64 === 'string') {
          setImgBase64([base64]);
        } else {
          console.error('Failed to read the file as a string');
        }
      };
    } catch (error) {
      console.error('Failed to load image:', error);
    }
  };

  // 사용자가 이미지를 선택했을 때 이미지 로드 함수
  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64 = reader.result;
        if (typeof base64 === 'string') {
          setImgBase64([base64]);
        } else {
          console.error('Failed to read the file as a string');
        }
      };
    }
  };

  return (
    <div className='add-user__modal'>
      <h2 className='text-hw-white-1 text-[18px] leading-[18px] font-normal flex items-center xs:text-xl xs:leading-none mb-4 xs:mb-8 h-9 xs:h-fit transition-all'>
        {modelName ? trans('editEssModel') : trans('addEssModel')}
      </h2>
      {/* <form id="addPlayerFrm" onSubmit={function (event) {
           event.preventDefault();
           console.log(event.target);
       }}> */}
      <div className='flex flex-col gap-4 xs:gap-8 w-full'>
        <TextInput label={trans('essName')} name='modelName' defaultValue={modelName} />

        {/* modelName: item.model_name,
          modelType: item.model_type,
          imagePath */}
        <div className='flex flex-col xs:flex-row gap-4 xs:gap-5'>
          <FilterDropdown key={0} title={trans('essType')} filter={bmsModelFilter} callback_Site={setSelectBmsModel} callback_Ship={setSelectBmsModel} callback_BMS={setSelectBmsModel} callback={setSelectBmsModel} />
        </div>
        <div>
          {/* <input type="file" id="file" {...register("imageFile")} onChange={handleChangeFile} name='imageFile'/>             */}
          <input type="file" id="file" {...register("imageFile")} onChange={handleImageChange} name='imageFile' />

        </div>

        {imgBase64.length > 0 && <img src={imgBase64[0]} alt="Loaded" style={{ width: '200px', height: 'auto' }} />}
        {/* 선택이미지 표출 */}
        {/* {imgBase64.map((item) => {
          return(    
            <img
              className="d-block w-100"
              src={item}
              alt="First slide"
              style={{width:"240px",height:"180px"}}
            />
          )
          }) } */}
        <TextInput type='hidden' label='' name='bmsModelType' defaultValue={selectBmsModel} />
        <TextInput type='hidden' label='' name='modelId' defaultValue={modelID + ''} />
      </div>
      {/* </form> */}
    </div>
  );
}
export default AddBmsModelModal;