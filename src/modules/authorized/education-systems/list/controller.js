
// outsource dependencies
import _ from 'lodash';
import { toast } from 'react-toastify';
import { create } from 'redux-saga-controller';
import { takeEvery, put, call, select, delay } from 'redux-saga/effects';

// local dependencies
import { educationSystems as mock } from '../mock';
import { API, silence, Swall } from '../../../../services';
import { EDUCATION_SYSTEMS_LIST } from '../../../../constants';


export const educationSystemsListCtrl = create({
  prefix: 'education-systems-list',
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
  },
  subscriber: function * () {
    yield takeEvery(educationSystemsListCtrl.action.initialize.TYPE, silence, initializeSaga);
    yield takeEvery(educationSystemsListCtrl.action.deleteItem.TYPE, silence, deleteItemSaga);
    yield takeEvery(educationSystemsListCtrl.action.updateFilter.TYPE, silence, updateFilterSaga);
  }
});

function * initializeSaga ({ type, payload }) {
  // yield put(educationSystemsListCtrl.action.clearCtrl());
  const query = yield call(EDUCATION_SYSTEMS_LIST.QUERY);
  yield delay(400 * 3);
  yield call(updateFilterSaga, { type, payload: { ...query } });
  yield put(educationSystemsListCtrl.action.updateCtrl({ initialized: true }));
}

function * updateFilterSaga ({ type, payload }) {
  yield put(educationSystemsListCtrl.action.updateCtrl({ ...payload, disabled: true, errorMessage: null }));
  try {
    // const { page, search, size, sortF, sortD, } = yield select(educationSystemsListCtrl.select);
    // TODO BE implementation
    // const { content, totalPages, pageNumber } = yield call(API, {
    //   method: 'POST',
    //   url: 'http://TODO/education-system/filter',
    //   data: { search },
    //   params: { page, size, sort: [`${sortF},${sortD ? 'DESC' : 'ASC'}`] },
    // });
    // yield put(educationSystemsListCtrl.action.updateCtrl({ list: content, totalPages, page: pageNumber }));
    yield put(educationSystemsListCtrl.action.updateCtrl({ list: mock, totalPages: 12 }));
    const latest = yield select(educationSystemsListCtrl.select);
    yield call(EDUCATION_SYSTEMS_LIST.REPLACE, {}, latest);
  } catch ({ message }) {
    yield put(educationSystemsListCtrl.action.updateCtrl({ errorMessage: message }));
  }
  yield put(educationSystemsListCtrl.action.updateCtrl({ disabled: false }));
}

function * deleteItemSaga ({ type, payload }) {
  const id = _.get(payload, 'id');
  const name = _.get(payload, 'name');
  try {
    const confirmation = yield call(Swall.confirm, {
      title: `Are you sure you want to delete "${name}"?`
    });
    if (!confirmation.value) { return null; }
    yield put(educationSystemsListCtrl.action.updateCtrl({ disabled: true }));
    // TODO BE implementation
    yield call(API, { method: 'DELETE', url: `/education-system/${id}` });
    yield call(toast.success, 'The education system status has been changed to inactive!');
    yield put(educationSystemsListCtrl.action.initialize({}));
  } catch ({ message }) {
    yield call(Swall.error, { title: message });
  }
  yield put(educationSystemsListCtrl.action.updateCtrl({ disabled: false }));
}
