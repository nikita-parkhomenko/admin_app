
// outsource dependencies
import cn from 'classnames';
import PropTypes from 'prop-types';
import { FormGroup } from 'reactstrap';
import DatePicker from 'react-datepicker';
import { ErrorMessage, useField } from 'formik';
import React, { useCallback, memo, useEffect } from 'react';

// local dependencies

// eslint-disable-next-line max-len
export const FormikDate = memo(function FormikDate ({ field, form, label, skipTouch, classNameFormGroup, className, placeholder, popperClassName, popperPlacement, dateFormat, ...props }) {
  const { name, value } = field;
  const [_, meta, helpers] = useField(name);
  const { touched, error } = meta;
  const { setTouched, setValue } = helpers;

  useEffect(() => {
    if (!touched && skipTouch) setTouched(true, true);
  }, [setTouched, skipTouch, touched]);

  // NOTE handle valid/invalid state and error message for input
  let statusClass = '';
  if (touched) statusClass += error ? ' is-invalid' : ' is-valid';

  // NOTE prepare actions
  const handleBlur = useCallback(() => setTouched(true, true), [setTouched]);
  const handleChange = useCallback(value => {
    setValue(value, true);
    // NOTE avoid async code
    setTimeout(() => { setTouched(true, true); }, 0);
  }, [setTouched, setValue]);

  return <FormGroup className={cn('formik-date', classNameFormGroup)}>
    <DatePicker
      {...props}
      id={name}
      selected={value}
      autoComplete="off"
      onBlur={handleBlur}
      onChange={handleChange}
      dateFormat={dateFormat}
      placeholderText={placeholder}
      popperPlacement={popperPlacement}
      className={cn('formik-date-field form-control', statusClass, className)}
    />
    <ErrorMessage name={name} component="small" className="text-danger" />
  </FormGroup>;
});

FormikDate.propTypes = {
  label: PropTypes.string,
  skipTouch: PropTypes.bool,
  className: PropTypes.string,
  dateFormat: PropTypes.string,
  placeholder: PropTypes.string,
  form: PropTypes.object.isRequired,
  popperClassName: PropTypes.string,
  field: PropTypes.object.isRequired,
  classNameFormGroup: PropTypes.string,
  popperPlacement: PropTypes.oneOf([
    'top',
    'right',
    'bottom',
    'left',
    'top-start',
    'top-end',
    'right-start',
    'right-end',
    'bottom-start',
    'bottom-end',
    'left-start',
    'left-end',
  ]),
};
FormikDate.defaultProps = {
  label: '',
  className: '',
  skipTouch: false,
  placeholder: null,
  classNameFormGroup: '',
  dateFormat: 'dd/MM/yyyy',
  popperPlacement: 'bottom',
  popperClassName: 'react-datepicker-custom',
};
