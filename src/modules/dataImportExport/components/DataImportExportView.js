import { Button, Card, Icons, PageHead } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getCurrentDataTypeInCurrentTab,
  getDeleteUnusedAccounts,
  getLoadingState,
  getModalType,
  getTab,
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
import styles from './DataImportExportView.module.css';

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
  onUpdateContactsIdentifyBy,
  onUpdateContactsType,
  exportCompanyFileListeners,
  selectedTab,
  onFileSelected,
  onFileRemove,
  onDuplicateRecordsOptionChange,
  onCancelImportData,
  onConfirmImportData,
  onDeleteUnusedAccountsChange,
  deleteUnusedAccounts,
  onFeedbackLinkClick,
}) => {
  const actions = isDataTypeSelectedForTab && (
    <DataImportExportActions onSaveButtonClick={onSaveButtonClick} />
  );

  const alertComponent = alert && (
    <Alert alert={alert} onDismissAlert={onDismissAlert} />
  );
  const modalComponent = modalType && (
    <ImportConfirmModal
      onCancelImportData={onCancelImportData}
      onConfirmImportData={onConfirmImportData}
      deleteUnusedAccounts={deleteUnusedAccounts}
    />
  );

  const content = (
    <Card>
      {
        {
          [TabItem.IMPORT]: (
            <ImportTabContent
              onFileSelected={onFileSelected}
              onFileRemove={onFileRemove}
              onDuplicateRecordsOptionChange={onDuplicateRecordsOptionChange}
              onUpdateImportDataType={onUpdateImportDataType}
              onUpdateContactsIdentifyBy={onUpdateContactsIdentifyBy}
              onUpdateContactsType={onUpdateContactsType}
              onDeleteUnusedAccountsChange={onDeleteUnusedAccountsChange}
            />
          ),
          [TabItem.EXPORT]: (
            <ExportTabContent
              onUpdateExportDataType={onUpdateExportDataType}
              exportChartOfAccountsListeners={exportChartOfAccountsListeners}
              exportCompanyFileListeners={exportCompanyFileListeners}
            />
          ),
        }[selectedTab]
      }
    </Card>
  );

  const view = (
    <SmallScreenTemplate>
      {alertComponent}
      <PageHead title="Import and export data">
        <div>
          <Icons.Comments className={styles.feedbackIcon} />
          <span className={styles.feedbackMessage}>
            Have feedback about the import and export page?
          </span>
          <Button
            className={styles.feedbackLink}
            type="link"
            onClick={onFeedbackLinkClick}
          >
            Let us know
          </Button>
        </div>
      </PageHead>
      <DataImportExportTabs onSelectTab={onSelectTab} />
      {modalComponent}
      {content}
      {actions}
    </SmallScreenTemplate>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = (state) => ({
  loadingState: getLoadingState(state),
  isDataTypeSelectedForTab: getCurrentDataTypeInCurrentTab(state),
  alert: getAlert(state),
  modalType: getModalType(state),
  selectedTab: getTab(state),
  deleteUnusedAccounts: getDeleteUnusedAccounts(state),
});

export default connect(mapStateToProps)(DataImportExportView);
