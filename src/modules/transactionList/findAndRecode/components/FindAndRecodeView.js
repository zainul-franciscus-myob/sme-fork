import { BulkActions } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAreSomeItemsSelected,
  getLoadMoreButtonStatus,
  getModalType,
} from '../findAndRecodeSelectors';
import FindAndRecodeFilterOptions from './FindAndRecodeFilterOptions';
import FindAndRecodeListTable from './FindAndRecodeListTable';
import FindAndRecodeListTableHeader from './FindAndRecodeListTableHeader';
import ModalType from '../types/ModalType';
import PageView from '../../../../components/PageView/PageView';
import PaginatedListTemplate from '../../../../components/PaginatedListTemplate/PaginatedListTemplate';
import RecodeAlert from './RecodeAlert';
import RecodeModal from './RecodeModal';
import RecodePopover from './RecodePopover';

export const tableConfig = {
  selectItem: { width: '40px' },
  date: { columnName: 'Date', valign: 'top' },
  referenceId: { columnName: 'Reference no', valign: 'top' },
  description: { columnName: 'Description', valign: 'top' },
  displayAccountName: { columnName: 'Account', valign: 'top' },
  sourceJournal: { columnName: 'Source journal', valign: 'top' },
  taxCode: { columnName: 'Tax code', width: '100px', valign: 'top' },
  displayDebit: { columnName: 'Debit ($)', valign: 'top', align: 'right' },
  displayCredit: { columnName: 'Credit ($)', valign: 'top', align: 'right' },
  recodeStatus: { width: '50px' },
};

const FindAndRecodeView = ({
  onUpdateFilters,
  onResetFilters,
  onPeriodChange,
  onLoadMoreButtonClick,
  onSort,
  onSelectItem,
  onSelectAllItems,
  onOpenRecodeModal,
  onCloseRecodeModal,
  onConfirmRecode,
  onOpenRecodeOptions,
  onCloseRecodeOptions,
  onUpdateRecodeOptions,
  loadMoreButtonStatus,
  areSomeItemsSelected,
  pageHead,
  subHead,
  alert,
  modalType,
}) => {
  const modal = modalType === ModalType.RecodeModal && (
    <RecodeModal onConfirm={onConfirmRecode} onCancel={onCloseRecodeModal} />
  );

  const transactionListView = (
    <PaginatedListTemplate
      alert={
        <>
          {alert}
          <RecodeAlert />
        </>
      }
      pageHead={pageHead}
      filterBar={
        <FindAndRecodeFilterOptions
          onUpdateFilters={onUpdateFilters}
          onResetFilters={onResetFilters}
          onPeriodChange={onPeriodChange}
        />
      }
      subHeadChildren={
        <>
          {subHead}
          {modal}
        </>
      }
      tableHeader={
        <FindAndRecodeListTableHeader
          onSort={onSort}
          onSelectAllItems={onSelectAllItems}
          tableConfig={tableConfig}
        />
      }
      bulkActions={
        areSomeItemsSelected && (
          <BulkActions>
            <RecodePopover
              onOpenRecodeOptions={onOpenRecodeOptions}
              onCloseRecodeOptions={onCloseRecodeOptions}
              onUpdateRecodeOptions={onUpdateRecodeOptions}
              onOpenRecodeModal={onOpenRecodeModal}
            />
          </BulkActions>
        )
      }
      listTable={
        <FindAndRecodeListTable
          tableConfig={tableConfig}
          onSelectItem={onSelectItem}
        />
      }
      onLoadMoreButtonClick={onLoadMoreButtonClick}
      loadMoreButtonStatus={loadMoreButtonStatus}
    />
  );

  return <PageView view={transactionListView} />;
};

const mapStateToProps = (state) => ({
  loadMoreButtonStatus: getLoadMoreButtonStatus(state),
  areSomeItemsSelected: getAreSomeItemsSelected(state),
  modalType: getModalType(state),
});

export default connect(mapStateToProps)(FindAndRecodeView);
