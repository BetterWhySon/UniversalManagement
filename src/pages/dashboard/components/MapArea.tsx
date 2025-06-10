import React, { useEffect, useState, useRef, Dispatch, SetStateAction } from 'react';
import { cn } from '@/helpers/class-name.helper';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// 타입 정의
interface MapSiteData {
    site_id: number;
    site_name: string;
    whole: number;
    online: number;
    lat: number;
    lon: number;
    group_id?: number;
    group_name?: string;
}

interface MapRealtimeData {
    clientid: string;
    coordinates: {
        lat: number;
        lon: number;
    };
    info?: {
        site_name: string;
        group_name: string | null;
        device_name: string;
        field: string;
        manufacturer: string;
        clientid: string;
        model_name: string;
        user_name: string;
        phonenumber: string;
    };
}

type RealtimeDataMap = { [key: string]: MapRealtimeData };

interface MapAreaProps {
  mapData?: MapSiteData[] | RealtimeDataMap;
  onSiteSelect: (siteId: number | null) => void;
  onGroupSelect: Dispatch<SetStateAction<number | null>>;
  onCategoryChange: (category: 'sites' | 'realtime') => void;
}

const DEFAULT_ZOOM_LEVEL = 6.6;
const DEFAULT_CENTER: [number, number] = [36.2000, 127.7498];

