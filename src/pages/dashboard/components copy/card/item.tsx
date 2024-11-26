import { cn } from '@/helpers/class-name.helper';
import { CARD_TYPE } from '@/constants/dashboard.constant';
import { Dot } from '@/components/icons';
import { Link } from 'react-router-dom';
import BatteryBox from './batteryBox';
import { useState, useEffect } from 'react';
import { Check, Warning, Danger, EStopOn } from '@/components/icons';
import { SidebarMenuDepth, SidebarMenuLevel } from '@/enums/sidebar-level.enum';
import { useNavigate } from 'react-router-dom';
import useSidebarDepthData from '@/components/sidebar/data/SidebarDepthData';
import { convertEnergyUnit } from '@/helpers/energyUnitConverter.helper';
import { useTranslation } from 'react-i18next';
import { transDotColor } from '@/components/ui/TransDotColor';

function getBatteryStyle(type: CARD_TYPE) {
    switch (type) {
        case CARD_TYPE.NORMAL:
            return {
                bg: 'bg-hw-green-1',
                text: 'text-hw-white-1',
            };
        case CARD_TYPE.WARNING:
            return {
                bg: 'bg-hw-gray-1',
                text: 'text-hw-gray-9',
            };
        case CARD_TYPE.FAULT:
            return {
                bg: 'bg-hw-yellow-1',
                text: 'text-hw-gray-9',
            };

        default:
            return {
                bg: 'bg-hw-yellow-1',
                text: 'text-hw-gray-9',
            };
    }
}

const batteryStatus = (status: number, str: string) => {
    switch (status) {
        case 0:
            return (
                <>
                    <Dot color='green-1' /> <span className='leading-[128.571%]'>{str}</span>
                </> // 초록, 체크
            );
        case 1:
            return (
                <>
                    <Dot color='orange-4' /> <span className='leading-[128.571%]'>{str}</span>
                </> // 노랑, 느낌표 (ems알람 smbs 알람...)
            );
        case 2:
            return (
                <>
                    <Dot color='red-1' /> <span className='leading-[128.571%]'>{str}</span>
                </> // 빨강, 느낌표 (ems fault... )
            );
        default:
            return (
                <>
                    <Dot color='gray-1' /> <span className='leading-[128.571%]'>{str}</span>
                </>
            )
    }
};

function getButtonStyle(type: number) {
    switch (type) { //Normal = 0. Alarm = 1, Protection = 2, Permanant Protection (P-Protection) = 3
        case 0:
            return {
                bg: 'bg-hw-green-1',
                title: 'Normal',
                icon: <Check />,
                dot: 'green-1',
            };
        case 1:
            return {
                bg: 'bg-hw-orange-2',
                title: 'Alarm',
                icon: <Warning />,
                dot: 'orange-2',      // 노랑
            };
        case 2:
            return {
                bg: 'bg-hw-orange-1',
                title: 'Protection',
                icon: <Warning />,
                dot: 'orange-1',      // 주황
            };
        case 3:
            return {
                bg: 'bg-hw-red-1',
                title: 'P-Protection',
                icon: <Danger />,
                dot: 'red-1',
            };
        case 4:
            return {
                bg: 'bg-hw-orange-2',
                title: 'E-Stop ON',
                icon: <EStopOn />,
                // icon: <img src={estoponIcon} alt="estoponIcon" />,        
                dot: 'red-1',
            };
        case 5:
            return {
                bg: 'bg-hw-yellow-3',
                title: 'RMT E-Stop ON',
                icon: <EStopOn />,
                // icon: <img src={estoponIcon} alt="estoponIcon" />,        
                dot: 'red-1',
            };
        default:
            return {
                bg: 'bg-hw-gray-7',
                title: 'NoData',
                icon: <Check />,
                dot: 'gray-7',
            };
    }
}

function getButtonStyle2(type: number, item: string, sOffStatus: number) {
    switch (type) { //Normal = 0. Alarm = 1, Protection = 2, Permanant Protection (P-Protection) = 3
        case 0:
            return {
                bg: sOffStatus == 2 || sOffStatus == 1 || sOffStatus == -1 ? 'bg-hw-gray-7' : 'bg-hw-green-1',
                title: item,
                icon: <Check />,
                dot: 'green-1',
            };
        case 1:
            return {
                bg: sOffStatus == 2 || sOffStatus == 1 || sOffStatus == -1 ? 'bg-hw-gray-7' : 'bg-hw-orange-2',
                title: item,
                icon: <Warning />,
                dot: 'orange-2',      // 노랑
            };
        case 2:
            var str = item;
            if (item == 'Emergency Stop On')
                str = 'E-Stop ON';
            else if (item == 'Remote Emergency Stop On')
                str = 'RMT E-Stop ON';
            return {
                bg: sOffStatus == 2 || sOffStatus == 1 || sOffStatus == -1 ? 'bg-hw-gray-7' : 'bg-hw-red-1',
                title: str,
                icon: <Danger />,
                dot: 'red-1',
            };
        default:
            return {
                bg: 'bg-hw-gray-7',
                title: 'NoData',
                icon: <Check />,
                dot: 'gray-7',
            };
    }

}

