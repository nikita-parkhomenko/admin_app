
// outsource dependencies
import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { memo, useCallback, useState } from 'react';
import { Modal, ModalFooter, ModalHeader, ModalBody, Button } from 'reactstrap';

// local dependencies
import { AppLogo } from '../assets';

export const ConfirmationModal = memo(function ConfirmationModal ({ className, children, onApply, message, ...props }) {
  const [isOpen, setOpen] = useState(false);

  // actions
  const toggleModal = useCallback(() => setOpen(!isOpen), [isOpen]);
  const handleApply = useCallback(() => {
    onApply();
    toggleModal();
  }, [onApply, toggleModal]);

  return <>
    <Button
      {...props}
      color="none"
      onClick={toggleModal}
      className={cn('confirm-modal-trigger', className)}
    >
      {children}
    </Button>
    <Modal isOpen={isOpen} toggle={toggleModal} className="confirmation-modal">
      <ModalHeader tag="div" toggle={toggleModal} className="border-0">
        <div className="d-flex align-items-center">
          <AppLogo className="me-2" style={{ width: 36, height: 36 }} />
          <h3 className="mb-0"> Djema </h3>
        </div>
      </ModalHeader>
      <ModalBody>
        {message}
      </ModalBody>
      <ModalFooter className="border-0">
        <Button color="secondary" onClick={toggleModal}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleApply}>
          Apply
        </Button>
      </ModalFooter>
    </Modal>
  </>;
});

ConfirmationModal.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string,
  onApply: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
ConfirmationModal.defaultProps = {
  className: '',
  message: 'Are you sure?',
};
