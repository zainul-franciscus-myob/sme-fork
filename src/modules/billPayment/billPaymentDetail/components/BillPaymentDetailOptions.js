import {
  Checkbox,
  CheckboxGroup,
  Combobox,
  DetailHeader,
  Input,
  TextArea,
  Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classnames from 'classnames';

import { getBillPaymentOptions } from '../BillPaymentDetailSelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import DatePicker from '../../../../components/DatePicker/DatePicker';
import SupplierPaymentDetailsStatus from './SupplierPaymentDetailsStatus';
import handleAutoCompleteChange from '../../../../components/handlers/handleAutoCompleteChange';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import handleComboboxChange from '../../../../components/handlers/handleComboboxChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import handleTextAreaChange from '../../../../components/handlers/handleTextAreaChange';
import styles from './BillPaymentDetailOptions.module.css';

const onDateChange = (handler) => (key) => ({ value }) =>
  handler({ key, value });

const BillPaymentOptions = ({
  supplierId,
  supplierName,
  accounts,
  accountId,
  description,
  referenceId,
  bankStatementText,
  isElectronicPayment,
  showElectronicPayments,
  renderContactCombobox,
  onChangeReferenceId,
  onUpdateHeaderOption,
  onChangeBankStatementText,
  onUpdateBankStatementText,
  date,
  onUpdateIsElectronicPayment,
  shouldDisableSupplier,
  isCreating,
  isBeforeStartOfFinancialYear,
  shouldShowSupplierPopover,
  electronicPaymentReference,
  isSupplierLoading,
}) => {
  const requiredLabel = 'This is required';
  const requiredBankStatementText =
    'This will appear on your supplier’s bank statement to help identify the payment';
  const supplierComboProps = {
    name: 'supplierId',
    label: 'Supplier',
    hideLabel: false,
    hideAdd: true,
    allowClear: true,
    width: 'xl',
  };

  const autoCompleteSupplierComboBox = renderContactCombobox({
    ...supplierComboProps,
    selectedId: supplierId,
    requiredLabel,
    onChange: handleAutoCompleteChange('supplierId', onUpdateHeaderOption),
  });

  const predeterminedSupplierComboBox = (
    <Combobox
      {...supplierComboProps}
      selected={{ supplierId, supplierName }}
      disabled
      onChange={() => {}}
      metaData={[
        {
          columnName: 'supplierName',
          showData: true,
        },
      ]}
      items={[{ supplierId, supplierName }]}
    />
  );

  const primary = (
    <>
      <div
        className={classnames(styles.contactComboBox, {
          [styles.maximiseContactCombobox]: !shouldShowSupplierPopover,
        })}
      >
        {shouldDisableSupplier
          ? predeterminedSupplierComboBox
          : autoCompleteSupplierComboBox}
        {shouldShowSupplierPopover && <SupplierPaymentDetailsStatus />}
      </div>
      {showElectronicPayments && (
        <CheckboxGroup
          label="Electronic Payment"
          hideLabel
          renderCheckbox={() => (
            <Checkbox
              name="isElectronicPayment"
              label="Electronic payment"
              checked={isElectronicPayment}
              disabled={!isCreating}
              labelAccessory={
                <Tooltip placement="right">
                  Payment will be added to the bank file payments list
                </Tooltip>
              }
              onChange={handleCheckboxChange(
                onUpdateIsElectronicPayment,
                'isElectronicPayment'
              )}
            />
          )}
        />
      )}
      <AccountCombobox
        label="Bank account"
        hideLabel={false}
        items={accounts}
        selectedId={accountId}
        disabled={electronicPaymentReference || isElectronicPayment}
        onChange={handleComboboxChange('accountId', onUpdateHeaderOption)}
        width="xl"
      />
      {isElectronicPayment && (
        <Input
          name="bankStatementText"
          label="Statement text"
          value={bankStatementText}
          onChange={handleInputChange(onChangeBankStatementText)}
          onBlur={handleInputChange(onUpdateBankStatementText)}
          requiredLabel={requiredBankStatementText}
          maxLength={18}
          disabled={electronicPaymentReference || isSupplierLoading}
          width="xl"
        />
      )}
      <TextArea
        name="description"
        label="Description of transaction"
        resize="vertical"
        value={description}
        onChange={handleTextAreaChange(onUpdateHeaderOption)}
        maxLength={255}
        rows={1}
        autoSize
        disabled={electronicPaymentReference}
        width="xl"
      />
    </>
  );

  const secondary = (
    <>
      <Input
        name="referenceId"
        label="Reference number"
        value={referenceId}
        onChange={handleInputChange(onChangeReferenceId)}
        requiredLabel={requiredLabel}
        maxLength={8}
        disabled={electronicPaymentReference}
      />
      <DatePicker
        label="Date"
        name="Date"
        value={date}
        displayWarning={isBeforeStartOfFinancialYear}
        warningMessage={'The date is set to a previous financial year'}
        onSelect={onDateChange(onUpdateHeaderOption)('date')}
        requiredLabel={requiredLabel}
        disabled={electronicPaymentReference}
      />
    </>
  );

  return (
    <DetailHeader
      primary={primary}
      secondary={secondary}
      className={styles.detail}
    />
  );
};

const mapStateToProps = (state) => ({
  ...getBillPaymentOptions(state),
});

export default connect(mapStateToProps)(BillPaymentOptions);
