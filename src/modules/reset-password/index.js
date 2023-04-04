
// outsource dependencies
import * as Yup from 'yup';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { Form, Formik, Field } from 'formik';
import React, { memo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Row, Col, Button } from 'reactstrap';
import { useController } from 'redux-saga-controller';

// local dependencies
import { AppLogo } from '../../assets';
import { resetPasswordCtrl } from './controller';
import { VALID, FORGOT_PASSWORD } from '../../constants';
import { AlertError, FormikPassword, Preloader } from '../../components';

// configure
const initial = {
  password: '',
  confirmPassword: ''
};
const validate = Yup.object({
  password: VALID.PASSWORD.required('Please type your password'),
  confirmPassword: VALID.CONFIRM_PASSWORD.required('Please confirm your password'),
});

export const ResetPassword = memo(function ResetPassword ({ className }) {
  const [
    { initialized, disabled, errorMessage, token },
    { initialize, resetPassword },
  ] = useController(resetPasswordCtrl);

  const { token: resetToken } = useParams();
  useEffect(() => { initialize({ resetToken }); }, [initialize, resetToken]);

  return <div id="ResetPassword" className={cn('reset-password', className)}>
    <Preloader active={!initialized} className="preloader">
      <Card>
        <Row className="mb-5">
          <Col xs={12} className="d-flex align-items-center justify-content-center">
            <AppLogo className="app-logo me-2" />
            <h1 className="mb-0"> Djema </h1>
          </Col>
        </Row>
        { token ? <>
          <Row className="mb-2">
            <Col xs={12} className="text-center">
              <h2> Create a new password </h2>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="text-muted text-center">
              <p> Access your Djema account by creating <br/>
                a new secure password </p>
            </Col>
          </Row>
          <Formik
            initialValues={initial}
            onSubmit={resetPassword}
            validationSchema={validate}
          >
            <Form>
              <Field
                name="password"
                disabled={disabled}
                label="New password"
                component={FormikPassword}
                placeholder="New password"
              />
              <Field
                disabled={disabled}
                name="confirmPassword"
                label="Confirm password"
                component={FormikPassword}
                placeholder="Confirm password"
              />
              <AlertError message={errorMessage} />
              <Button type="submit" block color="primary"> Reset password </Button>
            </Form>
          </Formik>
        </> : <>
          <Row className="mb-3 text-center">
            <Col tag="h1" xs="12" className="h3 text-danger"> Invalid </Col>
          </Row>
          <Row className="mb-3 text-center">
            <Col tag="p" className="text">
              That link you follow is invalid or expired.
              In case you get this link in order to reset password, please try again using
              <Link className="fw-bold" replace to={FORGOT_PASSWORD.LINK()}> Forgot password </Link> functionality.
            </Col>
          </Row>
        </>}
      </Card>
    </Preloader>
  </div>;
});

ResetPassword.propTypes = {
  className: PropTypes.string,
};
ResetPassword.defaultProps = {
  className: '',
};
