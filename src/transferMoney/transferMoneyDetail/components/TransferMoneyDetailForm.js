import {
  Columns, DatePicker, Input, TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { getBalance, getTransferMoneyData } from '../transferMoneyDetailSelectors';
import AccountCombobox from '../../../components/combobox/AccountCombobox';
import styles from './TransferMoneyDetailForm.css';

class TransferMoneyDetailForm extends Component {
  handleInputChange = (e) => {
    const { onUpdateForm } = this.props;
    const { value, name } = e.target;

    onUpdateForm({ key: name, value });
  }

  handleDateChange = ({ value }) => {
    const { onUpdateForm } = this.props;
    const key = 'date';

    onUpdateForm({ key, value });
  }

  handleComboBoxChange = key => (item) => {
    const { onUpdateForm } = this.props;

    onUpdateForm({ key, value: item.id });
  }

  render = () => {
    const {
      transferMoney: {
        referenceId, accounts, date, amount, description,
        selectedTransferFromAccountIndex,
        selectedTransferToAccountIndex,
      },
      balance: {
        transferFrom,
        transferTo,
      },
      onAmountInputBlur,
      isCreating,
    } = this.props;

    const descriptionPlaceholder = isCreating ? 'Max 255 characters' : '';

    return (
      <Columns type="three">
        <Input name="referenceId" label="Reference" value={referenceId} onChange={this.handleInputChange} disabled={!isCreating} />
        <div className={`${!isCreating && styles.datePicker}`}>
          <DatePicker
            label="Date"
            name="date"
            disabled={!isCreating}
            value={date}
            onSelect={this.handleDateChange}
          />
        </div>
        <Input type="number" label="Amount ($)" name="amount" value={amount} onChange={this.handleInputChange} step="0.01" onBlur={onAmountInputBlur} disabled={!isCreating} />
        <div className="form-group">
          <AccountCombobox
            label="Transfer from"
            hideLabel={false}
            items={accounts}
            selectedIndex={selectedTransferFromAccountIndex}
            onChange={this.handleComboBoxChange('selectedTransferFromAccountId')}
            disabled={!isCreating}
            hintText="Select account"
          />
          <div className={styles.balance}>
            {isCreating && <div>{`Current balance ${transferFrom.currentBalance}`}</div>}
            {isCreating && <div><strong>{`Balance after transfer ${transferFrom.calculatedBalance}`}</strong></div>}
          </div>
        </div>
        <div className="form-group">
          <AccountCombobox
            label="Transfer to"
            hideLabel={false}
            items={accounts}
            selectedIndex={selectedTransferToAccountIndex}
            onChange={this.handleComboBoxChange('selectedTransferToAccountId')}
            disabled={!isCreating}
            hintText="Select account"
          />
          <div className={styles.balance}>
            {isCreating && <div>{`Current balance ${transferTo.currentBalance}`}</div>}
            {isCreating && <div><strong>{`Balance after transfer ${transferTo.calculatedBalance}`}</strong></div>}
          </div>
        </div>
        <div />
        <TextArea
          name="description"
          label="Description"
          autoSize
          maxLength={255}
          placeholder={descriptionPlaceholder}
          resize="vertical"
          value={description}
          onChange={this.handleInputChange}
          disabled={!isCreating}
        />
      </Columns>
    );
  }
}

TransferMoneyDetailForm.propTypes = {
  onUpdateForm: PropTypes.func.isRequired,
  onAmountInputBlur: PropTypes.func.isRequired,
  transferMoney: PropTypes.shape({
    referenceId: PropTypes.string,
    accounts: PropTypes.arrayOf(PropTypes.shape()),
    date: PropTypes.string,
    amount: PropTypes.string,
    selectedTransferFromAccountIndex: PropTypes.number,
    selectedTransferToAccountIndex: PropTypes.number,
    description: PropTypes.string,
  }).isRequired,
  balance: PropTypes.shape({
    transferFrom: PropTypes.shape(),
    transferTo: PropTypes.shape(),
  }).isRequired,
  isCreating: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  transferMoney: getTransferMoneyData(state),
  balance: getBalance(state),
});

export default connect(mapStateToProps)(TransferMoneyDetailForm);
