import {
  Columns,
  FieldSet,
  RadioButtonGroup,
  TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { allocationTypeOptions } from '../AllocationTypes';
import {
  getAllocationType,
  getContactId,
  getContacts,
  getIsPaymentReportable,
  getIsPaymentReportableCheckboxDisabled,
  getTransactionDescription,
} from '../bankingRuleSpendMoneySelectors';
import ContactCombobox from '../../../components/combobox/ContactCombobox';
import IsReportableSection from './IsReportableSection';
import Table from './BankingRuleSpendMoneyAllocationTable';
import handleComboboxChange from '../../../components/handlers/handleComboboxChange';
import handleInputChange from '../../../components/handlers/handleInputChange';
import handleRadioButtonChange from '../../../components/handlers/handleRadioButtonChange';
import styles from './BankingRuleSpendMoneyView.module.css';

const BankingRuleSpendMoneyTransactionSection = ({
  allocationType,
  contactId,
  contacts,
  transactionDescription,
  onRowInputBlur,
  onRuleConditionsChange,
  onAddRow,
  onRowChange,
  onRemoveRow,
}) => (
  <React.Fragment>
    <FieldSet
      className={`${styles.formSubGroup} ${styles.form}`}
      label="Create transaction with this information"
      renderField={() => (
        <React.Fragment>
          <Columns>
            <ContactCombobox
              items={contacts}
              selectedId={contactId}
              label="Contact"
              hideLabel={false}
              onChange={handleComboboxChange('contactId', onRuleConditionsChange)}
            />
            <IsReportableSection onRuleConditionsChange={onRuleConditionsChange} />
          </Columns>
          <TextArea
            resize="vertical"
            name="transactionDescription"
            label="Description of transaction"
            value={transactionDescription}
            onChange={handleInputChange(onRuleConditionsChange)}
            maxLength={255}
          />
        </React.Fragment>
      )}
    />
    <RadioButtonGroup
      name="allocationType"
      label="Allocate by"
      value={allocationType}
      options={[allocationTypeOptions.percent, allocationTypeOptions.amount]}
      onChange={handleRadioButtonChange('allocationType', onRuleConditionsChange)}
    />
    <Table
      onRowInputBlur={onRowInputBlur}
      onAddRow={onAddRow}
      onRowChange={onRowChange}
      onRemoveRow={onRemoveRow}
    />
  </React.Fragment>
);

const mapStateToProps = state => ({
  allocationType: getAllocationType(state),
  contactId: getContactId(state),
  contacts: getContacts(state),
  transactionDescription: getTransactionDescription(state),
  isPaymentReportable: getIsPaymentReportable(state),
  isPaymentReportableCheckboxDisabled: getIsPaymentReportableCheckboxDisabled(state),
});

export default connect(mapStateToProps)(BankingRuleSpendMoneyTransactionSection);
