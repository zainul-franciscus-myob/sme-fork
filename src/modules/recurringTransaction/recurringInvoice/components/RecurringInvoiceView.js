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
import LineItemTemplate from '../../../../components/Feelix/LineItemTemplate/LineItemTemplate';
import PageView from '../../../../components/PageView/PageView';
import RecurringInvoiceActions from './RecurringInvoiceActions';
import RecurringInvoiceLayoutPopover from './RecurringInvoiceLayoutPopover';
import RecurringInvoiceModal from './RecurringInvoiceModal';
import RecurringInvoiceNotes from './RecurringInvoiceNotes';
import RecurringInvoiceOptions from './RecurringInvoiceOptions';
import RecurringInvoiceScheduleOptions from './RecurringInvoiceScheduleOptions';
import RecurringInvoiceTotals from './RecurringInvoiceTotals';
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
  isPreConversion,
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

  const options = (
    <>
      <RecurringInvoiceScheduleOptions
        onUpdateScheduleOptions={onUpdateScheduleOptions}
      />
      <hr />
      <RecurringInvoiceOptions
        renderContactCombobox={renderContactCombobox}
        onInputAlert={onInputAlert}
        onUpdateHeaderOptions={onUpdateHeaderOptions}
      />
    </>
  );

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const actions = (
    <RecurringInvoiceActions listeners={invoiceActionListeners} />
  );

  const modal = modalType && (
    <RecurringInvoiceModal
      modalType={modalType}
      isActionsDisabled={isActionsDisabled}
      confirmModalListeners={confirmModalListeners}
      redirectToUrlListeners={redirectToUrlListeners}
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

  const table = {
    [SalesLayout.SERVICE]: serviceTable,
    [SalesLayout.ITEM_AND_SERVICE]: itemAndServiceTable,
  }[layout];

  const layoutPopover = isPreConversion || (
    <RecurringInvoiceLayoutPopover
      onUpdateInvoiceLayout={onUpdateInvoiceLayout}
    />
  );

  const view = (
    <React.Fragment>
      <LineItemTemplate
        pageHead={<PageHead title={title} />}
        alert={alertComponent}
        options={options}
        separatorOptions={layoutPopover}
        actions={actions}
      >
        {accountModal}
        {modal}
        <div className={classNames(isReadOnly && styles.disabledTable)}>
          {table}
        </div>
      </LineItemTemplate>
    </React.Fragment>
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
