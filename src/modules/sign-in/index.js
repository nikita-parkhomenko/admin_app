
// outsource dependencies
import cn from 'classnames';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import React, { memo, useEffect } from 'react';
import { useController } from 'redux-saga-controller';
import { Container, Row, Col, Button } from 'reactstrap';

// local dependencies
import { AppLogo } from '../../assets';
import { signInCtrl } from './controller';
import { VALID, FORGOT_PASSWORD, SIGN_UP } from '../../constants';
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

  return <Container id="SignIn" className={cn('sign-in', className)}>
    <Row>
      <Col xs={12} className="px-lg-5">
        <Row className="logo-row">
          <Col xs={12} className="d-flex align-items-center">
            <AppLogo className="logo-img me-2" />
            <h2 className="h1 mb-0"> Djema </h2>
          </Col>
        </Row>
        <Row className="mb-5">
          <Col xs={12}>
            <h1 className="mb-0"> Sign in to Djema! </h1>
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
        <Row>
          <Col xs={12} className="d-flex justify-content-center">
            <span className="me-1"> Don&apos;t have an account? </span>
            <Link className="text-decoration-none fw-bold" to={SIGN_UP.LINK()}> Sign up </Link>
          </Col>
        </Row>
      </Col>
    </Row>
  </Container>;
});

SignIn.propTypes = {
  className: PropTypes.string,
};
SignIn.defaultProps = {
  className: '',
};
