import {
  Card, PageHead,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert, getCurrentDataTypeInCurrentTab, getLoadingState, getModalType, getTab,
} from '../selectors/DataImportExportSelectors';
import Alert from './Alert';
import DataImportExportActions from './DataImportExportActions';
import DataImportExportTabs from './DataImportExportTabs';
import ExportTabContent from './ExportTabContent';
import ImportConfirmModal from './ImportConfirmModal';
import ImportTabContent from './ImportTabContent';
import PageView from '../../../components/PageView/PageView';
import SmallScreenTemplate from '../../../components/SmallScreenTemplate/SmallScreenTemplate';
import TabItem from '../types/TabItem';

const DataImportExportView = ({
  alert,
  modalType,
  loadingState,
  isDataTypeSelectedForTab,
  onDismissAlert,
  onSelectTab,
  onSaveButtonClick,
  onUpdateExportDataType,
  onUpdateImportDataType,
  exportChartOfAccountsListeners,
  updateContactsIdentifyBy,
  updateContactsType,
  selectedTab,
  onFileSelected,
  onFileRemove,
  onDuplicateRecordsOptionChange,
  onCancelImportData,
  onConfirmImportData,
}) => {
  const actions = isDataTypeSelectedForTab && (
    <DataImportExportActions
      onSaveButtonClick={onSaveButtonClick}
    />
  );

  const alertComponent = alert && (
    <Alert
      alert={alert}
      onDismissAlert={onDismissAlert}
    />
  );
  const modalComponent = modalType && (
    <ImportConfirmModal
      onCancelImportData={onCancelImportData}
      onConfirmImportData={onConfirmImportData}
    />
  );

  const content = (
    <Card>
      {{
        [TabItem.IMPORT]: <ImportTabContent
          onFileSelected={onFileSelected}
          onFileRemove={onFileRemove}
          onDuplicateRecordsOptionChange={onDuplicateRecordsOptionChange}
          onUpdateImportDataType={onUpdateImportDataType}
          updateContactsIdentifyBy={updateContactsIdentifyBy}
          updateContactsType={updateContactsType}
        />,
        [TabItem.EXPORT]: <ExportTabContent
          onUpdateExportDataType={onUpdateExportDataType}
          exportChartOfAccountsListeners={exportChartOfAccountsListeners}
        />,
      }[selectedTab]}
    </Card>
  );

  const view = (
    <SmallScreenTemplate>
      {alertComponent}
      <PageHead title="Import/Export data" />
      <DataImportExportTabs onSelectTab={onSelectTab} />
      {modalComponent}
      {content}
      {actions}
    </SmallScreenTemplate>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = state => ({
  loadingState: getLoadingState(state),
  isDataTypeSelectedForTab: getCurrentDataTypeInCurrentTab(state),
  alert: getAlert(state),
  modalType: getModalType(state),
  selectedTab: getTab(state),
});

export default connect(mapStateToProps)(DataImportExportView);
