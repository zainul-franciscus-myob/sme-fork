import {
  Checkbox, CheckboxGroup, DatePicker, DetailHeader, Input, RadioButton, RadioButtonGroup, TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { getHeaderOptions } from '../spendMoneyDetailSelectors';
import AccountCombobox from '../../../components/combobox/AccountCombobox';
import ContactCombobox from '../../../components/combobox/ContactCombobox';
import styles from './SpendMoneyDetailOptions.module.css';

class SpendMoneyDetailOptions extends Component {
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

  handleCheckboxChange = (e) => {
    const { onUpdateHeaderOptions } = this.props;
    const { checked, name } = e.target;

    onUpdateHeaderOptions({ key: name, value: checked });
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
        isReportable,
        isTaxInclusive,
        description,
        payToContacts,
        payFromAccounts,
        selectedPayToContactId,
        selectedPayFromAccountId,
      },
    } = this.props;

    const primary = (
      <React.Fragment>
        <AccountCombobox
          label="Pay from"
          hideLabel={false}
          items={payFromAccounts}
          selectedId={selectedPayFromAccountId}
          onChange={this.handleComboBoxChange('selectedPayFromAccountId')}
        />
        <div className={styles.contactComboBox}>
          <ContactCombobox
            items={payToContacts}
            selectedId={selectedPayToContactId}
            onChange={this.handleComboBoxChange('selectedPayToContactId')}
            label="Pay to"
            name="Pay To Contacts"
            hideLabel={false}
            hintText="Select contact"
          />
        </div>
        <CheckboxGroup
          label="Reportable"
          hideLabel
          renderCheckbox={() => (
            <Checkbox name="isReportable" label="Reportable" checked={isReportable} onChange={this.handleCheckboxChange} />
          )}
        />
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

    const secondary = (
      <React.Fragment>
        <Input name="referenceId" label="Reference" value={referenceId} onChange={this.handleInputChange} />
        <DatePicker
          label="Date"
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

SpendMoneyDetailOptions.propTypes = {
  headerOptions: PropTypes.shape({
    referenceId: PropTypes.string,
    date: PropTypes.string,
    gstReportingMethod: PropTypes.string,
    isEndOfYearAdjustment: PropTypes.bool,
    isTaxInclusive: PropTypes.bool,
    description: PropTypes.string,
  }).isRequired,
  onUpdateHeaderOptions: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(SpendMoneyDetailOptions);
