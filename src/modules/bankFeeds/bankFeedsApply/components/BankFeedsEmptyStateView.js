import { PageState, StandardTemplate } from '@myob/myob-widgets';
import React from 'react';

import noAccessImage from './images/no-access.svg';

const BankFeedsEmptyStateView = () => (
  <StandardTemplate pageHead={false}>
    <PageState
      title="Access denied"
      description="Setting up bank feeds is only available to business owners"
      image={<img src={noAccessImage} alt="no access" />}
    />
  </StandardTemplate>
);

export default BankFeedsEmptyStateView;
