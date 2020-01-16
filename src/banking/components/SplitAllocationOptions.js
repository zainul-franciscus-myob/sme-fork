import { Checkbox, Input } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classNames from 'classnames';

import { getOptions } from '../bankingSelectors/splitAllocationSelectors';
import ContactCombobox from '../../components/combobox/ContactCombobox';
import handleInputChange from '../../components/handlers/handleInputChange';
import styles from './BankingView.module.css';

const handleCheckboxChange = handler => (e) => {
  const { checked, name } = e.target;
  handler({ key: name, value: checked });
};

const handleComboBoxChange = (key, handler) => (item) => {
  handler({ key, value: item.id });
};

const SplitAllocationOptions = (props) => {
  const {
    contacts,
    contactId,
    description,
    contactLabel,
    isReportable,
    showIsReportable,
    onUpdateSplitAllocationHeader,
  } = props;

  return (
    <div className={styles.splitAllocationFilterOptions}>
      <ContactCombobox
        items={contacts}
        selectedId={contactId}
        onChange={handleComboBoxChange('contactId', onUpdateSplitAllocationHeader)}
        label={`Contact (${contactLabel})`}
        name="contact"
        hideLabel={false}
        hintText="Select contact"
        requiredLabel="This is required"
      />
      {showIsReportable && (
        <div className={classNames('form-group', styles.checkbox)}>
          <Checkbox
            name="isReportable"
            label="Reportable"
            checked={isReportable}
            onChange={handleCheckboxChange(onUpdateSplitAllocationHeader)}
          />
        </div>
      )}
      <Input
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

const mapStateToProps = state => getOptions(state);

export default connect(mapStateToProps)(SplitAllocationOptions);
