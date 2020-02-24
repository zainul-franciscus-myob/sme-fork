import { connect } from 'react-redux';
import React from 'react';

import {
  getEntries,
  getIsActionDisabled,
  getIsTableEmpty,
  getIsTableLoading,
} from '../BankReconciliationSelectors';
import AccordionTable from '../../../components/Accordion/AccordionTable';
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

  const table = (
    <AccordionTable
      onRowSelect={() => {}}
      data={entries}
      renderRow={(index, _, buildRowProps) => (
        <BankReconciliationTableRow
          index={index}
          tableConfig={tableConfig}
          isActionDisabled={isActionDisabled}
          onCheckboxChange={onCheckboxChange}
          onSelectRow={onSelectRow}
          buildRowProps={buildRowProps}
        />
      )}
    />
  );

  const tableView = isTableLoading || isTableEmpty
    ? loadingOrEmptyTableView
    : table;

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
