import React from 'react';

import AccountNumberInput from '../../../../../components/autoFormatter/BankDetailsInput/AccountNumberInput';
import BSBInput from '../../../../../components/autoFormatter/BankDetailsInput/BSBInput';
import UpperCaseInputFormatter from '../../../../../components/autoFormatter/UpperCaseInput/UpperCaseInputFormatter';
import handleInputChange from '../../../../../components/handlers/handleInputChange';
import styles from './AuPaymentOptions.module.css';

const AuPaymentOptions = ({ onUpdatePaymentOptions, paymentOptions }) => (
  <>
    <div className={styles.inputContainer}>
      <UpperCaseInputFormatter
        onChange={handleInputChange(onUpdatePaymentOptions)}
        name="bankNameAu"
        label="Bank"
        requiredLabel="This field is required"
        maxLength={30}
        value={paymentOptions.bankNameAu}
      />
      <UpperCaseInputFormatter
        name="accountNameAu"
        label="Account name"
        requiredLabel="This field is required"
        maxLength={60}
        value={paymentOptions.accountNameAu}
        onChange={handleInputChange(onUpdatePaymentOptions)}
      />
    </div>
    <div className={styles.inputContainer}>
      <BSBInput
        name="bsbNumber"
        label="BSB number"
        requiredLabel="This field is required"
        numeralIntegerScale={6}
        value={paymentOptions.bsbNumber}
        onChange={handleInputChange(onUpdatePaymentOptions)}
      />
      <AccountNumberInput
        name="accountNumberAu"
        label="Account number"
        requiredLabel="This field is required"
        numeralIntegerScale={9}
        value={paymentOptions.accountNumberAu}
        onChange={handleInputChange(onUpdatePaymentOptions)}
      />
    </div>
  </>
);

export default AuPaymentOptions;
