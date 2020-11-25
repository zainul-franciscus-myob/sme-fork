import { Accordion } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsPayBillRemittanceAdviceEnabled,
  getPaymentDetails,
  getShowPaymentDetails,
} from '../../ContactModalSelectors';
import PaymentDetails from '../../../components/PaymentDetails';

const PaymentDetailsWithToggle = ({
  paymentDetails,
  onPaymentDetailsChange,
  isPayBillRemittanceAdviceEnabled,
}) => {
  const view = (
    <Accordion label={'Payment Details'}>
      <PaymentDetails
        {...paymentDetails}
        onPaymentDetailsChange={onPaymentDetailsChange}
        isPayBillRemittanceAdviceEnabled={isPayBillRemittanceAdviceEnabled}
      />
    </Accordion>
  );

  return view;
};

const mapStateToProps = (state) => ({
  paymentDetails: getPaymentDetails(state),
  isToggled: getShowPaymentDetails(state),
  isPayBillRemittanceAdviceEnabled: getIsPayBillRemittanceAdviceEnabled(state),
});

export default connect(mapStateToProps)(PaymentDetailsWithToggle);
