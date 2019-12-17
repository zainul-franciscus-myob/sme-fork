import {
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
  getTransactionDescription,
} from '../bankingRuleReceiveMoneySelectors';
import ContactCombobox from '../../../../components/combobox/ContactCombobox';
import Table from './BankingRuleReceiveMoneyAllocationTable';
import handleComboboxChange from '../../../../components/handlers/handleComboboxChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import handleRadioButtonChange from '../../../../components/handlers/handleRadioButtonChange';
import styles from './BankingRuleReceiveMoneyView.module.css';

const BankingRuleReceiveMoneyTransactionSection = ({
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
          <ContactCombobox
            items={contacts}
            selectedId={contactId}
            label="Contact"
            hideLabel={false}
            onChange={handleComboboxChange('contactId', onRuleConditionsChange)}
          />
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
});

export default connect(mapStateToProps)(BankingRuleReceiveMoneyTransactionSection);
