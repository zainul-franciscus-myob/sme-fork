import {
  DatePicker, Input,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getBillNumber,
  getIsBlocking,
  getIsTaxInclusive,
  getIssueDate,
  getSupplierInvoiceNumber,
  getTaxExclusiveLabel,
  getTaxInclusiveLabel,
} from '../selectors/billSelectors';
import BillPaymentTerms from './BillPaymentTerms';
import BooleanRadioButtonGroup from '../../../components/BooleanRadioButtonGroup/BooleanRadioButtonGroup';
import handleDateChange from '../../../components/handlers/handleDateChange';
import handleInputChange from '../../../components/handlers/handleInputChange';


const BillSecondaryOptions = ({
  billNumber,
  supplierInvoiceNumber,
  issueDate,
  isTaxInclusive,
  taxInclusiveLabel,
  taxExclusiveLabel,
  isBlocking,
  onUpdateBillOption,
}) => (
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


const mapStateToProps = state => ({
  billNumber: getBillNumber(state),
  supplierInvoiceNumber: getSupplierInvoiceNumber(state),
  issueDate: getIssueDate(state),
  isTaxInclusive: getIsTaxInclusive(state),
  taxInclusiveLabel: getTaxInclusiveLabel(state),
  taxExclusiveLabel: getTaxExclusiveLabel(state),
  isBlocking: getIsBlocking(state),
});

export default connect(mapStateToProps)(BillSecondaryOptions);
