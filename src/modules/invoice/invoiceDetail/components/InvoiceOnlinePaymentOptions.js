import { Button, OpenExternalLinkIcon, Spinner } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsTrial,
  getPayDirectIsLoading,
  getPayDirectIsRegistered,
} from '../selectors/invoiceDetailSelectors';
import onlinePaymentMethods from '../../../../common/images/OnlinePaymentMethods.png';
import styles from './InvoiceOnlinePaymentOptions.module.css';

const InvoiceOnlinePaymentOptions = ({
  isPayDirectLoading,
  isPayDirectRegistered,
  isSubscriptionTrial,
  onEditPreferences,
  onSetupPaymentOptions,
  onSubscribeNow,
}) => {
  const paymentOptionsImage = (
    <img
      alt="Online payment methods"
      className={styles.paymentOptions}
      height="32"
      src={onlinePaymentMethods}
      width="250"
    />
  );

  const setupInfo = (
    <p className={styles.setupInfo}>
      Online payments allow your customers to pay direct from their emailed
      invoice - meaning you get paid faster and minimise overdue invoices.{' '}
      <a
        href="https://help.myob.com/wiki/x/r51qAg"
        rel="noopener noreferrer"
        target="_blank"
      >
        Learn more
      </a>
    </p>
  );

  const isRegistered = (
    <>
      <div>
        You have online invoice payments{' '}
        <b className={styles.active}>activated</b>.
      </div>
      <Button
        icon={<OpenExternalLinkIcon />}
        iconRight
        onClick={onEditPreferences}
        type="link"
      >
        Edit preferences
      </Button>
    </>
  );

  const isNotRegistered = (
    <>
      <div>
        You have online invoice payments{' '}
        <b className={styles.inactive}>inactive</b>.
      </div>
      <Button
        icon={<OpenExternalLinkIcon />}
        iconRight
        onClick={onSetupPaymentOptions}
        type="link"
      >
        Set up online payments options
      </Button>
      {setupInfo}
    </>
  );

  const isTrial = (
    <>
      <div>
        This feature is only <b>available to subscribers</b>.
      </div>
      <Button
        icon={<OpenExternalLinkIcon />}
        iconRight
        onClick={onSubscribeNow}
        type="link"
      >
        Subscribe now
      </Button>
      {setupInfo}
    </>
  );

  const content = () => {
    if (isSubscriptionTrial) return isTrial;
    if (isPayDirectRegistered) return isRegistered;
    return isNotRegistered;
  };

  if (isPayDirectLoading) return <Spinner size="small" />;

  return (
    <>
      <legend>Online</legend>
      {paymentOptionsImage}
      {content()}
    </>
  );
};

const mapStateToProps = (state) => ({
  isPayDirectLoading: getPayDirectIsLoading(state),
  isPayDirectRegistered: getPayDirectIsRegistered(state),
  isSubscriptionTrial: getIsTrial(state),
});

export default connect(mapStateToProps)(InvoiceOnlinePaymentOptions);
