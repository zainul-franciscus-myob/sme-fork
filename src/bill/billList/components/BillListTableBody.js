import { Icons, Label, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classnames from 'classnames';

import { getTableEntries } from '../billListSelectors';
import styles from './BillListTableBody.module.css';

const BillListTableBody = (props) => {
  const {
    tableConfig,
    entries,
  } = props;
  const rows = entries.map(entry => (
    <Table.Row key={entry.id}>
      <Table.RowItem {...tableConfig.dateIssued}>{entry.dateIssued}</Table.RowItem>
      <Table.RowItem {...tableConfig.number}>
        <a href={entry.link}>{entry.number}</a>
      </Table.RowItem>
      <Table.RowItem {...tableConfig.supplier}>{entry.supplier}</Table.RowItem>
      <Table.RowItem {...tableConfig.invoiceNumber}>{entry.invoiceNumber}</Table.RowItem>
      <Table.RowItem {...tableConfig.billAmount}>{entry.billAmount}</Table.RowItem>
      <Table.RowItem {...tableConfig.balanceDue}>{entry.balanceDueDisplayValue}</Table.RowItem>
      <Table.RowItem
        className={classnames({ [styles.overdue]: entry.isOverdue })}
        {...tableConfig.dateDue}
      >
        {entry.dateDue}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.attachment}>{entry.hasAttachment ? <Icons.GenericDocument /> : ''}</Table.RowItem>
      <Table.RowItem {...tableConfig.status}>
        <Label type="boxed" color={entry.badgeColor}>{entry.status}</Label>
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
  entries: getTableEntries(state),
});

export default connect(mapStateToProps)(BillListTableBody);
