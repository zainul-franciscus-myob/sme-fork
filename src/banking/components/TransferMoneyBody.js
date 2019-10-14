import {
  Columns, ReadOnly, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getFormattedTransfer } from '../bankingSelectors/transferMoneySelectors';
import AccountCombobox from '../../components/combobox/AccountCombobox';
import handleComboBoxChange from '../../components/handlers/handleComboboxChange';
import style from './TransferMoneyBody.module.css';

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
  <div className={style.transferMoney}>
    <Columns type="three">
      {
      transferDisplayType === 'transferFrom'
        ? (
          <AccountCombobox
            label={<Tooltip triggerContent="Bank account from *">Required</Tooltip>}
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
            label={<Tooltip triggerContent="Bank account to *">Required</Tooltip>}
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