const MapArea: React.FC<MapAreaProps> = ({ mapData, onSiteSelect, onGroupSelect, onCategoryChange }) => {
  const [isSiteMode, setIsSiteMode] = useState(true); // 사이트 모드(true) vs 그룹 모드(false)
  const [isRealtime, setIsRealtime] = useState(false); // 실시간 모드 여부
  const mapRef = useRef<L.Map | null>(null);
  const [selectedSite, setSelectedSite] = useState<MapSiteData | null>(null);
  const [siteMarkerRef, setSiteMarkerRef] = useState<L.Marker | null>(null);

  // 기존 실시간 마커 추적을 위한 참조
  const realtimeMarkersRef = useRef<L.CircleMarker[]>([]);

  // 배터리 상태 타입 정의
  type BatteryState = 'standby' | 'discharging' | 'charging' | 'offline';

  // 상태별 색상 매핑
  const stateColors: Record<BatteryState, string> = {
    standby: '#FFD03B',      // 사용대기
    discharging: '#6CFF31',  // 방전 중
    charging: '#5E52FC',     // 충전 중
    offline: '#A1A1A1'       // 오프라인
  };

  // 지도 컨트롤 활성화 함수
  const enableMapControls = (map: L.Map) => {
    map.dragging.enable();
    map.scrollWheelZoom.enable();
    map.doubleClickZoom.enable();
    map.touchZoom.enable();
  };

  // 지도 컨트롤 비활성화 함수
  const disableMapControls = (map: L.Map) => {
    map.dragging.disable();
    map.scrollWheelZoom.disable();
    map.doubleClickZoom.disable();
    map.touchZoom.disable();
  };

  // 마커 아이콘 생성 함수
  const getMarkerIcon = (state: string) => {
    const color = state === 'online' ? '#6CFF31' : '#F59E0B';
    return L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          position: relative;
          filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.25));
        ">
          <div style="
            width: 24px; 
            height: 24px; 
            background-color: ${color}; 
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            position: relative;
            box-shadow: 0 0 0 2px white;
          ">
            <div style="
              width: 8px;
              height: 8px;
              background: white;
              border-radius: 50%;
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
            "></div>
          </div>
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 24]
    });
  };

  // 사이트 마커 클릭 이벤트 핸들러
  const handleSiteMarkerClick = (site: MapSiteData) => {
    if (!mapRef.current) return;

    // 그룹 모드로 전환
    setIsSiteMode(false);
    setSelectedSite(site);

    // 지도 뷰 변경 - 약간 서쪽으로 이동하여 우측 그룹 리스트가 잘 보이도록
    const lngOffset = -0.015;  // 약 1km에 해당하는 경도 차이
    mapRef.current.setView([site.lat, site.lon - lngOffset], 12, {
      animate: true,
      duration: 1
    });
    
    enableMapControls(mapRef.current);
    onSiteSelect(site.site_id);
    if (site.group_id) {
      onGroupSelect(site.group_id);
    }
  };

  // 기본 화면으로 돌아가는 함수 (사이트 모드로 복귀)
  const handleResetView = () => {
    if (!mapRef.current) return;

    // 지도 초기화
    mapRef.current.setView(DEFAULT_CENTER, DEFAULT_ZOOM_LEVEL);
    setIsSiteMode(true);
    setSelectedSite(null);
    
    // 사이트 선택 해제 및 소켓 재연결 (site 인자 제거)
    onSiteSelect(null);
    onGroupSelect(null); // 그룹 선택도 해제
    
    // 실시간 모드였다면 사이트별 모드로 변경
    if (isRealtime) {
      setIsRealtime(false);
      onCategoryChange('sites');
    }
  };

  // 맵 초기화
  useEffect(() => {
    if (mapRef.current) return;

    const baseMap = L.map('map', {
      attributionControl: false,
      zoomControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: false,
      zoomSnap: 0.1,
      zoomDelta: 0.1
    }).setView(DEFAULT_CENTER, DEFAULT_ZOOM_LEVEL);

    mapRef.current = baseMap;

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
      attribution: '',
      maxZoom: 19,
      opacity: 0.8,
      subdomains: 'abcd'
    }).addTo(baseMap);

    // 스타일 추가
    const style = document.createElement('style');
    style.textContent = `
      .custom-tooltip {
        background-color: transparent;
        border: none;
        box-shadow: none;
        color: #1F2937;
        font-size: 12px;
        font-weight: 600;
        text-shadow: none;
      }
      .custom-tooltip::before {
        display: none;
      }
      .leaflet-tooltip {
        background-color: transparent !important;
        border: none !important;
        box-shadow: none !important;
      }
      .leaflet-tooltip-tip {
        display: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      document.head.removeChild(style);
    };
  }, []);

  // 마커 업데이트
  useEffect(() => {
    if (!mapRef.current || !mapData) return;

    const baseMap = mapRef.current;
    
    // 디버깅을 위한 로그 추가
    console.log('MapArea - mapData:', mapData);
    console.log('MapArea - isRealtime:', isRealtime);
    console.log('MapArea - isSiteMode:', isSiteMode);
    console.log('MapArea - selectedSite:', selectedSite?.site_id);
    
    // 맵 데이터 정규화 (중첩된 객체 구조 처리)
    let normalizedMapData = mapData;
    
    // 객체이고 map 속성이 있을 경우 (중첩된 구조)
    if (!Array.isArray(mapData) && typeof mapData === 'object' && mapData !== null && 'map' in mapData) {
      console.log('MapArea - Found nested map property, unwrapping...', (mapData as any).map);
      normalizedMapData = (mapData as any).map;
    }
    
    // 모든 실시간 마커 제거 (저장된 참조 활용)
    if (realtimeMarkersRef.current.length > 0) {
      console.log(`MapArea - 기존 실시간 마커 ${realtimeMarkersRef.current.length}개 제거`);
      realtimeMarkersRef.current.forEach(marker => {
        if (marker) marker.remove();
      });
      realtimeMarkersRef.current = []; // 참조 배열 초기화
    }

    // 새로운 마커 추가
    if (Array.isArray(normalizedMapData)) {
      // Site별 또는 그룹별 데이터 처리
      console.log('MapArea - Array data with length:', normalizedMapData.length);
      
      if (!isRealtime) {
        // 기존 사이트 마커 제거 (그룹 모드의 사이트 마커 제외)
        baseMap.eachLayer((layer) => {
          if (layer instanceof L.Marker && 
              !(siteMarkerRef === layer) && 
              !(!isSiteMode && selectedSite && layer.getLatLng().lat === selectedSite.lat && layer.getLatLng().lng === selectedSite.lon)) {
            layer.remove();
          }
        });

        // 사이트 모드 - 기본 MapSiteData 배열 처리
        normalizedMapData.forEach((site) => {
          if (!('lat' in site) || !('lon' in site)) return;
          
          const markerInstance = L.marker([site.lat, site.lon], {
            icon: getMarkerIcon(site.online > 0 ? 'online' : 'offline')
          })
          .bindTooltip(`${site.site_name} (${site.online}/${site.whole})`, {
            permanent: true,
            direction: 'top',
            offset: [0, -20],
            className: 'custom-tooltip'
          })
          .addTo(baseMap);

          markerInstance.on('click', () => {
            handleSiteMarkerClick(site);
          });
        });
      } else {
        // 실시간 모드지만 배열 형태 데이터
        console.log('MapArea - 실시간 모드(배열 형식) 처리:', normalizedMapData.length);
        
        // 배열 형태의 실시간 데이터 처리
        const newMarkers: L.CircleMarker[] = [];
        
        normalizedMapData.forEach((item: any, index) => {
          // 실시간 데이터 형식 확인
          if (item && typeof item === 'object' && item.coordinates && 
              typeof item.coordinates === 'object' &&
              'lat' in item.coordinates && 'lon' in item.coordinates) {
              
            console.log(`MapArea - Creating realtime marker for array item at [${item.coordinates.lat}, ${item.coordinates.lon}]`);
            
            const circleMarker = L.circleMarker([item.coordinates.lat, item.coordinates.lon], {
              radius: 4,
              fillColor: stateColors['discharging'],
              color: '#fff',
              weight: 1,
              opacity: 1,
              fillOpacity: 0.8
            })
            .bindTooltip(`
              <div class="bg-hw-dark-1 text-white p-2 rounded shadow-lg">
                <div>• 기기 ID: ${item.clientid || index}</div>
                ${item.info ? `
                <div>• 사이트: ${item.info.site_name || 'Unknown'}</div>
                <div>• 그룹: ${item.info.group_name || '미지정'}</div>
                <div>• 기기명: ${item.info.device_name || 'Unknown'}</div>
                ` : ''}
              </div>
            `, {
              permanent: false,
              direction: 'top',
              offset: [0, -5],
              className: 'custom-tooltip',
              interactive: true
            })
            .addTo(baseMap);

            circleMarker.on('click', () => {
              onSiteSelect(typeof item.clientid === 'string' ? parseInt(item.clientid) : index);
            });
            
            // 새 마커 참조 저장
            newMarkers.push(circleMarker);
          }
        });
        
        // 마커 참조 업데이트
        realtimeMarkersRef.current = newMarkers;
      }
    } else if (isRealtime && typeof normalizedMapData === 'object' && normalizedMapData !== null) {
      // 실시간 데이터 처리 (객체 형식)
      console.log('MapArea - 실시간 모드(객체 형식) 처리:', Object.keys(normalizedMapData).length);
      
      // 객체 형태의 실시간 데이터 처리
      const newMarkers: L.CircleMarker[] = [];
      
      Object.entries(normalizedMapData as Record<string, any>).forEach(([clientId, data]) => {
        console.log(`MapArea - Processing clientId: ${clientId}`, data);
        
        // data가 객체인지 확인
        if (typeof data !== 'object' || data === null) {
          console.log(`MapArea - Invalid data format for clientId: ${clientId}`);
          return;
        }
        
        // coordinates가 있는지 확인
        let coordinates: { lat: number, lon: number } | null = null;
        
        if (data.coordinates && typeof data.coordinates === 'object' && 
            'lat' in data.coordinates && 'lon' in data.coordinates) {
          coordinates = {
            lat: Number(data.coordinates.lat),
            lon: Number(data.coordinates.lon)
          };
        } else if ('lat' in data && 'lon' in data) {
          // 직접 lat/lon 속성이 있는 경우
          coordinates = { 
            lat: Number(data.lat), 
            lon: Number(data.lon) 
          };
        } else {
          console.log(`MapArea - Missing coordinates for clientId: ${clientId}`);
          return;
        }
        
        if (!coordinates || 
            coordinates.lat === undefined || coordinates.lon === undefined || 
            isNaN(coordinates.lat) || isNaN(coordinates.lon)) {
          console.log(`MapArea - Invalid coordinates for clientId: ${clientId}`);
          return;
        }
        
        // 배터리 상태 확인 및 색상 설정
        let fillColor = stateColors['discharging']; // 기본값
        
        // 정보 객체 가져오기
        const info = data.info || data;
        
        // 디바이스 이름 가져오기
        const deviceName = info.device_name || 'Unknown';
        
        console.log(`MapArea - Creating marker at [${coordinates.lat}, ${coordinates.lon}]`);
        
        const circleMarker = L.circleMarker([coordinates.lat, coordinates.lon], {
          radius: 4,
          fillColor: fillColor,
          color: '#fff',
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        })
        .bindTooltip(`
          <div class="bg-hw-dark-1 text-white p-2 rounded shadow-lg">
            <div>• 사이트: ${info.site_name || 'Unknown'}</div>
            <div>• 그룹: ${info.group_name || '미지정'}</div>
            <div>• 기기명: ${deviceName}</div>
            <div>• 종류: ${info.field || 'Unknown'}</div>
            <div>• 제조사: ${info.manufacturer || 'Unknown'}</div>
            <div>• 클라이언트ID: ${info.clientid || data.clientid || clientId || 'Unknown'}</div>
            <div>• 모델명: ${info.model_name || 'Unknown'}</div>
            <div>• 사용자: ${info.user_name || 'Unknown'}</div>
            <div>• 연락처: ${info.phonenumber || 'Unknown'}</div>
          </div>
        `, {
          permanent: false,
          direction: 'top',
          offset: [0, -5],
          className: 'custom-tooltip',
          interactive: true
        })
        .addTo(baseMap);

        circleMarker.on('click', () => {
          const idToUse = data.clientid || clientId;
          const numericId = typeof idToUse === 'string' ? parseInt(idToUse) : idToUse;
          onSiteSelect(isNaN(numericId) ? null : numericId);
        });
        
        // 새 마커 참조 저장
        newMarkers.push(circleMarker);
      });
      
      // 마커 참조 업데이트
      realtimeMarkersRef.current = newMarkers;
    } else {
      console.log('MapArea - mapData is not in expected format', normalizedMapData);
    }

    // 그룹 모드이고 selectedSite가 있는 경우 사이트 마커 추가/업데이트
    if (!isSiteMode && selectedSite && selectedSite.lat && selectedSite.lon && !isRealtime) {
      // 기존 사이트 마커가 있으면 제거
      if (siteMarkerRef) {
        siteMarkerRef.remove();
        setSiteMarkerRef(null);
      }
      
      // 새 사이트 마커 생성
      const siteMarker = L.marker([selectedSite.lat, selectedSite.lon], {
        icon: getMarkerIcon(selectedSite.online > 0 ? 'online' : 'offline')
      })
      .bindTooltip(`${selectedSite.site_name} (${selectedSite.online}/${selectedSite.whole})`, {
        permanent: true,
        direction: 'top',
        offset: [0, -20],
        className: 'custom-tooltip'
      })
      .addTo(baseMap);
      
      // 사이트 마커 저장
      setSiteMarkerRef(siteMarker);
      
      console.log(`MapArea - 사이트 마커 추가: [${selectedSite.lat}, ${selectedSite.lon}] - ${selectedSite.site_name}`);
    } else if (isRealtime && siteMarkerRef) {
      // 실시간 모드에서는 사이트 마커 제거
      console.log('MapArea - 실시간 모드에서 사이트 마커 제거');
      siteMarkerRef.remove();
      setSiteMarkerRef(null);
    }
    
    // 데이터가 있는지 확인하고 없으면 경고
    if (isRealtime && (!normalizedMapData || 
        (Array.isArray(normalizedMapData) && normalizedMapData.length === 0) || 
        (typeof normalizedMapData === 'object' && Object.keys(normalizedMapData).length === 0))) {
      console.warn('MapArea - 실시간 데이터가 없습니다. 데이터를 확인해주세요.');
    }
  }, [mapData, isRealtime, isSiteMode, selectedSite]);
  
  // 컴포넌트 언마운트 시 마커 정리
  useEffect(() => {
    return () => {
      // 실시간 마커 제거
      realtimeMarkersRef.current.forEach(marker => {
        if (marker) marker.remove();
      });
      realtimeMarkersRef.current = [];
      
      // 사이트 마커 제거
      if (siteMarkerRef) {
        siteMarkerRef.remove();
      }
    };
  }, []);

  // 실시간/Site별 버튼 클릭 이벤트 핸들러
  const handleViewToggle = () => {
    const oldCategory = isRealtime ? 'realtime' : 'sites';
    const newCategory = !isRealtime ? 'realtime' : 'sites';
    
    console.log('[handleViewToggle] 상태 변경 전:', { 
      isSiteMode, 
      isRealtime, 
      oldCategory, 
      newCategory, 
      selectedSite: selectedSite?.site_id,
      mapDataType: mapData ? (Array.isArray(mapData) ? 'Array' : typeof mapData) : 'undefined'
    });
    
    // 새 상태로 미리 설정
    setIsRealtime(!isRealtime);
    
    // 실시간 모드로 전환할 때 모든 마커 제거
    if (!isRealtime && mapRef.current) {
      console.log('[handleViewToggle] 실시간 모드 전환 - 모든 마커 제거');
      // 모든 레이어 제거
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.Marker || layer instanceof L.CircleMarker) {
          layer.remove();
        }
      });
      // 사이트 마커 참조 초기화
      if (siteMarkerRef) {
        siteMarkerRef.remove();
        setSiteMarkerRef(null);
      }
      // 실시간 마커 참조 초기화
      realtimeMarkersRef.current.forEach(marker => {
        if (marker) marker.remove();
      });
      realtimeMarkersRef.current = [];
    }
    
    // 그룹 모드(isSiteMode=false)에서 실시간으로 전환하는 경우
    if (!isSiteMode && selectedSite && newCategory === 'realtime') {
      console.log('[handleViewToggle] 그룹 모드 -> 실시간 모드로 전환:', selectedSite.site_id);
      
      // 중요: handleSiteSelect가 먼저 호출되고 그 다음 handleCategoryChange가 호출되도록 순서 변경
      // 사이트 ID를 먼저 확정하여 쿼리 파라미터 갱신
      console.log('[handleViewToggle] 사이트 선택 전:', selectedSite.site_id);
      onSiteSelect(selectedSite.site_id);
      console.log('[handleViewToggle] 사이트 선택 후');
      
      // 카테고리 변경은 나중에 수행 (마지막 소켓 연결이 되도록)
      setTimeout(() => {
        console.log('[handleViewToggle] 카테고리 변경 전(지연 후):', newCategory);
        onCategoryChange(newCategory);
        console.log('[handleViewToggle] 카테고리 변경 후:', newCategory);
      }, 100);
      
      // 그룹 모드에서 실시간 모드로 전환할 때 지도 뷰 변경
      // 선택된 사이트를 중심으로 지도 재설정
      if (mapRef.current && selectedSite.lat && selectedSite.lon) {
        console.log('[handleViewToggle] 지도 뷰 변경:', [selectedSite.lat, selectedSite.lon]);
        const lngOffset = -0.015;  // 약 1km에 해당하는 경도 차이
        mapRef.current.setView([selectedSite.lat, selectedSite.lon - lngOffset], 12, {
          animate: true,
          duration: 1
        });
        
        // 지도 컨트롤 활성화
        enableMapControls(mapRef.current);
      }
    } else {
      console.log('[handleViewToggle] 일반 모드 전환:', newCategory);
      // 일반적인 경우 카테고리만 변경
      onCategoryChange(newCategory);
    }
    
    console.log('[handleViewToggle] 상태 변경 후:', { 
      isSiteMode, 
      isRealtime: !isRealtime, 
      newCategory
    });
  };

  // 그룹 리스트 컴포넌트
  const GroupList = ({ groups }: { groups: MapSiteData[] }) => {
    return (
      <div className="absolute bottom-0 right-1 z-10 bg-transparent w-[130px] h-[400px]">
        <div 
          className="space-y-1.5 overflow-y-auto py-1.5 h-full group-list flex flex-col-reverse"
          style={{ msOverflowStyle: 'none', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          <style>
            {`
              .group-list::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
          <div className="flex flex-row-reverse items-center justify-start">
            <div className="flex flex-col items-center justify-center bg-slate-700 rounded-full w-8 h-8 relative z-20">
              <div className="text-[10px] leading-none">
                <span className="text-[#3CB371]">4</span>
                <span className="text-white">/</span>
                <span className="text-white">23</span>
              </div>
            </div>
            <div className="bg-white/90 text-xs text-slate-600 px-2 py-1 rounded-full mr-[-12px] w-[100px] h-[24px] flex items-center relative z-10">
              <div className="truncate text-center w-full">
                미지정
              </div>
            </div>
          </div>
          {groups.map((group, index) => (
            <div 
              key={index} 
              className="flex flex-row-reverse items-center justify-start"
            >
              <div className="flex flex-col items-center justify-center bg-slate-700 rounded-full w-8 h-8 relative z-20">
                <div className="text-[10px] leading-none">
                  <span className="text-green-400">{group.online}</span>
                  <span className="text-white">/</span>
                  <span className="text-white">{group.whole}</span>
                </div>
              </div>
              <div className="bg-white/90 text-xs text-slate-600 px-2 py-1 rounded-full mr-[-12px] w-[100px] h-[24px] flex items-center relative z-10">
                <div className="truncate text-center w-full">
                  {group.group_name || '미지정'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={cn('relative w-full h-full')}>
      <div 
        id="map" 
        className="w-full h-full absolute inset-0"
        style={{
          zIndex: 1
        }}
      />
      
      <div 
        className="absolute top-0 left-0 right-0 z-10 flex flex-col px-4 pt-2 pb-2"
        style={{
          background: 'transparent'
        }}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-slate-800 text-lg font-medium">종합운영현황</h2>
          <div className="flex items-center gap-2">
            {!isSiteMode && !isRealtime && (
              <button 
                onClick={handleResetView}
                className="bg-slate-100 text-slate-600 px-3 py-1.5 text-sm rounded-md hover:bg-slate-200 transition-colors"
              >
                기본화면
              </button>
            )}
            <button 
              onClick={handleViewToggle}
              className="bg-blue-500 text-white px-3 py-1.5 text-sm rounded-md hover:bg-blue-600 transition-colors"
            >
              {isRealtime ? 'Site별' : '실시간'}
            </button>
          </div>
        </div>
      </div>

      {isSiteMode && !isRealtime && (
        <div className="absolute bottom-4 right-4 z-10 text-sm text-slate-500">※ 미지정 배터리 : <span className="text-[#3CB371]">4</span>/23</div>
      )}

      {/* 그룹 정보 표시 */}
      {!isSiteMode && !isRealtime && Array.isArray(mapData) && mapData.length > 0 && mapData[0].group_name && (
        <GroupList groups={mapData} />
      )}
    </div>
  );
};

export default MapArea;