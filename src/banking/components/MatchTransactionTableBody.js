import { Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTableEntries } from '../bankingSelectors/matchTransactionSelectors';
import MatchTransactionTableRow from './MatchTransactionTableRow';

const MatchTransactionTableBody = (props) => {
  const {
    tableConfig,
    entries,
    onUpdateMatchTransactionSelection,
    onUpdateSelectedTransactionDetails,
  } = props;

  const rows = entries.map((entry, index) => (
    <MatchTransactionTableRow
      index={index}
      tableConfig={tableConfig}
      onSelect={onUpdateMatchTransactionSelection}
      onUpdate={onUpdateSelectedTransactionDetails}
      {...entry}
    />
  ));

  return (
    <Table.Body>
      {rows}
    </Table.Body>
  );
};

const mapStateToProps = state => ({
  entries: getTableEntries(state),
});

export default connect(mapStateToProps)(MatchTransactionTableBody);
