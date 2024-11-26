export enum CARD_TYPE {
  NORMAL = 'NORMAL',
  WARNING = 'WARNING',
  FAULT = 'FAULT',
}

export enum BATTERY_TYPE {
  INIT = 'INIT',
  READY = 'READY',
  DRIVE = 'DRIVE',
  CHARGE = 'CHARGE',
  CHARGE_RBLA = 'CHARGE_RBLA',
  CONTACTO_RCONTROL = 'CONTACTO_RCONTROL',
  NODATA = 'NODATA',
}

export const SITE_COLORS = [
  'orange-4',
  'green-4',
  'green-3',
  'green-5',
  'green-2',
  'orange-2',
  'green-4',
  'green-3',
  'green-5',
  'green-2',
  'green-1',
  'orange-1',
  'red-1',
  'gray-7',
]

export const getFillColor = (color: string) => {
  switch (color) {
    case 'yellow-3':
      return 'fill-hw-yellow-3';
    case 'orange-4':
      return 'fill-hw-orange-4';
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
    case 'gray-1':
      return 'fill-hw-gray-1';
    case 'orange-2':
      return 'fill-hw-orange-2';
    case 'green-1':
      return 'fill-hw-green-1';
    case 'orange-1':
      return 'fill-hw-orange-1';
    case 'red-1':
      return 'fill-hw-red-1';
    case 'gray-7':
      return 'fill-hw-gray-7';
    default:
      return 'fill-hw-gray-1';
  }
}


export const getBGColor = (color: string) => {
  switch (color) {
    case 'yellow-3':
      return 'bg-hw-yellow-3';
    case 'orange-4':
      return 'bg-hw-orange-4';
    case 'green-2':
      return 'bg-hw-green-2';
    case 'green-3':
      return 'bg-hw-green-3';
    case 'green-4':
      return 'bg-hw-green-4';
    case 'green-5':
      return 'bg-hw-green-5';
    case 'blue-1':
      return 'bg-hw-blue-1';
    case 'gray-1':
      return 'bg-hw-gray-1';
    case 'orange-2':
      return 'bg-hw-orange-2';
    case 'green-1':
      return 'bg-hw-green-1';
    case 'orange-1':
      return 'bg-hw-orange-1';
    case 'red-1':
      return 'bg-hw-red-1';
    case 'gray-7':
      return 'bg-hw-gray-7';
    default:
      return 'bg-hw-gray-1';
  }
};