
// outsource dependencies
import _ from 'lodash';
import * as Yup from 'yup';
import React, { memo } from 'react';
import { Form, Formik, Field } from 'formik';
import { useController } from 'redux-saga-controller';
import { Button, Col, Container, Modal, Row } from 'reactstrap';

// local dependencies
import { VALID } from '../../../../../constants';
import { editEducationSystemCtrl } from './controller';
import { FormikInput, Preloader, AlertError, FormikSelect } from '../../../../../components';


export * from './hooks';

// configure
const mockLanguageOptions = [{ id: 'ENG', name: 'English' }, { id: 'UKR', name: 'Ukraine' }];
const getOptionValue = item => _.get(item, 'id');
const getOptionLabel = item => _.get(item, 'name');
const validate = Yup.object({
  name: VALID.NAME.required('Name is required'),
  language: VALID.STRING.required('Language is required'),
});

export const EditEducationSystemModal = memo(function EditEducationSystemModal () {
  const [
    { isOpen, disabled, initialized, errorMessage, initialValues, isNew },
    { dismiss, apply },
  ] = useController(editEducationSystemCtrl);

  const name = _.get(initialValues, 'name');

  return <Modal id="EditEducationSystem" isOpen={isOpen}>
    <Container className="p-3">
      <Row className="mb-4">
        <Col xs={12} className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            {isNew ? 'Create Education system' : `Edit ${name}`}
          </h5>
          <Button close onClick={dismiss}/>
        </Col>
      </Row>
      <AlertError message={errorMessage} />
      <Preloader active={!initialized} style={{ height: '200px' }}>
        <Formik initialValues={initialValues} onSubmit={apply} validationSchema={validate}>
          <Form>
            <Row>
              <Col xs={12}>
                <Field
                  name="name"
                  label="Name"
                  placeholder="Name"
                  disabled={disabled}
                  component={FormikInput}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Field
                  isSimple
                  name="language"
                  label="Language"
                  disabled={disabled}
                  placeholder="Language"
                  component={FormikSelect}
                  options={mockLanguageOptions}
                  getOptionValue={getOptionValue}
                  getOptionLabel={getOptionLabel}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Button type="submit" block color="primary"> {isNew ? 'Create' : 'Save'} </Button>
              </Col>
            </Row>
          </Form>
        </Formik>
      </Preloader>
    </Container>
  </Modal>;
});
