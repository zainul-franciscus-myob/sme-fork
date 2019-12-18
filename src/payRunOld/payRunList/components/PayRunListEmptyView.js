import { Button, Icons, PageState } from '@myob/myob-widgets';
import React from 'react';

import LostSTPConnectionImage from './images/lost-stp-connection.svg';
import NoPayRunsPageStateImage from './images/no-pay-runs-page-state-image.svg';
import NoSTPPageStateImage from './images/no-stp-page-state-image.svg';
import emptyViewTypes from '../emptyViewTypes';

const PayRunListEmptyView = ({
  emptyState,
}) => {
  switch (emptyState) {
    case emptyViewTypes.notStpRegistered:
      return (
        <PageState
          title="Sign up to Single Touch Payroll to see your past pay runs"
          actions={[<Button key={1} type="link" icon={<Icons.Add />}>Sign up for Single Touch Payroll</Button>]}
          description="You can still view and edit past runs from your list of transactions. You can view pay slips from the pay advice report."
          image={<img src={NoSTPPageStateImage} style={{ width: '60%' }} alt="Not Registered for STP" />}
        />
      );
    case emptyViewTypes.noPayRuns:
      return (
        <PageState
          title="You have not recorded any pay runs yet"
          description="Your pay runs will show here once they are recorded."
          image={<img src={NoPayRunsPageStateImage} style={{ width: '60%' }} alt="No Pay Runs" />}
        />
      );
    case emptyViewTypes.noPayRunsFiltered:
      return (
        <PageState
          title="There are no pay runs for the selected filter options."
        />
      );
    case emptyViewTypes.stpConnectionLost:
      return (
        <PageState
          title="Lost connection"
          actions={[<Button key={1} type="link" icon={<Icons.Add />}>Connect to STP</Button>]}
          description="Looks like the connection to STP reporting has been lost. Not to worry, it's easy to connect again."
          image={<img src={LostSTPConnectionImage} style={{ width: '60%' }} alt="Lost STP Connection" />}
        />
      );
    default:
      return (<div />);
  }
};

export default PayRunListEmptyView;
