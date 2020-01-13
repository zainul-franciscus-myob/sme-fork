import {
  Alert, BaseTemplate, Card, PageHead,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAlert, getIsModalActive, getLoadingState } from '../BankReconciliationSelectors';
import BankReconciliationActions from './BankReconciliationActions';
import BankReconciliationOptions from './BankReconciliationOptions';
import BankReconciliationTable from './BankReconciliationTable';
import PageView from '../../../components/PageView/PageView';
import UndoBankReconciliationModal from './UndoBankReconciliationModal';

const BankReconciliationView = ({
  loadingState,
  isModalActive,
  alert,
  onUpdateHeaderOption,
  onAmountInputBlur,
  onSelectRow,
  onSelectAll,
  onSort,
  onReconcileButtonClick,
  onDismissAlert,
  onUndoReconciliationClick,
  onModalCancel,
  onModalConfirm,
}) => {
  const modal = isModalActive && (
    <UndoBankReconciliationModal onCancel={onModalCancel} onConfirm={onModalConfirm} />
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

  const stickyComponent = (
    <React.Fragment>
      {pageHead}
      {alertComponent}
      <Card>
        {templateOptions}
      </Card>
    </React.Fragment>
  );

  const view = (
    <BaseTemplate
      stickyHeaderChildren={stickyComponent}
    >
      {modal}
      <Card>
        <BankReconciliationTable
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
});

export default connect(mapStateToProps)(BankReconciliationView);
