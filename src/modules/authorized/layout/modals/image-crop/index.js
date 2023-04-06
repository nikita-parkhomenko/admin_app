
// outsource dependencies
import _ from 'lodash';
import React, { memo, useCallback } from 'react';
import { useController } from 'redux-saga-controller';
import ReactCrop, { makeAspectCrop } from 'react-image-crop';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';

// local dependencies
import { useImageCropModal } from './hooks';
import { ImageCropTrigger } from './trigger';
import { imageCropCtrl } from './controller';
import { Preloader, AlertError } from '../../../../../components';


export { useImageCropModal, ImageCropTrigger };

export const ImageCropModal = memo(function ImageCropModal () {
  const [
    { originalUrl, isOpen, crop, disabled, initialized, imageWidth, imageHeight, aspect, errorMessage },
    { updateCtrl, cropImageLoaded, dismiss, apply },
  ] = useController(imageCropCtrl);

  const isApplyDisabled = disabled || _.get(crop, 'width') < 10;
  const handleDismiss = useCallback(() => dismiss(), [dismiss]);
  const handleApply = useCallback(() => apply(), [apply]);
  const handleChange = useCallback(crop => updateCtrl({
    crop: makeAspectCrop({ ...crop, aspect }, imageWidth, imageHeight)
  }), [updateCtrl, aspect, imageWidth, imageHeight]);

  return <Modal id="ImageCropModal" isOpen={isOpen}>
    <ModalHeader tag="h5"> Select Image Area </ModalHeader>
    <ModalBody className="text-center">
      <Preloader active={!initialized} className="preloader">
        <ReactCrop
          crop={crop}
          src={originalUrl}
          disabled={disabled}
          onChange={handleChange}
          onImageLoaded={cropImageLoaded}
          imageStyle={{ maxHeight: 'none' }}
        />
      </Preloader>
      <AlertError message={errorMessage} className="m-0" />
    </ModalBody>
    <ModalFooter>
      <Button color="none" onClick={handleDismiss} className="rounded-pill" disabled={disabled}>
        CANCEL
      </Button>
      <Button color="primary" onClick={handleApply} className="rounded-pill" disabled={isApplyDisabled}>
        APPLY
      </Button>
    </ModalFooter>
  </Modal>;
});
