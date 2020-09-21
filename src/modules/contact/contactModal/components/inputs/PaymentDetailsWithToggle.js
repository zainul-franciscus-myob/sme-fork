import { FieldGroup, Icons } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getPaymentDetails,
  getShowPaymentDetails,
} from '../../ContactModalSelectors';
import Button from '../../../../../components/Button/Button';
import PaymentDetails from '../../../components/PaymentDetails';

const PaymentDetailsWithToggle = ({
  paymentDetails,
  onPaymentDetailsChange,
  onToggle,
  isToggled,
}) => {
  const toggleButton = (
    <FieldGroup label="Payment details">
      <Button type="link" icon={<Icons.Add />} onClick={onToggle}>
        Add payment details
      </Button>
    </FieldGroup>
  );

  const view = (
    <PaymentDetails
      {...paymentDetails}
      onPaymentDetailsChange={onPaymentDetailsChange}
    />
  );

  return isToggled ? view : toggleButton;
};

const mapStateToProps = (state) => ({
  paymentDetails: getPaymentDetails(state),
  isToggled: getShowPaymentDetails(state),
});

export default connect(mapStateToProps)(PaymentDetailsWithToggle);
