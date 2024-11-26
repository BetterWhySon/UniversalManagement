export function transDotColor(type: number) {
    switch (type) {
      case 0:
        return {
          color: 'blue-1',
        };
      case 1:
        return {
          color: 'orange-2',
        };
      case 2:
        return {
          color: 'gray-1',
        };
      default:
        return {
          color: 'gray-1',
        };
    }
  }