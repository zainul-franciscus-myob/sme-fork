import {
  Alert, BaseTemplate, Card, PageHead,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getHeaderSelectStatus,
  getIsActionDisabled,
  getIsModalActive,
  getLoadingState,
  getOrder,
} from '../BankReconciliationSelectors';
import BankReconciliationActions from './BankReconciliationActions';
import BankReconciliationModal from './BankReconciliationModal';
import BankReconciliationOptions from './BankReconciliationOptions';
import BankReconciliationTable from './BankReconciliationTable';
import BankReconciliationTableHeader from './BankReconciliationTableHeader';
import PageView from '../../../components/PageView/PageView';
import StickyHeader from '../../../components/Feelix/StickyHeader/StickyHeader';
import styles from './BankReconciliationView.module.css';

const tableConfig = {
  date: { columnName: 'Date', width: '13rem' },
  reference: { columnName: 'Reference', width: '12.4rem' },
  description: { columnName: 'Description', width: 'flex-1' },
  withdrawal: { columnName: 'Withdrawal ($)', width: '15rem', align: 'right' },
  deposit: { columnName: 'Deposit ($)', width: '13rem', align: 'right' },
};

const BankReconciliationView = ({
  loadingState,
  alert,
  headerSelectStatus,
  order,
  isModalActive,
  isActionDisabled,
  onUpdateHeaderOption,
  onAmountInputBlur,
  onSelectRow,
  onSelectAll,
  onSort,
  onReconcileButtonClick,
  onDismissAlert,
  onUndoReconciliationClick,
  onModalCancel,
  onUndoBankReconciliationModalConfirm,
}) => {
  const modal = isModalActive && (
    <BankReconciliationModal
      onCancel={onModalCancel}
      onUndoBankReconciliationConfirm={onUndoBankReconciliationModalConfirm}
    />
  );

  const templateOptions = (
    <BankReconciliationOptions
      onUpdateHeaderOption={onUpdateHeaderOption}
      onAmountInputBlur={onAmountInputBlur}
      onUndoReconciliationClick={onUndoReconciliationClick}
    />
  );

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const actions = (
    <BankReconciliationActions
      onReconcileButtonClick={onReconcileButtonClick}
    />
  );

  const pageHead = <PageHead title="Reconcile account" />;

  const tableHeader = (
    <BankReconciliationTableHeader
      tableConfig={tableConfig}
      onSelectAll={onSelectAll}
      onSort={onSort}
      isActionDisabled={isActionDisabled}
      headerSelectStatus={headerSelectStatus}
      order={order}
    />
  );

  const stickyComponent = (
    <React.Fragment>
      {pageHead}
      {alertComponent}
      <Card classes={[styles.options]} footer={<Card.Footer child={tableHeader} />}>
        {templateOptions}
      </Card>
    </React.Fragment>
  );

  const view = (
    <BaseTemplate
      baseTemplateClassName={styles.sticky}
    >
      <StickyHeader>
        {stickyComponent}
      </StickyHeader>
      {modal}
      <Card classes={[styles.table]}>
        <BankReconciliationTable
          tableConfig={tableConfig}
          onSelectRow={onSelectRow}
          onSelectAll={onSelectAll}
          onSort={onSort}
        />
      </Card>
      {actions}
    </BaseTemplate>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = state => ({
  alert: getAlert(state),
  isModalActive: getIsModalActive(state),
  loadingState: getLoadingState(state),
  isActionDisabled: getIsActionDisabled(state),
  headerSelectStatus: getHeaderSelectStatus(state),
  order: getOrder(state),
});

export default connect(mapStateToProps)(BankReconciliationView);
