import {
  Alert, Button, PageHead,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAlert, getIsRegistered, getLoadingState } from '../paySuperListSelector';
import PageView from '../../../../components/PageView/PageView';
import PaySuperListTable from './PaySuperListTable';
import StandardTemplate from '../../../../components/Feelix/StandardTemplate/StandardTemplate';
import UnregisteredPageState from './UnregisteredPageState';

const PaySuperListView = ({
  loadingState,
  isRegistered,
  onReferenceNumberClick,
  onCreateButtonClick,
  onSettingsButtonClick,
  onRegisterButtonClick,
  onSort,
  alert,
  alertDismiss,
}) => {
  const actionButtons = (
    <>
      <Button type="secondary" testid="superPaymentSettingsButton" onClick={onSettingsButtonClick}>
        Super payments settings
      </Button>
      <Button type="primary" testid="createSuperPaymentButton" onClick={onCreateButtonClick}>
        Create super payment
      </Button>
    </>
  );
  const pageHead = (
    <PageHead title="Super payments">
      { isRegistered && actionButtons}
    </PageHead>
  );

  const alertComponent = (
    alert && (
    <Alert type={alert.type} onDismiss={alertDismiss}>
      {alert.message}
    </Alert>
    )
  );

  const paySuperListView = (
    <StandardTemplate pageHead={pageHead} alert={alertComponent}>
      {isRegistered
        ? (
          <PaySuperListTable
            onReferenceNumberClick={onReferenceNumberClick}
            onCreateButtonClick={onCreateButtonClick}
            onSort={onSort}
          />
        )
        : <UnregisteredPageState onLinkClick={onRegisterButtonClick} />
      }
    </StandardTemplate>
  );

  return <PageView loadingState={loadingState} view={paySuperListView} />;
};

const mapStateToProps = state => ({
  loadingState: getLoadingState(state),
  isRegistered: getIsRegistered(state),
  alert: getAlert(state),
});

export default connect(mapStateToProps)(PaySuperListView);
