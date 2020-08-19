import { Table, Tooltip } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getBankFeedsBankAccounts,
  getIsActionDisabled,
} from '../BankFeedsSelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import handleComboboxChange from '../../../../components/handlers/handleComboboxChange';
import styles from './BankAccountsTableBody.module.css';

const BankAccountsTableBody = ({
  tableConfig,
  entries,
  onBankAccountLinkedAccountChange,
}) => {
  const rows = entries.map((entry) => {
    const number = entry.accountSuffix
      ? `${entry.accountNumber}-${entry.accountSuffix}`
      : entry.accountNumber;

    const accountNumber = entry.isPotentialSubAccount ? (
      <div className={styles.accountNumber}>
        {number}
        <Tooltip>
          For sub-accounts you may only receive a single consolidated bank feed
          from your financial institution.
        </Tooltip>
      </div>
    ) : (
      number
    );

    return (
      <Table.Row key={entry.id}>
        <Table.RowItem
          textWrap="wrap"
          columnName={tableConfig.financialInstitution.columnName}
          {...tableConfig.financialInstitution.styles}
        >
          {entry.financialInstitution}
        </Table.RowItem>
        <Table.RowItem
          textWrap="wrap"
          columnName={tableConfig.accountName.columnName}
          {...tableConfig.accountName.styles}
        >
          {entry.accountName}
        </Table.RowItem>
        <Table.RowItem
          columnName={tableConfig.BSB.columnName}
          {...tableConfig.BSB.styles}
        >
          {entry.BSB}
        </Table.RowItem>
        <Table.RowItem
          columnName={tableConfig.accountNumber.columnName}
          {...tableConfig.accountNumber.styles}
        >
          {accountNumber}
        </Table.RowItem>
        <Table.RowItem
          columnName={tableConfig.linkedAccount.columnName}
          {...tableConfig.linkedAccount.styles}
        >
          <AccountCombobox
            label="linked account"
            hideLabel
            disabled={!entry.isAccountSelectionEnabled}
            items={entry.accountOptions}
            selectedId={entry.linkedAccountId}
            onChange={handleComboboxChange(
              entry.id,
              onBankAccountLinkedAccountChange
            )}
          />
        </Table.RowItem>
        <Table.RowItem
          textWrap="wrap"
          columnName={tableConfig.status.columnName}
          {...tableConfig.status.styles}
        >
          {entry.status}
        </Table.RowItem>
        <Table.RowItem
          cellRole="actions"
          {...tableConfig.removeButton.styles}
        ></Table.RowItem>
      </Table.Row>
    );
  });

  return <Table.Body>{rows}</Table.Body>;
};

const mapStateToProps = (state) => ({
  entries: getBankFeedsBankAccounts(state),
  isActionDisabled: getIsActionDisabled(state),
});

export default connect(mapStateToProps)(BankAccountsTableBody);
