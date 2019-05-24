import { ReadOnly } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getPaymentAllocationBody } from '../bankingSelectors/paymentAllocationSelectors';
import PaymentAllocationOptions from './PaymentAllocationOptions';
import PaymentAllocationTable from './PaymentAllocationTable';

/* eslint-disable react/prop-types */
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
/* eslint-enable react/prop-types */

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

PaymentAllocationBody.propTypes = {
  isCreating: PropTypes.bool.isRequired,
  contactLabel: PropTypes.string,
  contactName: PropTypes.string,
  onUpdatePaymentAllocationOptions: PropTypes.func.isRequired,
  onUpdatePaymentAllocationLine: PropTypes.func.isRequired,
};

const mapStateToProps = state => getPaymentAllocationBody(state);

export default connect(mapStateToProps)(PaymentAllocationBody);
