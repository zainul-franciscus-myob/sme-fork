import {
  Checkbox,
  CheckboxGroup,
  FieldGroup,
  Input,
  RadioButtonGroup,
  Select,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getApplyToAllAccounts,
  getBankAccounts,
  getIsInactive,
  getRuleName,
  getRuleType,
  getRuleTypeOptions,
  getShouldShowBankAccountList,
} from '../bankingRuleSelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import ApplyTypes from '../ApplyTypes';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import handleComboboxChange from '../../../../components/handlers/handleComboboxChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import handleRadioButtonChange from '../../../../components/handlers/handleRadioButtonChange';
import handleSelectChange from '../../../../components/handlers/handleSelectChange';
import styles from './RuleDetailsSection.module.css';

const RuleDetailsSection = ({
  onDetailsChange,
  ruleName,
  ruleTypes,
  selectedRuleType,
  applyToAllAccounts,
  showShowBankAccountList,
  isInactive,
  bankAccounts,
}) => (
  <FieldGroup label="Rule details">
    <Select
      label="Rule type"
      name="ruleType"
      value={selectedRuleType}
      onChange={handleSelectChange(onDetailsChange)}
      requiredLabel="This is required"
      className={styles.ruleType}
    >
      {
        ruleTypes.map(({ name, value }) => (
          <Select.Option key={value} value={value} label={name} />
        ))
      }
    </Select>
    <Input
      label="Rule name"
      name="name"
      value={ruleName}
      onChange={handleInputChange(onDetailsChange)}
      maxLength={255}
      className={styles.ruleName}
    />
    <CheckboxGroup
      label="Inactive rule"
      hideLabel
      renderCheckbox={() => (
        <Checkbox
          name="isInactiveRule"
          label="Inactive rule"
          checked={isInactive}
          onChange={handleCheckboxChange(onDetailsChange)}
        />
      )}
    />
    <RadioButtonGroup
      name="applyToAllAccounts"
      label="This rule applies to"
      value={applyToAllAccounts}
      options={[
        ApplyTypes.allBankAccounts,
        ApplyTypes.oneBankAccount,
      ]}
      onChange={handleRadioButtonChange('applyToAllAccounts', onDetailsChange)}
    />
    {
      showShowBankAccountList && (
        <div className={styles.bankFeedAccount}>
          <AccountCombobox
            name="bankFeedAccountId"
            items={bankAccounts}
            selectedId=""
            onChange={handleComboboxChange('accountId', onDetailsChange)}
          />
        </div>
      )
    }
  </FieldGroup>
);

const mapStateToProps = state => ({
  ruleName: getRuleName(state),
  ruleTypes: getRuleTypeOptions(state),
  selectedRuleType: getRuleType(state),
  applyToAllAccounts: getApplyToAllAccounts(state),
  isInactive: getIsInactive(state),
  showShowBankAccountList: getShouldShowBankAccountList(state),
  bankAccounts: getBankAccounts(state),
});

export default connect(mapStateToProps)(RuleDetailsSection);
