
// outsource dependencies
import React, { memo, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useController } from 'redux-saga-controller';
import { Container, Row, Col, Button } from 'reactstrap';

// local dependencies
import { userEditCtrl } from './controller';
import { AlertError, Preloader } from '../../../../components';


// configure
const rolesOptions = [{ label: 'Admin', value: 'ADMIN' }, { label: 'User', value: 'USER' }];

export const UserEdit = memo(function UserEdit () {
  const [
    { initialized, isNew, disabled, errorMessage },
    { initialize, updateUser }
  ] = useController(userEditCtrl);

  const { id } = useParams();
  useEffect(() => { initialize({ id }); }, [initialize, id]);

  return <Container id="UserEdit" className="user-edit">
    <Preloader active={!initialized} className="vh-100">
      <Row>
        <Col xs="12" className="mb-3">
          <h2> { isNew ? 'Create' : 'Edit' } User </h2>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <AlertError message={errorMessage} />
        </Col>
      </Row>
      <Row>
        <Col xs={{ size: 8, offset: 2 }}>
          Edit User form
        </Col>
      </Row>
    </Preloader>
  </Container>;
});
