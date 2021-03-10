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
  getIsShowIsTaxInclusiveAndTaxCodeColumn,
  getQuoteDetailOptions,
  getReadOnlyMessage,
  getStatusDropdownOptions,
} from '../selectors/QuoteDetailSelectors';
import BooleanRadioButtonGroup from '../../../../components/BooleanRadioButtonGroup/BooleanRadioButtonGroup';
import DatePicker from '../../../../components/DatePicker/DatePicker';
import PaymentTerms from '../../../../components/PaymentTerms/PaymentTerms';
import handleAutoCompleteChange from '../../../../components/handlers/handleAutoCompleteChange';
import handleDateChange from '../../../../components/handlers/handleDateChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import handleSelectChange from '../../../../components/handlers/handleSelectChange';
import styles from './QuoteDetailOptions.module.css';

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
    isBeforeStartOfFinancialYear,
    isCalculating,
    isCustomerDisabled,
    isReadOnlyLayout,
    readOnlyMessage,
    taxInclusiveLabel,
    taxExclusiveLabel,
    renderContactCombobox,
    onUpdateHeaderOptions,
    isExpired,
    onInputAlert,
    statusOptions,
    isShowIsTaxInclusiveAndTaxCodeColumn,
  } = props;

  const primary = (
    <Fragment>
      {renderContactCombobox({
        selectedId: contactId,
        name: 'contactId',
        label: 'Customer',
        hideLabel: false,
        requiredLabel: 'Required',
        allowClear: true,
        disabled: isCustomerDisabled || isReadOnlyLayout,
        onChange: handleAutoCompleteChange('contactId', onUpdateHeaderOptions),
        onAlert: onInputAlert,
      })}
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
        {statusOptions.map((item) => (
          <Select.Option key={item} value={item} label={item} />
        ))}
      </Select>
      {isShowIsTaxInclusiveAndTaxCodeColumn && (
        <BooleanRadioButtonGroup
          name="isTaxInclusive"
          label="Amounts are"
          value={isTaxInclusive}
          trueLabel={taxInclusiveLabel}
          falseLabel={taxExclusiveLabel}
          handler={onUpdateHeaderOptions}
          disabled={isCalculating || isReadOnlyLayout}
        />
      )}
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
  statusOptions: getStatusDropdownOptions(state),
  isShowIsTaxInclusiveAndTaxCodeColumn: getIsShowIsTaxInclusiveAndTaxCodeColumn(
    state
  ),
});

export default connect(mapStateToProps)(QuoteDetailOptions);
