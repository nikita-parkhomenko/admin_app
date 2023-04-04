
// outsource dependencies
import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { memo, useCallback, useMemo } from 'react';
import { PaginationItem, PaginationLink, Pagination as BootstrapPagination } from 'reactstrap';

// local dependencies


// configure
const BREAK = 'BREAK';
const generateSpreadPages = (page, total) => {
  const result = [0, 1];
  if (page < 3 || page > total - 3) {
    result.push(2);
    result.push(3);
    result.push(BREAK);
    let key = 4;
    while (--key) { result.push(total - key); }
    return result;
  }
  result.push(BREAK);
  result.push(page - 1);
  result.push(page);
  result.push(page + 1);
  result.push(BREAK);
  result.push(total - 1);
  // result.push(total);
  return result;
};
export const Pagination = memo(function Pagination ({ value, totalPages, onChange, disabled, className, ...attr }) {
  const prevDisabled = disabled || value < 1;
  const handlePrev = useCallback(() => !prevDisabled && onChange(value - 1), [value, prevDisabled, onChange]);
  const nextDisabled = disabled || value >= totalPages - 1;
  const handleNext = useCallback(() => !nextDisabled && onChange(value + 1), [value, nextDisabled, onChange]);
  const handleChange = useCallback(page => !disabled && value !== page && onChange(page), [value, disabled, onChange]);

  const list = useMemo(() => {
    if (totalPages > 10) {
      return generateSpreadPages(value, totalPages);
    } else if (totalPages > 0) {
      const result = [];
      let key = totalPages;
      while (key--) { result.unshift(key); }
      return result;
    }
    return [];
  }, [value, totalPages]);

  return <BootstrapPagination listClassName="m-0" aria-label="Pagination" className={cn('pagination', className)} { ...attr } >
    <PaginationItem disabled={prevDisabled} onClick={handlePrev}>
      <PaginationLink previous> Previous </PaginationLink>
    </PaginationItem>
    { list.map((page, i) => (page === BREAK ? <PaginationItem key={`${BREAK}-${i}`} disabled>
      <PaginationLink> ... </PaginationLink>
    </PaginationItem> : <PaginationItem
      key={page}
      disabled={disabled}
      active={page === value}
      onClick={() => handleChange(page)}
    >
      <PaginationLink> { page + 1 } </PaginationLink>
    </PaginationItem>)) }
    <PaginationItem disabled={nextDisabled} onClick={handleNext}>
      <PaginationLink next> Next </PaginationLink>
    </PaginationItem>
  </BootstrapPagination>;
});
Pagination.propTypes = {
  disabled: PropTypes.bool,
  className: PropTypes.string,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
};
Pagination.defaultProps = {
  className: null,
  disabled: false,
};
