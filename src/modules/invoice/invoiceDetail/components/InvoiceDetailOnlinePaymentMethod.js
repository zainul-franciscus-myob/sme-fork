import {
  Button, Checkbox, CheckboxGroup, Field, Icons, Spinner,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getPayDirectOptions } from '../selectors/payDirectSelectors';
import OnlinePaymentMethodsImage from '../assets/OnlinePaymentMethods.png';
import ServiceUnavailableImage from '../../../../components/ServiceUnavailableImage/ServiceUnavailableImage';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
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

    return (
      <Field
        label={label}
        renderField={() => (
          <div className={styles.status}>
            <ServiceUnavailableImage tooltipMessage={tooltipMessage} />
          </div>
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
          <span>
            <img src={OnlinePaymentMethodsImage} alt="Online payment methods" className={styles.onlinePaymentMethodsImageSetUp} />
            <Button type="link" icon={<Icons.OpenExternalLink />} iconLeft onClick={openNewTab(setUpOnlinePaymentsLink)}>
              Set up
            </Button>
          </span>
        </>
      )}
    />
  );

  return hasSetUpOnlinePayments ? allowOnlinePayment : setUpOnlinePayment;
};

const mapStateToProps = state => getPayDirectOptions(state);

export default connect(mapStateToProps)(InvoiceDetailOnlinePaymentMethod);
