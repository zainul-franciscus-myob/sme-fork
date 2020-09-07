import { DetailHeader, Input, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsBeforeStartOfFinancialYear,
  getIsCreating,
  getOptions,
  getWasRedirectedFromInvoiceDetail,
} from '../invoicePaymentDetailSelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import DatePicker from '../../../../components/DatePicker/DatePicker';
import handleComboboxChange from '../../../../components/handlers/handleComboboxChange';
import handleDatePickerChange from '../../../../components/handlers/handleDatePickerChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';

const requiredLabel = 'Required';

const handleCustomerComboBoxChange = (handler) => (item) => {
  handler(item ? item.id : '');
};

const InvoicePaymentDetailOptions = ({
  customerId,
  accounts,
  accountId,
  referenceId,
  description,
  date,
  isBeforeStartOfFinancialYear,
  isCreating,
  renderContactCombobox,
  onUpdateInvoicePaymentDetails,
  onUpdateCustomer,
  wasRedirectedFromInvoiceDetail,
}) => {
  const primary = (
    <div>
      {renderContactCombobox({
        selectedId: customerId,
        name: 'customerId',
        label: 'Customer',
        requiredLabel: isCreating ? requiredLabel : '',
        hideLabel: false,
        hideAdd: true,
        allowClear: true,
        disabled: !isCreating || wasRedirectedFromInvoiceDetail,
        onChange: handleCustomerComboBoxChange(onUpdateCustomer),
      })}
      <AccountCombobox
        label="Bank account"
        hideLabel={false}
        onChange={handleComboboxChange(
          'accountId',
          onUpdateInvoicePaymentDetails
        )}
        selectedId={accountId}
        items={accounts}
      />
      <TextArea
        label="Description of transaction"
        name="description"
        autoSize
        resize="vertical"
        value={description}
        rows={1}
        onChange={handleInputChange(onUpdateInvoicePaymentDetails)}
      />
    </div>
  );

  const secondary = (
    <div>
      <Input
        label="Reference number"
        requiredLabel={requiredLabel}
        name="referenceId"
        maxLength={13}
        value={referenceId}
        onChange={handleInputChange(onUpdateInvoicePaymentDetails)}
      />
      <DatePicker
        label="Date"
        requiredLabel={requiredLabel}
        name="date"
        value={date}
        onSelect={handleDatePickerChange(onUpdateInvoicePaymentDetails, 'date')}
        displayWarning={isBeforeStartOfFinancialYear}
        warningMessage={'The date is set to a previous financial year'}
      />
    </div>
  );

  return <DetailHeader primary={primary} secondary={secondary} />;
};

const mapStateToProps = (state) => ({
  ...getOptions(state),
  isCreating: getIsCreating(state),
  wasRedirectedFromInvoiceDetail: getWasRedirectedFromInvoiceDetail(state),
  isBeforeStartOfFinancialYear: getIsBeforeStartOfFinancialYear(state),
});

export default connect(mapStateToProps)(InvoicePaymentDetailOptions);
