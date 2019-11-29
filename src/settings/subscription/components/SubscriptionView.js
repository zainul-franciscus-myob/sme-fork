import { BaseTemplate, Card, PageState } from '@myob/myob-widgets';
import React from 'react';

import comingSoonImage from './coming-soon.svg';

export default () => (
  <BaseTemplate>
    <Card>
      <PageState
        title="Subscription settings are coming soon"
        description="You will soon be able to review and change your subscription here"
        image={<img src={comingSoonImage} alt="coming soon" />}
      />
    </Card>
  </BaseTemplate>
);
