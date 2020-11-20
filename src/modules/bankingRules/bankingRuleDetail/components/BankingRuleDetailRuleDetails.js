import {
  Checkbox,
  CheckboxGroup,
  FieldGroup,
  Input,
  Select,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAutomatedRuleType,
  getBankingRuleType,
  getIsAutomatedRuleTypeEnabled,
  getIsInactiveRule,
  getIsSelectRuleTypeDisabled,
  getName,
  getShowAutomatedRuleDetail,
  getShowAutomatedRuleType,
} from '../bankingRuleDetailSelectors';
import AutomatedRuleTypes from '../AutomatedRuleTypes';
import BankingRuleDetailBankingSection from './BankingRuleDetailBankingSection';
import RuleTypes from '../RuleTypes';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import handleSelectChange from '../../../../components/handlers/handleSelectChange';
import styles from './BankingRuleDetailRuleDetails.module.css';

const ruleTypes = [
  { name: 'Spend money transaction', value: RuleTypes.spendMoney },
  { name: 'Receive money transaction', value: RuleTypes.receiveMoney },
  { name: 'Bill', value: RuleTypes.bill },
  { name: 'Invoice', value: RuleTypes.invoice },
];

const automatedRuleTypes = [
  { name: 'Automated rule', value: AutomatedRuleTypes.AUTOMATED },
  { name: 'Allocation template', value: AutomatedRuleTypes.MANUAL },
];

const BankingRuleDetailRuleDetails = ({
  name,
  selectedRuleType,
  automatedRuleType,
  isInactiveRule,
  isSelectRuleTypeDisabled,
  isAutomatedRuleTypeEnabled,
  showAutomatedRuleType,
  showAutomatedRuleDetails,
  onRuleDetailsChange,
  onRuleConditionsChange,
}) => (
  <FieldGroup label="Rule details">
    <Select
      label="Transaction type"
      name="ruleType"
      value={selectedRuleType}
      disabled={isSelectRuleTypeDisabled}
      onChange={handleSelectChange(onRuleDetailsChange)}
      requiredLabel="This is required"
      width="md"
    >
      {ruleTypes.map(({ name: ruleName, value }) => (
        <Select.Option key={value} value={value} label={ruleName} />
      ))}
    </Select>
    <Input
      name="name"
      requiredLabel="This is required"
      label="Rule name"
      value={name}
      onChange={handleInputChange(onRuleDetailsChange)}
      maxLength={255}
      className={styles.ruleName}
      width="xl"
    />
    {showAutomatedRuleType && (
      <Select
        label="Rule type"
        name="automatedRuleType"
        value={automatedRuleType}
        onChange={handleSelectChange(onRuleDetailsChange)}
        requiredLabel="This is required"
        width="md"
        disabled={!isAutomatedRuleTypeEnabled}
      >
        {automatedRuleTypes.map(({ name: displayName, value }) => (
          <Select.Option key={value} value={value} label={displayName} />
        ))}
      </Select>
    )}
    <CheckboxGroup
      hideLabel
      label="Inactive rule"
      renderCheckbox={() => (
        <Checkbox
          name="isInactiveRule"
          label="Inactive rule"
          checked={isInactiveRule}
          onChange={handleCheckboxChange(onRuleDetailsChange)}
        />
      )}
    />
    {showAutomatedRuleDetails && (
      <BankingRuleDetailBankingSection
        onRuleConditionsChange={onRuleConditionsChange}
      />
    )}
  </FieldGroup>
);

const mapStateToProps = (state) => ({
  name: getName(state),
  isInactiveRule: getIsInactiveRule(state),
  isSelectRuleTypeDisabled: getIsSelectRuleTypeDisabled(state),
  selectedRuleType: getBankingRuleType(state),
  automatedRuleType: getAutomatedRuleType(state),
  isAutomatedRuleTypeEnabled: getIsAutomatedRuleTypeEnabled(state),
  showAutomatedRuleType: getShowAutomatedRuleType(state),
  showAutomatedRuleDetails: getShowAutomatedRuleDetail(state),
});

export default connect(mapStateToProps)(BankingRuleDetailRuleDetails);
