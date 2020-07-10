import {
  Checkbox,
  FieldGroup,
  RadioButtonGroup,
  TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { allocationTypeOptions } from '../AllocationTypes';
import {
  getAllocationType,
  getBankingRuleType,
  getContactId,
  getContactLabel,
  getContacts,
  getCustomerId,
  getCustomers,
  getIsPaymentReportable,
  getIsPaymentReportableCheckboxDisabled,
  getShowAllocationTable,
  getShowIsPaymentReportableCheckbox,
  getSupplierId,
  getSuppliers,
  getTransactionDescription,
} from '../bankingRuleDetailSelectors';
import ContactCombobox from '../../../../components/combobox/ContactCombobox';
import CustomerCombobox from '../../../../components/combobox/CustomerCombobox';
import RuleTypes from '../RuleTypes';
import SupplierCombobox from '../../../../components/combobox/SupplierCombobox';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import handleComboboxChange from '../../../../components/handlers/handleComboboxChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import handleRadioButtonChange from '../../../../components/handlers/handleRadioButtonChange';
import styles from './BankingRuleDetailTransactionSection.module.css';

const onCustomerComboBoxChange = (key, handler) => ({ id: value }) =>
  handler({ key, value });

const BankingRuleBillTransactionSection = ({
  supplierId,
  suppliers,
  onRuleConditionsChange,
}) => (
  <React.Fragment>
    <FieldGroup label="Suggest matches from this suppliers's unpaid bills">
      <SupplierCombobox
        items={suppliers}
        selectedId={supplierId}
        label="Supplier"
        requiredLabel="This is required"
        hideLabel={false}
        onChange={handleComboboxChange('supplierId', onRuleConditionsChange)}
        width="xl"
      />
    </FieldGroup>
  </React.Fragment>
);

const BankingRuleInvoiceTransactionSection = ({
  customerId,
  customers,
  onRuleConditionsChange,
}) => (
  <React.Fragment>
    <FieldGroup label="Suggest matches from this customer's unpaid invoices">
      <CustomerCombobox
        items={customers}
        selectedId={customerId}
        label="Customer"
        requiredLabel="This is required"
        hideLabel={false}
        onChange={onCustomerComboBoxChange(
          'customerId',
          onRuleConditionsChange
        )}
        width="xl"
      />
    </FieldGroup>
  </React.Fragment>
);

const BankingRuleSpendAndReceiveMoneyTransactionSection = ({
  allocationType,
  contactId,
  contacts,
  contactLabel,
  transactionDescription,
  isPaymentReportable,
  isPaymentReportableCheckboxDisabled,
  showIsPaymentReportableCheckbox,
  showAllocationTable,
  onRuleConditionsChange,
}) => (
  <FieldGroup label="Create a transaction with this information">
    <React.Fragment>
      <div className={styles.transaction}>
        <ContactCombobox
          items={contacts}
          selectedId={contactId}
          label={contactLabel}
          hideLabel={false}
          onChange={handleComboboxChange('contactId', onRuleConditionsChange)}
          width="xl"
        />
        {showIsPaymentReportableCheckbox && (
          <Checkbox
            name="isPaymentReportable"
            label="Report to ATO via TPAR"
            checked={isPaymentReportable}
            onChange={handleCheckboxChange(onRuleConditionsChange)}
            disabled={isPaymentReportableCheckboxDisabled}
          />
        )}
      </div>
      <TextArea
        resize="vertical"
        name="transactionDescription"
        label="Description of transaction"
        value={transactionDescription}
        onChange={handleInputChange(onRuleConditionsChange)}
        maxLength={255}
        width="xl"
      />
    </React.Fragment>
    {showAllocationTable && (
      <RadioButtonGroup
        name="allocationType"
        label="Allocate by"
        value={allocationType}
        options={[allocationTypeOptions.percent, allocationTypeOptions.amount]}
        onChange={handleRadioButtonChange(
          'allocationType',
          onRuleConditionsChange
        )}
      />
    )}
  </FieldGroup>
);

const BankingRuleDetailTransactionSection = ({
  ruleType,
  allocationType,
  contactId,
  contacts,
  supplierId,
  suppliers,
  customerId,
  customers,
  contactLabel,
  transactionDescription,
  isPaymentReportable,
  isPaymentReportableCheckboxDisabled,
  showIsPaymentReportableCheckbox,
  showAllocationTable,
  onRuleConditionsChange,
}) => {
  switch (ruleType) {
    case RuleTypes.bill:
      return (
        <BankingRuleBillTransactionSection
          onRuleConditionsChange={onRuleConditionsChange}
          supplierId={supplierId}
          suppliers={suppliers}
        />
      );
    case RuleTypes.invoice:
      return (
        <BankingRuleInvoiceTransactionSection
          onRuleConditionsChange={onRuleConditionsChange}
          customerId={customerId}
          customers={customers}
        />
      );
    default:
      return (
        <BankingRuleSpendAndReceiveMoneyTransactionSection
          allocationType={allocationType}
          contactId={contactId}
          contacts={contacts}
          contactLabel={contactLabel}
          transactionDescription={transactionDescription}
          isPaymentReportable={isPaymentReportable}
          isPaymentReportableCheckboxDisabled={
            isPaymentReportableCheckboxDisabled
          }
          showIsPaymentReportableCheckbox={showIsPaymentReportableCheckbox}
          showAllocationTable={showAllocationTable}
          onRuleConditionsChange={onRuleConditionsChange}
        />
      );
  }
};

const mapStateToProps = (state) => ({
  ruleType: getBankingRuleType(state),
  allocationType: getAllocationType(state),
  contactId: getContactId(state),
  contacts: getContacts(state),
  supplierId: getSupplierId(state),
  suppliers: getSuppliers(state),
  customerId: getCustomerId(state),
  customers: getCustomers(state),
  contactLabel: getContactLabel(state),
  transactionDescription: getTransactionDescription(state),
  isPaymentReportable: getIsPaymentReportable(state),
  isPaymentReportableCheckboxDisabled: getIsPaymentReportableCheckboxDisabled(
    state
  ),
  showIsPaymentReportableCheckbox: getShowIsPaymentReportableCheckbox(state),
  showAllocationTable: getShowAllocationTable(state),
});

export default connect(mapStateToProps)(BankingRuleDetailTransactionSection);
