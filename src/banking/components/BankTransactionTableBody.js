import { Button, Table } from '@myob/myob-widgets';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import { getTableEntries } from '../bankingSelectors';

/* eslint-disable react/no-array-index-key */

const AllocatedRowItem = ({ allocatedTo, ...props }) => (
  <Table.RowItem {...props}>{`Matched to ${allocatedTo}`}</Table.RowItem>
);

const MatchedRowItem = ({ matchedDisplayText, ...props }) => (
  <Table.RowItem {...props}>
    <Button type="link" onClick={() => {}}>{matchedDisplayText}</Button>
  </Table.RowItem>
);

const UnmatchedRowItem = props => (
  <Table.RowItem {...props}>
    <Button type="link" onClick={() => {}}>Allocate me</Button>
  </Table.RowItem>
);

const getMatchedOrAllocatedRowItem = ({ entry, tableConfig }) => {
  const {
    transactionType,
    allocatedTo,
    matchedDisplayText,
  } = entry;

  if (transactionType === 'allocated') {
    return (
      <AllocatedRowItem allocatedTo={allocatedTo} {...tableConfig.allocateOrMatch} />
    );
  }

  if (transactionType === 'matched') {
    return (
      <MatchedRowItem
        matchedDisplayText={matchedDisplayText}
        {...tableConfig.allocateOrMatch}
      />
    );
  }

  return (
    <UnmatchedRowItem {...tableConfig.allocateOrMatch} />
  );
};

const BankTransactionTableBody = (props) => {
  const {
    tableConfig,
    entries,
  } = props;

  const rows = entries.map((entry, index) => {
    const matchedOrAllocatedRowItem = getMatchedOrAllocatedRowItem({ entry, tableConfig });

    return (
      <Table.Row key={index}>
        <Table.RowItem {...tableConfig.date}>{entry.displayDate}</Table.RowItem>
        <Table.RowItem {...tableConfig.description}>{entry.description}</Table.RowItem>
        <Table.RowItem {...tableConfig.withdrawal}>{entry.withdrawal}</Table.RowItem>
        <Table.RowItem {...tableConfig.deposit}>{entry.deposit}</Table.RowItem>
        {matchedOrAllocatedRowItem}
      </Table.Row>
    );
  });

  return (
    <Table.Body>
      {rows}
    </Table.Body>
  );
};

BankTransactionTableBody.propTypes = {
  tableConfig: PropTypes.shape({}).isRequired,
  entries: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = state => ({
  entries: getTableEntries(state),
});

export default connect(mapStateToProps)(BankTransactionTableBody);
