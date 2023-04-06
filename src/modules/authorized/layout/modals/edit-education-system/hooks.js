
// outsource dependencies
import { useCallback } from 'react';
import { useControllerActions } from 'redux-saga-controller';

// local dependencies
import { editEducationSystemCtrl } from './controller';


// Edit Education modal hook
export const useEditEducationSystemModal = () => {
  const { initialize, dismiss } = useControllerActions(editEducationSystemCtrl);
  return [initialize, useCallback(() => dismiss(), [dismiss])];
};
