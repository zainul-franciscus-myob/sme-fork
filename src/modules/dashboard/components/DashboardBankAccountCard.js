import { Card, PageState } from '@myob/myob-widgets';
import React from 'react';

import PageView from '../../../components/PageView/PageView';

const DashboardBankAccountCard = () => {
  const emptyView = (
    <PageState
      title="Transactions direct from your bank"
      description="Create professional invoices in a few clicks, and stay on top of overdue payments with online invoice tracking."
    />
  );

  return (
    <Card>
      <PageView view={emptyView} />
    </Card>
  );
};

export default DashboardBankAccountCard;
