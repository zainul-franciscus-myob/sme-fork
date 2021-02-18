import { connect } from 'react-redux';
import React from 'react';

import { getModalType } from '../selectors/RecurringBillSelectors';
import CancelModal from '../../../../components/modal/CancelModal';
import DeleteModal from '../../../../components/modal/DeleteModal';
import ModalType from '../types/ModalType';
import UnsavedModal from '../../../../components/modal/UnsavedModal';

const RecurringBillModal = ({
  modalType,
  listeners: {
    onCloseModal,
    onConfirmCancel,
    onConfirmSaveAndRedirect,
    onConfirmDelete,
    onDiscardAndRedirect,
  },
}) =>
  ({
    [ModalType.CancelModal]: (
      <CancelModal onConfirm={onConfirmCancel} onCancel={onCloseModal} />
    ),
    [ModalType.DeleteModal]: (
      <DeleteModal
        onConfirm={onConfirmDelete}
        onCancel={onCloseModal}
        title="Delete this recurring transaction?"
      />
    ),
    [ModalType.Unsaved]: (
      <UnsavedModal
        onConfirmSave={onConfirmSaveAndRedirect}
        onConfirmUnsave={onDiscardAndRedirect}
        onCancel={onCloseModal}
        title="Record changes?"
        description="Looks like you've made changes. Do you want to record these changes?"
      />
    ),
  }[modalType]);

const mapStateToProps = (state) => ({
  modalType: getModalType(state),
});

export default connect(mapStateToProps)(RecurringBillModal);
