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
  getIsReadOnlyLayout,
  getIsSupplierBlocking,
  getIsTaxInclusive,
  getIssueDate,
  getSupplierInvoiceNumber,
  getTaxExclusiveLabel,
  getTaxInclusiveLabel,
} from '../selectors/billSelectors';
import { getPrefillStatus } from '../selectors/BillInTrayDocumentSelectors';
import BooleanRadioButtonGroup from '../../../../components/BooleanRadioButtonGroup/BooleanRadioButtonGroup';
import PaymentTerms from '../../../../components/PaymentTerms/PaymentTerms';
import handleDateChange from '../../../../components/handlers/handleDateChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';
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
  isSupplierDisabled,
  isReadOnlyLayout,
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
      maxLength={13}
      disabled={isReadOnlyLayout}
    />
    <Input
      name="supplierInvoiceNumber"
      maxLength={19}
      label="Supplier invoice number"
      className={classnames({ [styles.prefilled]: prefillStatus.supplierInvoiceNumber })}
      value={supplierInvoiceNumber}
      onChange={handleInputChange(onUpdateBillOption)}
      disabled={isReadOnlyLayout}
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
        disabled={isReadOnlyLayout}
      />
    </div>
    <PaymentTerms
      onChange={onUpdateBillOption}
      issueDate={issueDate}
      expirationTermOptions={expirationTermOptions}
      expirationDays={expirationDays}
      expirationTerm={expirationTerm}
      disabled={isReadOnlyLayout}
    />
    <BooleanRadioButtonGroup
      name="isTaxInclusive"
      label="Amounts are"
      value={isTaxInclusive}
      trueLabel={taxInclusiveLabel}
      falseLabel={taxExclusiveLabel}
      handler={onUpdateBillOption}
      disabled={isBlocking || isSupplierDisabled || isReadOnlyLayout}
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
  isSupplierDisabled: getIsSupplierBlocking(state),
  prefillStatus: getPrefillStatus(state),
  isReadOnlyLayout: getIsReadOnlyLayout(state),
});

export default connect(mapStateToProps)(BillSecondaryOptions);
