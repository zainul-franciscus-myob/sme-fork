import React from 'react';

import NoResultPageState from '../../../../../components/NoResultPageState/NoResultPageState';

const ReportsEmpty = () => (
  <NoResultPageState
    title="No results found"
    description="You made no employee termination payments in this payroll year."
  />
);

export default ReportsEmpty;
