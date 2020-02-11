import { connect } from 'react-redux';
import React from 'react';

import { getModal } from '../BankReconciliationSelectors';
import ModalType from '../ModalType';
import OutOfBalanceModal from './OutOfBalanceModal';
import UndoBankReconciliationModal from './UndoBankReconciliationModal';

const BankReconciliationModal = ({
  modal: { type } = { type: ModalType.NONE },
  onCancel,
  onUndoBankReconciliationConfirm,
}) => {
  if (type === ModalType.UNDO) {
    return (
      <UndoBankReconciliationModal
        onCancel={onCancel}
        onConfirm={onUndoBankReconciliationConfirm}
      />
    );
  }

  return <OutOfBalanceModal onCancel={onCancel} />;
};

const mapStateToProps = state => ({
  modal: getModal(state),
});

export default connect(mapStateToProps)(BankReconciliationModal);
