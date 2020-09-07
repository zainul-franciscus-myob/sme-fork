import { DetailHeader, Input, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getBillPaymentOptions,
  getIsBeforeStartOfFinancialYear,
} from '../BillPaymentDetailSelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import DatePicker from '../../../../components/DatePicker/DatePicker';
import handleAutoCompleteChange from '../../../../components/handlers/handleAutoCompleteChange';

const onTextFieldChange = (handler) => ({ target: { name: key, value } }) =>
  handler({ key, value });

const onComboBoxChange = (handler) => (key) => (item) =>
  handler({ key, value: item.id });

const onDateChange = (handler) => (key) => ({ value }) =>
  handler({ key, value });

const BillPaymentOptions = ({
  supplierId,
  accounts,
  accountId,
  description,
  referenceId,
  bankStatementText,
  showBankStatementText,
  renderContactCombobox,
  onUpdateHeaderOption,
  onBlurBankStatementText,
  date,
  shouldDisableSupplier,
  isCreating,
  isBeforeStartOfFinancialYear,
}) => {
  const requiredLabel = 'This is required';

  const primary = (
    <>
      {renderContactCombobox({
        selectedId: supplierId,
        name: 'supplierId',
        label: 'Supplier',
        hideLabel: false,
        hideAdd: true,
        requiredLabel: isCreating ? requiredLabel : undefined,
        allowClear: true,
        disabled: shouldDisableSupplier,
        onChange: handleAutoCompleteChange('supplierId', onUpdateHeaderOption),
      })}
      <AccountCombobox
        label="Bank account"
        hideLabel={false}
        items={accounts}
        selectedId={accountId}
        onChange={onComboBoxChange(onUpdateHeaderOption)('accountId')}
      />
      {showBankStatementText && (
        <Input
          name="bankStatementText"
          label="Bank statement text"
          value={bankStatementText}
          onChange={onTextFieldChange(onUpdateHeaderOption)}
          onBlur={onTextFieldChange(onBlurBankStatementText)}
          requiredLabel={requiredLabel}
          maxLength={18}
        />
      )}
      <TextArea
        name="description"
        label="Description of transaction"
        resize="vertical"
        value={description}
        onChange={onTextFieldChange(onUpdateHeaderOption)}
        maxLength={255}
        rows={1}
        autoSize
      />
    </>
  );

  const secondary = (
    <>
      <Input
        name="referenceId"
        label="Reference number"
        value={referenceId}
        onChange={onTextFieldChange(onUpdateHeaderOption)}
        requiredLabel={requiredLabel}
        maxLength={8}
      />
      <DatePicker
        label="Date"
        name="Date"
        value={date}
        displayWarning={isBeforeStartOfFinancialYear}
        warningMessage={'The date is set to a previous financial year'}
        onSelect={onDateChange(onUpdateHeaderOption)('date')}
        requiredLabel={requiredLabel}
      />
    </>
  );

  return <DetailHeader primary={primary} secondary={secondary} />;
};

const mapStateToProps = (state) => ({
  ...getBillPaymentOptions(state),
  isBeforeStartOfFinancialYear: getIsBeforeStartOfFinancialYear(state),
});

export default connect(mapStateToProps)(BillPaymentOptions);
