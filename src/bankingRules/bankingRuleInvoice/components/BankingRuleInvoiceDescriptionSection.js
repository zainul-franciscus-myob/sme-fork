import {
  Columns,
  FieldSet,
  Icons,
  Input,
  RadioButtonGroup,
  Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getDescriptionSection } from '../bankingRuleInvoiceSelectors';
import AccountCombobox from '../../../components/combobox/AccountCombobox';
import handleComboboxChange from '../../../components/handlers/handleComboboxChange';
import handleInputChange from '../../../components/handlers/handleInputChange';
import handleRadioButtonChange from '../../../components/handlers/handleRadioButtonChange';
import styles from './BankingRuleInvoiceView.module.css';

const applyToAllBankAccountValues = {
  allBankAccounts: 'All bank accounts',
  oneBankAccount: 'One bank account',
};

const BankingRuleInvoiceDescriptionSection = ({
  applyToAllAccounts,
  accountId,
  bankAccounts,
  containsWords,
  exactWords,
  onRuleConditionsChange,
}) => (
  <React.Fragment>
    <RadioButtonGroup
      className={`${styles.applyToAllAccounts} ${styles.formSubGroup}`}
      name="applyToAllAccounts"
      label="This rule applies to"
      value={applyToAllAccounts}
      options={[
        applyToAllBankAccountValues.allBankAccounts,
        applyToAllBankAccountValues.oneBankAccount,
      ]}
      onChange={handleRadioButtonChange('applyToAllAccounts', onRuleConditionsChange)}
    />
    {
      applyToAllAccounts === applyToAllBankAccountValues.oneBankAccount && (
        <div className={`${styles.applyToAllAccounts} ${styles.form}`}>
          <AccountCombobox
            items={bankAccounts}
            selectedId={accountId}
            hintText="Select a bank account"
            onChange={handleComboboxChange('accountId', onRuleConditionsChange)}
          />
        </div>
      )
    }
    <FieldSet
      className={`${styles.formSubGroup} ${styles.form}`}
      label="When the description contains"
      renderField={() => (
        <Columns type="two">
          <Input
            name="containsWords"
            value={containsWords}
            label="Any of these words or phrases"
            labelAccessory={(
              <Tooltip triggerContent={<Icons.Info />}>
                Seperate each word or phrase with a comma
              </Tooltip>
            )}
            onChange={handleInputChange(onRuleConditionsChange)}
            placeholder="Eg. STATIONERY, SUPPLIES"
            maxLength={200}
          />
          <Input
            name="exactWords"
            value={exactWords}
            label="AND this exact word or phrase (optional)"
            labelAccessory={(
              <Tooltip triggerContent={<Icons.Info />}>
                Any punctuation you enter will form part of the exact phrase
              </Tooltip>
            )}
            onChange={handleInputChange(onRuleConditionsChange)}
            placeholder="Eg. A-Z STATIONERY"
            maxLength={200}
          />
        </Columns>
      )}
    />
  </React.Fragment>
);

const mapStateToProps = state => getDescriptionSection(state);

export default connect(mapStateToProps)(BankingRuleInvoiceDescriptionSection);
