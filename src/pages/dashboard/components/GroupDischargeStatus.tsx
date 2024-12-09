import React from 'react';
import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

interface GroupDischargeStatusProps {
  onSwitchView: () => void;
}

const GroupDischargeStatus: React.FC<GroupDischargeStatusProps> = ({ onSwitchView }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    const option = {
      grid: {
        top: 30,
        left: 60,
        right: 40,
        bottom: 40
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
          lineStyle: {
            color: '#555'
          }
        },
        axisLabel: {
          color: '#fff'
        },
        splitLine: {
          lineStyle: {
            color: '#333'
          }
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
          data: [840, 554, 546, 278, 277, 280],
          itemStyle: {
            color: '#86EFAC'
          },
          barWidth: '30%'
        }
      ]
    };

    chart.setOption(option);

    // 비율 텍스트 추가
    const ratios = ['72%', '63%', '93%', '47%', '94%', '96%'];
    const canvas = chartRef.current;
    const ctx = document.createElement('div');
    ctx.style.position = 'absolute';
    ctx.style.top = '30px';
    ctx.style.left = '0';
    ctx.style.width = '100%';
    ctx.style.pointerEvents = 'none';
    ctx.style.textAlign = 'center';
    
    ratios.forEach((ratio, index) => {
      const ratioText = document.createElement('div');
      ratioText.style.position = 'absolute';
      ratioText.style.left = `${(100/7) * (index + 1)}%`;
      ratioText.style.transform = 'translateX(-50%)';
      ratioText.style.color = '#86EFAC';
      ratioText.textContent = ratio;
      ctx.appendChild(ratioText);
    });
    
    canvas.appendChild(ctx);

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
    <div className="h-full bg-slate-800 p-4 rounded-lg border border-white">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-white text-lg cursor-pointer hover:text-blue-400 border-b border-white inline-block">
          그룹별 실시간 방전량
        </h3>
        <button 
          className="bg-blue-700 text-white px-4 py-1 rounded"
          onClick={onSwitchView}
        >
          운영현황
        </button>
      </div>
      <div 
        ref={chartRef} 
        className="w-full h-[calc(100%-2.5rem)]"
      />
    </div>
  );
};

export default GroupDischargeStatus; 