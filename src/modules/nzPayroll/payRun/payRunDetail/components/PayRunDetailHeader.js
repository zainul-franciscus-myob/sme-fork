import { connect } from 'react-redux';
import React from 'react';

import {
  getPaymentDate,
  getPaymentPeriodEnd,
  getPaymentPeriodStart,
  getTotalTakeHomePay,
} from '../payRunDetailNzSelector';
import PayHeader from '../../components/PayHeader';
import formatCurrency from '../../../../../common/valueFormatters/formatCurrency';

const PayRunDetailHeader = ({
  paymentPeriodStart,
  paymentPeriodEnd,
  paymentDate,
  totalTakeHomePay,
}) => {
  const items = [
    {
      label: 'Pay period start',
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
      label: 'Total take home pay',
      name: 'totalTakeHomePay',
      value: formatCurrency(totalTakeHomePay),
    },
  ];

  return <PayHeader items={items} />;
};

const mapStateToProps = (state) => ({
  paymentPeriodStart: getPaymentPeriodStart(state),
  paymentPeriodEnd: getPaymentPeriodEnd(state),
  paymentDate: getPaymentDate(state),
  totalTakeHomePay: getTotalTakeHomePay(state),
});

export default connect(mapStateToProps)(PayRunDetailHeader);
