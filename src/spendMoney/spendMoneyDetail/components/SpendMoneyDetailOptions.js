import {
  DatePicker, DetailHeader, Input, TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import { getHeaderOptions } from '../spendMoneyDetailSelectors';
import AccountCombobox from '../../../components/combobox/AccountCombobox';
import BooleanRadioButtonGroup from '../../../components/BooleanRadioButtonGroup/BooleanRadioButtonGroup';
import ContactCombobox from '../../../components/combobox/ContactCombobox';
import ReportableCheckbox from '../../../components/ReportableCheckbox/ReportableCheckbox';
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
        isReportableDisabled,
        shouldShowReportable,
        taxInclusiveLabel,
        taxExclusiveLabel,
        region,
      },
      onUpdateHeaderOptions,
    } = this.props;

    const primary = (
      <React.Fragment>
        <AccountCombobox
          label="Bank account"
          requiredLabel="This is required"
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
            label="Contact (payee)"
            name="Pay To Contacts"
            hideLabel={false}
          />
        </div>
        {
          shouldShowReportable
          && (
            <ReportableCheckbox
              label="Report to ATO via TPAR"
              region={region}
              name="isReportable"
              checked={isReportable}
              onChange={this.handleCheckboxChange}
              disabled={isReportableDisabled}
            />
          )
        }
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
          label="Reference number"
          requiredLabel="This is required"
          maxLength={8}
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
        <BooleanRadioButtonGroup
          name="isTaxInclusive"
          label="Amounts are"
          value={isTaxInclusive}
          trueLabel={taxInclusiveLabel}
          falseLabel={taxExclusiveLabel}
          handler={onUpdateHeaderOptions}
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

export default connect(mapStateToProps)(SpendMoneyDetailOptions);
