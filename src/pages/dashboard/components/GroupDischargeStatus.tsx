import React from 'react';
import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface GroupDischargeStatusProps {
  onSwitchView: () => void;
}

const GroupDischargeStatus: React.FC<GroupDischargeStatusProps> = ({ onSwitchView }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    const option = {
      backgroundColor: 'transparent',
      grid: {
        top: 30,
        left: 40,
        right: 40,
        bottom: 30,
        height: '70%'
      },
      xAxis: {
        type: 'category',
        data: ['그룹1', '그룹2', '그룹3', '그룹4', '그룹5', '그룹6'],
        axisLine: {
          lineStyle: {
            color: '#555'
          }
        },
        axisLabel: {
          color: '#fff'
        }
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        }
      },
      series: [
        {
          type: 'bar',
          data: [1173, 879, 586, 586, 293, 293],
          itemStyle: {
            color: '#94A3B8'
          },
          barWidth: '30%',
          barGap: '10%'
        },
        {
          type: 'bar',
          data: [1173, 879, 586, 586, 293, 293],  // 첫 번째 series와 동일한 데이터
          barWidth: 0,  // 막대를 보이지 않게 함
          itemStyle: {
            color: 'transparent'
          },
          label: {
            show: true,
            position: 'top',
            distance: 10,
            formatter: (params: any) => {
              const ratios = ['72%', '63%', '93%', '47%', '94%', '96%'];
              return ratios[params.dataIndex];
            },
            color: '#86EFAC',
            fontSize: 14,
            fontWeight: 500
          }
        },
        {
          type: 'bar',
          data: [840, 554, 546, 278, 277, 280],
          itemStyle: {
            color: '#86EFAC'
          },
          barWidth: '30%'
        }
      ]
    };

    chart.setOption(option);

    const handleResize = () => {
      chart.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      chart.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="bg-[#2B313B] p-2 rounded-lg h-full flex flex-col relative">
      <div className="flex justify-between items-center mb-2">
        <h3 
          className="text-white text-lg cursor-pointer hover:text-blue-400 border-b border-white/20 inline-block"
          onClick={() => navigate('/realtime/operation-status')}
        >
          그룹별 실시간 방전량
        </h3>
        <button 
          className="bg-blue-700 text-white px-4 py-1 rounded hover:bg-blue-600"
          onClick={onSwitchView}
        >
          운영현황
        </button>
      </div>
      <div 
        ref={chartRef} 
        className="flex-grow"
      />
    </div>
  );
};

export default GroupDischargeStatus; 