
// outsource dependencies
import { useCallback } from 'react';
import { useControllerActions } from 'redux-saga-controller';

// local dependencies
import { imageCropCtrl } from './controller';


// Image Crop modal hook
export const useImageCropModal = () => {
  const { initialize, dismiss } = useControllerActions(imageCropCtrl);
  return [initialize, useCallback(() => dismiss(), [dismiss])];
};
