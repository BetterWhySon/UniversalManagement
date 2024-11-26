import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useTranslation } from 'react-i18next';
import dayjs, { Dayjs } from 'dayjs';

import { backendURL, serverDomain } from "@/api/URLs";
import { api } from "@/api/api";
import TableData from "@/components/table/TableData";
import { Calendar, InfoDetailRefresh, Plus } from "@/components/icons";
import { InputTimeRange } from "@/enums/input-time-range";
import AddLogFileModal from "./AddLogFileModal";
import useAccessInfoStore from '@/api/accessInfoStore';

const LogFileDownload = () => {
    const token = localStorage.getItem("token");
    const pathnameParts = location.pathname.split('/');
    const bmsid = pathnameParts.length > 2 ? pathnameParts[2] : null;
    interface IFile {
        id: any;
        file_name: string;
        file_path: string;
        file_size: string;
        modified_time: string;
    }
    const [startTime, setStartTime] = useState<Dayjs>(dayjs().subtract(7, 'day'));
    const [endTime, setEndTime] = useState<Dayjs>(dayjs());
    const { t: trans } = useTranslation('translation');
    const startTimeRef = useRef<HTMLInputElement>(null);
    const endTimeRef = useRef<HTMLInputElement>(null);
    const [searchText, setSearchText] = useState("");
    const defaultTableData = [{
        id: 1,
        'file_name': '',
        'file_path': '',
        'file_size': '',
        'modified_time': trans('dataNotExist'),
    }]
    const [data, setData] = useState<IFile[]>(defaultTableData);
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
    const { connInfo } = useAccessInfoStore();

    useEffect(() => {
        if (isAddModalOpen) {// local서버 이외에서는 해당기능 사용불가
            if (!connInfo?.location?.includes('local')) {
                alert(trans('thisFeatureIsNotAvailableOnThisServer'));
                setIsAddModalOpen(false);
            }
        }
    }, [isAddModalOpen]);

    const onSearch = () => {
        getLogFiles();
    };
    const onChange = (e: any) => {
        setSearchText(e.target.value);
    };

    const handleTimeChange = (event: ChangeEvent<HTMLInputElement>, type: InputTimeRange) => {
        const inputValue = event.target.value;
        const parsedDateTime = dayjs(inputValue);
        if (!parsedDateTime.isValid()) {
            return;
        }
        if (type === InputTimeRange.START) {
            setStartTime(parsedDateTime);
            return;
        }
        setEndTime(parsedDateTime);
    };

    const getLogFiles = async () => {
        setData([]);
        const date_from_str = startTime?.format('YYYY-MM-DD HH:mm:ss')
        const date_to_str = endTime?.format('YYYY-MM-DD HH:mm:ss')
        const payload = {
            "bms_id": Number(bmsid),
            'date_from': date_from_str,
            'date_to': date_to_str,
            'filename_pattern': searchText,
        };
        try {
            const response = await api.post(backendURL + 'user_download_log_file/', payload, {
                headers: { Authorization: "Bearer " + token, },
            })
            const fileList = response.data.files
            if (fileList.length > 0) {
                let i = 1;
                fileList.forEach((element: IFile) => { element.id = i++; });
                setData(fileList)
            } else {
                setData(defaultTableData);
            }

        } catch (error) {
            setData(defaultTableData);
        }
    };

    const resetFilter = () => {
        setSearchText("");
        setStartTime(dayjs().subtract(7, 'day'))
        setEndTime(dayjs())
    }

    const columns = [
        {
            name: 'name',
            dataIndex: 'file_name',
            paddingInline: '32px',
            render: (row: IFile) => (
                // todo: fix url
                <a className="hover:font-bold underline underline-offset-4"
                    href={serverDomain + `/logs/${row.file_path}/${row.file_name}`} download>
                    {row.file_name}
                </a>
            )
        },
        {
            name: 'modificationDate',
            dataIndex: 'modified_time',
            paddingInline: '24px',
        },
        {
            name: 'size',
            dataIndex: 'file_size',
            paddingInline: '24px'
        },
    ];

    useEffect(() => {
        getLogFiles();
        resetFilter();
        return () => {
            setData(defaultTableData);
        }
    }, [bmsid]);

    useEffect(() => {
        if (searchText === "") {
            onSearch()
        }
    }, [searchText, startTime, endTime]);

    return (
        <>
            <div className='w-full md:w-fit flex md:!flex flex-col md:flex-row items-center md:flex-wrap gap-10 m-5 py-5'>
                <div className='w-full md:w-fit flex items-center gap-3'>
                    <span className='w-[30%] md:w-full text-[14px] font-light leading-[18px] text-hw-white-2 '>{trans('fileName')}</span>
                    <input
                        type='text'
                        value={searchText}
                        onChange={onChange}
                        className='w-full md:w-[160px] h-[32px] px-4 py-[11px] outline-none rounded-lg bg-hw-dark-2 text-[14px] font-light leading-[18px] text-hw-white-2'
                    />
                </div>
                <div className='w-full md:w-fit flex items-start gap-3'>
                    <span className='w-[30%] md:w-full text-[14px] font-light leading-8 text-hw-white-2'>{trans('modificationDate')}</span>
                    <div className='w-full flex flex-col sm:flex-row sm:items-center justify-end gap-2'>
                        <div
                            onClick={() => startTimeRef.current && startTimeRef.current.showPicker()}
                            className='w-full md:w-[232px] py-[11px] pl-[16px] pr-[10px] cursor-pointer rounded-[8px] h-8 bg-hw-dark-2 flex items-center justify-between relative'>
                            <input
                                ref={startTimeRef}
                                type='datetime-local'
                                value={startTime.format('YYYY-MM-DDTHH:mm')}
                                onChange={(e) => handleTimeChange(e, InputTimeRange.START)}
                                className='opacity-0 absolute w-full h-full'
                            />
                            <span className='text-[14px] font-light cursor-pointer leading-[18px] outline-none text-hw-white-2'>
                                {startTime.format('YYYY-MM-DD HH:mm:ss')}
                            </span>
                            <Calendar />
                        </div>
                        <div className='w-full sm:w-fit flex items-center gap-2 relative'>
                            <p className='absolute sm:relative top-[50%] -translate-y-[50%] left-[-18px] sm:top-0 sm:left-0 sm:translate-y-0 z-40 text-[14px] font-light leading-[18px] text-white'>
                                ~
                            </p>
                            <div
                                className='w-full sm:w-[232px] py-[11px] pl-[16px] pr-[10px] cursor-pointer rounded-[8px] h-8 bg-hw-dark-2 flex items-center justify-between relative'
                                onClick={() => endTimeRef.current && endTimeRef.current.showPicker()}>
                                <input
                                    ref={endTimeRef}
                                    type='datetime-local'
                                    value={endTime.format('YYYY-MM-DDTHH:mm')}
                                    onChange={(e) => handleTimeChange(e, InputTimeRange.END)}
                                    className='opacity-0 absolute w-full h-full'
                                />
                                <span className='text-[14px] font-light cursor-pointer leading-[18px] outline-none text-hw-white-2'>
                                    {endTime.format('YYYY-MM-DD HH:mm:ss')}
                                </span>
                                <Calendar />
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    onClick={onSearch}
                    className='w-full md:w-fit mt-[16px] md:mt-0 px-6 py-[6px] rounded-lg bg-hw-orange-1 text-hw-white-1 text-base font-light leading-[125%]'>
                    {trans('search')}
                </button>

                <button
                    onClick={() => { setIsAddModalOpen(true) }}
                    className='w-full md:w-fit mt-[16px] md:mt-0 px-6 py-[6px] rounded-lg bg-hw-orange-1 text-hw-white-1 text-base font-light leading-[125%] flex gap-2 items-center justify-center'>
                    <Plus />
                    <span className='text-hw-white-1 font-light text-base leading-[125%] whitespace-nowrap'>{trans('addFile')}</span>
                </button>
                <button onClick={resetFilter} className='h-full w-[40px] px-2 py-[6px] inline-flex items-center justify-center rounded-lg border border-[#E2E2E2]'>
                    <InfoDetailRefresh />
                </button>

            </div>
            <div className="m-5">
                <TableData
                    data={data}
                    columns={columns}
                    isPagination={true}
                    pagination={{
                        total: data?.length,
                        pageSize: 20,
                    }}
                    paginationMarginTop='32px'
                />
            </div>
            {isAddModalOpen && (
                <>
                    <AddLogFileModal onClose={() => { setIsAddModalOpen(false) }} refresh={resetFilter} />
                </>
            )}
        </>
    );
}

export default LogFileDownload;