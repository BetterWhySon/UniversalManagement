import { SVGProps } from 'react';
import EStopOnIcon from '@/assets/icons/estoponIcon.svg';
import InitIcon from '@/assets/icons/init.svg';
import Contactor_Control from '@/assets/icons/contactor_control.svg';
import React, { useState, MouseEvent } from 'react';

type Props = SVGProps<SVGSVGElement>;

export function UserProfile() {
    return (
        <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M12.7652 5.84138C12.7652 7.32306 11.5159 8.64576 10 8.64576C8.48414 8.64576 7.23485 7.32306 7.23485 5.84138C7.23485 4.33976 8.50303 2.91667 10 2.91667C11.497 2.91667 12.7652 4.33976 12.7652 5.84138ZM17.0833 13.9816C17.0833 14.7576 16.6414 15.5143 15.5176 16.1001C14.3801 16.693 12.5813 17.0835 10 17.0835C7.41871 17.0835 5.61988 16.693 4.48236 16.1001C3.35861 15.5143 2.91667 14.7576 2.91667 13.9816C2.91667 13.2668 3.55016 12.4917 4.87367 11.8708C6.16408 11.2654 7.97606 10.8797 10 10.8797C12.0239 10.8797 13.8359 11.2654 15.1263 11.8708C16.4498 12.4917 17.0833 13.2668 17.0833 13.9816Z'
                stroke='#CACCCE'
                strokeWidth='0.833333'
            />
        </svg>
    );
}

