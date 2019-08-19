import {
  Checkbox,
  FieldGroup,
  Input,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsInactiveRule, getName } from '../bankingRuleInvoiceSelectors';
import RequiredTooltip from './RequiredTooltip';
import handleCheckboxChange from '../../../components/handlers/handleCheckboxChange';
import handleInputChange from '../../../components/handlers/handleInputChange';
import styles from './BankingRuleInvoiceView.module.css';

const BankingRuleInvoiceRuleDetails = ({
  name,
  isInactiveRule,
  onRuleDetailsChange,
}) => (
  <FieldGroup label="Rule details" className={styles.form}>
    <Input
      name="name"
      labelAccessory={(<RequiredTooltip />)}
      label="Rule name"
      value={name}
      onChange={handleInputChange(onRuleDetailsChange)}
      maxLength={255}
    />
    <Checkbox
      name="isInactiveRule"
      checked={isInactiveRule}
      label="Inactive rule"
      onChange={handleCheckboxChange(onRuleDetailsChange)}
    />
  </FieldGroup>
);

const mapStateToProps = state => ({
  name: getName(state),
  isInactiveRule: getIsInactiveRule(state),
});

export default connect(mapStateToProps)(BankingRuleInvoiceRuleDetails);
