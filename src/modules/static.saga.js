
// outsource dependencies
import _ from 'lodash';
import { takeLatest, select, call, put } from 'redux-saga/effects';

// local dependencies
import { silence, API } from '../services';
import { appRootCtrl } from './controller';

// configure
export default function * () {
  yield takeLatest(appRootCtrl.action.getCountries.TYPE, silence, getCountriesSaga);
}

function * getCountriesSaga () {
  const { countries: current } = yield select(appRootCtrl.select);
  // NOTE no need to fetch data again
  if (_.get(current, 'cached')) return null;

  const { content: countries } = yield call(API, {
    method: 'POST',
    data: { name: '' },
    url: '/location/country',
    params: { page: 0, size: 512 },
  });
  countries.cached = true;
  yield put(appRootCtrl.action.updateCtrl({ countries }));
}
