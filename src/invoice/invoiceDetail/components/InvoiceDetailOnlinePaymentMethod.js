import {
  Button, Checkbox, CheckboxGroup, Field, Icons, Spinner, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getPayDirectOptions } from '../selectors/payDirectSelectors';
import OnlinePaymentMethodsImage from '../assets/OnlinePaymentMethods.png';
import ServiceUnavailableImage from '../assets/ServiceUnavailable.svg';
import handleCheckboxChange from '../../../components/handlers/handleCheckboxChange';
import styles from './InvoiceDetailOnlinePaymentMethod.module.css';

const openNewTab = url => () => window.open(url);

const InvoiceDetailOnlinePaymentMethod = ({
  isLoading,
  isServiceAvailable,
  setUpOnlinePaymentsLink,
  isAllowOnlinePayments,
  hasSetUpOnlinePayments,
  onUpdateAllowOnlinePayments,
}) => {
  const label = 'Allow online payments';

  if (isLoading) {
    return (
      <Field
        label={label}
        renderField={() => (
          <div className={styles.spinner}><Spinner size="small" /></div>
        )}
      />
    );
  }

  if (!isServiceAvailable) {
    const tooltipMessage = 'The online payments service is currently unavailable. Please try again later.';

    const image = (
      <img src={ServiceUnavailableImage} alt={tooltipMessage} className={styles.status} />
    );

    return (
      <Field
        label={label}
        renderField={() => (
          <Tooltip triggerContent={image}>{tooltipMessage}</Tooltip>
        )}
      />
    );
  }

  const allowOnlinePayment = (
    <CheckboxGroup
      label={label}
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
  );

  const setUpOnlinePayment = (
    <Field
      label={label}
      renderField={() => (
        <>
          <div>
            <Button type="link" icon={<Icons.OpenExternalLink />} iconLeft onClick={openNewTab(setUpOnlinePaymentsLink)}>
              Set up
            </Button>
          </div>
          <img src={OnlinePaymentMethodsImage} alt="Online payment methods" className={styles.onlinePaymentMethodsImage} />
        </>
      )}
    />
  );

  return hasSetUpOnlinePayments ? allowOnlinePayment : setUpOnlinePayment;
};

const mapStateToProps = state => getPayDirectOptions(state);

export default connect(mapStateToProps)(InvoiceDetailOnlinePaymentMethod);
