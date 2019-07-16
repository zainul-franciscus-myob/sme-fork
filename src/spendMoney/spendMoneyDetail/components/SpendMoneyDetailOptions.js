import {
  Checkbox, DatePicker, Input, InputLabel, RadioButton, TextArea,
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

    return (
      <React.Fragment>
        <Input name="referenceId" label="Reference" value={referenceId} onChange={this.handleInputChange} />
        <DatePicker
          label="Date"
          name="Date"
          value={date}
          onSelect={this.handleDateChange}
        />
        <div className="form-group">
          <InputLabel label="Amounts are" id="isTaxInclusive" />
          <div className={styles.radioGroup}>
            <div><RadioButton name="isTaxInclusive" label="Tax inclusive" value="true" checked={isTaxInclusive} onChange={this.handleRadioChange} /></div>
            <div><RadioButton name="isTaxInclusive" label="Tax exclusive" value="false" checked={!isTaxInclusive} onChange={this.handleRadioChange} /></div>
          </div>
        </div>
        <AccountCombobox
          label="Pay from"
          hideLabel={false}
          items={payFromAccounts}
          selectedId={selectedPayFromAccountId}
          onChange={this.handleComboBoxChange('selectedPayFromAccountId')}
        />
        <ContactCombobox
          items={payToContacts}
          selectedId={selectedPayToContactId}
          onChange={this.handleComboBoxChange('selectedPayToContactId')}
          label="Pay to"
          name="Pay To Contacts"
          hideLabel={false}
          hintText="Select contact"
        />
        <div className="form-group">
          <div className={styles.checkbox}>
            <Checkbox name="isReportable" label="Reportable" checked={isReportable} onChange={this.handleCheckboxChange} />
          </div>
        </div>
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
