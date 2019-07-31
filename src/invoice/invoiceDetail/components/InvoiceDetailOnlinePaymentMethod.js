import {
  Button, Checkbox, CheckboxGroup, Field, Icons,
} from '@myob/myob-widgets';
import React from 'react';

import OnlinePaymentMethodsImage from '../assets/OnlinePaymentMethods.png';
import handleCheckboxChange from '../../../components/handlers/handleCheckboxChange';
import styles from './InvoiceDetailOnlinePaymentMethod.module.css';

const openNewTab = url => () => window.open(url);

const InvoiceDetailOnlinePaymentMethod = ({
  setUpOnlinePaymentsLink,
  isAllowOnlinePayments,
  hasSetUpOnlinePayments,
  onUpdateAllowOnlinePayments,
}) => {
  const allowOnlinePayment = (
    <div className={styles.checkbox}>
      <CheckboxGroup
        label="Allow online payments"
        renderCheckbox={() => (
          <div className={styles.onlinePaymentCheckboxGroup}>
            <Checkbox
              name="isAllowOnlinePayments"
              label=""
              checked={isAllowOnlinePayments}
              onChange={handleCheckboxChange(onUpdateAllowOnlinePayments)}
            />
            <img src={OnlinePaymentMethodsImage} alt="Online payment methods" className={styles.onlinePaymentMethodsImage} />
          </div>
        )}
      />
    </div>
  );

  const setUpOnlinePayment = (
    <Field
      label="Allow online payments"
      renderField={() => (
        <>
          <Button type="link" icon={<Icons.OpenExternalLink />} iconLeft onClick={openNewTab(setUpOnlinePaymentsLink)}>
            Set up online payments
          </Button>
          <img src={OnlinePaymentMethodsImage} alt="Online payment methods" className={styles.onlinePaymentMethodsImage} />
        </>
      )}
    />
  );
  return hasSetUpOnlinePayments ? allowOnlinePayment : setUpOnlinePayment;
};

export default InvoiceDetailOnlinePaymentMethod;
