import { FormHorizontal, ReadOnly, Tooltip } from '@myob/myob-widgets';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import { getFormattedTransfer } from '../bankingSelectors/transferMoneySelectors';
import AccountCombobox from '../../components/combobox/AccountCombobox';
import style from './TransferMoneyBody.module.css';


const handleComboBoxChange = (key, handler) => (item) => {
  handler({ key, value: item.id });
};

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
  <FormHorizontal>
    <div className={style.transferMoneyBody}>
      {
      transferDisplayType === 'transferFrom'
        ? (
          <AccountCombobox
            label={<Tooltip triggerContent="Transfer from *">Required</Tooltip>}
            hideLabel={false}
            items={accountList}
            selectedId={transferFrom}
            onChange={handleComboBoxChange('transferFrom', onUpdateTransfer)}
            hintText="Select an account"
          />
        )
        : <ReadOnly name="TransferFrom" label="Transfer from">{transferFromDisplayName}</ReadOnly>
    }
      {
      transferDisplayType === 'transferTo'
        ? (
          <AccountCombobox
            label={<Tooltip triggerContent="Transfer to *">Required</Tooltip>}
            hideLabel={false}
            items={accountList}
            selectedId={transferTo}
            onChange={handleComboBoxChange('transferTo', onUpdateTransfer)}
            hintText="Select an account"
          />
        )
        : <ReadOnly name="TransferTo" label="Transfer to">{transferToDisplayName}</ReadOnly>
    }
      <ReadOnly name="Amount" label="Amount">{amount}</ReadOnly>
    </div>
  </FormHorizontal>
);

TransferMoneyBody.propTypes = {
  transferFrom: PropTypes.string.isRequired,
  transferTo: PropTypes.string.isRequired,
  transferDisplayType: PropTypes.string.isRequired,
  transferFromDisplayName: PropTypes.string.isRequired,
  transferToDisplayName: PropTypes.string.isRequired,
  accountList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  amount: PropTypes.string.isRequired,
  onUpdateTransfer: PropTypes.func.isRequired,
};

const mapStateToProps = state => getFormattedTransfer(state);

export default connect(mapStateToProps)(TransferMoneyBody);
