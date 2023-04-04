
// outsource dependencies
import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem } from 'reactstrap';

// local dependencies

export const PageSize = memo(function PageSize ({ value, options, onChange, size, className, ...attr }) {
  return <UncontrolledDropdown size={size} className={cn('page-size', className)}>
    <DropdownToggle caret { ...attr }> { value } </DropdownToggle>
    <DropdownMenu>
      { options.map(item => <DropdownItem
        key={item}
        disabled={value === item}
        onClick={() => onChange(item)}
      >
        { item }&nbsp;Items
      </DropdownItem>) }
    </DropdownMenu>
  </UncontrolledDropdown>;
});
PageSize.propTypes = {
  options: PropTypes.array,
  className: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'lg']),
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
PageSize.defaultProps = {
  size: null,
  className: null,
  options: [10, 15, 30, 50]
};