export function Clock() {
    return (
        <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M9.99996 5.00002V10L13.3333 11.6667M18.3333 10C18.3333 14.6024 14.6023 18.3334 9.99996 18.3334C5.39759 18.3334 1.66663 14.6024 1.66663 10C1.66663 5.39765 5.39759 1.66669 9.99996 1.66669C14.6023 1.66669 18.3333 5.39765 18.3333 10Z'
                stroke='#CACCCE'
                strokeWidth='0.833333'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
}

interface LanguageSettingProps {
    onClick: (event: MouseEvent<SVGSVGElement>) => void;
}
export function LanguageSetting({ onClick }: LanguageSettingProps) {
    return (
        <svg
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            onClick={onClick}
            style={{ cursor: 'pointer' }}
        >
            <mask
                id='mask0_40_180'
                style={{ maskType: 'alpha' }}
                maskUnits='userSpaceOnUse'
                x='1'
                y='2'
                width='17'
                height='16'
            >
                <circle cx='9.99988' cy='10.0001' r='8' fill='#8A7272' />
            </mask>
            <g mask='url(#mask0_40_180)'>
                <circle cx='9.99988' cy='10.0001' r='7.5' stroke='#CACCCE' />
                <path d='M2 7H18' stroke='#CACCCE' />
                <path d='M2 13H18' stroke='#CACCCE' />
                <path d='M10 2.5L10 17.5' stroke='#CACCCE' />
                <path d='M10 2C8.93333 3 6 6 6 10C6 14 8.93333 17 10 18' stroke='#CACCCE' />
                <path d='M10 2C11.0667 3 14 6 14 10C14 14 11.0667 17 10 18' stroke='#CACCCE' />
            </g>
        </svg>
    );
}

export function Check() {
    return (
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <rect x='2.75' y='2.75' width='18.5' height='18.5' rx='9.25' stroke='#FEFEFE' strokeWidth='1.5' />
            <path d='M7 13L11.1667 16L17 9' stroke='#FEFEFE' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
    );
}

export function Lightning() {
    return (
        <svg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M5.49783 9.36342L10.4225 2.52359C10.6206 2.24844 11.0535 2.44315 10.9791 2.77393L9.8566 7.76274C9.81279 7.95745 9.96086 8.14254 10.1604 8.14254H12.2489C12.5027 8.14254 12.6499 8.42994 12.5016 8.63595L7.57693 15.4758C7.37882 15.7509 6.94593 15.5562 7.02035 15.2254L8.14284 10.2366C8.18665 10.0419 8.03858 9.85683 7.839 9.85683H5.75057C5.49672 9.85683 5.3495 9.56943 5.49783 9.36342Z'
                fill='#232527'
            />
        </svg>
    );
}

export function Play() {
    return (
        <svg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M13.4802 8.20276C14.505 8.77388 14.5088 9.49233 13.4802 10.138L5.53245 15.4982C4.53383 16.0311 3.85559 15.7164 3.78439 14.5633L3.75067 3.34462C3.72819 2.28241 4.60315 1.9823 5.4369 2.49158L13.4802 8.20276Z'
                fill='#FEFEFE'
            />
        </svg>
    );
}

export function QuestionCircle() {
    return (
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <circle
                cx='12'
                cy='12'
                r='10'
                fill='#2B313B'
                stroke='#CACCCE'
                strokeWidth='1.25'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M9 9.20328C9.24196 8.46866 9.71954 7.84921 10.3482 7.45463C10.9768 7.06005 11.7158 6.91582 12.4345 7.04747C13.1531 7.17912 13.805 7.57817 14.2745 8.17393C14.7441 8.76969 15.0011 9.52372 15 10.3025C15 12.5008 11.9125 13.6 11.9125 13.6M11.9523 18H11.9661'
                stroke='#CACCCE'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
}

export function Refresh(props: Props) {
    return (
        <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
            <path
                d='M1.33301 6.66667C1.33301 6.66667 2.66966 4.84548 3.75556 3.75883C4.84147 2.67218 6.34207 2 7.99967 2C11.3134 2 13.9997 4.68629 13.9997 8C13.9997 11.3137 11.3134 14 7.99967 14C5.26428 14 2.95641 12.1695 2.23419 9.66667M1.33301 6.66667V2.66667M1.33301 6.66667H5.33301'
                stroke={props.stroke || '#444444'}
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
}

export function Tick() {
    return (
        <svg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M3.85583 9.00021L7.71298 12.8574L15.4273 5.14307'
                stroke='#232527'
                strokeWidth='1.92857'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
}

export function Warning() {
    return (
        <svg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <rect x='3.25' y='2.75' width='18.5' height='18.5' rx='9.25' stroke='#FEFEFE' strokeWidth='1.5' />
            <rect x='11.5' y='6' width='2' height='8' rx='1' fill='#FEFEFE' />
            <rect x='11.5' y='16' width='2' height='2' rx='1' fill='#FEFEFE' />
        </svg>
    );
}

export function Divider() {
    return (
        <svg width='1' height='16' viewBox='0 0 1 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <rect width='1' height='16' rx='0.5' fill='#777777' />
        </svg>
    );
}

export function Danger() {
    return (
        <svg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <rect x='3.25' y='2.75' width='18.5' height='18.5' rx='9.25' stroke='#FEFEFE' strokeWidth='1.5' />
            <path
                d='M16.5 8L8.5 16M8.5 8L16.5 16'
                stroke='#FEFEFE'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
}

// export function EStopOn() {
//   return (
//     <svg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
//       <rect x='3.25' y='2.75' width='18.5' height='18.5' rx='9.25' stroke='#FEFEFE' strokeWidth='1.5' />
//       <path
//         d='M16.5 8L8.5 16M8.5 8L16.5 16'
//         stroke='#FEFEFE'
//         strokeWidth='2'
//         strokeLinecap='round'
//         strokeLinejoin='round'
//       />
//     </svg>
//   );
// }
export function EStopOn() {
    return (
        <img src={EStopOnIcon} alt="E-Stop On" style={{ width: '22px', height: '22px' }} />
    );
}

export function Init() {
    return (
        <img src={InitIcon} alt="Init" style={{ width: '20px', height: '20px' }} />
    );
}

export function ContactorControl() {
    return (
        <img src={Contactor_Control} alt="Contactor Control" style={{ width: '22px', height: '22px' }} />
    );
}

type DotColor =
    | 'yellow-3'
    | 'green-1'
    | 'green-2'
    | 'green-3'
    | 'green-4'
    | 'green-5'
    | 'blue-1'
    | 'gray-1'
    | 'gray-7'
    | 'orange-2'
    | 'orange-4'
    | 'red-1'
    | string;
export function Dot({ color, ...props }: Props & { color: DotColor }) {
    const getFillColor = (color: DotColor) => {
        switch (color) {
            case 'purple-1':
                return 'fill-hw-purple-1';
            case 'pink-1':
                return 'fill-hw-pink-1';
            case 'yellow-4':
                return 'fill-hw-yellow-4';
            case 'yellow-3':
                return 'fill-hw-yellow-3';
            case 'orange-4':
                return 'fill-hw-orange-4';
            case 'green-1':
                return 'fill-hw-green-1';
            case 'green-2':
                return 'fill-hw-green-2';
            case 'green-3':
                return 'fill-hw-green-3';
            case 'green-4':
                return 'fill-hw-green-4';
            case 'green-5':
                return 'fill-hw-green-5';
            case 'blue-1':
                return 'fill-hw-blue-1';
            case 'blue-2':
                return 'fill-hw-blue-2';
            case 'gray-1':
                return 'fill-hw-gray-1';
            case 'gray-7':
                return 'fill-hw-gray-7';
            case 'orange-2':
                return 'fill-hw-orange-2';
            case 'orange-1':
                return 'fill-hw-orange-1';
            case 'red-1':
                return 'fill-hw-red-1';
            default:
                return 'fill-hw-gray-1';
        }
    };
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none' {...props}>
            <circle cx='6' cy='6' r='6' className={getFillColor(color)} />
        </svg>
    );
}

export function Arrow(props: Props) {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
            <path
                d='M6 9L12 15L18 9'
                className={`${props.className}`}
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
}

export function HorizontalLine() {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width='2' height='50' viewBox='0 0 2 50' fill='none'>
            <path d='M1 1V49' stroke='#636363' strokeLinecap='round' />
        </svg>
    );
}

export function InfoDetailRefresh() {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
            <path
                d='M21 10C21 10 18.995 7.26822 17.3662 5.63824C15.7373 4.00827 13.4864 3 11 3C6.02944 3 2 7.02944 2 12C2 16.9706 6.02944 21 11 21C15.1031 21 18.5649 18.2543 19.6482 14.5M21 10V4M21 10H15'
                stroke='#FEFEFE'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
}

export function Filter(props: Props) {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' {...props}>
            <path
                d='M3.38589 5.66687C2.62955 4.82155 2.25138 4.39889 2.23712 4.03968C2.22473 3.72764 2.35882 3.42772 2.59963 3.22889C2.87684 3 3.44399 3 4.57828 3H19.4212C20.5555 3 21.1227 3 21.3999 3.22889C21.6407 3.42772 21.7748 3.72764 21.7624 4.03968C21.7481 4.39889 21.3699 4.82155 20.6136 5.66687L14.9074 12.0444C14.7566 12.2129 14.6812 12.2972 14.6275 12.3931C14.5798 12.4781 14.5448 12.5697 14.5236 12.6648C14.4997 12.7721 14.4997 12.8852 14.4997 13.1113V18.4584C14.4997 18.6539 14.4997 18.7517 14.4682 18.8363C14.4403 18.911 14.395 18.9779 14.336 19.0315C14.2692 19.0922 14.1784 19.1285 13.9969 19.2012L10.5969 20.5612C10.2293 20.7082 10.0455 20.7817 9.89802 20.751C9.76901 20.7242 9.6558 20.6476 9.583 20.5377C9.49975 20.4122 9.49975 20.2142 9.49975 19.8184V13.1113C9.49975 12.8852 9.49975 12.7721 9.47587 12.6648C9.45469 12.5697 9.41971 12.4781 9.37204 12.3931C9.31828 12.2972 9.2429 12.2129 9.09213 12.0444L3.38589 5.66687Z'
                stroke='#CACCCE'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
}

export function ChevronDown(props: Props) {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' {...props}>
            <path d='M6 9L12 15L18 9' stroke='#CACCCE' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
    );
}

export function ChevronRight(props: Props) {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none' {...props}>
            <path
                d='M7.5 15L12.5 10L7.5 5'
                stroke='#FEFEFE'
                strokeWidth='0.833333'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
}

export function ChevronRightDouble(props: Props) {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none' {...props}>
            <path
                d='M5 14.1666L9.16667 9.99998L5 5.83331M10.8333 14.1666L15 9.99998L10.8333 5.83331'
                stroke='#FEFEFE'
                strokeWidth='0.833333'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
}

export function ChevronLeft(props: Props) {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none' {...props}>
            <path
                d='M12.5 15L7.5 10L12.5 5'
                stroke='#FEFEFE'
                strokeWidth='0.833333'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
}

export function ChevronLeftDouble(props: Props) {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none' {...props}>
            <path
                d='M15 14.1666L10.8333 9.99998L15 5.83331M9.16667 14.1666L5 9.99998L9.16667 5.83331'
                stroke='#FEFEFE'
                strokeWidth='0.833333'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
}

export function CheckBox() {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
            <rect x='0.5' y='0.5' width='15' height='15' rx='1.5' fill='#FFDAC2' />
            <rect x='0.5' y='0.5' width='15' height='15' rx='1.5' stroke='#F37321' />
            <path d='M5 8L7 10L11 6' stroke='#F37321' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
    );
}

export function ChevronFilterUpInactive() {
    return (
        <svg width='8' height='6' viewBox='0 0 8 6' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M3.03763 0.461539C3.46535 -0.153846 4.53465 -0.153847 4.96237 0.461538L7.84946 4.61538C8.27718 5.23077 7.74253 6 6.8871 6H1.1129C0.257467 6 -0.277182 5.23077 0.150536 4.61538L3.03763 0.461539Z'
                fill='#777777'
            />
        </svg>
    );
}

export function ChevronFilterUpActive() {
    return (
        <svg width='8' height='5' viewBox='0 0 8 5' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M4.7542 0.31553C4.35634 -0.105176 3.64366 -0.105176 3.2458 0.315531L0.245446 3.4882C-0.314145 4.07993 0.144855 5 0.999643 5L7.00036 5C7.85515 5 8.31414 4.07993 7.75455 3.4882L4.7542 0.31553Z'
                fill='#CACCCE'
            />
        </svg>
    );
}

export function ChevronFilterDownInactive() {
    return (
        <svg width='8' height='6' viewBox='0 0 8 6' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M4.96237 5.53846C4.53465 6.15385 3.46535 6.15385 3.03763 5.53846L0.150537 1.38462C-0.277182 0.769232 0.257466 2.00037e-07 1.1129 1.25252e-07L6.8871 -3.79544e-07C7.74253 -4.54329e-07 8.27718 0.769231 7.84946 1.38462L4.96237 5.53846Z'
                fill='#777777'
            />
        </svg>
    );
}

export function ChevronFilterDownActive() {
    return (
        <svg width='8' height='5' viewBox='0 0 8 5' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M4.7542 4.68447C4.35634 5.10518 3.64366 5.10518 3.2458 4.68447L0.245446 1.5118C-0.314145 0.920068 0.144855 -2.09881e-07 0.999643 -1.35154e-07L7.00036 3.89446e-07C7.85515 4.64174e-07 8.31414 0.920068 7.75455 1.5118L4.7542 4.68447Z'
                fill='#CACCCE'
            />
        </svg>
    );
}

export function ThreeDot(props: Props) {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' {...props}>
            <path
                d='M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z'
                stroke='#FEFEFE'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z'
                stroke='#FEFEFE'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z'
                stroke='#FEFEFE'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
}

export function Plus(props: Props) {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' {...props}>
            <path d='M12 5V19M5 12H19' stroke='#FEFEFE' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
    );
}

