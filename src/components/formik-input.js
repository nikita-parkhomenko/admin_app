
// outsource dependencies
import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { memo, useMemo } from 'react';
import { useField, ErrorMessage } from 'formik';
import { Label, FormGroup, Input } from 'reactstrap';

// local dependencies

// eslint-disable-next-line max-len
export const FormikInput = memo(function FormikInput ({ field, form, label, id, isFloating, className, classNameFormGroup, format, ...props }) {
  const { name, value } = field;
  const [_, meta] = useField(name);
  const { touched, error } = meta;

  // NOTE ability to format view value
  const val = useMemo(() => format(value), [format, value]);

  // NOTE handle valid/invalid state and error message for input
  let statusClass = '';
  if (touched) statusClass += error ? ' is-invalid' : ' is-valid';

  return <FormGroup floating={isFloating} className={classNameFormGroup}>
    <Input
      autoComplete="off"
      {...props}
      {...field}
      value={val}
      id={id || name}
      className={cn(className, statusClass)}
    />
    {label && <Label className="text-muted" for={id || name}> {label} </Label>}
    <ErrorMessage name={name} component="small" className="text-danger" />
  </FormGroup>;
});

FormikInput.propTypes = {
  classNameFormGroup: PropTypes.string,
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  className: PropTypes.string,
  isFloating: PropTypes.bool,
  label: PropTypes.string,
  format: PropTypes.func,
};
FormikInput.defaultProps = {
  label: '',
  className: '',
  isFloating: true,
  classNameFormGroup: '',
  format: e => e,
};
