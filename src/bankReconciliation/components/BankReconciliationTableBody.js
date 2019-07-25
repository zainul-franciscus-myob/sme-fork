import { Checkbox, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getEntries, getIsActionDisabled } from '../BankReconciliationSelectors';

const onCheckboxChange = (handler, index) => (e) => {
  const { checked } = e.target;
  handler({ index, value: checked });
};

const BankReconciliationTableBody = ({
  entries,
  tableConfig,
  isActionDisabled,
  onSelectRow,
}) => {
  const rows = entries.map((entry, index) => (
    <Table.Row key={entry.journalLineId} isSelected={entry.isChecked}>
      <Table.RowItem width="auto" cellRole="checkbox" valign="middle">
        <Checkbox
          name={entry.journalLineId}
          label={entry.journalLineId}
          hideLabel
          onChange={onCheckboxChange(onSelectRow, index)}
          checked={entry.isChecked}
          disabled={isActionDisabled}
        />
      </Table.RowItem>
      <Table.RowItem {...tableConfig.date}>
        {entry.date}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.reference}>
        <a href={entry.link}>{entry.referenceId}</a>
      </Table.RowItem>
      <Table.RowItem {...tableConfig.description}>
        {entry.description}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.withdrawal}>
        {entry.withdrawal}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.deposit}>
        {entry.deposit}
      </Table.RowItem>
    </Table.Row>
  ));

  return (
    <Table.Body>
      {rows}
    </Table.Body>
  );
};

const mapStateToProps = state => ({
  entries: getEntries(state),
  isActionDisabled: getIsActionDisabled(state),
});

export default connect(mapStateToProps)(BankReconciliationTableBody);