export function Circle(props: Props) {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' {...props}>
            <g opacity='0.9'>
                <path
                    d='M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z'
                    stroke='#FEFEFE'
                    strokeWidth='2'
                    strokeLinecap='round'
                />
            </g>
        </svg>
    );
}

export function Cancel(props: Props) {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' {...props}>
            <g opacity='0.9'>
                <path
                    d='M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z'
                    stroke='#FEFEFE'
                    strokeWidth='2'
                    strokeLinecap='round'
                />
                <path d='M6 18L18 6' stroke='#FEFEFE' strokeWidth='2' strokeLinecap='round' />
            </g>
        </svg>
    );
}

export function Edit(props: Props) {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' {...props}>
            <path
                d='M11 3.99998H6.8C5.11984 3.99998 4.27976 3.99998 3.63803 4.32696C3.07354 4.61458 2.6146 5.07353 2.32698 5.63801C2 6.27975 2 7.11983 2 8.79998V17.2C2 18.8801 2 19.7202 2.32698 20.362C2.6146 20.9264 3.07354 21.3854 3.63803 21.673C4.27976 22 5.11984 22 6.8 22H15.2C16.8802 22 17.7202 22 18.362 21.673C18.9265 21.3854 19.3854 20.9264 19.673 20.362C20 19.7202 20 18.8801 20 17.2V13M7.99997 16H9.67452C10.1637 16 10.4083 16 10.6385 15.9447C10.8425 15.8957 11.0376 15.8149 11.2166 15.7053C11.4184 15.5816 11.5914 15.4086 11.9373 15.0627L21.5 5.49998C22.3284 4.67156 22.3284 3.32841 21.5 2.49998C20.6716 1.67156 19.3284 1.67155 18.5 2.49998L8.93723 12.0627C8.59133 12.4086 8.41838 12.5816 8.29469 12.7834C8.18504 12.9624 8.10423 13.1574 8.05523 13.3615C7.99997 13.5917 7.99997 13.8363 7.99997 14.3255V16Z'
                stroke='#FEFEFE'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
}

