
// outsource dependencies
import { toast } from 'react-toastify';
import { create } from 'redux-saga-controller';
import { takeEvery, call, put } from 'redux-saga/effects';

// local dependencies
import { appRootCtrl } from '../controller';
import { USERS_LIST } from '../../constants';
import { silence, API } from '../../services';

// configure
export const signInCtrl = create({
  prefix: 'sign-in',
  actions: {
    signIn: 'SIGN_IN',
    initialize: 'INITIALIZE',
  },
  initial: {
    disabled: false,
    errorMessage: null,
    initialized: false,
  },
  subscriber: function * () {
    yield takeEvery(signInCtrl.action.signIn.TYPE, silence, signInSaga);
    yield takeEvery(signInCtrl.action.initialize.TYPE, silence, initializeSaga);
  }
});

function * initializeSaga ({ type, payload }) {
  // NOTE do nothing
  yield put(signInCtrl.action.updateCtrl({ initialized: true }));
}

function * signInSaga ({ type, payload }) {
  yield put(signInCtrl.action.updateCtrl({ disabled: true, errorMessage: null }));
  try {
    // const session = yield call(API, { data: payload, method: 'POST', url: '/auth/token' });
    // yield call(API.setupSession, session);
    // const self = yield call(API.getSelf, {});
    const self = { firstName: 'John', lastName: 'Doe' };
    yield put(appRootCtrl.action.updateCtrl({ user: self }));
    yield call(toast.success, 'It\'s pleasure to see you');
    yield call(USERS_LIST.REPLACE, {});
  } catch ({ message }) {
    yield call(API.setupSession, null);
    yield put(signInCtrl.action.updateCtrl({ errorMessage: message }));
  }
  yield put(signInCtrl.action.updateCtrl({ disabled: false }));
}
