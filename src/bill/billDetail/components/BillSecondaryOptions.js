import { DatePicker, Input } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classnames from 'classnames';

import {
  getBillNumber,
  getExpirationDays,
  getExpirationTerm,
  getExpirationTermOptions,
  getIsBlocking,
  getIsTaxInclusive,
  getIssueDate,
  getSupplierInvoiceNumber,
  getTaxExclusiveLabel,
  getTaxInclusiveLabel,
} from '../selectors/billSelectors';
import { getPrefillStatus } from '../selectors/BillInTrayDocumentSelectors';
import BooleanRadioButtonGroup from '../../../components/BooleanRadioButtonGroup/BooleanRadioButtonGroup';
import PaymentTerms from '../../../components/PaymentTerms/PaymentTerms';
import handleDateChange from '../../../components/handlers/handleDateChange';
import handleInputChange from '../../../components/handlers/handleInputChange';
import styles from './BillSecondaryOptions.module.css';

const BillSecondaryOptions = ({
  billNumber,
  supplierInvoiceNumber,
  issueDate,
  expirationTerm,
  expirationDays,
  expirationTermOptions,
  isTaxInclusive,
  taxInclusiveLabel,
  taxExclusiveLabel,
  isBlocking,
  prefillStatus,
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
      className={classnames({ [styles.prefilled]: prefillStatus.supplierInvoiceNumber })}
      value={supplierInvoiceNumber}
      onChange={handleInputChange(onUpdateBillOption)}
    />
    <div className={
      classnames(styles.formControlWrapper, { [styles.prefilled]: prefillStatus.issueDate })}
    >
      <DatePicker
        label="Issue date"
        name="issueDate"
        value={issueDate}
        requiredLabel="This is required"
        onSelect={handleDateChange('issueDate', onUpdateBillOption)}
      />
    </div>
    <PaymentTerms
      onChange={onUpdateBillOption}
      issueDate={issueDate}
      expirationTermOptions={expirationTermOptions}
      expirationDays={expirationDays}
      expirationTerm={expirationTerm}
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
  expirationTermOptions: getExpirationTermOptions(state),
  expirationDays: getExpirationDays(state),
  expirationTerm: getExpirationTerm(state),
  isTaxInclusive: getIsTaxInclusive(state),
  taxInclusiveLabel: getTaxInclusiveLabel(state),
  taxExclusiveLabel: getTaxExclusiveLabel(state),
  isBlocking: getIsBlocking(state),
  prefillStatus: getPrefillStatus(state),
});

export default connect(mapStateToProps)(BillSecondaryOptions);