export const CellDetailArrowUp = () => {
    return (
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M12 20V4M12 4L6 10M12 4L18 10'
                stroke='#FFA7A7'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
};

export const CellDetailArrowDown = () => {
    return (
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M12 4V20M12 20L18 14M12 20L6 14'
                stroke='#7EC5FF'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
};

export function Calendar() {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
            <path
                d='M21 10H3M16 2V6M8 2V6M7.8 22H16.2C17.8802 22 18.7202 22 19.362 21.673C19.9265 21.3854 20.3854 20.9265 20.673 20.362C21 19.7202 21 18.8802 21 17.2V8.8C21 7.11984 21 6.27976 20.673 5.63803C20.3854 5.07354 19.9265 4.6146 19.362 4.32698C18.7202 4 17.8802 4 16.2 4H7.8C6.11984 4 5.27976 4 4.63803 4.32698C4.07354 4.6146 3.6146 5.07354 3.32698 5.63803C3 6.27976 3 7.11984 3 8.8V17.2C3 18.8802 3 19.7202 3.32698 20.362C3.6146 20.9265 4.07354 21.3854 4.63803 21.673C5.27976 22 6.11984 22 7.8 22Z'
                stroke='#CACCCE'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
}

export function Hamburger() {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
            <path d='M3 12H21M3 6H21M3 18H21' stroke='#FEFEFE' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
    );
}

export function Close({ color = '#FEFEFE' }) {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
            <path d='M18 6L6 18M6 6L18 18' stroke={color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
    );
}

export function SmallClose() {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
            <path
                d='M18 2L2 18M2 2L18 18'
                stroke='#FEFEFE'
                strokeWidth='2.66667'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
}

// export function EStopOn() {
//   return (
//     <svg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
//       <rect x='3.25' y='2.75' width='18.5' height='18.5' rx='9.25' stroke='#FEFEFE' strokeWidth='1.5' />
//       <path
//         d='M16.5 8L8.5 16M8.5 8L16.5 16'
//         stroke='#FEFEFE'
//         strokeWidth='2'
//         strokeLinecap='round'
//         strokeLinejoin='round'
//       />
//     </svg>
//   );
// }


// export function EStopOn() {
//   return (
//     <>
//       {/* 기존 SVG */}
//       <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
//         {/* SVG 내용 */}
//       </svg>
//       {/* 이미지 아이콘 추가 */}
//       <img src={EStopOnIcon} alt="My Icon" style={{ width: '20px', height: '20px' }} />
//     </>
//   );
// }