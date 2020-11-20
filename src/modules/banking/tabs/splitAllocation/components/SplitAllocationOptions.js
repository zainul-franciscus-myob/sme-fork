import { Checkbox, Input } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classNames from 'classnames';

import {
  getBankingRuleId,
  getContactId,
  getContactLabel,
  getDescription,
  getIsLoading,
  getIsReportable,
  getIsSpendMoney,
  getShowIsReportableCheckbox,
} from '../splitAllocationSelectors';
import handleAutoCompleteChange from '../../../../../components/handlers/handleAutoCompleteChange';
import handleContactAutoCompleteChange from '../../../../../components/handlers/handleContactAutoCompleteChange';
import handleInputChange from '../../../../../components/handlers/handleInputChange';
import styles from './SplitAllocationOptions.module.css';

const handleCheckboxChange = (handler) => (e) => {
  const { checked, name } = e.target;
  handler({ key: name, value: checked });
};

const SplitAllocationOptions = (props) => {
  const {
    contactId,
    description,
    contactLabel,
    isReportable,
    bankingRuleId,
    isSpendMoney,
    showIsReportable,
    isDisabled,
    onUpdateSplitAllocationHeader,
    onUpdateSplitAllocationContactCombobox,
    renderSplitAllocationContactCombobox,
    renderReceiveMoneyBankingRuleCombobox,
    renderSpendMoneyBankingRuleCombobox,
  } = props;

  const bankingRuleComboboxProps = {
    selectedId: bankingRuleId,
    name: 'bankingRule',
    label: 'Apply allocation template',
    hideLabel: false,
    allowClear: true,
    onChange: handleAutoCompleteChange(
      'bankingRuleId',
      onUpdateSplitAllocationHeader
    ),
    disabled: isDisabled,
  };

  return (
    <div className={styles.splitAllocationFilterOptions}>
      {renderSplitAllocationContactCombobox({
        className: classNames(styles.filterInput, styles.contactCombobox),
        selectedId: contactId,
        name: 'contact',
        label: `Contact (${contactLabel})`,
        hideLabel: false,
        allowClear: true,
        onChange: handleContactAutoCompleteChange(
          'contactId',
          onUpdateSplitAllocationContactCombobox
        ),
        hintText: 'Select contact',
        hideAdd: true,
        width: 'xl',
        disabled: isDisabled,
      })}
      {showIsReportable && (
        <div
          className={classNames(
            styles.formGroup,
            styles.checkbox,
            styles.filterInput
          )}
        >
          <Checkbox
            name="isReportable"
            label="Report to ATO via TPAR"
            checked={isReportable}
            onChange={handleCheckboxChange(onUpdateSplitAllocationHeader)}
            disabled={isDisabled}
          />
        </div>
      )}
      <Input
        containerClassName={classNames(styles.filterInput, styles.description)}
        label="Description of transaction"
        name="description"
        value={description}
        onChange={handleInputChange(onUpdateSplitAllocationHeader)}
        disabled={isDisabled}
      />
      {isSpendMoney
        ? renderSpendMoneyBankingRuleCombobox(bankingRuleComboboxProps)
        : renderReceiveMoneyBankingRuleCombobox(bankingRuleComboboxProps)}
    </div>
  );
};
SplitAllocationOptions.defaultProps = {
  isReportable: undefined,
};

const mapStateToProps = (state) => ({
  contactId: getContactId(state),
  isReportable: getIsReportable(state),
  bankingRuleId: getBankingRuleId(state),
  isSpendMoney: getIsSpendMoney(state),
  description: getDescription(state),
  showIsReportable: getShowIsReportableCheckbox(state),
  contactLabel: getContactLabel(state),
  isDisabled: getIsLoading(state),
});

export default connect(mapStateToProps)(SplitAllocationOptions);
