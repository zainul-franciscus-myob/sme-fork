import {
  DatePicker, DetailHeader, Input, TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getBillPaymentOptions } from '../BillPaymentDetailSelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import ContactCombobox from '../../../../components/combobox/ContactCombobox';

const onTextFieldChange = handler => ({ target: { name: key, value } }) => handler({ key, value });

const onComboBoxChange = handler => key => item => handler({ key, value: item.id });

const onDateChange = handler => key => ({ value }) => handler({ key, value });

const BillPaymentOptions = ({
  suppliers,
  supplierId,
  accounts,
  accountId,
  description,
  referenceId,
  onUpdateHeaderOption,
  date,
  shouldDisableFields,
  isCreating,
}) => {
  const requiredLabel = 'This is required';

  const primary = (
    <>
      <ContactCombobox
        disabled={shouldDisableFields}
        items={suppliers}
        selectedId={supplierId}
        onChange={onComboBoxChange(onUpdateHeaderOption)('supplierId')}
        label="Supplier"
        name="Supplier"
        hideLabel={false}
        requiredLabel={isCreating ? requiredLabel : undefined}
      />
      <AccountCombobox
        label="Bank account"
        hideLabel={false}
        items={accounts}
        selectedId={accountId}
        onChange={onComboBoxChange(onUpdateHeaderOption)('accountId')}
        requiredLabel={requiredLabel}
      />
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
        onSelect={onDateChange(onUpdateHeaderOption)('date')}
        requiredLabel={requiredLabel}
      />
    </>
  );

  return <DetailHeader primary={primary} secondary={secondary} />;
};

const mapStateToProps = state => getBillPaymentOptions(state);

export default connect(mapStateToProps)(BillPaymentOptions);
