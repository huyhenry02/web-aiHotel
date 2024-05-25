import React from 'react';
import { Pagination } from 'react-bootstrap';

type IPaginationComponent = {
  totalPages: number | undefined;
  currentPage: number;
  onChangePage: (page: number) => void;
};
const PaginationComponent: React.FC<IPaginationComponent> = ({
  totalPages = 1,
  currentPage = 1,
  onChangePage,
}) => {
  return (
    <>
      <Pagination>
        <Pagination.Prev
          onClick={() => onChangePage(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {totalPages &&
          Array.from(Array(totalPages).keys()).map(page => (
            <Pagination.Item
              key={page}
              onClick={() => onChangePage(page + 1)}
              active={currentPage === page + 1}
            >
              {page + 1}
            </Pagination.Item>
          ))}
        <Pagination.Next
          onClick={() => onChangePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </>
  );
};

export default PaginationComponent;
