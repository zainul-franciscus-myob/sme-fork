import { Checkbox, Input } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classNames from 'classnames';

import {
  getContactId,
  getContactLabel,
  getDescription,
  getIsReportable,
  getIsSpendMoney,
  getShowIsReportableCheckbox,
} from '../splitAllocationSelectors';
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
    showIsReportable,
    onUpdateSplitAllocationHeader,
    onUpdateSplitAllocationContactCombobox,
    renderSplitAllocationContactCombobox,
  } = props;

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
      })}
      {showIsReportable && (
        <div
          className={classNames(
            'form-group',
            styles.checkbox,
            styles.filterInput
          )}
        >
          <Checkbox
            name="isReportable"
            label="Report to ATO via TPAR"
            checked={isReportable}
            onChange={handleCheckboxChange(onUpdateSplitAllocationHeader)}
          />
        </div>
      )}
      <Input
        containerClassName={classNames(styles.filterInput, styles.description)}
        label="Description of transaction"
        name="description"
        value={description}
        onChange={handleInputChange(onUpdateSplitAllocationHeader)}
      />
    </div>
  );
};
SplitAllocationOptions.defaultProps = {
  isReportable: undefined,
};

const mapStateToProps = (state) => ({
  contactId: getContactId(state),
  isReportable: getIsReportable(state),
  isSpendMoney: getIsSpendMoney(state),
  description: getDescription(state),
  showIsReportable: getShowIsReportableCheckbox(state),
  contactLabel: getContactLabel(state),
});

export default connect(mapStateToProps)(SplitAllocationOptions);
