import PropTypes from 'prop-types';
import React from 'react';

import CancelModal from '../../../components/modal/CancelModal';
import DeleteModal from '../../../components/modal/DeleteModal';
import ModalTypes from '../ModalType';


const BillItemModal = ({
  modalType,
  onModalClose,
  onCancelModalConfirm,
  onDeleteModalConfirm,
}) => {
  if (modalType === ModalTypes.CancelModal) {
    return (
      <CancelModal
        onConfirm={onCancelModalConfirm}
        onCancel={onModalClose}
        title="Cancel bill alterations"
        description="Are you sure you want to cancel the alterations in this bill?"
      />
    );
  }

  return (
    <DeleteModal
      onConfirm={onDeleteModalConfirm}
      onCancel={onModalClose}
      title="Delete bill"
      description="Are you sure you want to delete bill?"
    />
  );
};

BillItemModal.propTypes = {
  modalType: PropTypes.string.isRequired,
  onModalClose: PropTypes.func.isRequired,
  onCancelModalConfirm: PropTypes.func.isRequired,
  onDeleteModalConfirm: PropTypes.func.isRequired,
};

export default BillItemModal;
