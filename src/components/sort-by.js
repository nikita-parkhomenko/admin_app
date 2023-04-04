
// outsource dependencies
import cn from 'classnames';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import React, { memo, useCallback, useMemo } from 'react';

// local dependencies
import { SortIcon, SortAmountDownIcon, SortAmountUpIcon } from './icon';

// eslint-disable-next-line max-len
export const SortBy = memo(function SortBy ({ field, sortF, sortD, onChange, children, statusMap, classMap, className, ...attr }) {
  const status = field === sortF ? sortD : null;
  const Icon = useMemo(() => statusMap(status), [status, statusMap]);

  const handleChange = useCallback(() => onChange({
    sortF: field,
    sortD: field === sortF ? !sortD: true
  }), [sortF, sortD, field, onChange]);

  return <Button className={cn('sort-by', className)} outline color="link" { ...attr } onClick={handleChange}>
    <Icon className={cn('icon', classMap(status, attr))} />
    { children }
  </Button>;
});
SortBy.propTypes = {
  disabled: PropTypes.bool,
  classMap: PropTypes.func,
  statusMap: PropTypes.func,
  className: PropTypes.string,
  sortD: PropTypes.bool.isRequired,
  sortF: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
};
SortBy.defaultProps = {
  className: null,
  disabled: false,
  statusMap: status => {
    switch (status) {
      default: return SortIcon;
      case true: return SortAmountUpIcon;
      case false: return SortAmountDownIcon;
    }
  },
  classMap: (status, { disabled }) => {
    switch (status) {
      default: return cn('ms-1 me-1 text-thin', disabled ? 'text-muted' : 'text-gray');
      case true: return cn('ms-1 me-1 text-bold', disabled ? 'text-muted' : 'text-gray-d');
      case false: return cn('ms-1 me-1 text-bold', disabled ? 'text-muted' : 'text-gray-d');
    }
  }
};
