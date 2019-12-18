import {
  Dropdown, Icons, Table,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getSalesTableEntries } from '../../selectors/DashboardSalesSelectors';
import styles from './DashboardSalesTable.module.css';

const tableConfig = {
  headerTitle: {},
  description: {
    columnName: 'description',
    width: '15rem',
  },
  contactName: {
    columnName: 'contactName',
    width: 'flex-2',
  },
  amount: {
    columnName: 'amount',
    width: '13rem',
    align: 'right',
  },
  action: { width: '3.2rem', columnName: 'action', valign: 'middle' },
};

const DashboardSalesTable = ({
  entries,
  onLinkClick,
}) => {
  const header = (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.headerTitle}>Most overdue invoices</Table.HeaderItem>
    </Table.Header>
  );

  const rows = entries.map(({
    id, description, contactName, amount, contactLink, invoiceLink,
  }) => (
    <Table.Row key={id}>
      <Table.RowItem {...tableConfig.description}>{description}</Table.RowItem>
      <Table.RowItem {...tableConfig.contactName}>{contactName}</Table.RowItem>
      <Table.RowItem {...tableConfig.amount}>{amount}</Table.RowItem>
      <Table.RowItem {...tableConfig.action} cellRole="actions">
        <Dropdown
          right
          items={[
            <Dropdown.Item key="invoiceLink" label="View invoice" value={invoiceLink} />,
            <Dropdown.Item key="contactLink" label="View contact" value={contactLink} />,
          ]}
          onSelect={onLinkClick}
          toggle={(
            <Dropdown.Toggle size="xs">
              <Icons.More />
            </Dropdown.Toggle>
            )}
        />
      </Table.RowItem>
    </Table.Row>
  ));

  return (
    <Table hasActions>
      <div className={styles.tableHeader}>
        {header}
      </div>
      <div className={styles.table}>
        {rows}
      </div>
    </Table>
  );
};

const mapStateToProps = state => ({
  entries: getSalesTableEntries(state),
});

export default connect(mapStateToProps)(DashboardSalesTable);
