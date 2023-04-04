
// outsource dependencies
import _ from 'lodash';
import { toast } from 'react-toastify';
import { create } from 'redux-saga-controller';
import { takeEvery, put, call, select } from 'redux-saga/effects';

// local dependencies
import { appRootCtrl } from '../controller';
import { USERS_LIST } from '../../constants';
import { API, silence } from '../../services';

export const resetPasswordCtrl = create({
  prefix: 'reset-password',
  actions: {
    initialize: 'INITIALIZE',
    resetPassword: 'RESET_PASSWORD',
  },
  initial: {
    token: null,
    disabled: false,
    initialized: false,
    errorMessage: null,
  },
  subscriber: function * () {
    yield takeEvery(resetPasswordCtrl.action.initialize.TYPE, silence, initializeSaga);
    yield takeEvery(resetPasswordCtrl.action.resetPassword.TYPE, silence, resetPasswordSaga);
  }
});

function * initializeSaga ({ type, payload }) {
  const resetToken = _.get(payload, 'resetToken');
  try {
    yield call(API, {
      method: 'POST',
      data: { resetToken },
      url: '/users/set-password/validate',
    });
    // NOTE token is fine
    yield put(resetPasswordCtrl.action.updateCtrl({ token: resetToken }));
  } catch ({ message: errorMessage }) {
    yield put(resetPasswordCtrl.action.updateCtrl({ errorMessage }));
  }
  yield put(resetPasswordCtrl.action.updateCtrl({ initialized: true }));
}

function * resetPasswordSaga ({ type, payload }) {
  yield put(resetPasswordCtrl.action.updateCtrl({ disabled: true, errorMessage: null }));
  const { token: resetToken } = yield select(resetPasswordCtrl.select);
  try {
    const session = yield call(API, {
      method: 'POST',
      url: '/users/set-password',
      data: { resetToken, password: _.get(payload, 'password') }
    });
    yield call(API.setupSession, session);
    const self = yield call(API.getSelf, {});
    yield put(appRootCtrl.action.updateCtrl({ user: self }));
    yield call(toast.success, 'We are glad to see you again !');
    yield call(USERS_LIST.REPLACE, {});
    // NOTE notify other modules
    yield put(appRootCtrl.action.authorized(self));
  } catch ({ message: errorMessage }) {
    yield put(resetPasswordCtrl.action.updateCtrl({ errorMessage }));
  }
  yield put(resetPasswordCtrl.action.updateCtrl({ disabled: false }));
}
