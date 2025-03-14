import { TableColumn } from '@/types/table.type';
import Pagination from '../ui/Pagination';
import { useSearchParams } from 'react-router-dom';
import { cn } from '@/helpers/class-name.helper';
import { OverflowX } from '@/enums/table';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
// import { classNames } from '@/helpers/class-name.helper';
import { TEXT_ALIGN } from '@/enums/table';

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
    className?: string; // 새로 추가된 className 속성
    style?: React.CSSProperties;
    onCellContextMenu?: (e: React.MouseEvent, columnIndex: number) => void;
    selectedRows?: string[];
    onClick?: (row: T) => void;
    tableLayout?: 'auto' | 'fixed';
};

function formatMultiLineString(str: any) {
    return str.replace(/\n/g, '<br>');
}

export default function TableData<T extends { id: number }>({
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
    className, // 새로 추가된 className prop
    style,
    onCellContextMenu,
    selectedRows = [],
    onClick,
    tableLayout,
}: TableDataProps<T>) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [pageNumberA, setPageNumberA] = useState<number>(pageNumber);
    const { t: trans } = useTranslation('translation');

    const isSelected = (rowIndex: number) => {
        return rowIndex === selectedRow;
    };

    const onClickRow = (rowIndex: number) => {
        if (onSelectRow) {
            onSelectRow(rowIndex);
        }
    };

    const onPageChange = (value: number) => {
        setPageNumberA(value - 1);
        if (onSelectPage) {
            onSelectPage(value);
        }
    };

    useEffect(() => {
        // setPageNumberA(1);
    }, [data])

    return (
        <div className={cn('w-full h-full', className)}>
            <div
                style={{ overflowX }}
                className='relative w-full h-full bg-hw-dark-2 overflow-x-scroll rounded-none xs:rounded-lg'>
                <table
                    className={cn('w-full text-base font-light text-hw-white-1 bg-hw-dark-2 rounded-none xs:rounded-lg whitespace-nowrap table-auto', className)}
                    style={{ maxHeight, minWidth }}>
                    <thead className='text-hw-white-2 border-b border-hw-gray-7 font-light'>
                        <tr>
                            {columns.map((item: TableColumn<T>) => (
                                <th
                                    key={item.dataIndex}
                                    className={cn(
                                        'py-[18px] leading-[125%] max-xs:!px-[18px]',
                                        item.fixed === 'right' && 'sticky right-0 z-10',
                                        item.align === TEXT_ALIGN.CENTER && 'text-center',
                                        item.align === TEXT_ALIGN.RIGHT && 'text-right'
                                    )}
                                    style={{
                                        ...item.style,
                                        width: item.fixedWidth || item.width,
                                        padding: item.noPaddingBlock ? `0 ${item.paddingInline || '12px'}` : `12px ${item.paddingInline || '12px'}`
                                    }}>
                                    {item.title || trans(item.name)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className='h-calc(100%-48px)]'>
                        {data.length === 0 && emptyMessage ? (
                            <tr>
                                <td colSpan={columns.length} className="text-center py-8">
                                    <span className='text-hw-white-2 text-base font-light leading-[125%]'>
                                        {emptyMessage}
                                    </span>
                                </td>
                            </tr>
                        ) : (
                            data.map((row: any, index: number) => {
                                var tNum = 0;
                                if (pageNumber) {
                                    tNum = pageNumber;
                                } else {
                                    tNum = pageNumberA;
                                }
                                if ((tNum * pagination.pageSize) <= index
                                    && (tNum * pagination.pageSize) + pagination.pageSize > index) {
                                    const isRowSelected = isSelected(row.id);
                                    return (
                                        <tr
                                            key={row.id}
                                            onClick={() => {
                                                onClickRow(index);
                                                onClick?.(row);
                                            }}
                                            className={cn(
                                                isRowSelected &&
                                                'border-2 bg-gradient-to-t from-[rgba(0,0,0,0.30)] 0% to-[rgba(0,0,0,0.30)] 100% bg-[#363E4B] border-[#7082A0]',
                                                onClick && 'cursor-pointer hover:bg-hw-gray-9',
                                                'transition-colors odd:bg-[#363E4B]',
                                                selectedRows.includes(String(row.id)) && 'bg-hw-dark-1'
                                            )}>
                                            {columns.map((item: TableColumn<T>, columnIndex: number) => {
                                                const value = item.render 
                                                    ? item.render(row, item.dataIndex) 
                                                    : (row[item.dataIndex as keyof T] ?? '-');

                                                return (
                                                    <td
                                                        key={item.dataIndex}
                                                        style={{
                                                            ...item.style,
                                                            width: item.fixedWidth || item.width,
                                                            padding: item.noPaddingBlock ? `0 ${item.paddingInline || '12px'}` : `12px ${item.paddingInline || '12px'}`
                                                        }}
                                                        onContextMenu={(e) => columnIndex === 0 && selectedRows.length > 0 && onCellContextMenu?.(e, columnIndex)}
                                                        className={cn(
                                                            'max-xs:!px-[18px]',
                                                            !item.noPaddingBlock && 'py-[12px]',
                                                            'leading-[125%]',
                                                            columnIndex === 0 && selectedRows.length > 0 && 'cursor-context-menu',
                                                            item.fixed === 'right' && 'sticky right-0 z-10',
                                                            item.align === TEXT_ALIGN.CENTER && 'text-center',
                                                            item.align === TEXT_ALIGN.RIGHT && 'text-right',
                                                            item.className
                                                        )}>
                                                        {value}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                }
                                return null;
                            })
                        )}
                    </tbody>
                </table>
            </div>
            {isPagination && data.length > 0 && (
                <Pagination
                    itemsPerPage={pagination.pageSize}
                    totalItems={pagination.total}
                    onPageChange={onPageChange}
                    marginTop={paginationMarginTop}
                    currentPage={pageNumber}
                />
            )}
        </div>
    );
}