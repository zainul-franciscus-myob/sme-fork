import {
  DetailHeader,
  Input,
  RadioButton,
  RadioButtonGroup,
  TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import {
  getHeaderOptions,
  getIsBeforeStartOfFinancialYear,
} from '../selectors/receiveMoneyDetailSelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import ContactCombobox from '../../../../components/combobox/ContactCombobox';
import DatePicker from '../../../../components/DatePicker/DatePicker';

class ReceiveMoneyDetailOptions extends Component {
  handleInputChange = (e) => {
    const { onUpdateHeaderOptions } = this.props;
    const { value, name } = e.target;

    onUpdateHeaderOptions({ key: name, value });
  };

  handleRadioChange = (e) => {
    const { onUpdateHeaderOptions } = this.props;
    const { value, name } = e.target;

    onUpdateHeaderOptions({
      key: name,
      value: value === 'true',
    });
  };

  handleDateChange = ({ value }) => {
    const { onUpdateHeaderOptions } = this.props;
    const key = 'date';

    onUpdateHeaderOptions({ key, value });
  };

  handleComboBoxChange = (key) => (item) => {
    const { onUpdateHeaderOptions } = this.props;
    onUpdateHeaderOptions({ key, value: item.id });
  };

  render = () => {
    const {
      headerOptions: {
        referenceId,
        date,
        isTaxInclusive,
        description,
        payFromContactOptions = [],
        depositIntoAccountOptions = [],
        selectedDepositIntoAccountId,
        selectedPayFromContactId,
        isContactDisabled,
      },
      onAddContact,
      isBeforeStartOfFinancialYear,
    } = this.props;

    const primary = (
      <React.Fragment>
        <AccountCombobox
          label="Bank account"
          hideLabel={false}
          requiredLabel="This is required"
          items={depositIntoAccountOptions}
          selectedId={selectedDepositIntoAccountId}
          onChange={this.handleComboBoxChange('selectedDepositIntoAccountId')}
        />
        <ContactCombobox
          items={payFromContactOptions}
          selectedId={selectedPayFromContactId}
          onChange={this.handleComboBoxChange('selectedPayFromContactId')}
          label="Contact (payer)"
          name="Pay From Contacts"
          addNewItem={{
            label: 'Create contact',
            onAddNew: onAddContact,
          }}
          hideLabel={false}
          disabled={isContactDisabled}
          allowClear
        />
        <TextArea
          name="description"
          label="Description of transaction"
          rows={1}
          autoSize
          maxLength={255}
          resize="vertical"
          value={description}
          onChange={this.handleInputChange}
        />
      </React.Fragment>
    );

    const secondary = (
      <React.Fragment>
        <Input
          name="referenceId"
          maxLength={13}
          label="Reference number"
          requiredLabel="This is required"
          value={referenceId}
          onChange={this.handleInputChange}
        />
        <DatePicker
          label="Date"
          requiredLabel="This is required"
          name="Date"
          value={date}
          onSelect={this.handleDateChange}
          displayWarning={isBeforeStartOfFinancialYear}
          warningMessage={'The date is set to a previous financial year'}
        />
        <RadioButtonGroup
          label="Amounts are"
          name="isTaxInclusive"
          renderRadios={({ value, ...props }) => (
            <React.Fragment>
              <RadioButton
                {...props}
                checked={isTaxInclusive}
                onChange={this.handleRadioChange}
                value="true"
                label="Tax inclusive"
              />
              <RadioButton
                {...props}
                checked={!isTaxInclusive}
                onChange={this.handleRadioChange}
                value="false"
                label="Tax exclusive"
              />
            </React.Fragment>
          )}
        />
      </React.Fragment>
    );

    return <DetailHeader primary={primary} secondary={secondary} />;
  };
}

const mapStateToProps = (state) => ({
  headerOptions: getHeaderOptions(state),
  isBeforeStartOfFinancialYear: getIsBeforeStartOfFinancialYear(state),
});

export default connect(mapStateToProps)(ReceiveMoneyDetailOptions);
