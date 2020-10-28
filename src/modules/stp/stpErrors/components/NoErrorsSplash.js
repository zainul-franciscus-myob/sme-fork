import {
  Button,
  PageHead,
  PageState,
  StandardTemplate,
} from '@myob/myob-widgets';
import React from 'react';

import successDoneCompleteImage from './success-done-complete.svg';

const StpSplash = ({ onGetStartedClick }) => (
  <PageState
    title="All clear! No more errors"
    description="Now you can start to set up Single Touch Payroll reporting"
    actions={[
      <Button type="primary" onClick={onGetStartedClick}>
        Get started
      </Button>,
    ]}
    image={<img src={successDoneCompleteImage} alt="All clear!" />}
  />
);

const PayRunCreateSplash = ({ onDoneClick }) => (
  <PageState
    title="Single Touch Payroll ready!"
    description="All of your payroll information meets ATO requirements for Single Touch Payroll reporting."
    actions={[
      <Button type="primary" onClick={onDoneClick}>
        Done
      </Button>,
    ]}
    image={<img src={successDoneCompleteImage} alt="All clear!" />}
  />
);

const NoErrorsSplash = ({ onGetStartedClick, closeTabHandler, source }) => (
  <StandardTemplate
    pageHead={<PageHead title="Single Touch Payroll setup ready!" />}
  >
    {source === 'payRunCreate' ? (
      <PayRunCreateSplash onDoneClick={closeTabHandler} />
    ) : (
      <StpSplash onGetStartedClick={onGetStartedClick} />
    )}
  </StandardTemplate>
);

export default NoErrorsSplash;
