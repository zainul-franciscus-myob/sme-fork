import { connect } from 'react-redux';
import React from 'react';

import { getEmployeeHeader } from '../PayRunSelectors';
import PayHeader from '../../components/PayHeader';

const EmployeePayHeader = ({ employeeHeader }) => {
  const initItems = [
    {
      label: 'Pay cycle',
      name: 'paymentFrequency',
      value: employeeHeader.paymentFrequency,
    },
    {
      label: 'Pay period start',
      name: 'payPeriodStart',
      value: employeeHeader.payPeriodStart,
    },
    {
      label: 'Pay period end',
      name: 'payPeriodEnd',
      value: employeeHeader.payPeriodEnd,
    },
    {
      label: 'Date of payment',
      name: 'paymentDate',
      value: employeeHeader.paymentDate,
    },
  ];

  const items = employeeHeader.totalTakeHomePay
    ? [
      ...initItems,
      {
        label: 'Total take home pay',
        name: 'totalTakeHomePay',
        value: `$${employeeHeader.totalTakeHomePay}`,
      },
    ]
    : initItems;

  return <PayHeader items={items} />;
};

const mapStateToProps = state => ({
  employeeHeader: getEmployeeHeader(state),
});

export default connect(mapStateToProps)(EmployeePayHeader);
