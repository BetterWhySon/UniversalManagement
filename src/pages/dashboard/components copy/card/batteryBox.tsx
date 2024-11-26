import { cn } from '@/helpers/class-name.helper';
import { BATTERY_TYPE } from '@/constants/dashboard.constant';
import { useEffect, useState } from 'react';
import { Lightning, Play, Tick, Close, Init, ContactorControl } from '@/components/icons';
import { Color } from 'three';

export function getBatteryStyle(type: BATTERY_TYPE) {
    switch (type) {
        case BATTERY_TYPE.INIT:
            return {
                bg: 'bg-hw-gray-1',
                text: 'text-hw-gray-9',
            };
        case BATTERY_TYPE.READY:
            return {
                bg: 'bg-hw-gray-1',
                text: 'text-hw-gray-9',
            };
        case BATTERY_TYPE.DRIVE:
            return {
                bg: 'bg-hw-green-1',
                text: 'text-hw-white-1',
            };
        case BATTERY_TYPE.CHARGE:
            return {
                bg: 'bg-hw-yellow-1',
                text: 'text-hw-gray-9',
            };
        case BATTERY_TYPE.CHARGE_RBLA:
            return {
                bg: 'bg-hw-yellow-1',
                text: 'text-hw-gray-9',
            };
        case BATTERY_TYPE.CONTACTO_RCONTROL:
            return {
                bg: 'bg-hw-gray-1',
                text: 'text-hw-gray-9',
            };
        case BATTERY_TYPE.NODATA:
            return {
                bg: 'bg-hw-gray-7',
                text: 'text-hw-gray-9',
            };
        default:
            return {
                bg: 'bg-hw-green-1',
                text: 'text-hw-white-1',
            };
    }
}

export default function BatteryBox(data: any) {
    let status = Number(data.status);
    // let icon;
    // let label;
    const [type, setType] = useState<any>();
    const [icon, setIcon] = useState<any>();
    const [label, setLabel] = useState<any>();
    useEffect(() => {
        switch (status) {
            case 0:
                setType(BATTERY_TYPE.INIT);
                setIcon(<Init />);
                setLabel('Init');
                break;
            case 1:
                setType(BATTERY_TYPE.READY);
                setIcon(<Tick />);
                setLabel('Ready');
                break;
            case 2:
                setType(BATTERY_TYPE.DRIVE);
                setIcon(<Play />);
                setLabel('Drive');
                break;
            case 3:
                setType(BATTERY_TYPE.CHARGE);
                setIcon(<Lightning />);
                setLabel('Charge');
                break;
            case 4:
                setType(BATTERY_TYPE.CHARGE);
                setIcon(<Lightning />);
                setLabel('Chg_Rack Bal');  //Charge_Rack Balacning
                break;
            case 5:
                setType(BATTERY_TYPE.CHARGE);
                setIcon(<ContactorControl />);
                setLabel('Contactor Ctrl');
                break;
            default:
                setType(BATTERY_TYPE.NODATA);
                setIcon(<Close color='#303030' />);
                setLabel('NoData');
                break;
        }
    }, [data])

    return (
        <div
            className={cn(
                'w-[188px] h-8 flex items-center pl-2 mt-[18px] text-lg font-light gap-2 relative rounded leading-none',
                'after:absolute after:content-[""] after:bg-inherit after:-right-1 after:rounded-r-[4px] after:top-1/2 after:-translate-y-1/2 after:w-1 after:h-4',
                data.isOffStatus == 2 || data.isOffStatus == 1 || data.isOffStatus == -1 ? 'bg-hw-gray-1' : getBatteryStyle(type).bg,
                getBatteryStyle(type).text,
            )}>
            {icon}
            <span>{label}</span>
        </div>
    )
}  