function getButtonStyle3(type: number, data: any) {
    switch (type) { //Normal = 0. Alarm = 1, Protection = 2, Permanant Protection (P-Protection) = 3
        case 0:
            return {
                bg: data.trans == 2 || data.trans == 1 || data.trans == -1 ? 'bg-hw-gray-7' : 'bg-hw-green-1',
                title: 'Rack Normal',
                icon: <Check />,
                dot: 'green-1',
            };
        case 1:
            return {
                bg: data.trans == 2 || data.trans == 1 || data.trans == -1 ? 'bg-hw-gray-7' : 'bg-hw-orange-2',
                title: 'Rack Alarm',
                icon: <Warning />,
                dot: 'orange-2',      // 노랑
            };
        case 2:
            return {
                bg: data.trans == 2 || data.trans == 1 || data.trans == -1 ? 'bg-hw-gray-7' : 'bg-hw-orange-1',
                title: 'Rack Protection',
                icon: <Warning />,
                dot: 'orange-1',      // 주황
            };
        case 3:
            return {
                bg: data.trans == 2 || data.trans == 1 || data.trans == -1 ? 'bg-hw-gray-7' : 'bg-hw-red-1',
                title: 'Rack P-Protection',
                icon: <Danger />,
                dot: 'red-1',
            };
        // case 4:
        //   return {
        //     bg: 'bg-hw-orange-2',
        //     title: 'E-Stop ON',
        //     icon: <EStopOn />,
        //     // icon: <img src={estoponIcon} alt="estoponIcon" />,        
        //     dot: 'red-1',
        //   };
        // case 5:
        //   return {
        //     bg: 'bg-hw-yellow-3',
        //     title: 'RMT E-Stop ON',
        //     icon: <EStopOn />,
        //     // icon: <img src={estoponIcon} alt="estoponIcon" />,        
        //     dot: 'red-1',
        //   };
        default:
            return {
                bg: 'bg-hw-gray-7',
                title: data.percentage > -1 ? 'Rack Normal' : 'NoData',
                icon: <Check />,
                dot: 'gray-7',
            };
    }
}

// function getDotStyle(type: number) {
//   switch (type) {
//     case 0:
//       return {
//         color: 'blue-1',
//       };
//     case 1:
//       return {
//         color: 'orange-2',
//       };
//     case 2:
//       return {
//         color: 'gray-1',
//       };
//     default:
//       return {
//         color: 'gray-1',
//       };
//   }
// }

// function getStateStyle(labelNode: number, valueNum: number) {
//   var rtnStr
//   if (valueNum === -1 || valueNum === null) {
//     rtnStr = "-"
//   } else {
//     // var rtnStr = valueNum >= 0 ? (valueNum).toFixed(2) : "- "  
//     if (labelNode == 2 || labelNode == 3) { // 2(온도), 3(랙 카운트) 정수 출력
//       rtnStr = valueNum
//     } else {
//       rtnStr = (valueNum).toFixed(1)
//     }
//   }

//   switch (labelNode) {
//     case 0:
//       return {
//         str: rtnStr + "V"
//       };
//     case 1:
//       return {
//         str: rtnStr + "A"
//       };
//     case 2:
//       return {
//         str: rtnStr + "℃"
//       };
//     case 3:
//       return {
//         str: rtnStr
//       };
//     case 4:
//       if (rtnStr == '-') {
//         rtnStr = "- kWh"
//       } else {
//         rtnStr = convertEnergyUnit(valueNum);
//       }
//       return { str: rtnStr };
//     default:
//       return {
//         str: rtnStr
//       };
//   }

