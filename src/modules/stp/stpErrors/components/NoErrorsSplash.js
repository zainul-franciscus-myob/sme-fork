import {
  Button, PageHead, PageState,
} from '@myob/myob-widgets';
import React from 'react';

import StandardTemplate from '../../../../components/Feelix/StandardTemplate/StandardTemplate';
import successDoneCompleteImage from './success-done-complete.svg';

const NoErrorsSplash = ({ onGetStartedClick }) => (
  <StandardTemplate
    pageHead={<PageHead title="Single touch payroll setup ready!" />}
  >
    <PageState
      title="All clear! No more errors"
      description="Now you can start to set up Single Touch Payroll reporting"
      actions={[<Button type="primary" onClick={onGetStartedClick}>Get started</Button>]}
      image={<img src={successDoneCompleteImage} alt="All clear!" />}
    />
  </StandardTemplate>
);

export default NoErrorsSplash;
