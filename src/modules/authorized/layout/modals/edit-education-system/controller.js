
// outsource dependencies
import _ from 'lodash';
import { toast } from 'react-toastify';
import { create } from 'redux-saga-controller';
import { takeEvery, put, call, delay, select } from 'redux-saga/effects';

// local dependencies
import { silence, API } from '../../../../../services';
import { EDUCATION_SYSTEM_EDIT, NEW_ID } from '../../../../../constants';


// configure
const initial = {
  name: '',
  language: '',
};

export const editEducationSystemCtrl = create({
  prefix: 'edit-education-system',
  actions: {
    apply: 'APPLY',
    dismiss: 'DISMISS',
    initialize: 'INITIALIZE',
  },
  initial: {
    isOpen: false,
    disabled: false,
    initialized: false,
    errorMessage: null,
    initialValues: null,
  },
  subscriber: function * () {
    yield takeEvery(editEducationSystemCtrl.action.apply.TYPE, silence, applySaga);
    yield takeEvery(editEducationSystemCtrl.action.dismiss.TYPE, silence, closeSaga);
    yield takeEvery(editEducationSystemCtrl.action.initialize.TYPE, silence, initializeSaga);
  }
});

function * initializeSaga ({ type, payload }) {
  yield put(editEducationSystemCtrl.action.updateCtrl({ isOpen: true }));
  const id = _.get(payload, 'id');
  try {
    if (id !== NEW_ID) {
      const eduSystem = yield call(API, { method: 'GET', url: `/education-systems/${id}` });
      const initialValues = {
        name: _.get(eduSystem, 'name'),
        language: _.get(eduSystem, 'language')
      };
      yield put(editEducationSystemCtrl.action.updateCtrl({ initialValues, id: _.get(eduSystem, 'id') }));
    } else {
      yield put(editEducationSystemCtrl.action.updateCtrl({ initialValues: initial }));
    }
  } catch ({ message }) {
    yield put(editEducationSystemCtrl.action.updateCtrl({ errorMessage: message }));
  }
  yield put(editEducationSystemCtrl.action.updateCtrl({ initialized: true, isNew: id === NEW_ID }));
}

function * applySaga ({ type, payload }) {
  yield put(editEducationSystemCtrl.action.updateCtrl({ errorMessage: null, disabled: true }));
  try {
    const { isNew, id: educationSystemId } = yield select(editEducationSystemCtrl.select);
    // TODO sync request with BE
    // yield call(API, {
    //   method: isNew ? 'POST' : 'PUT',
    //   url: `/education-systems/${isNew ? '' : educationSystemId}`,
    //   data: payload,
    // });
    yield call(toast.success, `Education system successfully ${isNew ? 'created' : 'updated'}!`);
    if (isNew) {
      // TODO BE should return id of created edu system
      const response = { id: 1 };
      const id = _.get(response, 'id');
      yield call(EDUCATION_SYSTEM_EDIT.PUSH, { id });
    }
    yield call(closeSaga);
  } catch ({ message: errorMessage }) {
    yield put(editEducationSystemCtrl.action.updateCtrl({ errorMessage }));
  }
  yield put(editEducationSystemCtrl.action.updateCtrl({ disabled: false }));
}

function * closeSaga () {
  yield put(editEducationSystemCtrl.action.updateCtrl({ isOpen: false }));
  yield delay(3e2); // NOTE give chance to animation
  yield put(editEducationSystemCtrl.action.clearCtrl());
}
