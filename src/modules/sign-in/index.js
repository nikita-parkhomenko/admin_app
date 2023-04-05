
// outsource dependencies
import cn from 'classnames';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import React, { memo, useEffect } from 'react';
import { useController } from 'redux-saga-controller';
import { Container, Row, Col, Button, Card } from 'reactstrap';

// local dependencies
import { AppLogo } from '../../assets';
import { signInCtrl } from './controller';
import { VALID, FORGOT_PASSWORD } from '../../constants';
import { FormikInput, FormikPassword, AlertError } from '../../components';


// configure
const validate = Yup.object({
  username: VALID.EMAIL.required('Enter your email'),
  password: VALID.PASSWORD.required('Enter your password'),
});
const initial = {
  username: '',
  password: '',
};

export const SignIn = memo(function SignIn ({ className }) {
  const [
    { disabled, errorMessage },
    { initialize, signIn },
  ] = useController(signInCtrl);

  useEffect(() => { initialize({}); }, [initialize]);

  return <Container fluid id="SignIn" className={cn('sign-in', className)}>
    <Card className="sign-in-card shadow">
      <Row className="logo-row mb-3">
        <Col xs={12} className="d-flex align-items-center justify-content-center">
          <AppLogo className="logo-img me-2" />
          <h2 className="h1 mb-0"> Djema Administrative </h2>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col xs={12}>
          <h1 className="text-center mb-0"> Sign in </h1>
        </Col>
      </Row>
      <Formik
        onSubmit={signIn}
        initialValues={initial}
        validationSchema={validate}
      >
        <Form className="mb-3">
          <Field
            type="email"
            name="username"
            disabled={disabled}
            label="Email address"
            component={FormikInput}
            placeholder="Email address"
          />
          <Field
            name="password"
            label="Password"
            disabled={disabled}
            placeholder="Password"
            component={FormikPassword}
          />
          <Row className="mb-4">
            <Col xs={12} className="d-flex justify-content-end">
              <Link className="text-decoration-none fw-bold" to={FORGOT_PASSWORD.LINK()}> Forgot password? </Link>
            </Col>
          </Row>
          <AlertError message={errorMessage} />
          <Button type="submit" color="primary" block> Sign in </Button>
        </Form>
      </Formik>
    </Card>
  </Container>;
});

SignIn.propTypes = {
  className: PropTypes.string,
};
SignIn.defaultProps = {
  className: '',
};
