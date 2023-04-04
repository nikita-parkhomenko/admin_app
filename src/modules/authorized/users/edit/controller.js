
// outsource dependencies
import _ from 'lodash';
import { toast } from 'react-toastify';
import { create } from 'redux-saga-controller';
import { call, put, takeEvery, select } from 'redux-saga/effects';

// local dependencies
import { API, silence } from '../../../../services';
import { NEW_ID, USERS_LIST } from '../../../../constants';


export const userEditCtrl = create({
  prefix: 'user-edit',
  actions: {
    initialize: 'INITIALIZE',
    updateUser: 'UPDATE_USER',
  },
  initial: {
    initialized: false,
    errorMessage: null,
    disabled: false,
    user: {},
  },
  subscriber: function * () {
    yield takeEvery(userEditCtrl.action.initialize.TYPE, silence, initializeExe);
    yield takeEvery(userEditCtrl.action.updateUser.TYPE, silence, updateUserExe);
  }
});

function * initializeExe ({ type, payload }) {
  const userId = _.get(payload, 'id');
  if (userId !== NEW_ID) {
    const initial = yield call(API, { method: 'GET', url: `/users/${userId}` });
    yield put(userEditCtrl.action.updateCtrl({ userId, initial }));
  }
  yield put(userEditCtrl.action.updateCtrl({ initialized: true, isNew: userId === NEW_ID }));
}

function * updateUserExe ({ type, payload }) {
  const { isNew, userId } = yield select(userEditCtrl.select);
  try {
    yield call(API, {
      method: isNew ? 'POST' : 'PUT',
      url: `/users/${isNew ? '' : userId}`,
      data: payload,
    });
    yield call(toast.success, `User successfully ${isNew ? 'created' : 'updated'}!`);
    yield call(USERS_LIST.PUSH, {});
  } catch ({ message }) {
    yield put(userEditCtrl.action.updateCtrl({ errorMessage: message }));
  }
}
