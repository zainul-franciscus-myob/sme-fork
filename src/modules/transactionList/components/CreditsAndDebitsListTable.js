import { connect } from 'react-redux';
import React from 'react';

import { getIsDefaultFilters } from '../selectors/transactionListSelectors';
import {
  getIsTableEmpty,
  getIsTableLoading,
} from '../selectors/creditsAndDebitsSelectors';
import EmptyTableView from './EmptyTableView';
import JournalTransactionListTableBody from './CreditsAndDebitsListTableBody';
import NoResultsView from './NoResultsView';
import StickyTableBody from '../../../components/StickyTable/StickyTableBody';

const CreditsAndDebitsListTable = ({
  isTableEmpty,
  isTableLoading,
  isDefaultFilters,
  businessId,
  tableConfig,
}) => {
  const emptyTableView = isDefaultFilters ? (
    <EmptyTableView />
  ) : (
    <NoResultsView />
  );

  return (
    <StickyTableBody
      isLoading={isTableLoading}
      isEmpty={isTableEmpty}
      emptyView={emptyTableView}
    >
      <JournalTransactionListTableBody
        businessId={businessId}
        tableConfig={tableConfig}
      />
    </StickyTableBody>
  );
};

const mapStateToProps = (state) => ({
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
  isDefaultFilters: getIsDefaultFilters(state),
});

export default connect(mapStateToProps)(CreditsAndDebitsListTable);
