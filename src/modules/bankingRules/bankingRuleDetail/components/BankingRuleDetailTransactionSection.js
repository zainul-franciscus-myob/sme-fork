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
  getIsPaymentReportable,
  getIsPaymentReportableCheckboxDisabled,
  getShowAllocationTable,
  getShowIsPaymentReportableCheckbox,
  getTransactionDescription,
} from '../bankingRuleDetailSelectors';
import RuleTypes from '../RuleTypes';
import handleAutoCompleteChange from '../../../../components/handlers/handleAutoCompleteChange';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import handleRadioButtonChange from '../../../../components/handlers/handleRadioButtonChange';
import styles from './BankingRuleDetailTransactionSection.module.css';

const BankingRuleBillTransactionSection = ({
  renderContactCombobox,
  contactId,
  onRuleConditionsChange,
  onAlert,
}) => (
  <React.Fragment>
    <FieldGroup label="Suggest matches from this suppliers's unpaid bills">
      {renderContactCombobox({
        selectedId: contactId,
        label: 'Supplier',
        requiredLabel: 'This is required',
        hideLabel: false,
        allowClear: true,
        onChange: handleAutoCompleteChange('contactId', onRuleConditionsChange),
        onAlert,
        width: 'xl',
      })}
    </FieldGroup>
  </React.Fragment>
);

const BankingRuleInvoiceTransactionSection = ({
  renderContactCombobox,
  contactId,
  onRuleConditionsChange,
  onAlert,
}) => (
  <React.Fragment>
    <FieldGroup label="Suggest matches from this customer's unpaid invoices">
      {renderContactCombobox({
        selectedId: contactId,
        label: 'Customer',
        requiredLabel: 'This is required',
        hideLabel: false,
        allowClear: true,
        onChange: handleAutoCompleteChange('contactId', onRuleConditionsChange),
        onAlert,
        width: 'xl',
      })}
    </FieldGroup>
  </React.Fragment>
);

const BankingRuleSpendAndReceiveMoneyTransactionSection = ({
  renderContactCombobox,
  allocationType,
  contactId,
  contactLabel,
  transactionDescription,
  isPaymentReportable,
  isPaymentReportableCheckboxDisabled,
  showIsPaymentReportableCheckbox,
  showAllocationTable,
  onRuleConditionsChange,
  onAlert,
}) => (
  <FieldGroup label="Create a transaction with this information">
    <React.Fragment>
      <div className={styles.transaction}>
        {renderContactCombobox({
          selectedId: contactId,
          label: contactLabel,
          hideLabel: false,
          allowClear: true,
          onChange: handleAutoCompleteChange(
            'contactId',
            onRuleConditionsChange
          ),
          onAlert,
        })}
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
  contactLabel,
  transactionDescription,
  isPaymentReportable,
  isPaymentReportableCheckboxDisabled,
  showIsPaymentReportableCheckbox,
  showAllocationTable,
  renderContactCombobox,
  onRuleConditionsChange,
  onAlert,
}) => {
  switch (ruleType) {
    case RuleTypes.bill:
      return (
        <BankingRuleBillTransactionSection
          renderContactCombobox={renderContactCombobox}
          onRuleConditionsChange={onRuleConditionsChange}
          contactId={contactId}
          onAlert={onAlert}
        />
      );
    case RuleTypes.invoice:
      return (
        <BankingRuleInvoiceTransactionSection
          renderContactCombobox={renderContactCombobox}
          onRuleConditionsChange={onRuleConditionsChange}
          contactId={contactId}
          onAlert={onAlert}
        />
      );
    default:
      return (
        <BankingRuleSpendAndReceiveMoneyTransactionSection
          renderContactCombobox={renderContactCombobox}
          allocationType={allocationType}
          contactId={contactId}
          contactLabel={contactLabel}
          transactionDescription={transactionDescription}
          isPaymentReportable={isPaymentReportable}
          isPaymentReportableCheckboxDisabled={
            isPaymentReportableCheckboxDisabled
          }
          showIsPaymentReportableCheckbox={showIsPaymentReportableCheckbox}
          showAllocationTable={showAllocationTable}
          onRuleConditionsChange={onRuleConditionsChange}
          onAlert={onAlert}
        />
      );
  }
};

const mapStateToProps = (state) => ({
  ruleType: getBankingRuleType(state),
  allocationType: getAllocationType(state),
  contactId: getContactId(state),
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
