
// outsource dependencies
import cn from 'classnames';
import React, { memo, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Button, Card } from 'reactstrap';
import { useController } from 'redux-saga-controller';

// local dependencies
import { Preloader } from '../../components';
import { emailConfirmationCtrl } from './controller';
import { SIGN_IN, USERS_LIST } from '../../constants';
import { OwlStarsImage, OwlQuestionImage } from '../../assets';

export const EmailConfirmation = memo(function EmailConfirmation ({ className }) {
  const [
    { initialized, success },
    { initialize },
  ] = useController(emailConfirmationCtrl);

  const { token } = useParams();
  useEffect(() => { initialize({ token }); }, [initialize, token]);

  return <div id="EmailConfirmation" className={cn('email-confirmation', className)}>
    <Preloader active={!initialized} className="preloader">
      { !success ? <Card body className="holder error">
        <Row>
          <Col xs={12} className="mb-5 text-center">
            <OwlQuestionImage className="owl-image" />
          </Col>
        </Row>
        <Row className="mb-4">
          <Col tag="h4" xs={12} className="text-center"> Confirmation link is invalid </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <h6> Unfortunately, your account registration has not been confirmed. This could happen if: </h6>
            <ul>
              <li> it has been more than 24 hours since the link was sent </li>
              <li> the link is incorrect </li>
              <li> the link has already been used </li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Button tag={Link} to={SIGN_IN.LINK()} color="primary mb-3">
              Sign in
            </Button>
          </Col>
        </Row>
      </Card> : <Card body className="holder success">
        <Row>
          <Col xs={12} className="mb-5 text-center">
            <OwlStarsImage className="owl-image" />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col tag="h4" xs={12} className="text-center"> Thank you </Col>
        </Row>
        <Row className="mb-3">
          <Col tag="p" xs={12} className="text-center">
            Your registration have been successfully confirmed!
            <br />We are happy to see you on our platform
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="text-center">
            <Button to={USERS_LIST.LINK()} tag={Link} color="primary" className="text-nowrap mb-3">
              Continue to Djema
            </Button>
          </Col>
        </Row>
      </Card> }
    </Preloader>
  </div>;
});
