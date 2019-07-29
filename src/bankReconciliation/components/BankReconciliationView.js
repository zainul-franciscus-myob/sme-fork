import { Alert, LineItemTemplate, Spinner } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAlert, getIsLoading, getIsModalActive } from '../BankReconciliationSelectors';
import BankReconciliationActions from './BankReconciliationActions';
import BankReconciliationOptions from './BankReconciliationOptions';
import BankReconciliationTable from './BankReconciliationTable';
import UndoBankReconciliationModal from './UndoBankReconciliationModal';

const BankReconciliationView = ({
  isLoading,
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

  const view = (
    <LineItemTemplate
      pageHead="Reconcile account"
      alert={alertComponent}
      options={templateOptions}
      actions={actions}
    >
      {modal}
      <BankReconciliationTable
        onSelectRow={onSelectRow}
        onSelectAll={onSelectAll}
        onSort={onSort}
      />
    </LineItemTemplate>
  );

  return (isLoading ? <Spinner /> : view);
};

const mapStateToProps = state => ({
  alert: getAlert(state),
  isModalActive: getIsModalActive(state),
  isLoading: getIsLoading(state),
});

export default connect(mapStateToProps)(BankReconciliationView);
