import {
  Button, HeaderSort, PageHead, StandardTemplate, Table,
} from '@myob/myob-widgets';
import React from 'react';

import GeneralJournalFilterOptions from './GeneralJournalFilterOptions';
import style from './GeneralJournalView.css';

const GeneralJournalView = (props) => {
  const tableConfig = {
    date: { width: '96px', valign: 'top' },
    referenceId: { width: '102px', valign: 'top' },
    description: { width: 'flex-1', valign: 'top' },
    displayAmount: { width: '124px', valign: 'top', align: 'right' },
  };

  const {
    renderRows,
    isEmpty,
    filterOptions,
    onUpdateFilters,
    onApplyFilter,
    onDateSort,
    order,
    newGeneralJournalEntry,
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

  return (
    <StandardTemplate pageHead={pageHead} filterBar={filterBar}>
      <div className={style.list}>
        <Table>
          <Table.Header>
            <Table.HeaderItem {...tableConfig.date}>
              <HeaderSort title="Date" sortName="date" activeSort={{ column: 'date', descending: order === 'desc' }} onSort={onDateSort} />
            </Table.HeaderItem>
            <Table.HeaderItem {...tableConfig.referenceId}>Reference </Table.HeaderItem>
            <Table.HeaderItem {...tableConfig.description}>Description </Table.HeaderItem>
            <Table.HeaderItem {...tableConfig.displayAmount}>Amount ($)</Table.HeaderItem>
          </Table.Header>
          <Table.Body>
            {renderRows(tableConfig)}
          </Table.Body>
        </Table>
        {isEmpty
        && <div className={style.empty}>There are no general journal entries for this period.</div>}
      </div>
    </StandardTemplate>
  );
};

export default GeneralJournalView;
