import { Icons } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getCreateBankFeedsUrl, getIsBankAccountsEmpty } from '../BankFeedsSelectors';
import BankAccountsTableBody from './BankAccountsTableBody';
import BankAccountsTableHeader from './BankAccountsTableHeader';
import LinkButton from '../../components/Button/LinkButton';
import NoResultPageState from '../../components/NoResultPageState/NoResultPageState';
import TableView from '../../components/TableView/TableView';
import getBankAccountsTableResponsiveConfig from './getBankAccountsTableResponsiveConfig';
import styles from './BankAccountsTable.module.css';

export const tableConfig = {
  financialInstitution: { columnName: 'Financial institution', styles: { width: 'flex-1', valign: 'middle' } },
  accountName: { columnName: 'Account name', styles: { width: 'flex-1', valign: 'middle' } },
  BSB: { columnName: 'BSB', styles: { width: 'flex-1', valign: 'middle' } },
  accountNumber: { columnName: 'Account number', styles: { width: 'flex-1', valign: 'middle' } },
  linkedAccount: { columnName: 'Linked account', styles: { width: '290px', valign: 'middle' } },
  status: { columnName: 'Status', styles: { width: 'flex-1', valign: 'middle' } },
};

const BankAccountsTable = ({
  isBankAccountsEmpty,
  onBankAccountLinkedAccountChange,
  onDeleteBankFeedAccountClick,
  manageBankFeedsLink,
}) => {
  const emptyViewActions = [
    <LinkButton
      key={1}
      icon={<Icons.Add />}
      href={manageBankFeedsLink}
      isOpenInNewTab
    >
      Create bank feed
    </LinkButton>,
  ];

  const emptyView = (
    <div className={styles.emptyBankAccountsPageState}>
      <NoResultPageState
        title="Get a feed of all your transactions, straight from your bank"
        description="It'll speed up your transaction entry, and make bank reconciliation a breeze"
        actions={emptyViewActions}
        showNoResultImage={false}
      />
    </div>
  );

  return (
    <TableView
      responsiveWidths={getBankAccountsTableResponsiveConfig(tableConfig)}
      header={<BankAccountsTableHeader tableConfig={tableConfig} />}
      isEmpty={isBankAccountsEmpty}
      emptyView={emptyView}
    >
      <BankAccountsTableBody
        tableConfig={tableConfig}
        onBankAccountLinkedAccountChange={onBankAccountLinkedAccountChange}
        onDeleteBankFeedAccountClick={onDeleteBankFeedAccountClick}
      />
    </TableView>
  );
};

const mapStateToProps = state => ({
  isBankAccountsEmpty: getIsBankAccountsEmpty(state),
  manageBankFeedsLink: getCreateBankFeedsUrl(state),
});

export default connect(mapStateToProps)(BankAccountsTable);
