import { FieldGroup, Icons, Tooltip } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getFilteredLinkedWages } from '../../selectors/LeavePayItemModalSelectors';
import LeavePayItemLinkedWagesTable from './LeavePayItemLinkedWagesTable';
import PayItemCombobox from './PayItemCombobox';
import styles from './LeavePayItemLinkedWages.module.css';

const handleLinkedWagesComboboxChange = (handler) => (item) => {
  handler(item);
};

const LeavePayItemLinkedWages = ({
  linkedWagesOptions,
  onAddLinkedWage,
  onRemoveLinkedWage,
}) => {
  const fieldGroupLabel = (
    <div>
      <span>Link wage pay item&nbsp;</span>
      <Tooltip triggerContent={<Icons.Info />} placement="right">
        The leave balance will be reduced by any hours paid.
      </Tooltip>
    </div>
  );

  return (
    <FieldGroup label={fieldGroupLabel} className={styles.editableTable}>
      <LeavePayItemLinkedWagesTable onRemoveLinkedWage={onRemoveLinkedWage} />
      <PayItemCombobox
        label="Linked wages"
        hideLabel
        hintText="Add linked wages"
        items={linkedWagesOptions}
        onChange={handleLinkedWagesComboboxChange(onAddLinkedWage)}
        width="lg"
      />
    </FieldGroup>
  );
};

const mapStateToProps = (state) => ({
  linkedWagesOptions: getFilteredLinkedWages(state),
});

export default connect(mapStateToProps)(LeavePayItemLinkedWages);
