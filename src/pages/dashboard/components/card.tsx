import { cn } from '@/helpers/class-name.helper';

interface CardInformationSectionProps {
  overflow?: string;
  margin?: string;
  padding?: string;
  showTooltip?: boolean;
}

export default function CardInformationSection({ 
  overflow = 'auto',
  margin = '0 56px 0 63px',
  padding = '0 26px',
  showTooltip = true 
}: CardInformationSectionProps) {
  return (
    <div 
      className={cn(
        'flex flex-col gap-5',
        `overflow-${overflow}`,
        'min-w-[324px] w-[324px]'
      )}
      style={{ margin, padding }}
    >
      {/* Card content will be added here */}
    </div>
  );
} 