import {
  Alert,
  DetailHeader,
  Input,
  ReadOnly,
  Select,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React, { Fragment } from 'react';

import {
  getIsBeforeStartOfFinancialYear,
  getIsOpenAndExpired,
  getIsReadOnly,
  getQuoteDetailOptions,
  getReadOnlyMessage,
} from '../selectors/QuoteDetailSelectors';
import BooleanRadioButtonGroup from '../../../../components/BooleanRadioButtonGroup/BooleanRadioButtonGroup';
import CustomerCombobox from '../../../../components/combobox/CustomerCombobox';
import DatePicker from '../../../../components/DatePicker/DatePicker';
import PaymentTerms from '../../../../components/PaymentTerms/PaymentTerms';
import handleDateChange from '../../../../components/handlers/handleDateChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import handleSelectChange from '../../../../components/handlers/handleSelectChange';
import styles from './QuoteDetailOptions.module.css';

const onComboBoxChange = (handler) => (option) => {
  const key = 'contactId';
  const { id: value } = option;

  handler({ key, value });
};

const requiredLabel = 'Required';

const QuoteDetailOptions = (props) => {
  const {
    contactId,
    address,
    quoteNumber,
    purchaseOrderNumber,
    issueDate,
    expirationTerm,
    expirationDays,
    expirationTermOptions,
    status,
    isTaxInclusive,
    contactOptions,
    isBeforeStartOfFinancialYear,
    isCalculating,
    isCustomerDisabled,
    isReadOnlyLayout,
    readOnlyMessage,
    taxInclusiveLabel,
    taxExclusiveLabel,
    onUpdateHeaderOptions,
    onAddCustomerButtonClick,
    isExpired,
  } = props;

  const statusDropdown = ['Open', 'Accepted', 'Declined', 'Invoiced'];

  const primary = (
    <Fragment>
      <CustomerCombobox
        items={contactOptions}
        selectedId={contactId}
        onChange={onComboBoxChange(onUpdateHeaderOptions)}
        label="Customer"
        name="contactId"
        hideLabel={false}
        disabled={isCustomerDisabled || isReadOnlyLayout}
        addNewItem={{
          label: 'Create customer',
          onAddNew: onAddCustomerButtonClick,
        }}
        requiredLabel={requiredLabel}
      />
      {address && (
        <ReadOnly className={styles.address} label="Billing address">
          {address}
        </ReadOnly>
      )}
    </Fragment>
  );

  const secondary = (
    <Fragment>
      <Input
        name="quoteNumber"
        label="Quote number"
        value={quoteNumber}
        onChange={handleInputChange(onUpdateHeaderOptions)}
        requiredLabel={requiredLabel}
        disabled={isReadOnlyLayout}
        maxLength={13}
      />
      <Input
        name="purchaseOrderNumber"
        label="Customer PO number"
        value={purchaseOrderNumber}
        onChange={handleInputChange(onUpdateHeaderOptions)}
        disabled={isReadOnlyLayout}
      />
      <DatePicker
        label="Issue date"
        name="issueDate"
        value={issueDate}
        onSelect={handleDateChange('issueDate', onUpdateHeaderOptions)}
        requiredLabel={requiredLabel}
        disabled={isReadOnlyLayout}
        displayWarning={isBeforeStartOfFinancialYear}
        warningMessage={'The issue date is set to a previous financial year'}
      />
      <PaymentTerms
        onChange={onUpdateHeaderOptions}
        issueDate={issueDate}
        expirationTermOptions={expirationTermOptions}
        expirationDays={expirationDays}
        expirationTerm={expirationTerm}
        label="Expiry date"
        popoverLabel="Quote expires"
        requiredLabel={requiredLabel}
        disabled={isReadOnlyLayout}
        displayWarning={isExpired}
        warningMessage={'Expired'}
      />
      <Select
        key="status"
        name="status"
        label="Status"
        value={status}
        onChange={handleSelectChange(onUpdateHeaderOptions)}
        disabled={isReadOnlyLayout}
      >
        {statusDropdown.map((item) => (
          <Select.Option key={item} value={item} label={item} />
        ))}
      </Select>
      <BooleanRadioButtonGroup
        name="isTaxInclusive"
        label="Amounts are"
        value={isTaxInclusive}
        trueLabel={taxInclusiveLabel}
        falseLabel={taxExclusiveLabel}
        handler={onUpdateHeaderOptions}
        disabled={isCalculating || isReadOnlyLayout}
      />
    </Fragment>
  );

  const readOnlyWarning = <Alert type="info">{readOnlyMessage}</Alert>;

  return (
    <div className={styles.options}>
      {isReadOnlyLayout && readOnlyWarning}
      <DetailHeader primary={primary} secondary={secondary} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...getQuoteDetailOptions(state),
  isReadOnlyLayout: getIsReadOnly(state),
  readOnlyMessage: getReadOnlyMessage(state),
  isBeforeStartOfFinancialYear: getIsBeforeStartOfFinancialYear(state),
  isExpired: getIsOpenAndExpired(state),
});

export default connect(mapStateToProps)(QuoteDetailOptions);
