import {
  Table,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getEntries,
  getIsActionDisabled,
  getIsTableEmpty,
  getIsTableLoading,
} from '../BankReconciliationSelectors';
import AccordionTable from '../../../components/Feelix/Accordion/AccordionTable';
import BankReconciliationTableCollapsibleRow from './BankReconciliationTableCollapsibleRow';
import BankReconciliationTableRow from './BankReconciliationTableRow';
import TableView from '../../../components/TableView/TableView';

const onCheckboxChange = (handler, index) => (e) => {
  const { checked } = e.target;
  handler({ index, value: checked });
};

const BankReconciliationTable = ({
  isTableLoading,
  isTableEmpty,
  isActionDisabled,
  onSelectRow,
  entries,
  tableConfig,
}) => {
  const loadingOrEmptyTableView = (
    <TableView
      isLoading={isTableLoading}
      isEmpty={isTableEmpty}
      emptyMessage="There are no transactions for the selected filter options."
    />
  );

  const tableEntries = isTableLoading || isTableEmpty
    ? []
    : entries.map((entry, index) => (entry.hasMatchedTransactions
      ? (
        BankReconciliationTableCollapsibleRow({
          tableConfig,
          index,
          entry,
          isActionDisabled,
          onCheckboxChange,
          onSelectRow,
        })
      ) : (
        BankReconciliationTableRow({
          tableConfig,
          index,
          entry,
          isActionDisabled,
          onCheckboxChange,
          onSelectRow,
        })
      )));

  const table = (
    <AccordionTable
      expansionToggle
      body={(
        // This prop is necessary to enable certain styling for the Table component in mobile view
        // for when the table has a checkbox/radio button, or any actionable item for each row.
        <Table.Body onRowSelect={() => {}}>
          {tableEntries}
        </Table.Body>
      )}
    />
  );

  const tableView = isTableLoading || isTableEmpty ? loadingOrEmptyTableView : table;

  const view = (
    <React.Fragment>
      {tableView}
    </React.Fragment>
  );

  return view;
};

const mapStateToProps = state => ({
  entries: getEntries(state),
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
  isActionDisabled: getIsActionDisabled(state),
});

export default connect(mapStateToProps)(BankReconciliationTable);
