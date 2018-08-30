import { StandardTemplate, Table } from '@myob/myob-widgets';
import React from 'react';

import './GeneralJournalView.css';
import GeneralJournalFilterOptions from './GeneralJournalFilterOptions';

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
  } = props;

  const filterBar = (
    <GeneralJournalFilterOptions
      filterOptions={filterOptions}
      onUpdateFilters={onUpdateFilters}
      onApplyFilter={onApplyFilter}
    />
  );

  return (
    <div className="general-journal-view">
      <StandardTemplate pageHead="General Journals" filterBar={filterBar}>
        <div className="general-journal-view__list">
          <Table>
            <Table.Header>
              <Table.HeaderItem {...tableConfig.date}>Date </Table.HeaderItem>
              <Table.HeaderItem {...tableConfig.referenceId}>Reference </Table.HeaderItem>
              <Table.HeaderItem {...tableConfig.description}>Description </Table.HeaderItem>
              <Table.HeaderItem {...tableConfig.displayAmount}>Amount ($)</Table.HeaderItem>
            </Table.Header>
            <Table.Body>
              {renderRows(tableConfig)}
            </Table.Body>
          </Table>
          {isEmpty && <div className="general-journal-view__empty">There are no general journal entries for this period.</div>}
        </div>
      </StandardTemplate>
    </div>
  );
};

export default GeneralJournalView;
