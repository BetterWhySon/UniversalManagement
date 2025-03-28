import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/helpers/class-name.helper';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapArea = () => {
  const [isDetailMap, setIsDetailMap] = useState(false);
  const [isRealtime, setIsRealtime] = useState(false);
  const mapRef = useRef<L.Map | null>(null);  // 맵 인스턴스를 저장할 ref
  const [selectedLocation, setSelectedLocation] = useState<typeof locationData[0] | null>(null);

  // 상수 정의
  const DEFAULT_ZOOM_LEVEL = 6.9;

  // 배터리 상태 타입 정의
  type BatteryState = 'standby' | 'discharging' | 'charging' | 'offline';

  // 상태별 색상 매핑
  const stateColors: Record<BatteryState, string> = {
    standby: '#FFD03B',      // 사용대기
    discharging: '#6CFF31',  // 방전 중
    charging: '#5E52FC',     // 충전 중
    offline: '#A1A1A1'       // 오프라인
  };

  // 그룹의 중심 좌표를 기준으로 배터리 좌표를 생성하는 함수
  const generateBatteryCoordinates = (centerLat: number, centerLng: number, count: number) => {
    const states: BatteryState[] = ['standby', 'discharging', 'charging', 'offline'];
    return Array(count).fill(null).map((_, index) => {
      const lat = centerLat + (Math.random() - 0.5) * 0.02;  // ±0.01 범위
      const lng = centerLng + (Math.random() - 0.5) * 0.02;  // ±0.01 범위
      const state = states[Math.floor(Math.random() * states.length)];  // 랜덤 상태 할당
      return { lat, lng, state };
    });
  };

  // 지점 > 그룹 > 배터리 3단계 데이터 구조
  const locationData = [
    {
      id: 'seoul',
      name: '서울지점',
      lat: 37.5665,
      lng: 126.9780,
      total: 20,
      active: 15,
      groups: [
        {
          id: 'seoul-ff',
          name: 'FF캠핑카',
          lat: 37.5832,
          lng: 126.9905,
          total: 10,
          active: 8,
          batteries: generateBatteryCoordinates(37.5832, 126.9905, 10).map((coord, i) => ({
            id: `ff-${String(i + 1).padStart(3, '0')}`,
            name: `BAT-${String(i + 1).padStart(3, '0')}`,
            lat: coord.lat,
            lng: coord.lng,
            state: coord.state
          }))
        },
        {
          id: 'seoul-bayrun',
          name: '베이런전동바이크',
          lat: 37.5551,
          lng: 126.9684,
          total: 10,
          active: 7,
          batteries: generateBatteryCoordinates(37.5551, 126.9684, 10).map((coord, i) => ({
            id: `bayrun-${String(i + 1).padStart(3, '0')}`,
            name: `BAT-${String(i + 101).padStart(3, '0')}`,
            lat: coord.lat,
            lng: coord.lng,
            state: coord.state
          }))
        }
      ]
    },
    {
      id: 'busan',
      name: '부산지점',
      lat: 35.1796,
      lng: 129.0756,
      total: 20,
      active: 15,
      groups: [
        {
          id: 'busan-camping',
          name: '캠핑존',
          lat: 35.1683,
          lng: 129.0573,
          total: 10,
          active: 8,
          batteries: generateBatteryCoordinates(35.1683, 129.0573, 10).map((coord, i) => ({
            id: `camp-${String(i + 1).padStart(3, '0')}`,
            name: `BAT-${String(i + 1).padStart(3, '0')}`,
            lat: coord.lat,
            lng: coord.lng,
            state: coord.state
          }))
        },
        {
          id: 'busan-drone',
          name: '드론파크',
          lat: 35.1634,
          lng: 129.0867,
          total: 10,
          active: 7,
          batteries: generateBatteryCoordinates(35.1634, 129.0867, 10).map((coord, i) => ({
            id: `drone-${String(i + 1).padStart(3, '0')}`,
            name: `BAT-${String(i + 1).padStart(3, '0')}`,
            lat: coord.lat,
            lng: coord.lng,
            state: coord.state
          }))
        }
      ]
    },
    {
      id: 'daegu',
      name: '대구지점',
      lat: 35.8714,
      lng: 128.6014,
      total: 120,
      active: 96,
      groups: [
        {
          id: 'daegu-outdoor',
          name: '아웃도어파크',
          lat: 35.8867,
          lng: 128.5789,
          total: 10,
          active: 8,
          batteries: generateBatteryCoordinates(35.8867, 128.5789, 10).map((coord, i) => ({
            id: `outdoor-${String(i + 1).padStart(3, '0')}`,
            name: `BAT-${String(i + 1).padStart(3, '0')}`,
            lat: coord.lat,
            lng: coord.lng,
            state: coord.state
          }))
        },
        {
          id: 'daegu-bike',
          name: '대구전동바이크',
          lat: 35.8589,
          lng: 128.6234,
          total: 10,
          active: 8,
          batteries: generateBatteryCoordinates(35.8589, 128.6234, 10).map((coord, i) => ({
            id: `bike-${String(i + 1).padStart(3, '0')}`,
            name: `BAT-${String(i + 1).padStart(3, '0')}`,
            lat: coord.lat,
            lng: coord.lng,
            state: coord.state
          }))
        },
        {
          id: 'daegu-camp1',
          name: '캠핑존원',
          lat: 35.8950,
          lng: 128.6150,
          total: 10,
          active: 8,
          batteries: generateBatteryCoordinates(35.8950, 128.6150, 10).map((coord, i) => ({
            id: `camp1-${String(i + 1).padStart(3, '0')}`,
            name: `BAT-${String(i + 1).padStart(3, '0')}`,
            lat: coord.lat,
            lng: coord.lng,
            state: coord.state
          }))
        },
        {
          id: 'daegu-camp2',
          name: '캠핑존투',
          lat: 35.8460,
          lng: 128.5850,
          total: 10,
          active: 8,
          batteries: generateBatteryCoordinates(35.8460, 128.5850, 10).map((coord, i) => ({
            id: `camp2-${String(i + 1).padStart(3, '0')}`,
            name: `BAT-${String(i + 1).padStart(3, '0')}`,
            lat: coord.lat,
            lng: coord.lng,
            state: coord.state
          }))
        },
        {
          id: 'daegu-drone1',
          name: '드론파크원',
          lat: 35.8970,
          lng: 128.5970,
          total: 10,
          active: 8,
          batteries: generateBatteryCoordinates(35.8970, 128.5970, 10).map((coord, i) => ({
            id: `drone1-${String(i + 1).padStart(3, '0')}`,
            name: `BAT-${String(i + 1).padStart(3, '0')}`,
            lat: coord.lat,
            lng: coord.lng,
            state: coord.state
          }))
        },
        {
          id: 'daegu-drone2',
          name: '드론파크투',
          lat: 35.8380,
          lng: 128.6180,
          total: 10,
          active: 8,
          batteries: generateBatteryCoordinates(35.8380, 128.6180, 10).map((coord, i) => ({
            id: `drone2-${String(i + 1).padStart(3, '0')}`,
            name: `BAT-${String(i + 1).padStart(3, '0')}`,
            lat: coord.lat,
            lng: coord.lng,
            state: coord.state
          }))
        },
        {
          id: 'daegu-leisure1',
          name: '레저파크원',
          lat: 35.8890,
          lng: 128.5790,
          total: 10,
          active: 8,
          batteries: generateBatteryCoordinates(35.8890, 128.5790, 10).map((coord, i) => ({
            id: `leisure1-${String(i + 1).padStart(3, '0')}`,
            name: `BAT-${String(i + 1).padStart(3, '0')}`,
            lat: coord.lat,
            lng: coord.lng,
            state: coord.state
          }))
        },
        {
          id: 'daegu-leisure2',
          name: '레저파크투',
          lat: 35.8500,
          lng: 128.6300,
          total: 10,
          active: 8,
          batteries: generateBatteryCoordinates(35.8500, 128.6300, 10).map((coord, i) => ({
            id: `leisure2-${String(i + 1).padStart(3, '0')}`,
            name: `BAT-${String(i + 1).padStart(3, '0')}`,
            lat: coord.lat,
            lng: coord.lng,
            state: coord.state
          }))
        },
        {
          id: 'daegu-sports1',
          name: '스포츠원',
          lat: 35.8810,
          lng: 128.5910,
          total: 10,
          active: 8,
          batteries: generateBatteryCoordinates(35.8810, 128.5910, 10).map((coord, i) => ({
            id: `sports1-${String(i + 1).padStart(3, '0')}`,
            name: `BAT-${String(i + 1).padStart(3, '0')}`,
            lat: coord.lat,
            lng: coord.lng,
            state: coord.state
          }))
        },
        {
          id: 'daegu-sports2',
          name: '스포츠투',
          lat: 35.8620,
          lng: 128.6120,
          total: 10,
          active: 8,
          batteries: generateBatteryCoordinates(35.8620, 128.6120, 10).map((coord, i) => ({
            id: `sports2-${String(i + 1).padStart(3, '0')}`,
            name: `BAT-${String(i + 1).padStart(3, '0')}`,
            lat: coord.lat,
            lng: coord.lng,
            state: coord.state
          }))
        },
        {
          id: 'daegu-adventure1',
          name: '어드벤처원',
          lat: 35.8930,
          lng: 128.6030,
          total: 10,
          active: 8,
          batteries: generateBatteryCoordinates(35.8930, 128.6030, 10).map((coord, i) => ({
            id: `adventure1-${String(i + 1).padStart(3, '0')}`,
            name: `BAT-${String(i + 1).padStart(3, '0')}`,
            lat: coord.lat,
            lng: coord.lng,
            state: coord.state
          }))
        },
        {
          id: 'daegu-adventure2',
          name: '어드벤처투',
          lat: 35.8540,
          lng: 128.5840,
          total: 10,
          active: 8,
          batteries: generateBatteryCoordinates(35.8540, 128.5840, 10).map((coord, i) => ({
            id: `adventure2-${String(i + 1).padStart(3, '0')}`,
            name: `BAT-${String(i + 1).padStart(3, '0')}`,
            lat: coord.lat,
            lng: coord.lng,
            state: coord.state
          }))
        }
      ]
    },
    {
      id: 'gwangju',
      name: '광주지점',
      lat: 35.1595,
      lng: 126.8526,
      total: 40,
      active: 32,
      groups: [
        {
          id: 'gwangju-outdoor',
          name: '아웃도어파크',
          lat: 35.1683,
          lng: 126.8473,
          total: 10,
          active: 8,
          batteries: generateBatteryCoordinates(35.1683, 126.8473, 10).map((coord, i) => ({
            id: `gwangju-out-${String(i + 1).padStart(3, '0')}`,
            name: `BAT-${String(i + 1).padStart(3, '0')}`,
            lat: coord.lat,
            lng: coord.lng,
            state: coord.state
          }))
        },
        {
          id: 'gwangju-bike',
          name: '전동바이크',
          lat: 35.1534,
          lng: 126.8867,
          total: 10,
          active: 8,
          batteries: generateBatteryCoordinates(35.1534, 126.8867, 10).map((coord, i) => ({
            id: `gwangju-bike-${String(i + 1).padStart(3, '0')}`,
            name: `BAT-${String(i + 1).padStart(3, '0')}`,
            lat: coord.lat,
            lng: coord.lng,
            state: coord.state
          }))
        }
      ]
    },
    {
      id: 'incheon',
      name: '인천지점',
      lat: 37.4563,
      lng: 126.7052,
      total: 30,
      active: 24,
      groups: [
        {
          id: 'incheon-marine',
          name: '마린스포츠',
          lat: 37.4463,
          lng: 126.7152,
          total: 10,
          active: 8,
          batteries: generateBatteryCoordinates(37.4463, 126.7152, 10).map((coord, i) => ({
            id: `incheon-mar-${String(i + 1).padStart(3, '0')}`,
            name: `BAT-${String(i + 1).padStart(3, '0')}`,
            lat: coord.lat,
            lng: coord.lng,
            state: coord.state
          }))
        },
        {
          id: 'incheon-drone',
          name: '드론파크',
          lat: 37.4663,
          lng: 126.6952,
          total: 10,
          active: 8,
          batteries: generateBatteryCoordinates(37.4663, 126.6952, 10).map((coord, i) => ({
            id: `incheon-drone-${String(i + 1).padStart(3, '0')}`,
            name: `BAT-${String(i + 1).padStart(3, '0')}`,
            lat: coord.lat,
            lng: coord.lng,
            state: coord.state
          }))
        }
      ]
    }
  ];

  // 실시간 마커 데이터 생성
  const realtimeMarkers = locationData.flatMap(location => 
    location.groups.flatMap(group => 
      group.batteries.map(battery => ({
        lat: battery.lat,
        lng: battery.lng,
        id: battery.id,
        name: battery.name,
        state: battery.state as BatteryState,
        info: {
          company: location.name,
          group: group.name,
          deviceId: battery.name,
          application: '배터리',
          packId: battery.id,
          packModel: '기본 모델',
          user: '관리자',
          contact: '010-1234-5678'
        }
      }))
    )
  );

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

  // 마커 클릭 이벤트
  const handleMarkerClick = (marker: typeof locationData[0]) => {
    if (!mapRef.current) return;

    setIsDetailMap(true);
    setSelectedLocation(marker);

    // 지도 뷰 변경 - 서쪽으로 1km 이동
    const lngOffset = -0.015;  // 약 1km에 해당하는 경도 차이
    mapRef.current.setView([marker.lat, marker.lng - lngOffset], 12, {
      animate: true,
      duration: 1
    });
    
    enableMapControls(mapRef.current);

    // 기존 마커 제거
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.CircleMarker) {
        layer.remove();
      }
    });

    // 클릭한 사업장 마커만 다시 표시
    const markerIcon = L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          width: 24px; 
          height: 24px; 
          background-color: #F59E0B; 
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
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 24]
    });

    L.marker([marker.lat, marker.lng], { icon: markerIcon })
      .bindTooltip(`${marker.name} (${marker.active}/${marker.total})`, {
        permanent: true,
        direction: 'top',
        offset: [0, -20],
        className: 'custom-tooltip'
      })
      .addTo(mapRef.current);
  };

  // 기본 화면으로 돌아가는 함수
  const handleResetView = () => {
    if (!mapRef.current) return;

    mapRef.current.setView([35.9000, 127.7498], DEFAULT_ZOOM_LEVEL);
    setIsDetailMap(false);
    setSelectedLocation(null);

    // 기존 마커 모두 제거
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.CircleMarker) {
        layer.remove();
      }
    });

    if (isRealtime) {  // 실시간 모드일 경우
      // 실시간 마커 표시
      realtimeMarkers.forEach(marker => {
        L.circleMarker([marker.lat, marker.lng], {
          radius: 4,
          fillColor: stateColors[marker.state],
          color: '#fff',
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        })
        .bindTooltip(`
          <div class="bg-hw-dark-1 text-white p-4 rounded shadow-lg">
            <div>• 사업장 : ${marker.info.company}</div>
            <div>• 그룹 : ${marker.info.group}</div>
            <div>• 기기명 : ${marker.info.deviceId}</div>
            <div>• 어플리케이션 : ${marker.info.application}</div>
            <div>• 팩ID : ${marker.info.packId}</div>
            <div>• 팩모델 : ${marker.info.packModel}</div>
            <div>• 사용자 : ${marker.info.user}</div>
            <div>• 연락처 : ${marker.info.contact}</div>
          </div>
        `, {
          permanent: false,
          direction: 'top',
          offset: [0, -5],
          className: 'custom-tooltip',
          interactive: true
        })
        .addTo(mapRef.current!);
      });
    } else {  // 사이트별 모드일 경우
      // 지점 마커 표시
      const markerIcon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            width: 24px; 
            height: 24px; 
            background-color: #F59E0B; 
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
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 24]
      });

      locationData.forEach(location => {
        const markerInstance = L.marker([location.lat, location.lng], { icon: markerIcon })
          .bindTooltip(`${location.name} (${location.active}/${location.total})`, {
            permanent: true,
            direction: 'top',
            offset: [0, -20],
            className: 'custom-tooltip'
          })
          .addTo(mapRef.current!);

        markerInstance.on('click', () => handleMarkerClick(location));
      });
    }
  };

  // 실시간/Site별 버튼 클릭 이벤트 핸들러 수정
  const handleViewToggle = () => {
    if (!mapRef.current) return;

    // 기존 마커 모두 제거
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.CircleMarker) {
        layer.remove();
      }
    });

    if (!isRealtime) {  // Site별 -> 실시간 전환
      setIsRealtime(true);
      // 실시간 마커 표시
      realtimeMarkers.forEach(marker => {
        L.circleMarker([marker.lat, marker.lng], {
          radius: 4,
          fillColor: stateColors[marker.state],
          color: '#fff',
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        })
        .bindTooltip(`
          <div class="bg-hw-dark-1 text-white p-4 rounded shadow-lg">
            <div>• 사업장 : ${marker.info.company}</div>
            <div>• 그룹 : ${marker.info.group}</div>
            <div>• 기기명 : ${marker.info.deviceId}</div>
            <div>• 어플리케이션 : ${marker.info.application}</div>
            <div>• 팩ID : ${marker.info.packId}</div>
            <div>• 팩모델 : ${marker.info.packModel}</div>
            <div>• 사용자 : ${marker.info.user}</div>
            <div>• 연락처 : ${marker.info.contact}</div>
          </div>
        `, {
          permanent: false,
          direction: 'top',
          offset: [0, -5],
          className: 'custom-tooltip',
          interactive: true
        })
        .addTo(mapRef.current!);
      });
    } else {  // 실시간 -> Site별 전환
      setIsRealtime(false);
      if (isDetailMap && selectedLocation) {  // 그룹 화면일 경우
        // 선택된 지점 마커 표시
        const markerIcon = L.divIcon({
          className: 'custom-marker',
          html: `
            <div style="
              width: 24px; 
              height: 24px; 
              background-color: #F59E0B; 
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
          `,
          iconSize: [24, 24],
          iconAnchor: [12, 24]
        });

        L.marker([selectedLocation.lat, selectedLocation.lng], { icon: markerIcon })
          .bindTooltip(`${selectedLocation.name} (${selectedLocation.active}/${selectedLocation.total})`, {
            permanent: true,
            direction: 'top',
            offset: [0, -20],
            className: 'custom-tooltip'
          })
          .addTo(mapRef.current);
      } else {  // 전체 화면일 경우
        // 지점 마커 표시
        const markerIcon = L.divIcon({
          className: 'custom-marker',
          html: `
            <div style="
              width: 24px; 
              height: 24px; 
              background-color: #F59E0B; 
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
          `,
          iconSize: [24, 24],
          iconAnchor: [12, 24]
        });

        locationData.forEach(location => {
          const markerInstance = L.marker([location.lat, location.lng], { icon: markerIcon })
            .bindTooltip(`${location.name} (${location.active}/${location.total})`, {
              permanent: true,
              direction: 'top',
              offset: [0, -20],
              className: 'custom-tooltip'
            })
            .addTo(mapRef.current!);

          markerInstance.on('click', () => handleMarkerClick(location));
        });
      }
    }
  };

  // 그룹 리스트 컴포넌트 수정
  const GroupList = ({ groups }: { groups: typeof locationData[0]['groups'] }) => {
    return (
      <div className="absolute bottom-0 right-1 z-10 bg-transparent w-[130px] h-[400px]">
        <div 
          className="space-y-1.5 overflow-y-auto py-1.5 h-full"
          style={{ msOverflowStyle: 'none', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          <style>
            {`
              .group-list::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
          {groups.map(group => (
            <div 
              key={group.id} 
              className="flex flex-row-reverse items-center justify-start"
            >
              <div className="flex flex-col items-center justify-center bg-slate-700 rounded-full w-8 h-8 relative z-20">
                <div className="text-[10px] leading-none">
                  <span className="text-green-400">{group.active}</span>
                  <span className="text-white">/</span>
                  <span className="text-white">{group.total}</span>
                </div>
              </div>
              <div className="bg-white/90 text-xs text-slate-600 px-2 py-1 rounded-full mr-[-12px] w-[100px] h-[24px] flex items-center relative z-10">
                <div className="truncate text-center w-full">
                  {group.name}
                </div>
              </div>
            </div>
          ))}
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
        </div>
      </div>
    );
  };

  useEffect(() => {
    // 최초 지도 생성
    const baseMap = L.map('map', {
      attributionControl: false,
      zoomControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: false,
      zoomSnap: 0.1,  // zoom level을 0.1 단위로 조절 가능하도록 설정
      zoomDelta: 0.1  // zoom 변경 시 0.1 단위로 변경되도록 설정
    }).setView([35.9000, 127.7498], DEFAULT_ZOOM_LEVEL);  // 상수 사용

    mapRef.current = baseMap;

    // CartoDB Voyager 타일 레이어로 변경 (라벨 없는 버전)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
      attribution: '',
      maxZoom: 19,
      opacity: 0.8,
      subdomains: 'abcd'
    }).addTo(baseMap);

    // 지점 마커 표시
    const markerIcon = L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          width: 24px; 
          height: 24px; 
          background-color: #F59E0B; 
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
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 24]
    });

    locationData.forEach(location => {
      const markerInstance = L.marker([location.lat, location.lng], { icon: markerIcon })
        .bindTooltip(`${location.name} (${location.active}/${location.total})`, {
          permanent: true,
          direction: 'top',
          offset: [0, -20],
          className: 'custom-tooltip'
        })
        .addTo(baseMap);

      markerInstance.on('click', () => handleMarkerClick(location));
    });

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
      baseMap.remove();
      mapRef.current = null;
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className={cn('relative w-full h-full')}>
      <div 
        id="map" 
        className="w-full h-full"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
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
            {isDetailMap && (
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

      <div className="absolute bottom-4 right-4 z-10 text-sm text-slate-500">※ 미지정 배터리 : <span className="text-[#3CB371]">4</span>/23</div>

      {isDetailMap && !isRealtime && selectedLocation && (
        <GroupList groups={selectedLocation.groups} />
      )}
    </div>
  );
};

export default MapArea;