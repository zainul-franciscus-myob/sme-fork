import { Columns, ReadOnly } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTransferMoneyBody } from '../bankingSelectors/transferMoneySelectors';
import TransferMoneyTable from './TransferMoneyTable';
import styles from './TransferMoneyBody.module.css';

const TransferMoneyBody = ({
  transferFromDisplayName,
  transferToDisplayName,
  amount,
  isCreating,
  onSortTransfer,
  onUpdateTransferSelection,
  onCreateTransferMoney,
}) => {
  const createView = (
    <div className={styles.createView}>
      <TransferMoneyTable
        onSort={onSortTransfer}
        onSelect={onUpdateTransferSelection}
        onCreateTransferMoney={onCreateTransferMoney}
      />
    </div>
  );

  const readOnlyView = (
    <div className={styles.readonlyView}>
      <Columns type="three">
        <ReadOnly name="TransferFrom" label="Bank account from">
          {transferFromDisplayName}
        </ReadOnly>
        <ReadOnly name="TransferTo" label="Bank account to">
          {transferToDisplayName}
        </ReadOnly>
        <ReadOnly name="Amount" label="Amount ($)">
          {amount}
        </ReadOnly>
      </Columns>
    </div>
  );

  return isCreating ? createView : readOnlyView;
};

const mapStateToProps = (state) => getTransferMoneyBody(state);

export default connect(mapStateToProps)(TransferMoneyBody);
