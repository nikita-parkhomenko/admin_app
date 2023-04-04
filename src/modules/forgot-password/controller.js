// outsource dependencies
import { toast } from 'react-toastify';
import { create } from 'redux-saga-controller';
import { takeEvery, put, call } from 'redux-saga/effects';

// local dependencies
import { SIGN_IN } from '../../constants';
import { API, silence } from '../../services';
import { signInCtrl } from '../sign-in/controller';


export const forgotPasswordCtrl = create({
  prefix: 'forgot-password',
  actions: {
    initialize: 'INITIALIZE',
    forgotPassword: 'FORGOT_PASSWORD',
  },
  initial: {
    disabled: false,
    errorMessage: null,
  },
  subscriber: function * () {
    yield takeEvery(signInCtrl.action.initialize.TYPE, silence, initializeSaga);
    yield takeEvery(forgotPasswordCtrl.action.forgotPassword.TYPE, silence, forgotPasswordSaga);
  }
});

function * initializeSaga ({ type, payload }) {
  // NOTE do nothing
  yield put(signInCtrl.action.updateCtrl({ initialized: true }));
}

function * forgotPasswordSaga ({ type, payload }) {
  yield put(forgotPasswordCtrl.action.updateCtrl({ disabled: true, errorMessage: null }));
  try {
    yield call(API, { method: 'POST', url: '/users/send-reset-password-email', data: payload });
    yield call(toast.success, 'Email sent successfully. Please check your mailbox.');
    yield call(SIGN_IN.REPLACE, {});
  } catch ({ message: errorMessage }) {
    yield put(forgotPasswordCtrl.action.updateCtrl({ errorMessage }));
  }
  yield put(forgotPasswordCtrl.action.updateCtrl({ disabled: false }));
}
