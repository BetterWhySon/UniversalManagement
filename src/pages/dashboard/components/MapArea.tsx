import React, { useEffect, useState } from 'react';
import { cn } from '@/helpers/class-name.helper';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapArea = () => {
  const [isDetailMap, setIsDetailMap] = useState(false);

  useEffect(() => {
    const baseMap = L.map('map', {
      attributionControl: false,
      zoomControl: false,      // 줌 컨트롤 제거
      dragging: isDetailMap,   // 드래그 제어
      scrollWheelZoom: isDetailMap, // 마우스 휠 줌 제어
      doubleClickZoom: isDetailMap, // 더블클릭 줌 제어
      touchZoom: isDetailMap,  // 터치 줌 제어
    }).setView([35.9000, 127.7498], 7);

    // 1. CartoDB Positron (매우 밝은 회색조, 가장 깔끔한 스타일)
    // L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    //   attribution: '',
    //   maxZoom: 19
    // }).addTo(baseMap);

    // 2. CartoDB Light No Labels (라벨 없는 매우 심플한 스타일)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
      attribution: '',
      maxZoom: 19
    }).addTo(baseMap);

    // 3. OpenStreetMap Mapnik (기본 스타일이지만 안정적)
    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   attribution: '',
    //   maxZoom: 19
    // }).addTo(baseMap);

    return () => {
      baseMap.remove();
    };
  }, [isDetailMap]);

  return (
    <div className={cn('flex flex-col w-full h-full')}>
      <div className="flex justify-between items-center px-4 pt-2 pb-2">
        <h2 className="text-white text-lg font-medium">종합운영현황</h2>
        <button 
          onClick={() => setIsDetailMap(!isDetailMap)}
          className="bg-white text-slate-800 px-4 py-2 rounded-md hover:bg-gray-100"
        >
          {isDetailMap ? '기본 맵' : '상세 맵'}
        </button>
      </div>
      <div className={cn('flex-1 overflow-hidden')}>
        <div 
          id="map" 
          className="w-full h-full rounded-b-lg"
          style={{
            borderBottomLeftRadius: '0.5rem',
            borderBottomRightRadius: '0.5rem',
            overflow: 'hidden',
            position: 'relative',
            zIndex: 1
          }}
        />
      </div>
    </div>
  );
};

export default MapArea;