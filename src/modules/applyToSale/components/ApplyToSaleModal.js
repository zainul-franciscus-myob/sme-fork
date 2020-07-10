import { connect } from 'react-redux';
import React from 'react';

import { getModalType } from '../applyToSaleSelectors';
import CancelModal from '../../../components/modal/CancelModal';
import DeleteModal from '../../../components/modal/DeleteModal';
import ModalType from '../ModalType';

const ApplyToSaleModal = ({
  modalType,
  onDismissModal,
  onConfirmCancelButtonClick,
  onConfirmDeleteButtonClick,
}) =>
  ({
    [ModalType.DELETE]: (
      <DeleteModal
        onConfirm={onConfirmDeleteButtonClick}
        onCancel={onDismissModal}
        title="Delete this transaction?"
      />
    ),
    [ModalType.CANCEL]: (
      <CancelModal
        onConfirm={onConfirmCancelButtonClick}
        onCancel={onDismissModal}
      />
    ),
  }[modalType]);

const mapStateToProps = (state) => ({
  modalType: getModalType(state),
});

export default connect(mapStateToProps)(ApplyToSaleModal);
