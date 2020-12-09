import { Alert, PageHead } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classNames from 'classnames';

import {
  getAlert,
  getIsFeatureAvailable,
  getIsReadOnly,
  getIsSubmitting,
  getLayout,
  getLoadingState,
  getModalType,
  getTitle,
} from '../selectors/RecurringInvoiceSelectors';
import InvoiceItemTable from './itemLayout/RecurringInvoiceItemTable';
import InvoiceServiceTable from './serviceLayout/RecurringInvoiceServiceTable';
import PageView from '../../../../components/PageView/PageView';
import RecurringInvoiceActions from './RecurringInvoiceActions';
import RecurringInvoiceLayoutPopover from './RecurringInvoiceLayoutPopover';
import RecurringInvoiceModal from './RecurringInvoiceModal';
import RecurringInvoiceNotes from './RecurringInvoiceNotes';
import RecurringInvoiceOptions from './RecurringInvoiceOptions';
import RecurringInvoiceScheduleOptions from './RecurringInvoiceScheduleOptions';
import RecurringInvoiceTotals from './RecurringInvoiceTotals';
import RecurringLineItemLayout from '../../components/RecurringLineItemLayout';
import RecurringTemplate from '../../components/RecurringTemplate';
import SalesLayout from '../../types/SalesLayout';
import WrongPageState from '../../../../components/WrongPageState/WrongPageState';
import styles from './RecurringInvoiceView.module.css';

const RecurringInvoiceView = ({
  accountModal,
  title,
  layout,
  loadingState,
  alert,
  modalType,
  isActionsDisabled,
  isReadOnly,
  isFeatureAvailable,
  onDismissAlert,
  serviceLayoutListeners,
  itemLayoutListeners,
  invoiceActionListeners,
  confirmModalListeners,
  redirectToUrlListeners,
  renderContactCombobox,
  renderItemCombobox,
  renderJobCombobox,
  onInputAlert,
  onUpdateScheduleOptions,
  onUpdateHeaderOptions,
  onUpdateInvoiceLayout,
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

  const confirmModal = modalType && (
    <RecurringInvoiceModal
      modalType={modalType}
      isActionsDisabled={isActionsDisabled}
      confirmModalListeners={confirmModalListeners}
      redirectToUrlListeners={redirectToUrlListeners}
    />
  );

  const modals = (
    <>
      {accountModal}
      {confirmModal}
    </>
  );

  const schedule = (
    <RecurringInvoiceScheduleOptions
      onUpdateScheduleOptions={onUpdateScheduleOptions}
    />
  );

  const options = (
    <RecurringInvoiceOptions
      renderContactCombobox={renderContactCombobox}
      onInputAlert={onInputAlert}
      onUpdateHeaderOptions={onUpdateHeaderOptions}
    />
  );

  const notesAndTotals = (
    <div className={styles.notesAndTotals}>
      <RecurringInvoiceNotes onUpdateHeaderOptions={onUpdateHeaderOptions} />
      <RecurringInvoiceTotals />
    </div>
  );

  const serviceTable = (
    <InvoiceServiceTable
      listeners={serviceLayoutListeners}
      footer={notesAndTotals}
      renderJobCombobox={renderJobCombobox}
    />
  );

  const itemAndServiceTable = (
    <InvoiceItemTable
      listeners={itemLayoutListeners}
      footer={notesAndTotals}
      renderItemCombobox={renderItemCombobox}
      renderJobCombobox={renderJobCombobox}
    />
  );

  const tableLayoutOption = (
    <RecurringInvoiceLayoutPopover
      onUpdateInvoiceLayout={onUpdateInvoiceLayout}
    />
  );

  const lineItemTable = {
    [SalesLayout.SERVICE]: serviceTable,
    [SalesLayout.ITEM_AND_SERVICE]: itemAndServiceTable,
  }[layout];

  const table = (
    <div className={classNames(isReadOnly && styles.disabledTable)}>
      {lineItemTable}
    </div>
  );

  const transaction = (
    <RecurringLineItemLayout
      options={options}
      tableLayoutOption={tableLayoutOption}
      table={table}
    />
  );

  const actions = (
    <RecurringInvoiceActions listeners={invoiceActionListeners} />
  );

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

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = (state) => ({
  title: getTitle(state),
  alert: getAlert(state),
  modalType: getModalType(state),
  loadingState: getLoadingState(state),
  isActionsDisabled: getIsSubmitting(state),
  layout: getLayout(state),
  isReadOnly: getIsReadOnly(state),
  isFeatureAvailable: getIsFeatureAvailable(state),
});

export default connect(mapStateToProps)(RecurringInvoiceView);
