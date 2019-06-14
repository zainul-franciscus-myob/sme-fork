import PropTypes from 'prop-types';
import React from 'react';

import BankFeedsLoginModal from './BankFeedsLoginModal';
import CancelModal from '../../components/modal/CancelModal';

const BankingModal = ({
  modalType,
  onCloseCancelModal,
  onConfirmCancelModal,
  onCancelBankFeedsLogin,
  onConfirmBankFeedsLogin,
  onUpdateBankFeedsLoginDetails,
}) => {
  let modal;
  if (modalType === 'cancel') {
    modal = (
      <CancelModal
        onCancel={onCloseCancelModal}
        onConfirm={onConfirmCancelModal}
        title="Cancel bank transaction alterations"
        description="Are you sure you want to cancel the alterations for this bank transaction?"
      />
    );
  } else if (modalType === 'bankFeedsLogin') {
    modal = (
      <BankFeedsLoginModal
        onCancelBankFeedsLogin={onCancelBankFeedsLogin}
        onConfirmBankFeedsLogin={onConfirmBankFeedsLogin}
        onUpdateBankFeedsLoginDetails={onUpdateBankFeedsLoginDetails}
      />
    );
  }
  return modal;
};


BankingModal.propTypes = {
  modalType: PropTypes.string.isRequired,
  onCloseCancelModal: PropTypes.func.isRequired,
  onConfirmCancelModal: PropTypes.func.isRequired,
  onCancelBankFeedsLogin: PropTypes.func.isRequired,
  onConfirmBankFeedsLogin: PropTypes.func.isRequired,
  onUpdateBankFeedsLoginDetails: PropTypes.func.isRequired,
};

export default BankingModal;
