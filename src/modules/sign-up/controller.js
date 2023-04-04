
// outsource dependencies
import { toast } from 'react-toastify';
import { create } from 'redux-saga-controller';
import { takeEvery, put, call } from 'redux-saga/effects';

// local dependencies
import { appRootCtrl } from '../controller';
import { API, silence } from '../../services';
import { WELCOME_SCREEN } from '../../constants';

export const signUpCtrl = create({
  prefix: 'sign-up',
  actions: {
    initialize: 'INITIALIZE',
    createUser: 'CREATE_USER'
  },
  initial: {
    disabled: false,
    initialValues: {},
    initialized: false,
    errorMessage: null,
  },
  subscriber: function * () {
    yield takeEvery(signUpCtrl.action.initialize.TYPE, silence, initializeSaga);
    yield takeEvery(signUpCtrl.action.createUser.TYPE, silence, createUserSaga);
  }
});

function * initializeSaga ({ type, payload }) {
  // NOTE do nothing
  yield put(signUpCtrl.action.updateCtrl({ initialized: true }));
}

function * createUserSaga ({ type, payload }) {
  yield put(signUpCtrl.action.updateCtrl({ disabled: true, errorMessage: null }));
  try {
    // TODO implement
    // const self = yield call(API.signUp, payload);
    const self = { firstName: 'John', lastName: 'Doe' };
    // NOTE update logged user
    yield put(appRootCtrl.action.updateCtrl({ user: self }));
    yield call(toast.success, 'User created!');
    yield call(WELCOME_SCREEN.PUSH, {});
    yield call(toast.success, 'Welcome! We pleasure to see you');
  } catch ({ message }) {
    yield put(signUpCtrl.action.updateCtrl({ errorMessage: message }));
  }
  yield put(signUpCtrl.action.updateCtrl({ disabled: false }));
}
