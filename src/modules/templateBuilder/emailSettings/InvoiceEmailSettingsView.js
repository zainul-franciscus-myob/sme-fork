import { Alert, FormTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getLoadingState,
  getSelectedTab,
  getShowActions,
} from '../../salesSettings/salesSettingsDetail/SalesSettingsDetailSelectors';
import { mainTabIds } from '../../salesSettings/salesSettingsDetail/tabItems';
import FormCard from '../../../components/FormCard/FormCard';
import PageView from '../../../components/PageView/PageView';
import SalesSettingsDetailActions from '../../salesSettings/salesSettingsDetail/components/SalesSettingsDetailActions';
import SalesSettingsInvoicesDetails from './InvoiceEmailSettingsDetails';

const InvoiceEmailSettingsView = ({
  alert,
  loadingState,
  onDismissAlert,
  onSaveEmailSettings,
  onUpdateEmailSettings,
  selectedTab,
  showActions,
}) => {
  const contentProps = { [mainTabIds.emailDefaults]: { onUpdateEmailSettings } }[selectedTab];
  const saveHandler = selectedTab === mainTabIds.emailDefaults ? onSaveEmailSettings : undefined;

  const alertComponent = alert.type && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const pageFooter = showActions && <SalesSettingsDetailActions onSaveButtonClick={saveHandler} />;

  const view = (
    <FormTemplate
      actions={pageFooter}
      alert={alertComponent}
      pageHead="Build your invoice template"
      sticky="none"
    >
      <FormCard>
        <SalesSettingsInvoicesDetails {...contentProps} />
      </FormCard>
    </FormTemplate>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = state => ({
  alert: getAlert(state),
  loadingState: getLoadingState(state),
  selectedTab: getSelectedTab(state),
  showActions: getShowActions(state),
});

export default connect(mapStateToProps)(InvoiceEmailSettingsView);
