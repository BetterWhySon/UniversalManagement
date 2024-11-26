import { Dot } from '@/components/icons';
import { cn } from '@/helpers/class-name.helper';

const captions = [
  {
    id: 1,
    color: 'yellow-4',
    text: '사이트1',
  },
  {
    id: 2,
    color: 'green-4',
    text: '사이트2',
  },
  {
    id: 3,
    color: 'green-3',
    text: '사이트3',
  },
  {
    id: 4,
    color: 'pink-1',
    text: '사이트4',
  },
  {
    id: 5,
    color: 'purple-1',
    text: '사이트5',
  },
  {
    id: 6,
    color: 'blue-2',
    text: '사이트6',
  },
];
export default function DashboardCaptionResponsive() {
  return (
    <div className={cn('w-[253px] mt-8 grid sm:hidden grid-cols-3 gap-x-8 gap-y-3 transition-all')}>
      {captions.map((item) => {
        return (
          <span key={item.id} className='flex items-center gap-[10px] font-light leading-none text-xs text-hw-white-2'>
            <Dot color={item.color} /> {item.text}
          </span>
        );
      })}
    </div>
  );
}
