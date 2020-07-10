import { Button, Icons, PageState } from '@myob/myob-widgets';
import React from 'react';

import LostSTPConnectionImage from './images/lost-stp-connection.svg';
import NoPayRunsPageStateImage from './images/no-pay-runs-page-state-image.svg';
import emptyViewTypes from '../emptyViewTypes';

const PayRunListEmptyView = ({ emptyState, onStpSignUpClick }) => {
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
    case emptyViewTypes.stpConnectionLost:
      return (
        <PageState
          title="Lost connection"
          actions={[
            <Button
              key={1}
              type="link"
              icon={<Icons.Add />}
              onClick={onStpSignUpClick}
            >
              Connect to STP
            </Button>,
          ]}
          description="Looks like the connection to STP reporting has been lost. Not to worry, it's easy to connect again."
          image={
            <img
              src={LostSTPConnectionImage}
              style={{ width: '60%' }}
              alt="Lost STP Connection"
            />
          }
        />
      );
    default:
      return <div />;
  }
};

export default PayRunListEmptyView;
