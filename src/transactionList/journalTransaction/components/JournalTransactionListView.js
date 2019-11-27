import {
  StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsLoading,
} from '../journalTransactionListSelectors';
import JournalTransactionListFilterOptions from './JournalTransactionListFilterOptions';
import JournalTransactionListTable from './JournalTransactionListTable';
import JournalTransactionListTableHeader from './JournalTransactionListTableHeader';
import PageView from '../../../components/PageView/PageView';

export const tableConfig = {
  date: { width: '11rem', valign: 'top' },
  referenceId: { width: '13rem', valign: 'top' },
  description: { width: 'flex-1', valign: 'top' },
  sourceJournal: { width: '15.5rem', valign: 'top' },
  displayAmount: { width: '12.4rem', valign: 'top', align: 'right' },
};

const JournalTransactionListView = (props) => {
  const {
    isLoading,
    onUpdateFilters,
    onApplyFilter,
    onSort,
    pageHead,
    subHead,
    alert,
  } = props;

  const filterBar = (
    <JournalTransactionListFilterOptions
      onUpdateFilters={onUpdateFilters}
      onApplyFilter={onApplyFilter}
    />
  );

  const transactionListView = (
    <StandardTemplate
      filterBar={filterBar}
      sticky="all"
      pageHead={pageHead}
      alert={alert}
      subHeadChildren={subHead}
      tableHeader={(
        <JournalTransactionListTableHeader
          onSort={onSort}
          tableConfig={tableConfig}
        />
      )}
    >
      <JournalTransactionListTable tableConfig={tableConfig} />
    </StandardTemplate>
  );

  return <PageView isLoading={isLoading} view={transactionListView} />;
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
});

export default connect(mapStateToProps)(JournalTransactionListView);
