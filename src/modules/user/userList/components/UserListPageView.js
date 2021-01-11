import { PageHead, PageState, StandardTemplate } from '@myob/myob-widgets';
import React from 'react';

import Icon from '../../../../components/Icon/Icon';
import LoadingPageState from '../../../../components/LoadingPageState/LoadingPageState';
import LoadingState from '../../../../components/PageView/LoadingState';

const pageHead = <PageHead title="Users"></PageHead>;
const loadingFailPageState = (
  <StandardTemplate pageHead={pageHead}>
    <PageState
      title="Error loading users and advisors"
      description={
        <div>
          Sorry, we couldn&apos;t load the details of any users or advisors who
          have access to your file. Try again later or contact our support team
          on <a href="tel:1300555123">1300 555 123</a>.
        </div>
      }
      image={<Icon.WrongPage />}
    />
  </StandardTemplate>
);

const PageView = ({ isLoading, loadingState, view }) => {
  if (isLoading) {
    return <LoadingPageState />;
  }

  switch (loadingState) {
    case LoadingState.LOADING:
      return <LoadingPageState />;
    case LoadingState.LOADING_FAIL:
      return loadingFailPageState;
    default:
      return view;
  }
};

export default PageView;
