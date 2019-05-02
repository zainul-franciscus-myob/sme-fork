import { PropTypes } from 'prop-types';
import {
  Spinner, Table,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTableEntries } from '../bankingSelectors';
import AllocatedRowItem from './AllocatedRowItem';
import MatchedRowItem from './MatchedRowItem';
import UnmatchedRowItem from './UnmatchedRowItem';
import style from './BankingView.css';

/* eslint-disable react/no-array-index-key */

const getMatchedOrAllocatedRowItem = ({
  entry,
  onMatchedToFocus,
  onMatchedToBlur,
  onUnmatchedBlur,
  onUnmatchedFocus,
  onAllocate,
  onUnallocate,
  tableConfig,
  index,
}) => {
  const {
    type,
    isLoading,
  } = entry;

  if (isLoading) {
    return (
      <Table.RowItem {...tableConfig.allocateOrMatch}>
        <Spinner size="small" />
      </Table.RowItem>
    );
  }

  if (type === 'matched') {
    return (
      <MatchedRowItem
        entry={entry}
        {...tableConfig.allocateOrMatch}
      />
    );
  }

  if (type === 'allocated') {
    return (
      <AllocatedRowItem
        {...tableConfig.allocateOrMatch}
        entry={entry}
        onUnallocate={() => onUnallocate(index)}
        onAllocate={item => onAllocate(index, item)}
        onFocus={() => onMatchedToFocus(index)}
        onBlur={() => onMatchedToBlur(index)}
      />
    );
  }

  return (
    <UnmatchedRowItem
      {...tableConfig.allocateOrMatch}
      entry={entry}
      onAllocate={item => onAllocate(index, item)}
      onFocus={() => onUnmatchedFocus(index)}
      onBlur={() => onUnmatchedBlur(index)}
    />
  );
};

const BankTransactionTableBody = (props) => {
  const {
    tableConfig,
    entries,
    onMatchedToBlur,
    onMatchedToFocus,
    onUnmatchedFocus,
    onUnmatchedBlur,
    onUnallocate,
    onAllocate,
  } = props;

  const rows = entries.map((entry, index) => {
    const matchedOrAllocatedRowItem = getMatchedOrAllocatedRowItem({
      entry,
      tableConfig,
      onAllocate,
      onUnallocate,
      onMatchedToBlur,
      onMatchedToFocus,
      onUnmatchedFocus,
      onUnmatchedBlur,
      index,
    });

    return (
      <Table.Row key={index}>
        <Table.RowItem {...tableConfig.date}>
          {entry.displayDate}
        </Table.RowItem>
        <Table.RowItem {...tableConfig.description}>
          <div className={style.ellipsisText} title={entry.description}>
            {entry.description}
          </div>
          {entry.note
            && (<div className={style.ellipsisText} title={entry.note}>{entry.note}</div>)
          }
        </Table.RowItem>
        <Table.RowItem {...tableConfig.withdrawal}>
          {entry.withdrawal}
        </Table.RowItem>
        <Table.RowItem {...tableConfig.deposit}>
          {entry.deposit}
        </Table.RowItem>
        {matchedOrAllocatedRowItem}
        <Table.RowItem {...tableConfig.taxCode}>
          {entry.taxCode}
        </Table.RowItem>
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
  onAllocate: PropTypes.func.isRequired,
  onUnallocate: PropTypes.func.isRequired,
  onMatchedToBlur: PropTypes.func.isRequired,
  onMatchedToFocus: PropTypes.func.isRequired,
  onUnmatchedFocus: PropTypes.func.isRequired,
  onUnmatchedBlur: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  entries: getTableEntries(state),
});

export default connect(mapStateToProps)(BankTransactionTableBody);
