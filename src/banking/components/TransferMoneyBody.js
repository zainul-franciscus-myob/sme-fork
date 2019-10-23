import {
  Columns, ReadOnly,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getFormattedTransfer } from '../bankingSelectors/transferMoneySelectors';
import AccountCombobox from '../../components/combobox/AccountCombobox';
import handleComboBoxChange from '../../components/handlers/handleComboboxChange';
import styles from './TransferMoneyBody.module.css';

const TransferMoneyBody = ({
  transferFrom,
  transferTo,
  transferFromDisplayName,
  transferToDisplayName,
  transferDisplayType,
  accountList,
  amount,
  onUpdateTransfer,
}) => (
  <div className={styles.transferMoney}>
    <Columns type="three">
      {
      transferDisplayType === 'transferFrom'
        ? (
          <AccountCombobox
            label="Bank account from"
            requiredLabel="This is required"
            hideLabel={false}
            items={accountList}
            selectedId={transferFrom}
            onChange={handleComboBoxChange('transferFrom', onUpdateTransfer)}
            hintText="Select an account"
          />
        )
        : <ReadOnly name="TransferFrom" label="Bank account from">{transferFromDisplayName}</ReadOnly>
      }
      {
      transferDisplayType === 'transferTo'
        ? (
          <AccountCombobox
            label="Bank account to"
            requiredLabel="This is required"
            hideLabel={false}
            items={accountList}
            selectedId={transferTo}
            onChange={handleComboBoxChange('transferTo', onUpdateTransfer)}
            hintText="Select an account"
          />
        )
        : <ReadOnly name="TransferTo" label="Bank account to">{transferToDisplayName}</ReadOnly>
      }
      <ReadOnly name="Amount" label="Amount ($)">{amount}</ReadOnly>
    </Columns>
  </div>
);

const mapStateToProps = state => getFormattedTransfer(state);

export default connect(mapStateToProps)(TransferMoneyBody);
