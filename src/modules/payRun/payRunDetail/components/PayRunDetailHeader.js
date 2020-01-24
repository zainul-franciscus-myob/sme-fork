import { connect } from 'react-redux';
import React from 'react';

import {
  getPaymentDate,
  getPaymentPeriodEnd,
  getPaymentPeriodStart,
  getTotalNetPay,
} from '../payRunDetailSelector';
import PayHeader from '../../components/PayHeader';

const PayRunDetailHeader = ({
  paymentPeriodStart,
  paymentPeriodEnd,
  paymentDate,
  totalNetPay,
}) => {
  const items = [
    {
      label: 'Pay period Start',
      name: 'payPeriodStart',
      value: paymentPeriodStart,
    },
    {
      label: 'Pay period end',
      name: 'payPeriodEnd',
      value: paymentPeriodEnd,
    },
    {
      label: 'Date of payment',
      name: 'dateOfPayment',
      value: paymentDate,
    },
    {
      label: 'Total net pay',
      name: 'totalNetPay',
      value: totalNetPay,
    },
  ];

  return <PayHeader items={items} />;
};

const mapStateToProps = state => ({
  paymentPeriodStart: getPaymentPeriodStart(state),
  paymentPeriodEnd: getPaymentPeriodEnd(state),
  paymentDate: getPaymentDate(state),
  totalNetPay: getTotalNetPay(state),
});

export default connect(mapStateToProps)(PayRunDetailHeader);
