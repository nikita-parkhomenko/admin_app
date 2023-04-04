
// outsource dependencies
import _ from 'lodash';
import cn from 'classnames';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { FormGroup } from 'reactstrap';
import { useField, ErrorMessage } from 'formik';
import CreatableSelect from 'react-select/creatable';
import React, { memo, useCallback, useEffect, useMemo } from 'react';

// local dependencies
import { useRefCallback } from '../modules/hooks';

// eslint-disable-next-line max-len
export const FormikSelect = memo(function FormikSelect ({ field, form, label, isFloating, skipTouch, classNameFormGroup, isCreatable, className, disabled, isSimple, defaultValue, getOptionValue, getOptionLabel, onChangeHelper, options, ...props }) {
  const { name, value } = field;
  const [_field, meta, helpers] = useField(name);
  const { touched, error } = meta;
  const { setTouched, setValue } = helpers;
  useEffect(() => {
    if (!touched && skipTouch) setTouched(true, true);
  }, [setTouched, skipTouch, touched]);

  // NOTE handle valid/invalid state and error message for input
  let statusClass = '';
  if (touched) statusClass += error ? ' is-invalid' : ' is-valid';

  // NOTE to allow form control touches
  const Component = useMemo(() => isCreatable ? CreatableSelect : Select, [isCreatable]);

  // NOTE provide ability to set into form only value from option object
  const handleChange = useCallback(value => {
    if (_.isFunction(onChangeHelper)) onChangeHelper(value);
    isSimple ? setValue(getOptionValue(value)) : setValue(value);
  }, [onChangeHelper, isSimple, setValue, getOptionValue]
  );
  const defVal = useMemo(
    () => isSimple ? getValue(options, defaultValue, getOptionValue) : defaultValue,
    [options, defaultValue, getOptionValue, isSimple]
  );
  const val = useMemo(
    () => isSimple ? getValue(options, value, getOptionValue) : value,
    [options, value, getOptionValue, isSimple]
  );

  // NOTE in case clearing select value we might face with cached value within Select
  const [select, ref] = useRefCallback();
  useEffect(() => {
    if (_.isUndefined(val) && select && !value) {
      select.clearValue();
    }
  }, [val, value, select]);

  return <FormGroup className={cn('formik-select', statusClass, classNameFormGroup)}>
    <Component
      // menuIsOpen
      ref={ref}
      id={name}
      {...props}
      value={val}
      name={name}
      options={options}
      onBlur={setTouched}
      defaultValue={defVal}
      isDisabled={disabled}
      onChange={handleChange}
      getOptionValue={getOptionValue}
      getOptionLabel={getOptionLabel}
      classNamePrefix="formik-select-field"
      className={cn('formik-select-field', className)}
    />
    <ErrorMessage name={name} component="small" className="text-danger" />
  </FormGroup>;
});

FormikSelect.propTypes = {
  disabled: PropTypes.bool,
  isSimple: PropTypes.bool, // allow to put into form only value from options item
  skipTouch: PropTypes.bool,
  className: PropTypes.string,
  getOptionLabel: PropTypes.func,
  getOptionValue: PropTypes.func,
  onChangeHelper: PropTypes.func,
  closeMenuOnSelect: PropTypes.bool,
  form: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  classNameFormGroup: PropTypes.string,
};
FormikSelect.defaultProps = {
  className: '',
  disabled: false,
  isSimple: false,
  skipTouch: false,
  closeMenuOnSelect: true,
  classNameFormGroup: '',
  onChangeHelper: e => e,
  getOptionLabel: item => _.get(item, 'label', '...'),
  getOptionValue: item => _.get(item, 'value'),
};

function getValue (options, value, getOptionValue) {
  // NOTE incorrect checks lead to impossible to select false value as 0|null|false
  if (_.isUndefined(value)) return value;
  return _.find(options, o => getOptionValue(o) === value);
}
