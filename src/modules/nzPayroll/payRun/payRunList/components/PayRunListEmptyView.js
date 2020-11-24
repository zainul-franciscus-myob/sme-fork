import { PageState } from '@myob/myob-widgets';
import React from 'react';

import NoPayRunsPageStateImage from './images/no-pay-runs-page-state-image.svg';
import emptyViewTypes from '../emptyViewTypes';

const PayRunListEmptyView = ({ emptyState }) => {
  switch (emptyState) {
    case emptyViewTypes.noPayRuns:
      return (
        <PageState
          title="You have not recorded any pay runs yet"
          description="Your pay runs will show here once they are recorded."
          image={
            <img
              src={NoPayRunsPageStateImage}
              style={{ width: '60%' }}
              alt="No Pay Runs"
            />
          }
        />
      );
    case emptyViewTypes.noPayRunsFiltered:
      return (
        <PageState title="There are no pay runs for the selected filter options." />
      );
    default:
      return <div />;
  }
};

export default PayRunListEmptyView;
