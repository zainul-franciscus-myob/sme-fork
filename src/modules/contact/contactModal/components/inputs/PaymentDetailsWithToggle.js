import { Accordion } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getPaymentDetails,
  getShowPaymentDetails,
} from '../../ContactModalSelectors';
import PaymentDetails from '../../../components/PaymentDetails';

const PaymentDetailsWithToggle = ({
  paymentDetails,
  onPaymentDetailsChange,
}) => {
  const view = (
    <Accordion label={'Payment Details'}>
      <PaymentDetails
        {...paymentDetails}
        onPaymentDetailsChange={onPaymentDetailsChange}
      />
    </Accordion>
  );

  return view;
};

const mapStateToProps = (state) => ({
  paymentDetails: getPaymentDetails(state),
  isToggled: getShowPaymentDetails(state),
});

export default connect(mapStateToProps)(PaymentDetailsWithToggle);
