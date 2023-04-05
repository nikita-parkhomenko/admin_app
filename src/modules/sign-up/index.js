
// outsource dependencies
import * as Yup from 'yup';
import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { Container, Row, Col, Button, Card } from 'reactstrap';
import { useControllerData, useControllerActions } from 'redux-saga-controller';

// local dependencies
import { AppLogo } from '../../assets';
import { signUpCtrl } from './controller';
import { VALID, SIGN_IN } from '../../constants';
import { FormikInput, FormikPassword, AlertError } from '../../components';

// configure
const validate = Yup.object({
  email: VALID.EMAIL.required('Enter your email'),
  password: VALID.PASSWORD.required('Enter your password'),
  lastName: VALID.NAME.required('Please enter your last name'),
  firstName: VALID.NAME.required('Please enter your first name'),
});
const initial = {
  email: '',
  password: '',
  lastName: '',
  firstName: '',
};

export const SignUp = memo(function SignUp ({ className }) {
  const { disabled, errorMessage } = useControllerData(signUpCtrl);
  const { createUser } = useControllerActions(signUpCtrl);

  return <Container fluid id="SignUp" className={cn('sign-up', className)}>
    <Card className="sign-up-card shadow-sm">
      <Row className="logo-row mb-3">
        <Col xs={12} className="d-flex align-items-center justify-content-center">
          <AppLogo className="logo-img me-2" />
          <h2 className="h1 mb-0"> Djema Administrative </h2>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col xs={12}>
          <h1 className="text-center mb-0"> Sign up </h1>
        </Col>
      </Row>
      <Formik
        onSubmit={createUser}
        initialValues={initial}
        validationSchema={validate}
      >
        <Form className="mb-3">
          <Field
            name="firstName"
            label="First name"
            disabled={disabled}
            component={FormikInput}
            placeholder="First name"
          />
          <Field
            name="lastName"
            label="Last name"
            disabled={disabled}
            placeholder="Last name"
            component={FormikInput}
          />
          <Field
            name="email"
            type="email"
            disabled={disabled}
            label="Email address"
            component={FormikInput}
            placeholder="Email address"
          />
          <Field
            name="password"
            disabled={disabled}
            label="Create a password"
            component={FormikPassword}
            placeholder="Create a password"
          />
          <AlertError message={errorMessage} />
          <Button type="submit" color="primary" block> Sign up </Button>
        </Form>
      </Formik>
      <Row>
        <Col xs={12} className="text-center">
          <p> Already have an account? <Link className="text-decoration-none" to={SIGN_IN.LINK()}> Sign in </Link> </p>
        </Col>
      </Row>
    </Card>
  </Container>;
});

SignUp.propTypes = {
  className: PropTypes.string,
};
SignUp.defaultProps = {
  className: '',
};
