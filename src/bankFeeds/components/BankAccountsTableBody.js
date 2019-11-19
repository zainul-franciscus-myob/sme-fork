import { Button, Icons, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getBankFeedsBankAccounts, getIsActionDisabled } from '../BankFeedsSelectors';
import AccountCombobox from '../../components/combobox/AccountCombobox';
import BankFeedTypes from '../BankFeedTypes';
import handleComboboxChange from '../../components/handlers/handleComboboxChange';

const BankAccountsTableBody = ({
  isActionDisabled,
  tableConfig,
  entries,
  onBankAccountLinkedAccountChange,
  onDeleteBankFeedAccountClick,
}) => {
  const rows = entries.map(entry => (
    <Table.Row key={entry.id}>
      <Table.RowItem columnName={tableConfig.financialInstitution.columnName}>
        {entry.financialInstitution}
      </Table.RowItem>
      <Table.RowItem columnName={tableConfig.accountName.columnName}>
        {entry.accountName}
      </Table.RowItem>
      <Table.RowItem columnName={tableConfig.BSB.columnName}>
        {entry.BSB}
      </Table.RowItem>
      <Table.RowItem columnName={tableConfig.accountNumber.columnName}>
        {entry.accountNumber}
      </Table.RowItem>
      <Table.RowItem columnName={tableConfig.linkedAccount.columnName} textWrap="wrap">
        <AccountCombobox
          label="linked account"
          hideLabel
          items={entry.accountOptions}
          selectedId={entry.linkedAccountId}
          onChange={handleComboboxChange(entry.id, onBankAccountLinkedAccountChange)}
        />
      </Table.RowItem>
      <Table.RowItem columnName={tableConfig.status.columnName}>
        {entry.status}
      </Table.RowItem>
      <Table.RowItem width="auto" cellRole="actions" valign="middle">
        <Button
          type="clear"
          icon={<Icons.Remove />}
          aria-label="Remove bank account"
          size="xs"
          onClick={() => onDeleteBankFeedAccountClick(BankFeedTypes.BANK_ACCOUNT, entry.id)}
          disabled={isActionDisabled}
        />
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
  entries: getBankFeedsBankAccounts(state),
  isActionDisabled: getIsActionDisabled(state),
});

export default connect(mapStateToProps)(BankAccountsTableBody);