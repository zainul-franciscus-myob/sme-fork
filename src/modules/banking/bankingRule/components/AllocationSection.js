import {
  Columns, FieldGroup, RadioButtonGroup, TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAllocationType,
  getAllocations,
  getContactId,
  getContacts,
  getDescription,
  getIsPaymentReportable,
  getRegion,
  getShouldShowReportableCheckbox,
} from '../bankingRuleSelectors';
import AllocationTable from './AllocationTable';
import AllocationTypes from '../AllocationTypes';
import ContactCombobox from '../../../../components/combobox/ContactCombobox';
import ReportableCheckbox from '../../../../components/ReportableCheckbox/ReportableCheckbox';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import handleComboboxChange from '../../../../components/handlers/handleComboboxChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import handleRadioButtonChange from '../../../../components/handlers/handleRadioButtonChange';
import styles from './AllocationSection.module.css';

const AllocationSection = (
  {
    onDetailsChange,
    onAddAllocationLine,
    onUpdateAllocationLine,
    onRemoveAllocationLine,
    onBlurAmountField,
    allocations,
    contacts,
    contactId,
    description,
    allocationType,
    region,
    isPaymentReportable,
    shouldShowPaymentReportableCheckbox,
  },
) => (
  <FieldGroup label="Create transaction with this information">
    <Columns>
      <div className={styles.contact}>
        <ContactCombobox
          items={contacts}
          selectedId={contactId}
          label="Contact"
          hideLabel={false}
          onChange={handleComboboxChange('contactId', onDetailsChange)}
        />
      </div>
      {shouldShowPaymentReportableCheckbox
      && (
      <ReportableCheckbox
        name="isPaymentReportable"
        label="Report to ATO via TPAR"
        checked={isPaymentReportable}
        onChange={handleCheckboxChange(onDetailsChange)}
        region={region}
      />
      ) }

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
      onRowInputBlur={onBlurAmountField}
      onAddRow={onAddAllocationLine}
      onRowChange={onUpdateAllocationLine}
      onRemoveRow={onRemoveAllocationLine}
    />
  </FieldGroup>
);

const mapStateToProps = state => ({
  contacts: getContacts(state),
  contactId: getContactId(state),
  description: getDescription(state),
  allocationType: getAllocationType(state),
  allocations: getAllocations(state),
  isPaymentReportable: getIsPaymentReportable(state),
  shouldShowPaymentReportableCheckbox: getShouldShowReportableCheckbox(state),
  region: getRegion(state),
});

export default connect(mapStateToProps)(AllocationSection);
