import { connect } from 'react-redux';
import React from 'react';

import { getModalType } from '../invoiceItemSelectors';
import CancelModal from '../../../../components/modal/CancelModal';
import DeleteModal from '../../../../components/modal/DeleteModal';
import ModalType from '../enums/ModalType';

const InvoiceItemModal = ({
  modalType,
  onModalClose,
  onCancelModalConfirm,
  onDeleteModalConfirm,
}) => {
  const cancelModal = (
    <CancelModal
      onConfirm={onCancelModalConfirm}
      onCancel={onModalClose}
      title="Cancel invoice alterations"
      description="Are you sure you want to cancel the alterations in this invoice?"
    />
  );

  const deleteModal = (
    <DeleteModal
      onConfirm={onDeleteModalConfirm}
      onCancel={onModalClose}
      title="Delete invoice"
      description="Are you sure you want to delete invoice?"
    />
  );

  return modalType === ModalType.cancel
    ? cancelModal
    : deleteModal;
};

const mapStateToProps = state => ({
  modalType: getModalType(state),
});

export default connect(mapStateToProps)(InvoiceItemModal);
