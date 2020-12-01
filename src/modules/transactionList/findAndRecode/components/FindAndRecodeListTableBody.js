import { Checkbox, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsRecodeFinished,
  getIsRecodeLoading,
  getTableEntries,
} from '../findAndRecodeSelectors';
import RecodeStatusSymbol from './RecodeStatusSymbol';

const FindAndRecodeListTableBody = ({
  onSelectItem,
  tableConfig,
  entries,
  isRecodeLoading,
  isRecodeFinished,
}) => {
  const rows = entries.map((entry, index) => (
    <Table.Row key={entry.id}>
      <Table.RowItem {...tableConfig.selectItem}>
        <Checkbox
          name={index}
          label={`Select item ${index}`}
          hideLabel
          onChange={() => onSelectItem(entry.id)}
          checked={entry.recodeItem}
          disabled={isRecodeLoading}
        />
      </Table.RowItem>
      <Table.RowItem {...tableConfig.date}>{entry.displayDate}</Table.RowItem>
      <Table.RowItem {...tableConfig.referenceId}>
        <a href={entry.link}>{entry.referenceId}</a>
      </Table.RowItem>
      <Table.RowItem {...tableConfig.description}>
        {entry.description}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.displayAccountName}>
        {entry.displayAccountName}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.sourceJournal}>
        {entry.sourceJournal}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.taxCode}>{entry.taxCode}</Table.RowItem>
      <Table.RowItem {...tableConfig.displayDebit}>
        {entry.displayDebit}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.displayCredit}>
        {entry.displayCredit}
      </Table.RowItem>
      {(isRecodeLoading || isRecodeFinished) && (
        <Table.RowItem {...tableConfig.recodeStatus}>
          <RecodeStatusSymbol recodeItem={entry.recodeItem} />
        </Table.RowItem>
      )}
    </Table.Row>
  ));

  return <Table.Body>{rows}</Table.Body>;
};

const mapStateToProps = (state) => ({
  entries: getTableEntries(state),
  isRecodeLoading: getIsRecodeLoading(state),
  isRecodeFinished: getIsRecodeFinished(state),
});

export default connect(mapStateToProps)(FindAndRecodeListTableBody);
