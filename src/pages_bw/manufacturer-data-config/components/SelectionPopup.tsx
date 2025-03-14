import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface SelectionPopupProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    data: any[];
    selectedItems: number[];
    onItemToggle: (selectedIds: number[]) => void;
    renderItem: (item: any) => {
        id: number;
        columns: {
            text: string;
            width: string;
        }[];
    };
    columnHeaders: {
        text: string;
        width: string;
    }[];
    onRowClick?: (item: any) => void;
    readOnly?: boolean;
}

export default function SelectionPopup({
    isOpen,
    onClose,
    title,
    data,
    selectedItems,
    onItemToggle,
    renderItem,
    columnHeaders,
    onRowClick,
    readOnly = false
}: SelectionPopupProps) {
    const { t: trans } = useTranslation('translation');
    const [tempSelectedItems, setTempSelectedItems] = useState<number[]>([]);

    useEffect(() => {
        if (isOpen) {
            setTempSelectedItems([...selectedItems]);
        }
    }, [isOpen, selectedItems]);

    if (!isOpen) return null;

    const handleToggle = (id: number) => {
        setTempSelectedItems(prev => 
            prev.includes(id) 
                ? prev.filter(itemId => itemId !== id)
                : [...prev, id]
        );
    };

    const handleComplete = () => {
        onItemToggle(tempSelectedItems);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
            <div className="bg-hw-dark-2 rounded-lg p-6 w-full max-w-[600px]">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg text-white">{title}</h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-400 hover:text-white"
                    >
                        ✕
                    </button>
                </div>
                <div className="bg-hw-dark-1 border border-hw-dark-4 rounded-none">
                    <div className="h-[400px] overflow-y-auto">
                        {data?.length ? (
                            <>
                                <div className={`grid grid-cols-[${columnHeaders.map(h => h.width).join('_')}] gap-x-2 text-[13px] sticky top-0 bg-hw-dark-1 z-10 border-b border-hw-dark-4`}>
                                    {columnHeaders.map((header, index) => (
                                        <div key={index} className="px-2 py-1 text-gray-400 font-medium">
                                            {header.text}
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    {data.map(item => {
                                        const renderedItem = renderItem(item);
                                        return (
                                            <div
                                                key={renderedItem.id}
                                                className={`grid grid-cols-[${columnHeaders.map(h => h.width).join('_')}] gap-x-2 hover:bg-hw-dark-2/50 cursor-pointer`}
                                                onClick={() => {
                                                    if (onRowClick) onRowClick(item);
                                                }}
                                            >
                                                <div className="flex items-center justify-center h-[30px]" onClick={(e) => e.stopPropagation()}>
                                                    <input
                                                        type="checkbox"
                                                        checked={tempSelectedItems.includes(renderedItem.id)}
                                                        onChange={(e) => {
                                                            if (!readOnly) {
                                                                handleToggle(renderedItem.id);
                                                            }
                                                        }}
                                                        className={`w-4 h-4 rounded border-gray-400 text-hw-orange-1 focus:ring-hw-orange-1 ${readOnly ? 'pointer-events-none' : ''}`}
                                                    />
                                                </div>
                                                {renderedItem.columns.map((column, index) => (
                                                    <div key={index} className="flex items-center text-white truncate text-[13px] h-[30px] px-2">
                                                        {column.text}
                                                    </div>
                                                ))}
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        ) : (
                            <div className="h-full flex items-center justify-center text-gray-500 text-sm">
                                {trans('데이터가 없습니다.')}
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    {!readOnly && (
                        <button
                            type="button"
                            onClick={handleComplete}
                            className="px-4 py-2 bg-hw-orange-1 text-white rounded hover:bg-hw-orange-1/90 transition-colors"
                        >
                            {trans('확인')}
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-hw-dark-4 text-white rounded hover:bg-hw-dark-5 transition-colors"
                    >
                        {trans('닫기')}
                    </button>
                </div>
            </div>
        </div>
    );
} 