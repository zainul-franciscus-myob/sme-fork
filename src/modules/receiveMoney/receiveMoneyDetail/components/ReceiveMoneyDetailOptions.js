import {
  DatePicker, DetailHeader, Input, RadioButton, RadioButtonGroup, TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import { getHeaderOptions } from '../receiveMoneyDetailSelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import ContactCombobox from '../../../../components/combobox/ContactCombobox';

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
        payFromContactOptions = [],
        depositIntoAccountOptions = [],
        selectedDepositIntoAccountId,
        selectedPayFromContactId,
      },
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
          hideLabel={false}
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
          maxLength={8}
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
        />
        <RadioButtonGroup
          label="Amounts are"
          name="isTaxInclusive"
          renderRadios={({ value, ...props }) => (
            <React.Fragment>
              <RadioButton {...props} checked={isTaxInclusive} onChange={this.handleRadioChange} value="true" label="Tax inclusive" />
              <RadioButton {...props} checked={!isTaxInclusive} onChange={this.handleRadioChange} value="false" label="Tax exclusive" />
            </React.Fragment>
          )}
        />
      </React.Fragment>
    );

    return (
      <DetailHeader primary={primary} secondary={secondary} />
    );
  }
}

const mapStateToProps = state => ({
  headerOptions: getHeaderOptions(state),
});

export default connect(mapStateToProps)(ReceiveMoneyDetailOptions);
