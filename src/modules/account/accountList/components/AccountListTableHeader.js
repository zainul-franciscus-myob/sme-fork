import { Checkbox, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getRawEntries,
  getShowInactive,
  getTableTaxCodeHeader,
} from '../AccountListSelectors';
import styles from './AccountListTable.module.css';

const HeaderItem = ({ config }) =>
  !config.isHidden && (
    <Table.HeaderItem columnName={config.columnName} {...config.styles}>
      {config.columnName}
    </Table.HeaderItem>
  );

const onCheckboxChange = (onSelected) => (e) => {
  const { checked } = e.target;
  onSelected(checked);
};

const AccountListTableHeader = (props) => {
  const { showInactive, taxCodeHeader, entries, onAllAccountsSelected } = props;

  const tableConfig = {
    accountNumber: {
      columnName: 'Account number',
      styles: { valign: 'middle' },
    },
    accountName: { columnName: 'Account name', styles: { valign: 'middle' } },
    status: {
      columnName: 'Status',
      styles: { valign: 'middle' },
      isHidden: !showInactive,
    },
    type: { columnName: 'Account type', styles: { valign: 'middle' } },
    taxCode: { columnName: taxCodeHeader, styles: { valign: 'middle' } },
    linked: { columnName: 'Linked', styles: { valign: 'middle' } },
    level: { columnName: 'Level', styles: { valign: 'middle' } },
    balance: {
      columnName: 'Current balance ($)',
      styles: { valign: 'middle', align: 'right' },
    },
  };

  const allAccountsSelected = entries.every((entry) => entry.selected);
  const someAccountsSelected =
    !allAccountsSelected && entries.some((entry) => entry.selected);

  return (
    <Table>
      <Table.Header>
        <div className={styles.accSelectionColumn}>
          <Checkbox
            name="bulkSelect"
            label="Bulk select"
            hideLabel
            onChange={onCheckboxChange(onAllAccountsSelected)}
            checked={allAccountsSelected}
            indeterminate={someAccountsSelected}
          />
        </div>
        <HeaderItem config={tableConfig.accountNumber} />
        <HeaderItem config={tableConfig.accountName} />
        <HeaderItem config={tableConfig.status} />
        <HeaderItem config={tableConfig.type} />
        <HeaderItem config={tableConfig.taxCode} />
        <HeaderItem config={tableConfig.linked} />
        <HeaderItem config={tableConfig.level} />
        <HeaderItem config={tableConfig.balance} />
      </Table.Header>
    </Table>
  );
};

const mapStateToProps = (state) => ({
  showInactive: getShowInactive(state),
  taxCodeHeader: getTableTaxCodeHeader(state),
  entries: getRawEntries(state),
});

export default connect(mapStateToProps)(AccountListTableHeader);
