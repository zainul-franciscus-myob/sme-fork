import {
  Card, PageState,
} from '@myob/myob-widgets';
import React from 'react';

import PageView from '../../components/PageView/PageView';

const DashboardPurchaseCard = () => {
  const emptyView = (
    <PageState
      title="Something about bills"
      description="Create professional purchases in a few clicks, and stay on top of overdue payments with online purchase tracking."
    />
  );

  return (
    <Card>
      <PageView view={emptyView} />
    </Card>
  );
};

export default DashboardPurchaseCard;
