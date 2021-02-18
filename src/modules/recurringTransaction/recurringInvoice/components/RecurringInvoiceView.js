import { Alert, PageHead } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getIsFeatureAvailable,
  getIsReadOnly,
  getIsSubmitting,
  getLayout,
  getLoadingState,
  getModalType,
  getReadOnlyMessage,
  getTitle,
} from '../selectors/RecurringInvoiceSelectors';
import InvoiceItemTable from './itemLayout/RecurringInvoiceItemTable';
import InvoiceServiceTable from './serviceLayout/RecurringInvoiceServiceTable';
import PageView from '../../../../components/PageView/PageView';
import RecurringInvoiceActions from './RecurringInvoiceActions';
import RecurringInvoiceModal from './RecurringInvoiceModal';
import RecurringInvoiceNotes from './RecurringInvoiceNotes';
import RecurringInvoiceOptions from './RecurringInvoiceOptions';
import RecurringInvoiceScheduleOptions from './RecurringInvoiceScheduleOptions';
import RecurringInvoiceTotals from './RecurringInvoiceTotals';
import RecurringLineItemLayout from '../../components/RecurringLineItemLayout';
import RecurringLineItemLayoutOptions from '../../components/RecurringLineItemLayoutOptions';
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
  readOnlyMessage,
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

  const alerts = (
    <>
      {alert && (
        <Alert type={alert.type} onDismiss={onDismissAlert}>
          {alert.message}
        </Alert>
      )}
      {isReadOnly && <Alert type="info">{readOnlyMessage}</Alert>}
    </>
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

  const footer = (
    <div className={styles.notesAndTotals}>
      <RecurringInvoiceNotes onUpdateHeaderOptions={onUpdateHeaderOptions} />
      <RecurringInvoiceTotals />
    </div>
  );

  const serviceTable = (
    <InvoiceServiceTable
      listeners={serviceLayoutListeners}
      footer={footer}
      renderJobCombobox={renderJobCombobox}
    />
  );

  const itemAndServiceTable = (
    <InvoiceItemTable
      listeners={itemLayoutListeners}
      footer={footer}
      renderItemCombobox={renderItemCombobox}
      renderJobCombobox={renderJobCombobox}
    />
  );

  const tableLayoutOption = (
    <RecurringLineItemLayoutOptions
      layout={layout}
      layoutOptions={[
        { label: 'Services', value: SalesLayout.SERVICE },
        { label: 'Services and items', value: SalesLayout.ITEM_AND_SERVICE },
      ]}
      isReadOnly={isReadOnly}
      isDisabled={isActionsDisabled}
      onUpdateLayout={onUpdateInvoiceLayout}
    />
  );

  const table = {
    [SalesLayout.SERVICE]: serviceTable,
    [SalesLayout.ITEM_AND_SERVICE]: itemAndServiceTable,
  }[layout];

  const transaction = (
    <RecurringLineItemLayout
      options={options}
      tableLayoutOption={tableLayoutOption}
      table={table}
      isReadOnly={isReadOnly}
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
  readOnlyMessage: getReadOnlyMessage(state),
  isFeatureAvailable: getIsFeatureAvailable(state),
});

export default connect(mapStateToProps)(RecurringInvoiceView);
