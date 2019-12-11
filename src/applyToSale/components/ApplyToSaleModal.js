import { connect } from 'react-redux';
import React from 'react';

import { getModalType } from '../applyToSaleSelectors';
import CancelModal from '../../components/modal/CancelModal';
import DeleteModal from '../../components/modal/DeleteModal';
import ModalType from '../ModalType';

const ApplyToSaleModal = ({
  modalType,
  onDismissModal,
  onConfirmCancelButtonClick,
  onConfirmDeleteButtonClick,
}) => ({
  [ModalType.DELETE]: (
    <DeleteModal
      onConfirm={onConfirmDeleteButtonClick}
      onCancel={onDismissModal}
      title="Delete this transaction?"
      description="This can't be undone, or recovered later."
    />
  ),
  [ModalType.CANCEL]: (
    <CancelModal
      onConfirm={onConfirmCancelButtonClick}
      onCancel={onDismissModal}
      title="Discard unsaved changes?"
      description="You've made changes that will be lost if you don't go back and save them."
    />
  ),
}[modalType]);

const mapStateToProps = state => ({
  modalType: getModalType(state),
});

export default connect(mapStateToProps)(ApplyToSaleModal);
