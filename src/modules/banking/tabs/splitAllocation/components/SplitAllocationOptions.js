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
import { getContacts } from '../../../selectors'; // @TODO: Refactor so it doesn't rely on list selector
import ContactCombobox from '../../../../../components/combobox/ContactCombobox';
import handleInputChange from '../../../../../components/handlers/handleInputChange';
import styles from './SplitAllocationOptions.module.css';

const handleCheckboxChange = (handler) => (e) => {
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
        className={classNames(styles.filterInput, styles.contactCombobox)}
        items={contacts}
        selectedId={contactId}
        onChange={handleComboBoxChange(
          'contactId',
          onUpdateSplitAllocationHeader
        )}
        label={`Contact (${contactLabel})`}
        name="contact"
        hideLabel={false}
        hintText="Select contact"
      />
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
  contacts: getContacts(state),
  contactId: getContactId(state),
  isReportable: getIsReportable(state),
  isSpendMoney: getIsSpendMoney(state),
  description: getDescription(state),
  showIsReportable: getShowIsReportableCheckbox(state),
  contactLabel: getContactLabel(state),
});

export default connect(mapStateToProps)(SplitAllocationOptions);
