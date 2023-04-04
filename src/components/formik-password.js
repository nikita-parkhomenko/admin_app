
// outsource dependencies
import cn from 'classnames';
import PropTypes from 'prop-types';
import { ErrorMessage, useField } from 'formik';
import React, { memo, useEffect, useState } from 'react';
import { Input, Label, FormGroup, Button } from 'reactstrap';

// local dependencies
// import { Icon } from './icons';

// eslint-disable-next-line max-len
export const FormikPassword = memo(function InputPassword ({ field, form, label, id, isFloating, className, classNameFormGroup, skipTouch, disabled, ...props }) {
  const { name } = field;
  const [_, meta, helpers] = useField(name);
  const { touched, error } = meta;
  const { setTouched } = helpers;

  // NOTE: input type password by default
  const [isPasswordType, toggleInputType] = useState(true);
  const handleToggleInputType = () => toggleInputType(prev => !prev);

  useEffect(() => {
    if (!touched && skipTouch) setTouched(true, true);
  }, [setTouched, skipTouch, touched]);

  // NOTE handle valid/invalid state and error message for FormikPassword
  let statusClass = '';
  if (touched) statusClass += error ? ' is-invalid' : ' is-valid';

  return <FormGroup floating={isFloating} className={cn('formik-password', classNameFormGroup)}>
    <Input
      autoComplete="off"
      {...props}
      {...field}
      id={id || name}
      disabled={disabled}
      type={isPasswordType ? 'password' : 'text'}
      className={cn('formik-password-field', className, statusClass)}
    />
    <Button
      color="none"
      type="button"
      disabled={disabled}
      onClick={handleToggleInputType}
      className="formik-password-btn d-flex align-items-center"
    >
      {/*{isPasswordType*/}
      {/*  ? <Icon size="lg" type="Eye" style={{ color: '#828293' }} />*/}
      {/*  : <Icon size="lg" type="EyeHide" style={{ color: '#828293' }} />}*/}
    </Button>
    {label && <Label for={id || name}> {label} </Label>}
    <ErrorMessage name={name} component="small" className="text-danger" />
  </FormGroup>;
});

FormikPassword.propTypes = {
  classNameFormGroup: PropTypes.string,
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  className: PropTypes.string,
  isFloating: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string,
};
FormikPassword.defaultProps = {
  label: '',
  className: '',
  disabled: false,
  isFloating: true,
  classNameFormGroup: '',
};
