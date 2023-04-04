
// outsource dependencies
import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { memo, useCallback } from 'react';
import { InputGroup, Button, Input } from 'reactstrap';

// local dependencies
import { SearchIcon, TimesIcon } from './icon';

// eslint-disable-next-line max-len
export const SearchInput = memo(function SearchInput ({ value, disabled, placeholder, onClear, onApply, onChange, className }) {
  const handleChange = useCallback(event => {
    const value = String(event.target.value).trimStart();
    onChange(value);
    if (!value) {
      onClear();
    }
  }, [onChange, onClear]);

  const handleKeyDown = useCallback(event => {
    if (event.keyCode === 27) {
      onClear();
      event.target.blur();
      event.preventDefault();
    } else if (event.keyCode === 13) {
      onApply();
      event.target.blur();
      event.preventDefault();
    }
  }, [onClear, onApply]);

  return <InputGroup className={cn('search-input', className)}>
    { value && <Button type="button" disabled={disabled} onClick={onClear}>
      <TimesIcon />
    </Button> }
    <Input
      value={value}
      disabled={disabled}
      onChange={handleChange}
      placeholder={placeholder}
      onKeyDown={handleKeyDown}
    />
    <Button type="button" color="primary" disabled={disabled} onClick={onApply}>
      <SearchIcon />
    </Button>
  </InputGroup>;
});
SearchInput.propTypes = {
  value: PropTypes.any,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  onClear: PropTypes.func.isRequired,
  onApply: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};
SearchInput.defaultProps = {
  placeholder: '\u2315 Search',
  className: null,
  disabled: false,
  value: ''
};
