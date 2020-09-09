import {
  Columns,
  FieldGroup,
  RadioButtonGroup,
  TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAllocationType,
  getAllocations,
  getContactId,
  getDescription,
  getIsContactLoading,
  getIsPaymentReportable,
  getRegion,
  getShouldShowReportableCheckbox,
} from '../bankingRuleSelectors';
import AllocationTable from './AllocationTable';
import AllocationTypes from '../AllocationTypes';
import ReportableCheckbox from '../../../../components/ReportableCheckbox/ReportableCheckbox';
import handleAutoCompleteChange from '../../../../components/handlers/handleAutoCompleteChange';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import handleRadioButtonChange from '../../../../components/handlers/handleRadioButtonChange';
import styles from './AllocationSection.module.css';

const AllocationSection = ({
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
  isContactLoading,
  shouldShowPaymentReportableCheckbox,
}) => (
  <FieldGroup label="Create transaction with this information">
    <Columns>
      <div className={styles.contact}>
        {renderContactCombobox({
          selectedId: contactId,
          label: 'Contact',
          hideLabel: false,
          allowClear: true,
          onChange: handleAutoCompleteChange('contactId', onDetailsChange),
          onAlert,
          width: 'xl',
        })}
      </div>
      {shouldShowPaymentReportableCheckbox && (
        <ReportableCheckbox
          name="isPaymentReportable"
          label="Report to ATO via TPAR"
          checked={isPaymentReportable}
          onChange={handleCheckboxChange(onDetailsChange)}
          region={region}
          disabled={isContactLoading}
        />
      )}
    </Columns>
    <div className={styles.description}>
      <TextArea
        resize="vertical"
        name="transactionDescription"
        label="Description of transaction"
        value={description}
        onChange={handleInputChange(onDetailsChange)}
        maxLength={255}
      />
    </div>
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
    />
  </FieldGroup>
);

const mapStateToProps = (state) => ({
  contactId: getContactId(state),
  description: getDescription(state),
  allocationType: getAllocationType(state),
  allocations: getAllocations(state),
  isPaymentReportable: getIsPaymentReportable(state),
  isContactLoading: getIsContactLoading(state),
  shouldShowPaymentReportableCheckbox: getShouldShowReportableCheckbox(state),
  region: getRegion(state),
});

export default connect(mapStateToProps)(AllocationSection);
