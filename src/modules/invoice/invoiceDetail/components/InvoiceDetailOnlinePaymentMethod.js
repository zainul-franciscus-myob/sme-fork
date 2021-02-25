import {
  Button,
  Checkbox,
  CheckboxGroup,
  Field,
  Icons,
  Spinner,
  Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getPayDirectOptions } from '../selectors/payDirectSelectors';
import InvoiceDetailSurcharging from './InvoiceDetailSurcharging';
import OnlinePaymentMethodsImage from '../../../../common/images/OnlinePaymentMethods.png';
import ServiceUnavailableImage from '../../../../components/ServiceUnavailableImage/ServiceUnavailableImage';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import styles from './InvoiceDetailOnlinePaymentMethod.module.css';

const InvoiceDetailOnlinePaymentMethod = ({
  disabled,
  isLoading,
  isTrial,
  isServiceAvailable,
  isAllowOnlinePayments,
  hasSetUpOnlinePayments,
  onUpdateOnlinePaymentOptions,
  showSurchargingOptions,
  redirectToSetUpOnlinePayments,
}) => {
  const label = 'Allow online payments';
  const imgAlt = 'Online payment methods';

  if (isTrial) {
    return (
      <Field
        label={label}
        renderField={() => (
          <span className={styles.trial}>
            <img
              src={OnlinePaymentMethodsImage}
              alt={imgAlt}
              className={styles.onlinePaymentMethodsImageSetUp}
            />
            <Tooltip triggerContent={<Icons.Info />}>
              Online payments aren&rsquo;t available whilst on a trial
            </Tooltip>
          </span>
        )}
      />
    );
  }

  if (isLoading) {
    return (
      <Field
        label={label}
        renderField={() => (
          <div className={styles.spinner}>
            <Spinner size="small" />
          </div>
        )}
      />
    );
  }

  if (!isServiceAvailable) {
    const tooltipMessage =
      'The online payments service is currently unavailable. Please try again later.';

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
      disabled={disabled}
      label={label}
      renderCheckbox={() => (
        <div className={styles.onlinePaymentCheckboxGroup}>
          <Checkbox
            name="isAllowOnlinePayments"
            label=""
            disabled={disabled}
            checked={isAllowOnlinePayments}
            onChange={handleCheckboxChange(onUpdateOnlinePaymentOptions)}
          />
          <img
            src={OnlinePaymentMethodsImage}
            alt={imgAlt}
            className={styles.onlinePaymentMethodsImage}
          />

          {showSurchargingOptions && (
            <InvoiceDetailSurcharging
              disabled={disabled}
              onUpdateCanApplySurcharge={onUpdateOnlinePaymentOptions}
              redirectToSetUpOnlinePayments={redirectToSetUpOnlinePayments}
            />
          )}
        </div>
      )}
    />
  );

  const setUpOnlinePayment = (
    <Field
      label={
        <img
          src={OnlinePaymentMethodsImage}
          alt={imgAlt}
          className={styles.onlinePaymentMethodsImageSetUp}
        />
      }
      renderField={() => (
        <>
          <span>
            <Button
              disabled={disabled}
              type="link"
              icon={<Icons.OpenExternalLink />}
              iconRight
              onClick={redirectToSetUpOnlinePayments}
            >
              Start getting paid online
            </Button>
          </span>
        </>
      )}
    />
  );

  return hasSetUpOnlinePayments ? allowOnlinePayment : setUpOnlinePayment;
};

const mapStateToProps = (state) => getPayDirectOptions(state);

export default connect(mapStateToProps)(InvoiceDetailOnlinePaymentMethod);
