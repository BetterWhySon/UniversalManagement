import { TableColumn } from '@/types/table.type';
import Pagination from '../ui/Pagination';
import { useSearchParams } from 'react-router-dom';
import { cn } from '@/helpers/class-name.helper';
import { OverflowX } from '@/enums/table';
import { useEffect, useState } from 'react';
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
    className?: string; // 새로 추가된 className 속성
    style?: React.CSSProperties;
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
        <div className={cn('w-full h-full min-h-[650px]', className)}>
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
                                                textAlign: item.align,
                                            }
                                            : { paddingInline: item.paddingInline, textAlign: item.align }
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
                            {data.map((row: any, index: number) => {
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
                                                    {item.dataIndex === 'modelType' ? (
                                                        row.modelType === '공랭식' ? trans('airCooling') :
                                                            row.modelType === '액침식' ? trans('immersionCooling') :
                                                                row.modelType
                                                    ) : (
                                                        item.render ? item.render(row, item.dataIndex) : (
                                                            item.dataIndex === 'modbusUpdateTime' || item.dataIndex === 'canUpdateTime' ? (
                                                                <span dangerouslySetInnerHTML={{ __html: formatMultiLineString(row[item.dataIndex]) }} />
                                                            ) : (
                                                                row[item.dataIndex as string] || ''
                                                            )
                                                        )
                                                    )}
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
                    currentPage={pageNumber}
                />
            )}
        </div>
    );
}