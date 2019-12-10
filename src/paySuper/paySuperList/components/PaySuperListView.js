import {
  Alert, Button, PageHead, StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAlert, getIsLoading, getIsRegistered } from '../paySuperListSelector';
import PageView from '../../../components/PageView/PageView';
import PaySuperListTable from './PaySuperListTable';
import UnregisteredPageState from './UnregisteredPageState';

const PaySuperListView = ({
  isLoading,
  isRegistered,
  sticky = 'all',
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
      <Button type="secondary" testId="superPaymentSettingsButton" onClick={onSettingsButtonClick}>
        Super payments settings
      </Button>
      <Button type="primary" testId="createSuperPaymentButton" onClick={onCreateButtonClick}>
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
    <Alert
      type={alert.type}
      onDismiss={alertDismiss}
    >
      {alert.message}
    </Alert>
    )
  );

  const paySuperListView = (
    <StandardTemplate
      sticky={sticky}
      pageHead={pageHead}
      alert={alertComponent}
    >
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

  return <PageView isLoading={isLoading} view={paySuperListView} />;
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  isRegistered: getIsRegistered(state),
  alert: getAlert(state),
});

export default connect(mapStateToProps)(PaySuperListView);
