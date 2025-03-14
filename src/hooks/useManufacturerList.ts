import { useState, useEffect } from 'react';
import { api } from '@/api/api';
import { backendURL_admin } from '@/api/URLs';

interface Manufacturer {
  id: number;
  name: string;
}

export default function useManufacturerList() {
  const [manufacturerList, setManufacturerList] = useState<Manufacturer[]>([]);

  const fetchManufacturerList = async () => {
    try {
      const token = localStorage.getItem("token_admin");
      const response = await api.post(backendURL_admin + 'get_manufacturers/', {}, {
        headers: { Authorization: "Bearer " + token },            
      });

      if (response.status === 200 && response.data.error === 0) {
        setManufacturerList(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch manufacturer list:', error);
    }
  };

  useEffect(() => {
    fetchManufacturerList();
  }, []);

  return { manufacturerList };
} 