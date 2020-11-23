import { Input } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classnames from 'classnames';

import {
  getExpirationDays,
  getExpirationTerm,
  getExpirationTermOptions,
  getIsBeforeFYAndAfterConversionDate,
  getIsBlocking,
  getIsReadOnly,
  getIsTaxInclusive,
  getIssueDate,
  getPromisedDate,
  getPurchaseOrderNumber,
  getSupplierInvoiceNumber,
  getTaxExclusiveLabel,
  getTaxInclusiveLabel,
} from '../selectors/purchaseOrderSelectors';
import BooleanRadioButtonGroup from '../../../../components/BooleanRadioButtonGroup/BooleanRadioButtonGroup';
import DatePicker from '../../../../components/DatePicker/DatePicker';
import handleDateChange from '../../../../components/handlers/handleDateChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import styles from './PurchaseOrderSecondaryOptions.module.css';

const PurchaseOrderSecondaryOptions = ({
  purchaseOrderNumber,
  supplierInvoiceNumber,
  issueDate,
  onIssueDateBlur,
  promisedDate,
  isTaxInclusive,
  taxInclusiveLabel,
  taxExclusiveLabel,
  isBlocking,
  isReadOnly,
  onUpdatePurchaseOrderOption,
  isBeforeFYAndAfterConversionDate,
}) => (
  <React.Fragment>
    <Input
      name="purchaseOrderNumber"
      label="Purchase order number"
      value={purchaseOrderNumber}
      requiredLabel="This is required"
      onChange={handleInputChange(onUpdatePurchaseOrderOption)}
      maxLength={13}
      disabled={isReadOnly}
    />
    <Input
      name="supplierInvoiceNumber"
      maxLength={19}
      label="Supplier invoice number"
      value={supplierInvoiceNumber}
      onChange={handleInputChange(onUpdatePurchaseOrderOption)}
      disabled={isReadOnly}
    />
    <div className={classnames(styles.formControlWrapper, {})}>
      <DatePicker
        label="Issue date"
        name="issueDate"
        value={issueDate}
        requiredLabel="This is required"
        disabled={isReadOnly}
        disabledMessage="You can't change the date of a historical purchase order."
        onSelect={handleDateChange('issueDate', onUpdatePurchaseOrderOption)}
        onBlur={onIssueDateBlur}
        displayWarning={isBeforeFYAndAfterConversionDate}
        warningMessage={'The issue date is set to a previous financial year'}
      />
      <DatePicker
        label="Promised date"
        name="promisedDate"
        value={promisedDate}
        disabled={isReadOnly}
        disabledMessage="You can't change the date of a historical purchase order."
        onSelect={handleDateChange('promisedDate', onUpdatePurchaseOrderOption)}
        onBlur={onIssueDateBlur}
      />
    </div>

    <BooleanRadioButtonGroup
      name="isTaxInclusive"
      label="Amounts are"
      value={isTaxInclusive}
      trueLabel={taxInclusiveLabel}
      falseLabel={taxExclusiveLabel}
      handler={onUpdatePurchaseOrderOption}
      disabled={isBlocking || isReadOnly}
    />
  </React.Fragment>
);

const mapStateToProps = (state) => ({
  purchaseOrderNumber: getPurchaseOrderNumber(state),
  supplierInvoiceNumber: getSupplierInvoiceNumber(state),
  issueDate: getIssueDate(state),
  promisedDate: getPromisedDate(state),
  expirationTermOptions: getExpirationTermOptions(state),
  expirationDays: getExpirationDays(state),
  expirationTerm: getExpirationTerm(state),
  isTaxInclusive: getIsTaxInclusive(state),
  taxInclusiveLabel: getTaxInclusiveLabel(state),
  taxExclusiveLabel: getTaxExclusiveLabel(state),
  isBlocking: getIsBlocking(state),
  isReadOnly: getIsReadOnly(state),
  isBeforeFYAndAfterConversionDate: getIsBeforeFYAndAfterConversionDate(state),
});

export default connect(mapStateToProps)(PurchaseOrderSecondaryOptions);
