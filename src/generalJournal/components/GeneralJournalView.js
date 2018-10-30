import {
  Button, HeaderSort, PageHead, Spinner, StandardTemplate, Table,
} from '@myob/myob-widgets';
import React from 'react';

import GeneralJournalFilterOptions from './GeneralJournalFilterOptions';
import style from './GeneralJournalView.css';

const GeneralJournalView = (props) => {
  const tableConfig = {
    date: { width: '11rem', valign: 'top' },
    referenceId: { width: '10.2rem', valign: 'top' },
    description: { width: 'flex-1', valign: 'top' },
    displayAmount: { width: '12.4rem', valign: 'top', align: 'right' },
  };

  const {
    renderRows,
    isEmpty,
    isTableLoading,
    filterOptions,
    onUpdateFilters,
    onApplyFilter,
    onSort,
    order,
    newGeneralJournalEntry,
    alertComponent,
  } = props;

  const filterBar = (
    <GeneralJournalFilterOptions
      filterOptions={filterOptions}
      onUpdateFilters={onUpdateFilters}
      onApplyFilter={onApplyFilter}
    />
  );

  const pageHead = (
    <PageHead title="General Journals">
      <Button type="primary" onClick={newGeneralJournalEntry}>Create general journal entry</Button>
    </PageHead>
  );

  const table = (
    <Table>
      <Table.Header>
        <Table.HeaderItem {...tableConfig.date}>
          <HeaderSort title="Date" sortName="date" activeSort={order} onSort={onSort} />
        </Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.referenceId}>Reference </Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.description}>Description </Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.displayAmount}>Amount ($)</Table.HeaderItem>
      </Table.Header>
      <Table.Body>
        {renderRows(tableConfig)}
      </Table.Body>
    </Table>
  );

  const tableView = isTableLoading
    ? (
      <div className={style.spinner}>
        <Spinner size="medium" />
      </div>
    )
    : table;

  const emptyView = (
    <div className={style.empty}>
      There are no general journal entries for this period.
    </div>
  );

  return (
    <React.Fragment>
      {alertComponent}
      <StandardTemplate pageHead={pageHead} filterBar={filterBar}>
        <div className={style.list}>
          {isEmpty ? emptyView : tableView}
        </div>
      </StandardTemplate>
    </React.Fragment>
  );
};

export default GeneralJournalView;
