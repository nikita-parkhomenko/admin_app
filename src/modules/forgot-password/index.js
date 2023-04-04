
// outsource dependencies
import * as Yup from 'yup';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { Form, Formik, Field } from 'formik';
import React, { memo, useEffect } from 'react';
import { Card, Row, Col, Button } from 'reactstrap';
import { useController } from 'redux-saga-controller';

// local dependencies
import { AppLogo } from '../../assets';
import { VALID } from '../../constants';
import { forgotPasswordCtrl } from './controller';
import { AlertError, FormikInput } from '../../components';

// configure
const initial = {
  userEmail: '',
};
const validate = Yup.object({
  userEmail: VALID.EMAIL.required('Please enter email address'),
});

export const ForgotPassword = memo(function ForgotPassword ({ className }) {
  const [
    { disabled, errorMessage },
    { initialize, forgotPassword },
  ] = useController(forgotPasswordCtrl);

  useEffect(() => { initialize({}); }, [initialize]);

  return <div id="ForgotPassword" className={cn('forgot-password', className)}>
    <Card>
      <Row className="mb-5">
        <Col xs={12} className="d-flex align-items-center justify-content-center">
          <AppLogo className="app-logo me-2" />
          <h1 className="mb-0"> Djema </h1>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col xs={12} className="text-center">
          <h2> Reset password </h2>
        </Col>
      </Row>
      <Row>
        <Col xs={12} className="text-muted text-center">
          <p> Enter your registered email address and we’ll send you the guide on how to reset your password </p>
        </Col>
      </Row>
      <AlertError message={errorMessage} />
      <Formik
        initialValues={initial}
        onSubmit={forgotPassword}
        validationSchema={validate}
      >
        <Form>
          <Field
            type="email"
            name="userEmail"
            disabled={disabled}
            label="Email address"
            component={FormikInput}
            placeholder="Email address"
          />
          <Button type="submit" block color="primary"> Send me a link </Button>
        </Form>
      </Formik>
    </Card>
  </div>;
});

ForgotPassword.propTypes = {
  className: PropTypes.string,
};
ForgotPassword.defaultProps = {
  className: '',
};
