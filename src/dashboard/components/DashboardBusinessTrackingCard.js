import {
  Card, PageState,
} from '@myob/myob-widgets';
import React from 'react';

import PageView from '../../components/PageView/PageView';

const DashboardBusinessTrackingCard = () => {
  const emptyView = (
    <PageState
      title="See how businesss is performing"
      description="Create professional business tracking things in a few clicks, and stay on top of overdue payments with online invoice tracking."
    />
  );

  return (
    <Card>
      <PageView view={emptyView} />
    </Card>
  );
};

export default DashboardBusinessTrackingCard;
