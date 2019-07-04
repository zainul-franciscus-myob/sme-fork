import { FieldGroup, Icons, Tooltip } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getFilteredExemptions, getIsExemptionDisabled } from '../superPayItemSelectors';
import PayItemCombobox from './PayItemCombobox';
import SuperPayItemExemptionsTable from './SuperPayItemExemptionsTable';
import styles from './SuperPayItemView.css';

const handleExemptionComboboxChange = handler => (item) => {
  handler(item);
};

const SuperPayItemExemptions = (props) => {
  const {
    exemptions = [],
    isExemptionDisabled,
    onAddSuperPayItemExemption,
    onRemoveSuperPayItemExemption,
  } = props;

  const fieldGroupLabel = (
    <div>
      <span>Exemptions&nbsp;</span>
      <Tooltip triggerContent={<Icons.Info />} placement="right">
        Select wage pay items to be excluded before calculating this per pay item
      </Tooltip>
    </div>
  );

  return (
    <FieldGroup label={fieldGroupLabel} className={styles.editableTable}>
      <SuperPayItemExemptionsTable onRemoveSuperPayItemExemption={onRemoveSuperPayItemExemption} />
      <PayItemCombobox
        label="Exemptions"
        hideLabel={false}
        hintText="Add exemption"
        items={exemptions}
        onChange={handleExemptionComboboxChange(onAddSuperPayItemExemption)}
        disabled={isExemptionDisabled}
      />
    </FieldGroup>
  );
};

const mapStateToProps = state => ({
  exemptions: getFilteredExemptions(state),
  isExemptionDisabled: getIsExemptionDisabled(state),
});

export default connect(mapStateToProps)(SuperPayItemExemptions);
