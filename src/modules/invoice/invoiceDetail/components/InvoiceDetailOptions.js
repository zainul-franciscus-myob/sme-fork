import {
  Alert,
  DetailHeader,
  Input,
  RadioButtonGroup,
  ReadOnly,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classnames from 'classnames';

import {
  getInvoiceDetailOptions,
  getIsBeforeFYAndAfterConversionDate,
  getIsPreConversion,
  getIsReadOnly,
  getReadOnlyMessage,
  getShouldShowAbn,
  getShowPreConversionAlert,
} from '../selectors/invoiceDetailSelectors';
import DatePicker from '../../../../components/DatePicker/DatePicker';
import InvoiceAbnPopover from './InvoiceAbnPopover';
import InvoiceDetailOnlinePaymentMethod from './InvoiceDetailOnlinePaymentMethod';
import PaymentTerms from '../../../../components/PaymentTerms/PaymentTerms';
import handleAutoCompleteChange from '../../../../components/handlers/handleAutoCompleteChange';
import handleDateChange from '../../../../components/handlers/handleDateChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import styles from './InvoiceDetailOptions.module.css';

const InvoiceDetailOptions = ({
  customerId,
  invoiceNumber,
  address,
  purchaseOrderNumber,
  issueDate,
  expirationTerm,
  expirationDays,
  expirationTermOptions,
  isTaxInclusive,
  isCustomerDisabled,
  isSubmitting,
  showOnlinePayment,
  taxInclusiveLabel,
  taxExclusiveLabel,
  renderContactCombobox,
  onInputAlert,
  onUpdateHeaderOptions,
  onIssueDateBlur,
  isReadOnly,
  readOnlyMessage,
  isPreConversion,
  isBeforeFYAndAfterConversionDate,
  showPreConversionAlert,
  shouldShowAbn,
  onDismissPreConversionAlert,
}) => {
  const onIsTaxInclusiveChange = (handler) => (e) => {
    handler({ key: 'isTaxInclusive', value: e.value === taxInclusiveLabel });
  };

  const requiredLabel = 'This is required';

  const billingAddress = address && (
    <ReadOnly label="Billing address" className={styles.address}>
      {address}
    </ReadOnly>
  );

  const primary = (
    <>
      <div
        className={classnames(styles.contactComboBox, {
          [styles.maximiseContactCombobox]: !shouldShowAbn,
        })}
      >
        {renderContactCombobox({
          selectedId: customerId,
          name: 'customerId',
          label: 'Customer',
          hideLabel: false,
          requiredLabel,
          allowClear: true,
          disabled: isCustomerDisabled || isReadOnly,
          width: 'xl',
          onChange: handleAutoCompleteChange(
            'customerId',
            onUpdateHeaderOptions
          ),
          onAlert: onInputAlert,
        })}
        {shouldShowAbn && <InvoiceAbnPopover />}
      </div>
      {billingAddress}
    </>
  );

  const secondary = (
    <div>
      <Input
        name="invoiceNumber"
        label="Invoice number"
        value={invoiceNumber}
        onChange={handleInputChange(onUpdateHeaderOptions)}
        requiredLabel={requiredLabel}
        disabled={isReadOnly}
        maxLength={13}
      />
      <Input
        name="purchaseOrderNumber"
        label="Customer PO number"
        value={purchaseOrderNumber}
        onChange={handleInputChange(onUpdateHeaderOptions)}
        maxLength={20}
        disabled={isReadOnly}
      />
      <DatePicker
        label="Issue date"
        requiredLabel={requiredLabel}
        value={issueDate}
        disabled={isReadOnly || isPreConversion}
        disabledMessage="You can't change the date of a historical invoice."
        onSelect={handleDateChange('issueDate', onUpdateHeaderOptions)}
        onBlur={onIssueDateBlur}
        displayWarning={isBeforeFYAndAfterConversionDate}
        warningMessage={'The issue date is set to a previous financial year'}
      />
      <PaymentTerms
        disabled={isReadOnly}
        onChange={onUpdateHeaderOptions}
        issueDate={issueDate}
        expirationTermOptions={expirationTermOptions}
        expirationDays={expirationDays}
        expirationTerm={expirationTerm}
      />
      {showOnlinePayment && (
        <InvoiceDetailOnlinePaymentMethod
          disabled={isReadOnly}
          onUpdateAllowOnlinePayments={onUpdateHeaderOptions}
        />
      )}
      <RadioButtonGroup
        label="Amounts are"
        name="isTaxInclusive"
        value={isTaxInclusive ? taxInclusiveLabel : taxExclusiveLabel}
        options={[taxInclusiveLabel, taxExclusiveLabel]}
        onChange={onIsTaxInclusiveChange(onUpdateHeaderOptions)}
        disabled={isSubmitting || isReadOnly || isPreConversion}
      />
    </div>
  );

  const preConversionAlert = showPreConversionAlert && (
    <Alert type="info" onDismiss={onDismissPreConversionAlert}>
      {`Invoices dated before your opening balance month will not automatically update account balances.
        Remember to include the invoice amounts in the respective account's opening balance`}
    </Alert>
  );

  const readOnlyWarning = <Alert type="info">{readOnlyMessage}</Alert>;

  return (
    <div className={styles.options}>
      {isReadOnly && readOnlyWarning}
      {preConversionAlert}
      <DetailHeader
        primary={primary}
        secondary={secondary}
        className={styles.detail}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...getInvoiceDetailOptions(state),
  readOnlyMessage: getReadOnlyMessage(state),
  isReadOnly: getIsReadOnly(state),
  isPreConversion: getIsPreConversion(state),
  showPreConversionAlert: getShowPreConversionAlert(state),
  shouldShowAbn: getShouldShowAbn(state),
  isBeforeFYAndAfterConversionDate: getIsBeforeFYAndAfterConversionDate(state),
});

export default connect(mapStateToProps)(InvoiceDetailOptions);
