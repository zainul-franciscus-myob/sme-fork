import { Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountClassifications,
  getShowInactive,
  getTableEntries,
} from '../../AccountListSelectors';
import AccountListTableRow from './AccountListTableRow';

const AccountListTableBody = ({
  tableConfig,
  showInactive,
  entries,
  onAccountSelected,
  accountClassifications,
}) => {
  const rows = entries.map((entry, index) => {
    const {
      selected,
      id,
      accountNumber,
      accountName,
      accountType,
      subAccountType,
      taxCode,
      linked,
      link,
      displayLevel,
      balance,
      isSystem,
      isHeader,
      isInactive,
      indentLevel,
      hideAccountNumber,
    } = entry;

    return (
      <AccountListTableRow
        key={id}
        accountClassifications={accountClassifications}
        index={index}
        onAccountSelected={onAccountSelected}
        selected={selected}
        tableConfig={tableConfig}
        accountNumber={accountNumber}
        indentLevel={indentLevel}
        isSystem={isSystem}
        isHeader={isHeader}
        hideAccountNumber={hideAccountNumber}
        link={link}
        accountName={accountName}
        showInactive={showInactive}
        isInactive={isInactive}
        accountType={accountType}
        subAccountType={subAccountType}
        taxCode={taxCode}
        linked={linked}
        displayLevel={displayLevel}
        balance={balance}
      />
    );
  });

  return <Table.Body>{rows}</Table.Body>;
};

const mapStateToProps = (state) => ({
  showInactive: getShowInactive(state),
  entries: getTableEntries(state),
  accountClassifications: getAccountClassifications(state),
});

export default connect(mapStateToProps)(AccountListTableBody);
