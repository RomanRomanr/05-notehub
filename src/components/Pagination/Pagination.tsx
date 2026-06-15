import type { ComponentType } from "react";
import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import css from "./Pagination.module.css";

type DefaultModule<T> = { default: T }; 

const PaginateComponent = (
  ReactPaginateModule as unknown as DefaultModule<
    ComponentType<ReactPaginateProps>
  >
).default; 

interface PaginationProps {
  pageCount: number;
  forcePage: number;
  onPageChange: (page: number) => void; 
}

function Pagination({ pageCount, forcePage, onPageChange }: PaginationProps) {
  const handlePageSelect = ({ selected }: { selected: number }) => {
    
    onPageChange(selected + 1);
  };

  return (
    <PaginateComponent
      pageCount={pageCount}
      forcePage={forcePage}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={handlePageSelect}
      previousLabel="←"
      nextLabel="→"
      containerClassName={css.pagination}
      activeClassName={css.active}
    />
  );
}

export default Pagination;