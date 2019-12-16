import {
  Table,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getEntries,
  getHeaderSelectStatus,
  getIsActionDisabled,
  getIsTableEmpty,
  getIsTableLoading,
  getOrder,
} from '../BankReconciliationSelectors';
import AccordionTable from '../../components/Feelix/Accordion/AccordionTable';
import BankReconciliationTableCollapsibleRow from './BankReconciliationTableCollapsibleRow';
import BankReconciliationTableHeader from './BankReconciliationTableHeader';
import BankReconciliationTableRow from './BankReconciliationTableRow';
import TableView from '../../components/TableView/TableView';

const onCheckboxChange = (handler, index) => (e) => {
  const { checked } = e.target;
  handler({ index, value: checked });
};

const tableConfig = {
  date: { columnName: 'Date', width: '13rem' },
  reference: { columnName: 'Reference', width: '12.4rem' },
  description: { columnName: 'Description', width: 'flex-1' },
  withdrawal: { columnName: 'Withdrawal ($)', width: '15rem', align: 'right' },
  deposit: { columnName: 'Deposit ($)', width: '13rem', align: 'right' },
};

const BankReconciliationTable = ({
  isTableLoading,
  isTableEmpty,
  isActionDisabled,
  onSort,
  onSelectRow,
  onSelectAll,
  entries,
  headerSelectStatus,
  order,
}) => {
  /*
    Executing a function instead of using JSX due to the Accordion Table cloning the header & body.
  */
  const header = BankReconciliationTableHeader({
    tableConfig,
    onSelectAll,
    onSort,
    isActionDisabled,
    headerSelectStatus,
    order,
  });

  const loadingOrEmptyTableView = (
    <TableView
      isLoading={isTableLoading}
      isEmpty={isTableEmpty}
      emptyMessage="There are no transactions for the selected filter options."
      header={header}
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
      // This prop adds additional padding to the table headers
      // so that they correctly align to the left
      onRowSelect={() => {}}
      expansionToggle
      header={header}
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
  order: getOrder(state),
  headerSelectStatus: getHeaderSelectStatus(state),
});

export default connect(mapStateToProps)(BankReconciliationTable);
