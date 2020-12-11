import { connect } from 'react-redux';
import React from 'react';

import {
  getEInvoicingAppName,
  getIsSubscribed,
} from '../SalesSettingsDetailSelectors';
import SalesSettingsSubscribedEInvoicingDetails from './SalesSettingsSubscribedEInvoicingDetails';
import SalesSettingsUnsubscribedEInvoicingDetails from './SalesSettingsUnsubscribedEInvoicingDetails';

const SalesSettingsEInvoiceDetails = ({
  eInvoicingAppName,
  isSubscribed,
  onMarketPlaceClick,
}) =>
  isSubscribed ? (
    <SalesSettingsSubscribedEInvoicingDetails
      eInvoicingAppName={eInvoicingAppName}
    />
  ) : (
    <SalesSettingsUnsubscribedEInvoicingDetails
      onMarketPlaceClick={onMarketPlaceClick}
    />
  );

const mapStateToProps = (state) => ({
  eInvoicingAppName: getEInvoicingAppName(state),
  isSubscribed: getIsSubscribed(state),
});

export default connect(mapStateToProps)(SalesSettingsEInvoiceDetails);
