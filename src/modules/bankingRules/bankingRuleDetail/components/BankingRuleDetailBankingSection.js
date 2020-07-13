import { RadioButtonGroup } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getBankingSection } from '../bankingRuleDetailSelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import handleComboboxChange from '../../../../components/handlers/handleComboboxChange';
import handleRadioButtonChange from '../../../../components/handlers/handleRadioButtonChange';
import styles from './BankingRuleDetailView.module.css';

const applyToAllBankAccountValues = {
  allBankAccounts: 'All bank accounts',
  oneBankAccount: 'One bank account',
};

const BankingRuleDetailBankingSection = ({
  applyToAllAccounts,
  accountId,
  bankAccounts,
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
      onChange={handleRadioButtonChange(
        'applyToAllAccounts',
        onRuleConditionsChange
      )}
    />
    {applyToAllAccounts === applyToAllBankAccountValues.oneBankAccount && (
      <div className={`${styles.applyToAllAccounts}`}>
        <AccountCombobox
          items={bankAccounts}
          selectedId={accountId}
          hintText="Select a bank account"
          width="xl"
          onChange={handleComboboxChange('accountId', onRuleConditionsChange)}
        />
      </div>
    )}
  </React.Fragment>
);

const mapStateToProps = (state) => getBankingSection(state);

export default connect(mapStateToProps)(BankingRuleDetailBankingSection);
