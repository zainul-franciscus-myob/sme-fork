import { Button, PageHead, StandardTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsLoading, getIsRegistered } from '../paySuperListSelector';
import PageView from '../../../components/PageView/PageView';
import PaySuperListTable from './PaySuperListTable';
import UnregisteredPageState from './UnregisteredPageState';

const PaySuperListView = ({
  isLoading, isRegistered, sticky = 'all', onReferenceNumberClick,
}) => {
  const actionButtons = (
    <>
      <Button type="secondary" testId="superPaymentSettingsButton">
        Super payments settings
      </Button>
      <Button type="primary" testId="createSuperPaymentButton">
        Create super payment
      </Button>
    </>
  );
  const pageHead = (
    <PageHead title="Super payments">
      { isRegistered && actionButtons}
    </PageHead>
  );

  const paySuperListView = (
    <StandardTemplate
      sticky={sticky}
      pageHead={pageHead}
    >
      {isRegistered
        ? <PaySuperListTable onReferenceNumberClick={onReferenceNumberClick} />
        : <UnregisteredPageState />
      }
    </StandardTemplate>
  );

  return <PageView isLoading={isLoading} view={paySuperListView} />;
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  isRegistered: getIsRegistered(state),
});

export default connect(mapStateToProps)(PaySuperListView);
