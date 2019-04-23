import {
  DatePicker, Input, InputLabel, RadioButton, TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { getHeaderOptions } from '../receiveMoneyDetailSelectors';
import AccountCombobox from '../../../components/combobox/AccountCombobox';
import ContactCombobox from '../../../components/combobox/ContactCombobox';
import styles from './ReceiveMoneyDetailOptions.css';

class ReceiveMoneyDetailOptions extends Component {
  handleInputChange = (e) => {
    const { onUpdateHeaderOptions } = this.props;
    const { value, name } = e.target;

    onUpdateHeaderOptions({ key: name, value });
  }

  handleRadioChange = (e) => {
    const { onUpdateHeaderOptions } = this.props;
    const { value, name } = e.target;

    onUpdateHeaderOptions({
      key: name,
      value: value === 'true',
    });
  }

  handleDateChange = ({ value }) => {
    const { onUpdateHeaderOptions } = this.props;
    const key = 'date';

    onUpdateHeaderOptions({ key, value });
  }

  handleComboBoxChange = key => (item) => {
    const { onUpdateHeaderOptions } = this.props;
    onUpdateHeaderOptions({ key, value: item.id });
  }

  render = () => {
    const {
      headerOptions: {
        referenceId,
        date,
        isTaxInclusive,
        description,
        payFromContacts,
        depositIntoAccounts,
        selectedDepositIntoAccountIndex,
        selectedPayFromContactId,
      },
    } = this.props;

    return (
      <React.Fragment>
        <Input name="referenceId" label="Reference" value={referenceId} onChange={this.handleInputChange} />
        <div>
          <DatePicker
            label="Date"
            name="Date"
            value={date}
            onSelect={this.handleDateChange}
          />
        </div>
        <div className="form-group">
          <InputLabel label="Amounts are" id="isTaxInclusive" />
          <div className={styles.radioGroup}>
            <div>
              <RadioButton
                name="isTaxInclusive"
                label="Tax inclusive"
                value="true"
                checked={isTaxInclusive}
                onChange={this.handleRadioChange}
              />
            </div>
            <div>
              <RadioButton
                name="isTaxInclusive"
                label="Tax exclusive"
                value="false"
                checked={!isTaxInclusive}
                onChange={this.handleRadioChange}
              />
            </div>
          </div>
        </div>
        <AccountCombobox
          label="Deposit into"
          hideLabel={false}
          items={depositIntoAccounts}
          selectedIndex={selectedDepositIntoAccountIndex}
          onChange={this.handleComboBoxChange('selectedDepositIntoAccountId')}
        />
        <ContactCombobox
          items={payFromContacts}
          selectedId={selectedPayFromContactId}
          onChange={this.handleComboBoxChange('selectedPayFromContactId')}
          label="Pay from"
          name="Pay From Contacts"
          hideLabel={false}
          hintText="Select contact"
        />
        <div />
        <TextArea
          name="description"
          label="Description"
          autoSize
          maxLength={255}
          placeholder="Max 255 characters"
          resize="vertical"
          value={description}
          onChange={this.handleInputChange}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  headerOptions: getHeaderOptions(state),
});

ReceiveMoneyDetailOptions.propTypes = {
  onUpdateHeaderOptions: PropTypes.func.isRequired,
  headerOptions: PropTypes.shape({
    referenceId: PropTypes.string,
    date: PropTypes.string,
    gstReportingMethod: PropTypes.string,
    isEndOfYearAdjustment: PropTypes.bool,
    isTaxInclusive: PropTypes.bool,
    description: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps)(ReceiveMoneyDetailOptions);
