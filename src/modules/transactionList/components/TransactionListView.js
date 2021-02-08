import { Alert, PageHead, Tabs } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getActiveTab,
  getAlert,
  getModalType,
} from '../selectors/transactionListSelectors';
import { tabItemIds } from '../tabItems';
import CreditsAndDebitsListView from './CreditsAndDebitsListView';
import JournalTransactionListView from './JournalTransactionListView';
import ModalType from '../findAndRecode/types/ModalType';
import TerminateModal from '../findAndRecode/components/TerminateModal';

const TransactionListView = ({
  selectedTab,
  onTabSelected,
  alert,
  onDismissAlert,
  pageHeadTitle,
  onUpdateFilters,
  onResetFilters,
  onPeriodChange,
  onSort,
  onLoadMoreButtonClick,
  onRenderFindAndRecode,
  discardAndRedirect,
  closeModal,
  modalType,
}) => {
  const tabs = (
    <Tabs
      items={[
        { id: tabItemIds.debitsAndCredits, label: 'Debits and credits' },
        { id: tabItemIds.journal, label: 'Transactions' },
        { id: tabItemIds.findAndRecode, label: 'Find and replace' },
      ]}
      selected={selectedTab}
      onSelected={onTabSelected}
    />
  );

  const modal = modalType === ModalType.TerminateModal && (
    <TerminateModal onConfirm={discardAndRedirect} onCancel={closeModal} />
  );

  const subHeaderChildren = (
    <>
      {tabs}
      {modal}
    </>
  );

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const pageHead = <PageHead title={pageHeadTitle} />;

  const journalTransactionListView = (
    <JournalTransactionListView
      onSort={onSort}
      onUpdateFilters={onUpdateFilters}
      onResetFilters={onResetFilters}
      onPeriodChange={onPeriodChange}
      onLoadMoreButtonClick={onLoadMoreButtonClick}
      pageHead={pageHead}
      subHead={subHeaderChildren}
      alert={alertComponent}
    />
  );

  const creditsAndDebitsListView = (
    <CreditsAndDebitsListView
      onSort={onSort}
      onUpdateFilters={onUpdateFilters}
      onResetFilters={onResetFilters}
      onPeriodChange={onPeriodChange}
      onLoadMoreButtonClick={onLoadMoreButtonClick}
      pageHead={pageHead}
      subHead={subHeaderChildren}
      alert={alertComponent}
    />
  );

  return {
    [tabItemIds.debitsAndCredits]: creditsAndDebitsListView,
    [tabItemIds.journal]: journalTransactionListView,
    [tabItemIds.findAndRecode]: onRenderFindAndRecode({
      pageHead,
      subHead: subHeaderChildren,
      alert: alertComponent,
      modal,
    }),
  }[selectedTab];
};

const mapStateToProps = (state) => ({
  selectedTab: getActiveTab(state),
  alert: getAlert(state),
  modalType: getModalType(state),
});

export default connect(mapStateToProps)(TransactionListView);
