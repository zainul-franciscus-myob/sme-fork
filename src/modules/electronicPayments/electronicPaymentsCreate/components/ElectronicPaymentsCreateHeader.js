import {
  DatePicker,
  DetailHeader,
  FormHorizontal,
  Input,
  Tooltip,
} from '@myob/myob-widgets';
import React from 'react';

import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import handleComboboxChange from '../../../../components/handlers/handleComboboxChange';
import handleDateChange from '../../../../components/handlers/handleDateChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import styles from './ElectronicPaymentsCreateHeader.module.css';

const ElectronicPaymentsCreateHeader = ({
  accounts,
  selectedAccountId,
  onAccountChange,
  balanceValue,
  onInputChange,
  transactionDescription,
  referenceNumber,
  dateOfPayment,
  bankStatementDescription,
}) => {
  const primary = (
    <div>
      <AccountCombobox
        items={accounts}
        selectedId={selectedAccountId}
        onChange={handleComboboxChange('id', onAccountChange)}
        label="Account"
        requiredLabel="This field is required"
        hideLabel={false}
      />
      <FormHorizontal>
        <h4>
          <span>
            Balance
          </span>
          <span className={styles.balanceAmount}>
            {balanceValue}
          </span>
        </h4>
      </FormHorizontal>
      <Input
        name="transactionDescription"
        label="Description of transaction"
        value={transactionDescription}
        onChange={handleInputChange(onInputChange)}
      />
    </div>
  );

  const secondary = (
    <div>
      <Input
        name="referenceNumber"
        label="Reference number"
        requiredLabel="This field is required"
        value={referenceNumber}
        onChange={handleInputChange(onInputChange)}
      />
      <DatePicker
        name="dateOfPayment"
        label="Date of payment"
        requiredLabel="This field is required"
        value={dateOfPayment}
        onSelect={handleDateChange('dateOfPayment', onInputChange)}
      />
      <Input
        name="bankStatementDescription"
        label="Description"
        requiredLabel="This field is required"
        value={bankStatementDescription}
        onChange={handleInputChange(onInputChange)}
        labelAccessory={<Tooltip>Description on your bank statement</Tooltip>}
      />
    </div>
  );

  return (<DetailHeader primary={primary} secondary={secondary} />);
};

export default ElectronicPaymentsCreateHeader;
