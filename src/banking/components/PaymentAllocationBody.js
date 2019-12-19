import { ReadOnly } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getPaymentAllocationBody } from '../bankingSelectors/paymentAllocationSelectors';
import PaymentAllocationOptions from './PaymentAllocationOptions';
import PaymentAllocationTable from './PaymentAllocationTable';

const getPaymentAllocationOptions = ({
  isCreating,
  contactLabel,
  contactName,
  onUpdatePaymentAllocationOptions,
}) => {
  if (isCreating) {
    return (
      <PaymentAllocationOptions
        onUpdatePaymentAllocationOptions={onUpdatePaymentAllocationOptions}
      />
    );
  }

  return (
    <React.Fragment>
      <ReadOnly label={contactLabel} name="contact">
        {contactName}
      </ReadOnly>
    </React.Fragment>
  );
};

const PaymentAllocationBody = (props) => {
  const {
    isCreating,
    contactLabel,
    contactName,
    onUpdatePaymentAllocationOptions,
    onUpdatePaymentAllocationLine,
  } = props;

  const options = getPaymentAllocationOptions({
    isCreating,
    contactLabel,
    contactName,
    onUpdatePaymentAllocationOptions,
  });

  return (
    <React.Fragment>
      {options}
      <PaymentAllocationTable
        onUpdatePaymentAllocationLine={onUpdatePaymentAllocationLine}
      />
    </React.Fragment>
  );
};

PaymentAllocationBody.defaultProps = {
  contactLabel: '',
  contactName: '',
};

const mapStateToProps = state => getPaymentAllocationBody(state);

export default connect(mapStateToProps)(PaymentAllocationBody);
