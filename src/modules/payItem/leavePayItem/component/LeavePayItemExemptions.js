import { FieldGroup, Icons, Tooltip } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getFilteredExemptions,
  getIsExemptionDisabled,
} from '../leavePayItemSelectors';
import LeavePayItemExemptionsTable from './LeavePayItemExemptionsTable';
import PayItemCombobox from './PayItemCombobox';
import styles from './LeavePayItemView.module.css';

const handleExemptionComboboxChange = (handler) => (item) => {
  handler(item);
};

const LeavePayItemExemptions = ({
  exemptionOptions,
  onAddExemption,
  onRemoveExemption,
  isExemptionDisabled,
}) => {
  const fieldGroupLabel = (
    <div>
      <span>Exemptions&nbsp;</span>
      <Tooltip triggerContent={<Icons.Info />} placement="right">
        Select wage pay items to be excluded before calculating this per pay
        item
      </Tooltip>
    </div>
  );

  return (
    <FieldGroup label={fieldGroupLabel} className={styles.editableTable}>
      <LeavePayItemExemptionsTable onRemoveExemption={onRemoveExemption} />
      <PayItemCombobox
        label="Exemptions"
        hideLabel
        hintText="Add exemption"
        items={exemptionOptions}
        onChange={handleExemptionComboboxChange(onAddExemption)}
        width="lg"
        disabled={isExemptionDisabled}
      />
    </FieldGroup>
  );
};

const mapStateToProps = (state) => ({
  exemptionOptions: getFilteredExemptions(state),
  isExemptionDisabled: getIsExemptionDisabled(state),
});

export default connect(mapStateToProps)(LeavePayItemExemptions);
