import { TableColumn } from '@/types/table.type';
import Pagination from '../ui/Pagination';
import { useSearchParams } from 'react-router-dom';
import { cn } from '@/helpers/class-name.helper';
import { OverflowX } from '@/enums/table';
import { number } from 'echarts';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type TableDataProps<T> = {
  data: T[];
  columns: TableColumn<T>[];
  maxHeight?: string;
  minWidth?: string;
  selectedRow?: number;
  onSelectRow?: (rowIndex: number) => void;
  emptyMessage?: string;
  isPagination?: boolean;
  overflowX?: OverflowX;
  pagination?: { total: number; pageSize: number };
  paginationMarginTop?: string;
  onSelectPage?: (rowPage: number) => void;
  pageNumber?: number;
};

export default function TableDataPopup<T extends { id: number }>({
  data = [],
  columns = [],
  maxHeight = '100%',
  minWidth = '100%',
  overflowX = OverflowX.SCROLL,
  onSelectRow,
  selectedRow,
  emptyMessage,
  isPagination = false,
  pagination = { total: 0, pageSize: 20 },
  paginationMarginTop,
  onSelectPage,
  pageNumber = 0,
}: TableDataProps<T>) {
  const [searchParams, setSearchParams] = useSearchParams();
  // const [pageNumberA, setPageNumberA] = useState<number>;
  const [pageNumberA, setPageNumberA] = useState<number>(0);
  const { t: trans } = useTranslation('translation');
  
  const isSelected = (rowIndex: number) => {
    return rowIndex === selectedRow;
  };

  // data 배열이 변경될 때마다 실행됩니다.
  useEffect(() => {
    setPageNumberA(0); // 첫 번째 페이지로 초기화
    if (onSelectPage) {
      onSelectPage(1); // onSelectPage가 정의되어 있다면, 첫 페이지가 선택되었음을 알림
    }
  }, [data, onSelectPage]);

  const onClickRow = (rowIndex: number) => {
    if (onSelectRow) {
      onSelectRow(rowIndex);
    }
  };

  const onPageChange = (value: number) => {
    // searchParams.set('page', value.toString());
    // setSearchParams(searchParams);

    // pageNumber = value-1;
    setPageNumberA(value-1);
    if (onSelectPage) {
      onSelectPage(value);
    }    
  };

  return (
    <div className='add-user__modal'>
      <div
        style={{ overflowX }}
        className='relative w-full h-full bg-hw-dark-2 overflow-x-scroll rounded-none xs:rounded-lg'>
        <table
          className='w-full text-base font-light text-hw-white-1 bg-hw-dark-2 rounded-none xs:rounded-lg whitespace-nowrap table-auto'
          style={{ maxHeight, minWidth }}>
          <thead className='text-hw-white-2 border-b border-hw-gray-7 font-light'>
            <tr>
              {columns.map((item: TableColumn<T>) => (
                <td
                  className='py-[18px] leading-[125%] max-xs:!px-[18px]'
                  key={item.dataIndex}
                  style={
                    item.width
                      ? {
                          width: item.width,
                          paddingInline: item.paddingInline,
                          textAlign: item.align as 'left' | 'center' | 'right'
                        }
                      : { 
                          paddingInline: item.paddingInline, 
                          textAlign: item.align as 'left' | 'center' | 'right' 
                        }
                  }>
                  {trans(item.name)}
                </td>
              ))}
            </tr>
          </thead>
          {data.length === 0 && emptyMessage ? (
            <div className='absolute top-0 w-full flex justify-center items-center h-full'>
              <span className='text-hw-white-2 text-base font-light leading-[125%] w-full h-fit text-center'>
                {emptyMessage}
              </span>
            </div>
          ) : (
            <tbody className='h-calc(100%-48px)]'>
              {}
              {data.map((row: any, index: number) => {
                var tNum = 0;
                if( pageNumber ) {
                  tNum = pageNumber;
                } else {
                  tNum = pageNumberA;
                }
                if( (tNum * pagination.pageSize) <= index
                    && (tNum * pagination.pageSize) + pagination.pageSize > index ) {
                    const isRowSelected = isSelected(row.id);
                    return (
                      <tr
                        onClick={() => onClickRow(index)}
                        key={row.id}
                        className={cn(
                          isRowSelected &&
                            'border-2 bg-gradient-to-t from-[rgba(0,0,0,0.30)] 0% to-[rgba(0,0,0,0.30)] 100% bg-[#363E4B] border-[#7082A0]',
                          onSelectRow && 'cursor-pointer hover:bg-hw-gray-9',
                          'transition-colors odd:bg-[#363E4B]',
                        )}>
                        {columns.map((item: TableColumn<T>) => (
                          <td
                            key={item.dataIndex}
                            style={{
                              textAlign: item.align,
                              paddingInline: item.paddingInline,
                            }}
                            className={cn('max-xs:!px-[18px]', !item.noPaddingBlock && 'py-[14px]', 'leading-[125%]')}>
                            {item.render ? item.render(row, item.dataIndex) : row[item.dataIndex as string] || ''}
                          </td>
                        ))}
                      </tr>
                    );                    
                  }
                }
            )}
            </tbody>
          )}
        </table>
      </div>
      {isPagination && data.length > 0 && (
        <Pagination
          itemsPerPage={pagination.pageSize}
          totalItems={pagination.total}
          onPageChange={onPageChange}
          marginTop={paginationMarginTop}
        />
      )}
    </div>
  );
}
