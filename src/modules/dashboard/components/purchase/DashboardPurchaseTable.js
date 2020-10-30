import { Dropdown, MoreIcon, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getPurchaseTableEntries } from '../../selectors/DashboardPurchaseSelectors';
import styles from './DashboardPurchaseTable.module.css';

const tableConfig = {
  headerTitle: {},
  description: {
    columnName: 'description',
    width: '15rem',
  },
  contactName: {
    columnName: 'contactName',
  },
  amount: {
    columnName: 'amount',
    width: '13rem',
    align: 'right',
  },
  action: { width: '3.2rem', columnName: 'action', valign: 'middle' },
};

const DashboardPurchaseTable = ({ entries, onLinkClick }) => {
  const header = (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.headerTitle}>
        Most overdue bills
      </Table.HeaderItem>
    </Table.Header>
  );

  const rows = entries.map(
    ({ id, description, contactName, amount, contactLink, billLink }) => (
      <Table.Row key={id}>
        <Table.RowItem {...tableConfig.description}>
          <span className={styles.overdue}>{description}</span>
        </Table.RowItem>
        <Table.RowItem {...tableConfig.contactName}>
          {contactName}
        </Table.RowItem>
        <Table.RowItem {...tableConfig.amount}>{amount}</Table.RowItem>
        <Table.RowItem {...tableConfig.action} cellRole="actions">
          <Dropdown
            right
            items={[
              <Dropdown.Item
                key="billLink"
                label="View bill"
                value={billLink}
              />,
              <Dropdown.Item
                key="contactLink"
                label="View contact"
                value={contactLink}
              />,
            ]}
            onSelect={onLinkClick}
            toggle={
              <Dropdown.Toggle size="xs">
                <MoreIcon />
              </Dropdown.Toggle>
            }
          />
        </Table.RowItem>
      </Table.Row>
    )
  );

  return (
    <Table hasActions>
      <div className={styles.tableHeader}>{header}</div>
      <div className={styles.table}>{rows}</div>
    </Table>
  );
};

const mapStateToProps = (state) => ({
  entries: getPurchaseTableEntries(state),
});

export default connect(mapStateToProps)(DashboardPurchaseTable);
