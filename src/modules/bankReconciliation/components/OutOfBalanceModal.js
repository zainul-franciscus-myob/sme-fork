import { Button, Columns, Modal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getBankReconciliationCancelModal } from '../BankReconciliationSelectors';
import styles from './OutOfBalanceModal.module.css';

const OutOfBalanceModal = ({
  outOfBalance,
  closingBankStatementBalance,
  totalDeposit,
  totalWithdrawal,
  onCancel,
}) => (
  <Modal title="Out of balance" size="small" onCancel={onCancel}>
    <Modal.Body>
      <p>
        There’s an out of balance of
        {` ${outOfBalance} `}
        between the calculated closing balance and the entered closing statement
        balance. Check the following details with your bank statement
      </p>
      <div className={styles.grid}>
        <Columns>
          <span>Closing statement balance</span>
          <span className={styles.amount}>{closingBankStatementBalance}</span>
          <span>Total deposit</span>
          <span className={styles.amount}>{totalDeposit}</span>
          <span>Total withdrawals</span>
          <span className={styles.amount}>{totalWithdrawal}</span>
        </Columns>
      </div>
      <p>
        <a
          href="http://help.myob.com/wiki/x/NwPWAg"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tell me more
        </a>
      </p>
    </Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCancel}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);

const mapStateToProps = (state) => getBankReconciliationCancelModal(state);

export default connect(mapStateToProps)(OutOfBalanceModal);
