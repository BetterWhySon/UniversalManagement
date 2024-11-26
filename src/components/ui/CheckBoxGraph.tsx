import systemEmsGraphStore from '@/api/systemEmsGraphStore';
import { useTranslation } from 'react-i18next';

type CheckBoxProps = {
    gid: number,
    label: string;
    gap?: string;
    checked: boolean;
    fontSize?: string;
    fontWeight?: string;
};

export default function CheckBoxGraph({ gid, label, gap, checked, fontSize = '16px', fontWeight = '300' }: CheckBoxProps) {
    const { setCheckbox } = systemEmsGraphStore();
    const { t: trans } = useTranslation('translation');

    return (
        <div style={{ gap }} className={`w-fit h-[36px] flex items-center`}>
            <input id={gid+label} type='checkbox' name='fitler-checkbox' checked={checked} className='hw-checkbox w-[16px] h-[16px] m-[10px]'
                onChange={() => { setCheckbox(gid, !checked); }} />
            <label
                htmlFor={gid+label}
                style={{ fontSize, fontWeight }}
                className={`w-full block not-italic leading-[20px] text-hw-white-1 whitespace-nowrap`}>
                {trans(label)}
            </label>
        </div>
    );
}
