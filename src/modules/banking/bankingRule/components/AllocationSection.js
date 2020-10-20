import { FieldGroup, RadioButtonGroup, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAllocationType,
  getAllocations,
  getContactId,
  getDescription,
  getIsPaymentReportable,
  getRegion,
  getShouldShowReportableCheckbox,
} from '../bankingRuleSelectors';
import AllocationTable from './AllocationTable';
import AllocationTypes from '../AllocationTypes';
import ReportableCheckbox from '../../../../components/ReportableCheckbox/ReportableCheckbox';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import handleContactAutoCompleteChange from '../../../../components/handlers/handleContactAutoCompleteChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import handleRadioButtonChange from '../../../../components/handlers/handleRadioButtonChange';
import styles from './AllocationSection.module.css';

const AllocationSection = ({
  onContactChange,
  onDetailsChange,
  onAddAllocationLine,
  onUpdateAllocationLine,
  onRemoveAllocationLine,
  onAlert,
  renderContactCombobox,
  allocations,
  contactId,
  description,
  allocationType,
  region,
  isPaymentReportable,
  shouldShowPaymentReportableCheckbox,
  onViewedAccountToolTip,
}) => (
  <FieldGroup label="Create transaction with this information">
    <div className={styles.contactAndIsReportableContainer}>
      {renderContactCombobox({
        selectedId: contactId,
        label: 'Contact',
        hideLabel: false,
        allowClear: true,
        onChange: handleContactAutoCompleteChange('contactId', onContactChange),
        onAlert,
        width: 'xl',
        className: styles.contact,
      })}
      {shouldShowPaymentReportableCheckbox && (
        <ReportableCheckbox
          name="isPaymentReportable"
          label="Report to ATO via TPAR"
          checked={isPaymentReportable}
          onChange={handleCheckboxChange(onDetailsChange)}
          region={region}
        />
      )}
    </div>
    <TextArea
      resize="vertical"
      name="transactionDescription"
      label="Description of transaction"
      value={description}
      onChange={handleInputChange(onDetailsChange)}
      maxLength={255}
      className={styles.description}
    />
    <RadioButtonGroup
      name="allocationType"
      label="Allocate by"
      value={allocationType}
      options={[AllocationTypes.percent, AllocationTypes.amount]}
      onChange={handleRadioButtonChange('allocationType', onDetailsChange)}
    />
    <AllocationTable
      tableData={allocations}
      onAddRow={onAddAllocationLine}
      onRowChange={onUpdateAllocationLine}
      onRemoveRow={onRemoveAllocationLine}
      onViewedAccountToolTip={onViewedAccountToolTip}
    />
  </FieldGroup>
);

const mapStateToProps = (state) => ({
  contactId: getContactId(state),
  description: getDescription(state),
  allocationType: getAllocationType(state),
  allocations: getAllocations(state),
  isPaymentReportable: getIsPaymentReportable(state),
  shouldShowPaymentReportableCheckbox: getShouldShowReportableCheckbox(state),
  region: getRegion(state),
});

export default connect(mapStateToProps)(AllocationSection);
