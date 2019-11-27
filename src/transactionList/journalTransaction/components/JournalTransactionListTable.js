import { connect } from 'react-redux';
import React from 'react';

import {
  getIsTableEmpty, getIsTableLoading,
} from '../journalTransactionListSelectors';
import JournalTransactionListTableBody from './JournalTransactionListTableBody';
import TableView from '../../../components/TableView/TableView';

const JournalTransactionListTable = ({
  isTableEmpty,
  isTableLoading,
  businessId,
  tableConfig,
}) => (
  <TableView
    isLoading={isTableLoading}
    isEmpty={isTableEmpty}
    emptyMessage="There are no transactions for the selected filter options."
  >
    <JournalTransactionListTableBody
      businessId={businessId}
      tableConfig={tableConfig}
    />
  </TableView>
);

const mapStateToProps = state => ({
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
});

export default connect(mapStateToProps)(JournalTransactionListTable);
