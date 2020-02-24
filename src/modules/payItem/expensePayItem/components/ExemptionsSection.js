import { FieldGroup, Icons, Tooltip } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getExemptionPayItemOptions,
  getIsExemptionDisabled,
} from '../ExpensePayItemSelectors';
import ExemptionsTable from './ExemptionsTable';
import PayItemCombobox from './PayItemCombobox';
import handleComboboxChange from '../../../../components/handlers/handleComboboxChange';
import styles from './ExemptionsSection.module.css';

const ExemptionsSection = ({
  exemptionPayItemOptions,
  onAddExemptionPayItem,
  onRemoveExemptionPayItem,
  isExemptionDisabled,
}) => (
  <FieldGroup
    label={(
      <React.Fragment>
        <span>Exemptions</span>
        <Tooltip triggerContent={<Icons.Info />} placement="right">
            Select any wage pay items that will be excluded from this pay item
        </Tooltip>
      </React.Fragment>
      )}
    className={styles.editableTable}
  >
    <ExemptionsTable onRemoveExemptionPayItem={onRemoveExemptionPayItem} />
    <PayItemCombobox
      label="Exemptions"
      hideLabel
      hintText="Add exemption"
      items={exemptionPayItemOptions}
      onChange={handleComboboxChange(undefined, onAddExemptionPayItem)}
      width="lg"
      disabled={isExemptionDisabled}
    />
  </FieldGroup>
);

const mapStateToProps = state => ({
  exemptionPayItemOptions: getExemptionPayItemOptions(state),
  isExemptionDisabled: getIsExemptionDisabled(state),
});

export default connect(mapStateToProps)(ExemptionsSection);
