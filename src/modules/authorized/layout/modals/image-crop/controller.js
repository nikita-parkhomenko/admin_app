
// outsource dependencies
import _ from 'lodash';
import { create } from 'redux-saga-controller';
import { makeAspectCrop } from 'react-image-crop';
import { takeEvery, put, call, delay, select } from 'redux-saga/effects';

// local dependencies
import { silence, API } from '../../../../../services';

// configure
const fileToDataUrl = file => new Promise(resolve => {
  const reader = new FileReader();
  reader.addEventListener('load', () => resolve(reader.result), false);
  reader.readAsDataURL(file);
});

export const imageCropCtrl = create({
  prefix: 'image-crop',
  actions: {
    apply: 'APPLY',
    dismiss: 'DISMISS',
    initialize: 'INITIALIZE',
    cropImageLoaded: 'CROP_IMAGE_LOADED',
  },
  initial: {
    crop: {},
    dir: '',
    aspect: 1,
    imageWidth: 0,
    imageHeight: 0,

    onSuccess: null,
    isOpen: false,
    disabled: false,
    originalUrl: null,
    initialized: false,
    errorMessage: null,
  },
  subscriber: function * () {
    yield takeEvery(imageCropCtrl.action.apply.TYPE, silence, applySaga);
    yield takeEvery(imageCropCtrl.action.dismiss.TYPE, silence, closeSaga);
    yield takeEvery(imageCropCtrl.action.initialize.TYPE, silence, initializeSaga);
    yield takeEvery(imageCropCtrl.action.cropImageLoaded.TYPE, silence, cropImageLoadedSaga);
  }
});

function * initializeSaga ({ type, payload }) {
  const file = _.get(payload, 'file');
  yield put(imageCropCtrl.action.updateCtrl({ ...payload, isOpen: true }));
  // NOTE prepare image src for preview
  const originalUrl = yield call(fileToDataUrl, file);
  yield put(imageCropCtrl.action.updateCtrl({ originalUrl, initialized: true }));
}

function * applySaga ({ type, payload }) {
  yield put(imageCropCtrl.action.updateCtrl({ errorMessage: null, disabled: true }));
  const { onSuccess } = yield select(imageCropCtrl.select);
  try {
    const data = yield call(formatData);
    const result = yield call(API, {
      headers: { 'Content-Type': 'multipart/form-data' },
      url: '/images/upload',
      method: 'POST',
      data,
    });
    if (_.isFunction(onSuccess)) {
      yield call(silence, onSuccess, result);
    }
    yield call(closeSaga);
  } catch ({ message: errorMessage }) {
    yield put(imageCropCtrl.action.updateCtrl({ errorMessage }));
  }
  yield put(imageCropCtrl.action.updateCtrl({ disabled: false }));
}

function * closeSaga () {
  yield put(imageCropCtrl.action.updateCtrl({ isOpen: false }));
  yield delay(3e2); // NOTE give chance to animation
  yield put(imageCropCtrl.action.clearCtrl());
}

function * cropImageLoadedSaga ({ type, payload }) {
  const imageWidth = payload.width;
  const imageHeight = payload.height;
  const { aspect } = yield select(imageCropCtrl.select);
  yield put(imageCropCtrl.action.updateCtrl({ crop: { aspect }, imageWidth, imageHeight }));
  yield delay(3e2);
  const { crop } = yield select(imageCropCtrl.select);
  // NOTE lets try to find optimal initial selection based on image sizes
  const imageAspect = imageWidth / imageHeight;
  let width, height, x, y;
  if (imageAspect <= aspect) {
    width = imageWidth;
    height = Math.ceil(width / aspect);
    x = 0;
    y = Math.ceil((imageHeight - height) / 2);
  } else {
    height = imageHeight;
    width = Math.ceil(height * aspect);
    y = 0;
    x = Math.ceil((imageWidth - width) / 2);
  }
  // console.log(`%c ${type} `, 'color: #FF6766; font-weight: bolder; font-size: 12px;'
  //   , '\n x:', x
  //   , '\n y:', y
  //   , '\n width:', width
  //   , '\n height:', height
  //   , '\n aspect:', aspect
  //   , '\n imageAspect:', imageAspect
  //   , '\n imageWidth:', imageWidth
  //   , '\n imageHeight:', imageHeight
  // );
  yield put(imageCropCtrl.action.updateCtrl({
    crop: makeAspectCrop({ ...crop, x, y, aspect, width, height }, imageWidth, imageHeight),
  }));
}

function * formatData () {
  const { file, dir, crop, imageHeight, imageWidth } = yield select(imageCropCtrl.select);
  // NOTE convert to percents
  const percent = {
    x: crop.x ? (crop.x / imageWidth) : 0,
    y: crop.y ? (crop.y / imageHeight) : 0,
    width: fixPercent(crop.width / imageWidth),
    height: fixPercent(crop.height / imageHeight),
  };
  const formData = new FormData();
  formData.append('dir', dir);
  formData.append('file', file);
  formData.append('x', percent.x);
  formData.append('y', percent.y);
  formData.append('width', percent.width);
  formData.append('height', percent.height);
  return formData;
}
// NOTE in case image width or size 100% the crop service select "1" as 1px instead 100%
const fixPercent = dimension => isNaN(dimension) ? 0 : dimension === 1 ? 0.9999999 : dimension;
