import { useEffect, useState } from 'react';

export const useCustomerId = () => {
  const getCustomerId = () => {
    const isSuperUser = localStorage.getItem("is_admin_superuser") === "true";
    const isManufacturerSelected = localStorage.getItem("is_ManufacturerSelected") === "true";
    
    if (!isSuperUser) {
      return localStorage.getItem("customer_id") || "";
    } else {
      if (isManufacturerSelected) {
        return localStorage.getItem("customer_id_selected") || "";
      }
      return "";
    }
  };

  const [customerId, setCustomerId] = useState<string>(getCustomerId());

  useEffect(() => {
    const handleStorageChange = () => {
      setCustomerId(getCustomerId());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return customerId;
};

export default useCustomerId; 