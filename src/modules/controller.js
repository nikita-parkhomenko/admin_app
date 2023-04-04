
// outsource dependencies
import { create } from 'redux-saga-controller';
import { takeEvery, put, delay, call, select, fork } from 'redux-saga/effects';

// local dependencies
import staticSaga from './static.saga';
import { SIGN_IN } from '../constants';
import { silence, API } from '../services';


export const appRootCtrl = create({
  prefix: 'app',
  actions: {
    signOut: 'SIGN_OUT',
    initialize: 'INITIALIZE',
    unauthorized: 'UNAUTHORIZED',

    // static saga actions
    getCountries: 'GET_COUNTRIES',
  },
  initial: {
    initialized: false,             // prevent redirect from page and show instead current page - global preloader
    health: true,                   // prevent redirect from page and show instead current page and its behavior - maintenance page
    user: null,                     // logged user information

    // static data
    countries: [],
  },
  subscriber: function * () {
    yield takeEvery(appRootCtrl.action.signOut.TYPE, silence, signOutSaga);
    yield takeEvery(appRootCtrl.action.initialize.TYPE, silence, initializeSaga);
    yield takeEvery(appRootCtrl.action.unauthorized.TYPE, silence, unauthorizedSaga);

    // connect nested sagas
    yield fork(staticSaga);
  }
});

function * initializeSaga ({ type, payload }) {
  try {
    // NOTE check health of API
    const { status } = { status: 'UP' };
    // const { status } = yield call(API, { method: 'GET', url: '/actuator/health' });
    if (status !== 'UP') throw new Error('API down for maintenance');
    yield put(appRootCtrl.action.updateCtrl({ health: true }));
  } catch ({ message: error1 }) {
    yield put(appRootCtrl.action.updateCtrl({ health: false }));
    // NOTE try again after delay
    yield delay(10 * 1000);
    yield put(appRootCtrl.action.initialize({}));
    return;
  }

  const hasSession = yield call(API.hasStoredSession);
  // NOTE try to restore user auth
  if (hasSession) {
    try {
      yield call(API.restoreSessionFromStore);
      yield call(getSelfSaga, {});
    } catch ({ message: error2 }) {
      yield call(signOutSaga, {});
    }
  }
  // NOTE initialization done
  yield put(appRootCtrl.action.updateCtrl({ initialized: true }));
}

export function * getSelfSaga ({ type, payload }) {
  const user = yield call(API, { method: 'GET', url: '/users/self' });
  yield put(appRootCtrl.action.updateCtrl({ user }));
}

function * signOutSaga ({ type, payload }) {
  const { user: self } = yield select(appRootCtrl.select);

  // NOTE clear client side session from store
  yield call(API.setupSession, null);
  // NOTE use silence helper if you don't want to handle error
  yield call(silence, API, { method: 'POST', url: '/auth/logout', data: {} });
  // NOTE remove logged user
  yield put(appRootCtrl.action.updateCtrl({ user: null }));
  // NOTE fire synthetic action to notify app
  yield put(appRootCtrl.action.unauthorized(self));
}

function * unauthorizedSaga ({ type, payload }) {
  // NOTE for now navigate to Sign In page
  yield call(SIGN_IN.REPLACE, {});
}
