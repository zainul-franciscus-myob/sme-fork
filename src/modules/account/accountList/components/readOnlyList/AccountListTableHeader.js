import { Checkbox, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getRawEntries, getShowInactive } from '../../AccountListSelectors';
import styles from '../AccountListTable.module.css';

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
  const { showInactive, entries, onAllAccountsSelected, tableConfig } = props;

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
        {showInactive && <HeaderItem config={tableConfig.status} />}
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
  entries: getRawEntries(state),
});

export default connect(mapStateToProps)(AccountListTableHeader);