// }
function getStateStyle(labelNode: number, valueNum: number, isTrans2: number) {
    let valueStr;
    if (valueNum === -1 || valueNum === null) {
        valueStr = "-";
    } else {
        if (labelNode === 2 || labelNode === 3 || labelNode === 5) { // 온도와 랙 카운트, emsHeartcnt는 정수 출력
            valueStr = valueNum.toString();
        } else {
            valueStr = valueNum.toFixed(1); // 소수점 한 자리까지 출력
        }
    }

    const unit = labelNode === 0 ? "V" :
        labelNode === 1 ? "A" :
            labelNode === 2 ? "℃" :
                labelNode === 3 ? "" :
                    labelNode === 4 ? "kWh" :
                        labelNode === 5 ? "" : "";

    // 특정 조건(data.trans === 2)에서만 valueStr을 회색으로 설정
    const valueColorClass = isTrans2 == 0 || isTrans2 == 1 ? 'text-hw-white-1' : 'text-hw-gray-7';  // 0 , 1이면 값텍스트 흰색, 아니면 회색

    return {
        valueStr: valueStr,
        unit: unit,
        valueColorClass: valueColorClass
    };
}

export default function CardItem({ data }: any) {
    const { t: trans, i18n } = useTranslation('translation');
    const currentLanguage = i18n.language;
    const [maxAlarm, setMaxAlarm] = useState(0);
    const [maxAlarmRack, setMaxAlarmRack] = useState(0);
    const navigate = useNavigate();
    const { sidebarDepthData, storeSidebarDepthData } = useSidebarDepthData();

    useEffect(() => {
        setMaxAlarm(-1)
        var max = -1
        data.alarms.map((alarm: any) => {
            if (max < alarm.level) {
                max = alarm.level
            }
        })
        setMaxAlarm(max)

        /////
        setMaxAlarmRack(0)
        var maxRack = 0
        data.rackAlarms.map((alarm: any) => {
            if (maxRack < alarm.level) {
                maxRack = alarm.level
            }
        })
        setMaxAlarmRack(maxRack)
    }, [data])

    const renderStatus = () => {
        switch (data.type) {
            case CARD_TYPE.NORMAL:
                return (
                    <>
                        <Dot color='green-1' /> <span className='leading-[128.571%]'>Normal</span>
                    </>
                );
            case CARD_TYPE.WARNING:
                return (
                    <>
                        <Dot color='orange-4' /> <span className='leading-[128.571%]'>Warning</span>
                    </>
                );
            case CARD_TYPE.FAULT:
                return (
                    <>
                        <Dot color='red-1' /> <span className='leading-[128.571%]'>Fault</span>
                    </>
                );
            default:
                return <></>;
        }
    };

    const handleClick = () => {
        // navigate(`/system/${data?.title.line3}`, { state: { EXTRA: 'Hello', SUPER: 'World', MENU: 1234 } });    
        storeSidebarDepthData(data?.title.line1, data?.title.line2, data?.title.line3, data?.title.line3_id);
        // navigate(`/system/${data?.title.line3_id}`, { state: { EXTRA: data?.title.line1, SUPER: data?.title.line2, MENU: data?.title.line3 } });
    };

    const batteryStatus = (status: number, str: string) => {
        switch (status) {
            case 0:
                return (
                    <>
                        <Dot color='green-1' /> <span className='leading-[128.571%]'>{str}</span>
                    </>
                );
            case 1:
                return (
                    <>
                        <Dot color='orange-4' /> <span className='leading-[128.571%]'>{str}</span>
                    </>
                );
            case 2:
                return (
                    <>
                        <Dot color='red-1' /> <span className='leading-[128.571%]'>{str}</span>
                    </>
                );
            default:
                return (
                    <>
                        <Dot color='gray-1' /> <span className='leading-[128.571%]'>{str}</span>
                    </>
                )
        }
    };

    return (
        <Link
            // to={`/system/${data?.title.line3}`}// /system/bms이름
            onClick={handleClick}
            to={{
                pathname: `/system/${data?.title.line3_id}`,
            } as unknown as SidebarMenuDepth}
            style={{ backgroundColor: data.trans === 2 || data.trans === 1 || data.trans === -1 ? 'rgba(35, 40, 47, 0.3)' : 'rgba(35, 40, 47, 1)' }}
            className={cn(
                'bg-hw-dark-1 select-none flex w-full min-w-[240px] flex-col justify-center items-center relative pt-[22px] pb-[18px] px-6 rounded-lg font-light ',
            )}>
            <Dot className='absolute top-4 right-4' color={transDotColor(data.trans).color} />
            <div className={cn('flex flex-col text-hw-white-2 self-start')}>
                <span className='leading-[128.571%] text-sm'>{currentLanguage == 'kr' ? data.title.line1 : data.title.line1_foreign}</span>
                <span className={cn('text-hw-white-1 mb-1 mt-2 text-lg leading-[122.222%] ')}>{currentLanguage == 'kr' ? data.title.line2 : data.title.line2_foreign}</span>
                <span className='leading-tight'>{currentLanguage == 'kr' ? data.title.line3 : data.title.line3_foreign}</span>
            </div>
            <BatteryBox status={data.battery.typeNum} isOffStatus={data.trans} />

            <span className={cn(
                'text-[40px] font-normal leading-none self-end mt-[26px]',
                {
                    'text-hw-orange-3': data.trans !== 2 && data.trans !== -1,
                    'text-hw-gray-7': data.trans === 2 || data.trans === -1
                }
            )}>
                {data.percentage === null || data.percentage === -1 ? "- %" : `${data.percentage.toFixed(1)}%`}
            </span>
            <div className={cn('flex flex-col w-full gap-[12px] mt-[14px] mb-6')}>
                {data.parameters.map((parameter: any) => {
                    const styleInfo = getStateStyle(parameter.id, parameter.value, data.trans);

                    return (
                        <span key={parameter.id} className={cn('flex leading-none text-lg text-hw-white-2 justify-between')}>
                            <span className='leading-none font-extralight mr-2'>
                                {trans(parameter.label)}</span>
                            <span className='font-normal leading-none'>
                                <span className={cn(styleInfo.valueColorClass)}>{styleInfo.valueStr}</span>
                                <span className={cn(styleInfo.valueColorClass)}>{styleInfo.unit}</span>
                                {/* <span className='text-hw-white-1'>{styleInfo.unit}</span> */}
                            </span>
                        </span>
                    );
                })}
            </div>
            <button
                // onClick={handleClick}
                // style={{ backgroundColor: data.trans === 2 || data.trans === -1 ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 1)' }}
                className={cn(
                    'hw-tooltip',
                    // 'flex items-center justify-center text-hw-white-1 w-full h-12 rounded-lg text-lg font-light gap-2',
                    'flex items-center justify-center w-full h-10 rounded-lg text-lg font-light gap-2',
                    getButtonStyle2(data.status.id, data.status.item, data.trans).bg,
                    {
                        // 'text-red-500': maxAlarm === 4 || maxAlarm === 5, // 고위험 알람일 때 빨간색 텍스트                  
                        // 'text-hw-white-1': !maxAlarm, // 기본 텍스트 색상
                    },
                )}>
                {getButtonStyle2(data.status.id, data.status.item, data.trans).icon} {getButtonStyle2(data.status.id, data.status.item, data.trans).title}
                <div className='hw-tooltip-text text-hw-white-1 hw-tooltip-bottom-card'>
                    <div className=' rounded-lg overflow-y-auto bg-hw-gray-10 py-2 z-60'>
                        {data.alarms.map((alarm: any, index: number) => (
                            <div key={index} className='text-sm bg-hw-gray-10 flex w-max leading-[128.571%] h-8'>
                                <span className='flex items-center px-4'>{alarm.start_time}</span>
                                <span className='flex items-center px-4'>{alarm.rack_num == -1 ? '-' : alarm.rack_num}</span>
                                <span className='flex items-center px-4'><Dot color={getButtonStyle(alarm.level).dot} /></span>
                                <span className='flex items-center px-4 w-[140px]'>{getButtonStyle(alarm.level).title}</span>
                                <span className='flex items-center px-4'>{alarm.alarm_item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </button>

            <button
                className={cn(
                    'hw-tooltip',
                    'flex items-center justify-center w-full h-10 rounded-lg text-lg font-light gap-2 mt-2',
                    getButtonStyle3(maxAlarmRack, data).bg,
                )}
            >
                {getButtonStyle3(maxAlarmRack, data).icon} {getButtonStyle3(maxAlarmRack, data).title}

                {/* Tooltip with fixed height and scrollable content */}
                <div className='hw-tooltip-text text-hw-white-1 hw-tooltip-bottom-card'>
                    <div
                        className='rounded-lg overflow-y-auto bg-hw-gray-10 py-2 z-60'
                        style={{ maxHeight: '350px' }} 
                    >
                        {data.rackAlarms.map((alarm: any, index: number) => (
                            <div key={index} className='text-sm bg-hw-gray-10 flex w-max leading-[128.571%] h-8'>
                                <span className='flex items-center px-4'>{alarm.start_time}</span>
                                <span className='flex items-center px-4'>{alarm.rack_num == -1 ? '-' : alarm.rack_num}</span>
                                <span className='flex items-center px-4'>
                                    <Dot color={getButtonStyle(alarm.level).dot} />
                                </span>
                                <span className='flex items-center px-4 w-[140px]'>{getButtonStyle(alarm.level).title}</span>
                                <span className='flex items-center px-4'>{alarm.alarm_item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </button>
        </Link>
    );
}