
// outsource dependencies
import _ from 'lodash';
import { toast } from 'react-toastify';
import { create } from 'redux-saga-controller';
import { takeEvery, put, call, select } from 'redux-saga/effects';

// local dependencies
import { USERS_LIST } from '../../../../constants';
import { API, silence, Swall } from '../../../../services';


export const usersListCtrl = create({
  prefix: 'users-list',
  actions: {
    initialize: 'INITIALIZE',
    deleteItem: 'DELETE_ITEM',
    updateFilter: 'UPDATE_FILTER',
  },
  initial: {
    list: [],
    totalPages: 0,
    disabled: false,
    initialized: false,
    errorMessage: null,
    // NOTE filters defaults comes from query
    page: 0,
    size: 10,
    search: '',
    sortD: false,
    sortF: '',
    state: null,
  },
  subscriber: function * () {
    yield takeEvery(usersListCtrl.action.initialize.TYPE, silence, initializeExe);
    yield takeEvery(usersListCtrl.action.deleteItem.TYPE, silence, deleteItemExe);
    yield takeEvery(usersListCtrl.action.updateFilter.TYPE, silence, updateFilterExe);
  }
});

function * initializeExe ({ type, payload }) {
  // yield put(usersListCtrl.action.clearCtrl());
  const query = yield call(USERS_LIST.QUERY);
  yield call(updateFilterExe, { type, payload: { ...query } });
  yield put(usersListCtrl.action.updateCtrl({ initialized: true }));
}

function * updateFilterExe ({ type, payload }) {
  yield put(usersListCtrl.action.updateCtrl({ ...payload, disabled: true, errorMessage: null }));
  try {
    // const { page, search, status, size, sortF, sortD, } = yield select(usersListCtrl.select);
    // TODO BE implementation
    // const { content, totalPages, pageNumber } = yield call(API, {
    //   method: 'POST',
    //   url: 'http://TODO/users/filter',
    //   data: { search, userState: status },
    //   params: { page, size, sort: [`${sortF},${sortD ? 'DESC' : 'ASC'}`] },
    // });
    // yield put(usersListCtrl.action.updateCtrl({ list: content, totalPages, page: pageNumber }));
    yield put(usersListCtrl.action.updateCtrl({ list: [
      { firstName: 'Fake', lastName: 'Mocked data', id: 0 },
      { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 },
      { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }, { id: 11 }, { id: 12 },
    ] }));
    const latest = yield select(usersListCtrl.select);
    yield call(USERS_LIST.REPLACE, {}, latest);
  } catch ({ message }) {
    yield put(usersListCtrl.action.updateCtrl({ errorMessage: message }));
  }
  yield put(usersListCtrl.action.updateCtrl({ disabled: false }));
}

function * deleteItemExe ({ type, payload }) {
  const id = _.get(payload, 'id');
  const name = _.get(payload, 'name');
  try {
    const confirmation = yield call(Swall.confirm, {
      title: `Are you sure you want to delete user "${name}"?`
    });
    if (!confirmation.value) { return null; }
    yield put(usersListCtrl.action.updateCtrl({ disabled: true }));
    // TODO BE implementation
    yield call(API, { method: 'DELETE', url: `/users/${id}` });
    yield call(toast.success, 'The user status has been changed to inactive!');
    yield put(usersListCtrl.action.initialize({}));
  } catch ({ message }) {
    yield call(Swall.error, { title: message });
  }
  yield put(usersListCtrl.action.updateCtrl({ disabled: false }));
}
