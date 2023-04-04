
// outsource dependencies
import _ from 'lodash';
import { create } from 'redux-saga-controller';
import { takeEvery, put, call } from 'redux-saga/effects';

// local dependencies
import { appRootCtrl } from '../controller';
import { API, silence } from '../../services';

export const emailConfirmationCtrl = create({
  prefix: 'email-confirmation',
  actions: {
    initialize: 'INITIALIZE',
  },
  initial: {
    success: false,
    initialized: false,
  },
  subscriber: function * () {
    yield takeEvery(emailConfirmationCtrl.action.initialize.TYPE, silence, initializeSaga);
  }
});

function * initializeSaga ({ type, payload }) {
  const activationToken = _.get(payload, 'token');
  try {
    const session = yield call(API, {
      method: 'POST',
      url: '/users/activate',
      data: { activationToken }
    });
    // NOTE token is fine
    yield call(API.setupSession, session);
    const self = yield call(API.getSelf);
    // NOTE update logged user
    yield put(appRootCtrl.action.updateCtrl({ user: self }));
    yield put(appRootCtrl.action.authorized(self));
    yield put(emailConfirmationCtrl.action.updateCtrl({ success: true }));
  } catch ({ message: errorMessage }) {
    yield put(emailConfirmationCtrl.action.updateCtrl({ errorMessage }));
  }
  yield put(emailConfirmationCtrl.action.updateCtrl({ initialized: true }));
}
