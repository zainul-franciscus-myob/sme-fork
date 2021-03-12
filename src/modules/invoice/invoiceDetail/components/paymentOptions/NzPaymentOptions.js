import { FieldGroup } from '@myob/myob-widgets';
import React from 'react';

import IntegerInput from '../../../../../components/autoFormatter/IntegerInput/IntegerInput';
import UpperCaseInputFormatter from '../../../../../components/autoFormatter/UpperCaseInput/UpperCaseInputFormatter';
import handleInputChange from '../../../../../components/handlers/handleInputChange';
import styles from './NzPaymentOptions.module.css';

const NzPaymentOptions = ({ onUpdatePaymentOptions, paymentOptions }) => (
  <>
    <div className={styles.inputContainer}>
      <UpperCaseInputFormatter
        onChange={handleInputChange(onUpdatePaymentOptions)}
        name="bankNameNz"
        label="Bank"
        requiredLabel="This field is required"
        maxLength={30}
        value={paymentOptions.bankNameNz}
      />
      <UpperCaseInputFormatter
        name="accountNameNz"
        label="Account name"
        requiredLabel="This field is required"
        maxLength={60}
        value={paymentOptions.accountNameNz}
        onChange={handleInputChange(onUpdatePaymentOptions)}
      />
    </div>

    <FieldGroup label="Account number" className={styles.fieldGroup}>
      <div className={styles.container}>
        <div className={styles.bankNumber}>
          <IntegerInput
            name="bankNumberNz"
            label="Bank"
            value={paymentOptions.bankNumberNz}
            maxLength={2}
            onChange={handleInputChange(onUpdatePaymentOptions)}
            requiredLabel="This field is required"
          />
        </div>
        <div className={styles.branch}>
          <IntegerInput
            name="branch"
            label="Branch"
            value={paymentOptions.branch}
            maxLength={4}
            onChange={handleInputChange(onUpdatePaymentOptions)}
            requiredLabel="This field is required"
          />
        </div>
        <div className={styles.accountNumber}>
          <IntegerInput
            name="accountNumberNz"
            label="Acc no"
            value={paymentOptions.accountNumberNz}
            maxLength={7}
            onChange={handleInputChange(onUpdatePaymentOptions)}
            requiredLabel="This field is required"
          />
        </div>
        <div className={styles.suffix}>
          <IntegerInput
            name="suffix"
            label="Suffix"
            value={paymentOptions.suffix}
            maxLength={3}
            onChange={handleInputChange(onUpdatePaymentOptions)}
            requiredLabel="This field is required"
          />
        </div>
      </div>
    </FieldGroup>
  </>
);

export default NzPaymentOptions;
