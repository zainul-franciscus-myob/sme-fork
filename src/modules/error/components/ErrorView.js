import { PageState, StandardTemplate } from '@myob/myob-widgets';
import React from 'react';

import Icon from '../../../components/Icon/Icon';

const ErrorView = () => (
  <StandardTemplate>
    <PageState
      title="Something went wrong"
      actions={[<a href={'/#/businesses'}>Select a business and try again</a>]}
      description={<div>If the issue persists, contact MYOB support</div>}
      image={<Icon.Error />}
    />
  </StandardTemplate>
);

export default ErrorView;
