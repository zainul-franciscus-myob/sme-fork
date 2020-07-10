import { Checkbox, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTableEntries } from '../LinkBillSelectors';

const handleCheckboxChange = (handler, id) => (e) => {
  handler({ id, value: e.target.checked });
};

const LinkBillListTableBody = ({ tableConfig, entries, onBillSelect }) => {
  const rows = entries.map((entry) => (
    <Table.Row key={entry.id}>
      <Table.RowItem {...tableConfig.isSelected}>
        <Checkbox
          id={entry.id}
          name="isSelected"
          label="Select bill"
          hideLabel
          checked={entry.isSelected}
          onChange={handleCheckboxChange(onBillSelect, entry.id)}
        />
      </Table.RowItem>
      <Table.RowItem {...tableConfig.issueDate}>
        {entry.issueDate}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.supplier}>
        {entry.supplierName}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.supplierInvoiceNumber}>
        {entry.supplierInvoiceNumber}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.amount}>{entry.amount}</Table.RowItem>
    </Table.Row>
  ));

  return <Table.Body>{rows}</Table.Body>;
};

const mapStateToProps = (state) => ({
  entries: getTableEntries(state),
});

export default connect(mapStateToProps)(LinkBillListTableBody);
