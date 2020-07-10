import { Button, Field, Icons, Spinner } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getOnlinePaymentOptions } from '../SalesSettingsDetailSelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import LinkButton from '../../../../components/Button/LinkButton';
import ServiceUnavailableImage from '../../../../components/ServiceUnavailableImage/ServiceUnavailableImage';
import handleComboboxChange from '../../../../components/handlers/handleComboboxChange';
import onlinePaymentMethodsImage from '../../../../common/images/OnlinePaymentMethods.png';
import styles from './OnlinePaymentOptions.module.css';

const OnlinePaymentOptions = ({
  accountId,
  accountOptions,
  isLoading,
  isRegistered,
  isServiceAvailable,
  isTrial,
  onUpdateSalesSettingsItem,
  payDirectLink,
  registrationLink,
  onSubscribeNowClick,
}) => {
  const label = 'Online';
  const img = (
    <img
      alt="Online payment methods"
      className={styles.onlinePaymentMethodsImage}
      height="32"
      src={onlinePaymentMethodsImage}
      width="250"
    />
  );

  const setupInfo = (
    <p>
      Online payments allow your customers to pay direct from their emailed
      invoice - meaning you get paid faster and minimise overdue invoices.{' '}
      <a
        href="https://help.myob.com/wiki/x/r51qAg"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn more
      </a>
    </p>
  );

  if (isTrial) {
    return (
      <Field
        hideLabel
        label={label}
        renderField={() => (
          <>
            <legend className="margin-bottom-10">{label}</legend>
            {img}
            This feature is only <b>available to subscribers</b>.
            <Button
              className={styles.spacingBottomSmall}
              icon={<Icons.OpenExternalLink />}
              iconRight
              onClick={onSubscribeNowClick}
              type="link"
            >
              Subscribe now
            </Button>
            {setupInfo}
          </>
        )}
      />
    );
  }

  if (isLoading) {
    return <Field label={label} renderField={() => <Spinner size="small" />} />;
  }

  if (!isServiceAvailable) {
    return (
      <Field
        hideLabel
        label={label}
        renderField={() => (
          <>
            <legend>{label}</legend>

            <ServiceUnavailableImage tooltipMessage="The online payments service is currently unavailable. Please try again later." />
          </>
        )}
      />
    );
  }

  const registeredView = (
    <>
      You have online invoice payments
      <span className={styles.activeStatus}> activated</span>.
      <LinkButton
        className={styles.spacingBottomSmall}
        href={payDirectLink}
        icon={<Icons.OpenExternalLink />}
        iconRight
        isOpenInNewTab
      >
        Edit preferences
      </LinkButton>
    </>
  );

  const unregisteredView = (
    <>
      You have online invoice payments
      <span className={styles.inactiveStatus}> inactive</span>.
      <LinkButton
        className={styles.spacingBottomSmall}
        href={registrationLink}
        icon={<Icons.OpenExternalLink />}
        iconRight
        isOpenInNewTab
      >
        Set up online payments options
      </LinkButton>
      {setupInfo}
    </>
  );

  return (
    <>
      <Field
        label={label}
        hideLabel
        renderField={() => (
          <>
            <legend className="margin-bottom-10">{label}</legend>

            {img}

            {isRegistered ? registeredView : unregisteredView}
          </>
        )}
      />

      {isRegistered && (
        <Field
          label="Account for receiving online payments"
          renderField={() => (
            <div className={styles.account}>
              <AccountCombobox
                hideLabel
                items={accountOptions}
                label="Account for receiving online payments"
                onChange={handleComboboxChange(
                  'accountId',
                  onUpdateSalesSettingsItem
                )}
                selectedId={accountId}
              />
              <p>
                This account must match the bank account you chose when setting
                up your online payments.
              </p>
            </div>
          )}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => getOnlinePaymentOptions(state);

export default connect(mapStateToProps)(OnlinePaymentOptions);
