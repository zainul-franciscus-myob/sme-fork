import {
  Alert,
  Button,
  HeaderSort,
  PageHead,
  StandardTemplate,
  Table,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getIsSubmitting,
  getLoadingState,
  getModalType,
  getOrder,
} from '../BankStatementImportListSelectors';
import BankStatementImportListFilterOptions from './BankStatementImportListFilterOptions';
import BankStatementImportListTable from './BankStatementImportListTable';
import BankStatementImportModal from './BankStatementImportModal';
import DeleteModal from '../../../../components/modal/DeleteModal';
import ModalTypes from '../ModalTypes';
import PageView from '../../../../components/PageView/PageView';
import WidthConfig from './WidthConfig';
import styles from './BankStatementImportListView.module.css';

const tableConfig = {
  importedDate: { columnName: 'Date imported', valign: 'top' },
  fileName: { columnName: 'Filename', valign: 'top' },
  firstTransactionDate: { columnName: 'First transaction date', valign: 'top' },
  lastTransactionDate: { columnName: 'Last transaction date', valign: 'top' },
  importedBy: { columnName: 'Imported by', valign: 'top' },
  remove: { columnName: 'Delete', valign: 'top', align: 'center' },
};

const HeaderItem = ({ config, sortName, activeSort, onSort }) => (
  <Table.HeaderItem {...config}>
    <HeaderSort
      title={config.columnName}
      sortName={sortName}
      activeSort={activeSort}
      onSort={onSort}
    />
  </Table.HeaderItem>
);

const BankStatementImportListView = ({
  loadingState,
  isSubmitting,
  onUpdateFilterBarOptions,
  onResetFilterBarOptions,
  alert,
  modalType,
  order,
  onDismissAlert,
  onSort,
  onUpdateImportModal,
  onImportButtonClick,
  onDeleteButtonClick,
  onConfirmImportButtonClick,
  onConfirmDeleteButtonClick,
  onCloseModal,
}) => {
  const pageHead = (
    <PageHead title="Bank statement import history">
      <Button onClick={onImportButtonClick} disabled={isSubmitting}>
        Import statement file
      </Button>
    </PageHead>
  );

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const filterBar = (
    <BankStatementImportListFilterOptions
      onUpdateFilterBarOptions={onUpdateFilterBarOptions}
      onResetFilterBarOptions={onResetFilterBarOptions}
    />
  );

  const modal = {
    [ModalTypes.IMPORT]: (
      <BankStatementImportModal
        onUpdateImportModal={onUpdateImportModal}
        onCancel={onCloseModal}
        onConfirm={onConfirmImportButtonClick}
      />
    ),
    [ModalTypes.DELETE]: (
      <DeleteModal
        onConfirm={onConfirmDeleteButtonClick}
        onCancel={onCloseModal}
        title="Delete this imported statement?"
      />
    ),
  }[modalType];

  const responsiveWidths = WidthConfig(tableConfig);
  const header = (
    <Table responsiveWidths={responsiveWidths}>
      <Table.Header>
        <HeaderItem
          config={tableConfig.importedDate}
          sortName="ImportedDate"
          activeSort={order}
          onSort={onSort}
        />
        <HeaderItem
          config={tableConfig.fileName}
          sortName="FileName"
          activeSort={order}
          onSort={onSort}
        />
        <HeaderItem
          config={tableConfig.firstTransactionDate}
          sortName="FirstTransactionDate"
          activeSort={order}
          onSort={onSort}
        />
        <HeaderItem
          config={tableConfig.lastTransactionDate}
          sortName="LastTransactionDate"
          activeSort={order}
          onSort={onSort}
        />
        <HeaderItem
          config={tableConfig.importedBy}
          sortName="ImportedBy"
          activeSort={order}
          onSort={onSort}
        />
        <Table.HeaderItem {...tableConfig.remove} />
      </Table.Header>
    </Table>
  );

  const bankStatementImportListView = (
    <StandardTemplate
      alert={alertComponent}
      pageHead={pageHead}
      tableHeader={header}
      filterBar={filterBar}
    >
      {modal}
      <div className={styles.list}>
        <BankStatementImportListTable
          tableConfig={tableConfig}
          onSort={onSort}
          onImportButtonClick={onImportButtonClick}
          onDeleteButtonClick={onDeleteButtonClick}
        />
      </div>
    </StandardTemplate>
  );

  return (
    <PageView loadingState={loadingState} view={bankStatementImportListView} />
  );
};

const mapStateToProps = (state) => ({
  loadingState: getLoadingState(state),
  isSubmitting: getIsSubmitting(state),
  modalType: getModalType(state),
  alert: getAlert(state),
  order: getOrder(state),
});

export default connect(mapStateToProps)(BankStatementImportListView);
