
// outsource dependencies
import _ from 'lodash';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import React, { memo, useCallback, useMemo } from 'react';

// local dependencies
import { useImageCropModal } from './hooks';
import { useRefCallback } from '../../../../hooks';
import { IMG_DIR } from '../../../../../constants';
import { validateFileSize } from '../../../../../services';


export const ImageCropTrigger = memo(function ImageCropTrigger ({ children, className, accept, aspect, dir, onCropDone, ...props }) {
  const id = useMemo(() => _.uniqueId('hidden-input-'), []);
  const [inputRef, ref] = useRefCallback();
  const [openCropModal] = useImageCropModal();

  // NOTE actions
  const handleClearInput = useCallback(() => { inputRef && inputRef.value && (inputRef.value = null); }, [inputRef]);
  const handleCrop = useCallback(
    file => openCropModal({ file, dir, onSuccess: onCropDone, aspect: Number(aspect) }),
    [openCropModal, dir, onCropDone, aspect]
  );
  const handleFileSelect = useCallback(event => {
    const file = _.get(event, 'target.files.0');
    const error = validateFileSize(file);
    if (error) {
      toast.error(error);
    } else {
      handleCrop(file);
    }
    // NOTE clean up to allow select same file
    setTimeout(handleClearInput(), 100);
  }, [handleCrop, handleClearInput]);

  return <label htmlFor={id} {...props} className={cn('image-crop-trigger', className)}>
    { children }
    <input
      id={id}
      ref={ref}
      type="file"
      accept={accept}
      multiple={false}
      className="d-none"
      onChange={handleFileSelect}
    />
  </label>;
});

ImageCropTrigger.propTypes = {
  accept: PropTypes.string,
  className: PropTypes.string,
  onCropDone: PropTypes.func.isRequired,
  dir: PropTypes.oneOf(Object.values(IMG_DIR)),
  aspect: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.element, PropTypes.node]).isRequired,
};
ImageCropTrigger.defaultProps = {
  aspect: '1',
  className: '',
  dir: IMG_DIR.USER,
  accept: 'image/jpe, image/jpg, image/jpeg, image/png',
};
