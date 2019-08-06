import { connect } from 'react-redux';
import React from 'react';

import { getModalType } from '../ItemQuoteSelectors';
import QuoteDetailModal from '../../components/QuoteDetailModal';

const ItemQuoteModal = ({
  modalType,
  onDismissModal,
  onConfirmCancelButtonClick,
  onConfirmDeleteButtonClick,
  onConfirmSaveButtonClick,
  onConfirmUnsaveButtonClick,
}) => (
  <QuoteDetailModal
    modalType={modalType}
    onDismissModal={onDismissModal}
    onConfirmCancelButtonClick={onConfirmCancelButtonClick}
    onConfirmDeleteButtonClick={onConfirmDeleteButtonClick}
    onConfirmSaveButtonClick={onConfirmSaveButtonClick}
    onConfirmUnsaveButtonClick={onConfirmUnsaveButtonClick}
  />
);

const mapStateToProps = state => ({
  modalType: getModalType(state),
});

export default connect(mapStateToProps)(ItemQuoteModal);
