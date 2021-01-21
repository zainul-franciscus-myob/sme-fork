import { Alert, PageHead } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getIsCreating,
  getIsLoading,
  getIsRecurringTransactionEnabled,
  getModal,
  getTitle,
} from '../RecurringSpendMoneySelectors';
import PageView from '../../../../components/PageView/PageView';
import RecurringLineItemLayout from '../../components/RecurringLineItemLayout';
import RecurringSpendMoneyActions from './RecurringSpendMoneyActions';
import RecurringSpendMoneyModal from './RecurringSpendMoneyModal';
import RecurringSpendMoneyOptions from './RecurringSpendMoneyOptions';
import RecurringSpendMoneyScheduleOptions from './RecurringSpendMoneyScheduleOptions';
import RecurringSpendMoneyTable from './RecurringSpendMoneyTable';
import RecurringTemplate from '../../components/RecurringTemplate';
import WrongPageState from '../../../../components/WrongPageState/WrongPageState';

const RecurringSpendMoneyView = ({
  accountModal,
  contactModal,
  alert,
  title,
  modal,
  isLoading,
  isFeatureAvailable,
  onDismissAlert,
  onUpdateScheduleOptions,
  optionListeners,
  tableListeners,
  confirmModalListeners,
  onActionListeners,
  renderJobCombobox,
  renderContactCombobox,
}) => {
  if (!isFeatureAvailable) {
    return <WrongPageState />;
  }

  const alerts = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const pageHead = <PageHead title={title} />;

  const confirmModal = modal && (
    <RecurringSpendMoneyModal modal={modal} listeners={confirmModalListeners} />
  );

  const modals = (
    <>
      {accountModal}
      {contactModal}
      {confirmModal}
    </>
  );

  const schedule = (
    <RecurringSpendMoneyScheduleOptions
      onUpdateScheduleOptions={onUpdateScheduleOptions}
    />
  );

  const options = (
    <RecurringSpendMoneyOptions
      listeners={optionListeners}
      renderContactCombobox={renderContactCombobox}
    />
  );

  const table = (
    <RecurringSpendMoneyTable
      listeners={tableListeners}
      renderJobCombobox={renderJobCombobox}
    />
  );

  const transaction = (
    <RecurringLineItemLayout options={options} table={table} />
  );

  const actions = <RecurringSpendMoneyActions listeners={onActionListeners} />;

  const view = (
    <RecurringTemplate
      alerts={alerts}
      pageHead={pageHead}
      modals={modals}
      schedule={schedule}
      transaction={transaction}
      actions={actions}
    />
  );

  return <PageView loadingState={isLoading} view={view} />;
};

const mapStateToProps = (state) => ({
  alert: getAlert(state),
  modal: getModal(state),
  isLoading: getIsLoading(state),
  isCreating: getIsCreating(state),
  isFeatureAvailable: getIsRecurringTransactionEnabled(state),
  title: getTitle(state),
});

export default connect(mapStateToProps)(RecurringSpendMoneyView);
