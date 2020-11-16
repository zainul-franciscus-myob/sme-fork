import { connect } from 'react-redux';
import React from 'react';

import { getIsDefaultFilters } from '../selectors/transactionListSelectors';
import {
  getIsTableEmpty,
  getIsTableLoading,
} from '../selectors/journalTransactionSelectors';
import EmptyTableView from './EmptyTableView';
import JournalTransactionListTableBody from './JournalTransactionListTableBody';
import NoResultsView from './NoResultsView';
import TableView from '../../../components/TableView/TableView';

const JournalTransactionListTable = ({
  isTableEmpty,
  isTableLoading,
  businessId,
  tableConfig,
  isDefaultFilters,
}) => {
  const emptyTableView = isDefaultFilters ? (
    <EmptyTableView />
  ) : (
    <NoResultsView />
  );

  return (
    <TableView
      isLoading={isTableLoading}
      isEmpty={isTableEmpty}
      emptyView={emptyTableView}
    >
      <JournalTransactionListTableBody
        businessId={businessId}
        tableConfig={tableConfig}
      />
    </TableView>
  );
};

const mapStateToProps = (state) => ({
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
  isDefaultFilters: getIsDefaultFilters(state),
});

export default connect(mapStateToProps)(JournalTransactionListTable);
