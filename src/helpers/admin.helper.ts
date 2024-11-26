import { PATH } from '@/router/path';

export const isAdmin = () => {
  const pathname = window.location.pathname;
  return pathname.includes(PATH.ADMIN.get());
};
