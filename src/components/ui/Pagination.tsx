import ReactPaginate from 'react-paginate';
import { ChevronLeft, ChevronLeftDouble, ChevronRight, ChevronRightDouble } from '@/components/icons';
import { DEFAULT_ITEM_PER_PAGE } from '@/constants/pagination.constant';
import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

type PaginationProps = {
  itemsPerPage?: number;
  currentPage?: number;
  totalItems: number;
  onPageChange?: (page: number) => void;
  marginTop?: string;
};

type PageChangeEvent = {
  selected: number;
};

const btnClasses = 'w-6 h-6 flex items-center justify-center hover:bg-hw-gray-8 rounded transition-all';
function Pagination({ itemsPerPage = DEFAULT_ITEM_PER_PAGE, totalItems, onPageChange, marginTop }: PaginationProps) {
  const pageCount = useMemo(() => Math.ceil(totalItems / itemsPerPage), [totalItems]);

  const [searchParams] = useSearchParams();

  const currentPage = useMemo(() => {
    const pageNumber = Number(searchParams.get('page')) - 1;
    return pageNumber > 0 ? pageNumber : 0;
  }, [searchParams.get('page')]);

  const handlePageClick = (event: PageChangeEvent) => {
    onPageChange?.(event.selected + 1);
  };

  const handleFirstPage = () => {
    onPageChange?.(1);
  };
  const handleLastPage = () => {
    onPageChange?.(pageCount);
  };

  return (
    <>
      <div className='hw-pagination flex items-center w-fit mx-auto font-SUIT' style={{ marginTop }}>
        <button className={btnClasses} onClick={handleFirstPage}>
          <ChevronLeftDouble />
        </button>
        <ReactPaginate
          className='flex items-center gap-[6px] text-hw-white-1 text-sm mx-1'
          pageClassName='w-6 h-6 hover:bg-hw-gray-8 rounded transition-all leading-none'
          pageLinkClassName='w-full h-full flex items-center justify-center leading-none'
          previousClassName={btnClasses}
          nextClassName={btnClasses}
          activeClassName='bg-hw-orange-1 hover:bg-hw-orange-1'
          breakLabel='...'
          nextLabel={<ChevronRight />}
          previousLabel={<ChevronLeft />}
          forcePage={currentPage}
          onPageChange={handlePageClick}
          pageRangeDisplayed={6}
          pageCount={pageCount}
          renderOnZeroPageCount={null}
          {...handleFirstPage}
        />
        <button className={btnClasses} onClick={handleLastPage}>
          <ChevronRightDouble />
        </button>
      </div>
    </>
  );
}

export default React.memo(Pagination);
