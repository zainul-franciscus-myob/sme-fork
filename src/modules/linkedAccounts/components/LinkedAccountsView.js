import {
  FormTemplate, PageHead,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAlert, getLoadingState } from '../LinkedAccountsSelectors';
import Alert from './Alert';
import LinkedAccountsActions from './LinkedAccountsActions';
import LinkedAccountsContent from './LinkedAccountsContent';
import LinkedAccountsTabs from './LinkedAccountsTabs';
import PageView from '../../../components/PageView/PageView';

const LinkedAccountsView = ({
  alert,
  loadingState,
  onDismissAlert,
  onCancelButtonClick,
  onSaveButtonClick,
  onSelectTab,
  onAccountChange,
  onHasAccountOptionChange,
}) => {
  const actions = (
    <LinkedAccountsActions
      onCancelButtonClick={onCancelButtonClick}
      onSaveButtonClick={onSaveButtonClick}
    />
  );

  const alertComponent = alert && (
    <Alert
      alert={alert}
      onDismissAlert={onDismissAlert}
    />
  );

  const view = (
    <FormTemplate
      pageHead={<PageHead title="Linked accounts" />}
      actions={actions}
      alert={alertComponent}
    >
      <LinkedAccountsTabs onSelectTab={onSelectTab} />
      <LinkedAccountsContent
        onAccountChange={onAccountChange}
        onHasAccountOptionChange={onHasAccountOptionChange}
      />
    </FormTemplate>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = state => ({
  loadingState: getLoadingState(state),
  alert: getAlert(state),
});

export default connect(mapStateToProps)(LinkedAccountsView);
