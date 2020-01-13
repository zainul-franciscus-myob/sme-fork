import { Field, Icons, Spinner } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getOnlinePaymentOptions } from '../SalesSettingsDetailSelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import LinkButton from '../../../../components/Button/LinkButton';
import ServiceUnavailableImage from '../../../../components/ServiceUnavailableImage/ServiceUnavailableImage';
import handleComboboxChange from '../../../../components/handlers/handleComboboxChange';
import onlinePaymentMethodsImage from './OnlinePaymentMethods.png';
import styles from './OnlinePaymentOptions.module.css';

const OnlinePaymentOptions = ({
  isLoading,
  isServiceAvailable,
  isRegistered,
  payDirectLink,
  accountId,
  accountOptions,
  onUpdateSalesSettingsItem,
}) => {
  const label = 'Online payments';

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

  const registeredView = (
    <>
      <p className={styles.registeredView}>
        You have online invoice payments
        <span className={styles.status}> activated</span>
        <span>. </span>
        <LinkButton
          href={payDirectLink}
          icon={<Icons.OpenExternalLink />}
          iconRight
          isOpenInNewTab
        >
          Edit preferences
        </LinkButton>
      </p>
    </>
  );

  const unregisteredView = (
    <div className={styles.unRegisteredView}>
      <p>
        Setting up online payment allows your customers to
        pay direct from their emailed invoice -
        meaning you get paid faster and minimise the risk of overdue payments.
        <br />
        <a href="https://help.myob.com/wiki/display/ea/Online+payments" target="_blank" rel="noopener noreferrer">Learn more</a>
      </p>
      <LinkButton
        href={payDirectLink}
        icon={<Icons.OpenExternalLink />}
        iconRight
        isOpenInNewTab
      >
        Set up online payments options
      </LinkButton>
    </div>
  );

  return (<>
    <Field
      label={label}
      renderField={() => (
        <>
          <img src={onlinePaymentMethodsImage} alt="Online payments methods" className={styles.onlinePaymentMethodsImage} />
          { isRegistered ? registeredView : unregisteredView }
        </>
      )}
    />
    { isRegistered && (
      <Field
        label="Account for receiving online payments"
        renderField={() => (
          <div className={styles.account}>
            <AccountCombobox
              label="Account for receiving online payments"
              hideLabel
              items={accountOptions}
              selectedId={accountId}
              onChange={handleComboboxChange('accountId', onUpdateSalesSettingsItem)}
            />
            <p>
              This account must match the bank account you chose when
              setting up your online payments.
            </p>
          </div>
        )}
      />
    )}
  </>);
};

const mapStateToProps = state => getOnlinePaymentOptions(state);

export default connect(mapStateToProps)(OnlinePaymentOptions);
