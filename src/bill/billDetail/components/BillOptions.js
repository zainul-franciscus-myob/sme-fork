import {
  DatePicker, DetailHeader, Input, ReadOnly,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getBillNumber,
  getIsBlocking,
  getIsReportable,
  getIsSupplierDisabled,
  getIsTaxInclusive,
  getIssueDate,
  getRegion,
  getSupplierAddress,
  getSupplierId,
  getSupplierInvoiceNumber,
  getSupplierOptions,
  getTaxExclusiveLabel,
  getTaxInclusiveLabel,
} from '../selectors/billSelectors';
import BillPaymentTerms from './BillPaymentTerms';
import BooleanRadioButtonGroup from '../../../components/BooleanRadioButtonGroup/BooleanRadioButtonGroup';
import ReportableCheckbox from '../../../components/ReportableCheckbox/ReportableCheckbox';
import SupplierCombobox from '../../../components/combobox/SupplierCombobox';
import handleCheckboxChange from '../../../components/handlers/handleCheckboxChange';
import handleComboboxChange from '../../../components/handlers/handleComboboxChange';
import handleDateChange from '../../../components/handlers/handleDateChange';
import handleInputChange from '../../../components/handlers/handleInputChange';
import styles from './BillOptions.module.css';

const BillOptions = ({
  billNumber,
  supplierInvoiceNumber,
  issueDate,
  isTaxInclusive,
  taxInclusiveLabel,
  taxExclusiveLabel,
  isBlocking,
  supplierOptions,
  supplierId,
  supplierAddress,
  isReportable,
  region,
  isSupplierDisabled,
  onUpdateBillOption,
  onAddSupplierButtonClick,
}) => {
  const primary = (
    <React.Fragment>
      <SupplierCombobox
        items={supplierOptions}
        selectedId={supplierId}
        onChange={handleComboboxChange('supplierId', onUpdateBillOption)}
        label="Supplier"
        name="supplierId"
        requiredLabel="This is required"
        hideLabel={false}
        disabled={isSupplierDisabled}
        addNewItem={{
          label: 'Create supplier',
          onAddNew: onAddSupplierButtonClick,
        }}
      />
      <ReadOnly className={styles.address}>{supplierAddress}</ReadOnly>
      <ReportableCheckbox
        label="Report to ATO via TPAR"
        checked={isReportable}
        region={region}
        name="isReportable"
        onChange={handleCheckboxChange(onUpdateBillOption)}
      />
    </React.Fragment>
  );

  const secondary = (
    <React.Fragment>
      <Input
        name="billNumber"
        label="Bill number"
        value={billNumber}
        requiredLabel="This is required"
        onChange={handleInputChange(onUpdateBillOption)}
        maxLength={8}
      />
      <Input
        name="supplierInvoiceNumber"
        label="Supplier invoice number"
        value={supplierInvoiceNumber}
        onChange={handleInputChange(onUpdateBillOption)}
      />
      <DatePicker
        label="Issue date"
        name="issueDate"
        value={issueDate}
        requiredLabel="This is required"
        onSelect={handleDateChange('issueDate', onUpdateBillOption)}
      />
      <BillPaymentTerms
        onUpdateBillOption={onUpdateBillOption}
      />
      <BooleanRadioButtonGroup
        name="isTaxInclusive"
        label="Amounts are"
        value={isTaxInclusive}
        trueLabel={taxInclusiveLabel}
        falseLabel={taxExclusiveLabel}
        handler={onUpdateBillOption}
        disabled={isBlocking}
      />
    </React.Fragment>
  );

  return (
    <div className={styles.options}>
      <DetailHeader primary={primary} secondary={secondary} />
    </div>
  );
};

const mapStateToProps = state => ({
  supplierOptions: getSupplierOptions(state),
  billNumber: getBillNumber(state),
  supplierInvoiceNumber: getSupplierInvoiceNumber(state),
  supplierId: getSupplierId(state),
  supplierAddress: getSupplierAddress(state),
  issueDate: getIssueDate(state),
  isReportable: getIsReportable(state),
  isTaxInclusive: getIsTaxInclusive(state),
  isBlocking: getIsBlocking(state),
  taxInclusiveLabel: getTaxInclusiveLabel(state),
  taxExclusiveLabel: getTaxExclusiveLabel(state),
  region: getRegion(state),
  isSupplierDisabled: getIsSupplierDisabled(state),
});

export default connect(mapStateToProps)(BillOptions);
