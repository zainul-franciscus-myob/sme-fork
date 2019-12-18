import { FieldGroup, Icons, Tooltip } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getUnaddedExemptionPayItemOptions } from '../../selectors/ExpensePayItemModalSelectors';
import ExemptionsTable from './ExemptionsTable';
import PayItemCombobox from './PayItemCombobox';
import handleComboboxChange from '../../../../../../components/handlers/handleComboboxChange';
import styles from './ExemptionsSection.module.css';

const ExemptionsSection = ({
  exemptionPayItemOptions,
  onAddExemptionPayItem,
  onRemoveExemptionPayItem,
}) => (
  <FieldGroup
    label={(
      <React.Fragment>
        <span>Exemptions</span>
        <Tooltip triggerContent={<Icons.Info />} placement="right">
          Select any expense pay items that will be excluded from this pay item
        </Tooltip>
      </React.Fragment>
    )}
    className={styles.editableTable}
  >
    <ExemptionsTable onRemoveExemptionPayItem={onRemoveExemptionPayItem} />
    <div className={styles.addCombobox}>
      <PayItemCombobox
        label="Exemptions"
        hideLabel
        hintText="Add exemption"
        items={exemptionPayItemOptions}
        onChange={handleComboboxChange(undefined, onAddExemptionPayItem)}
      />
    </div>
  </FieldGroup>
);

const mapStateToProps = state => ({
  exemptionPayItemOptions: getUnaddedExemptionPayItemOptions(state),
});

export default connect(mapStateToProps)(ExemptionsSection);
