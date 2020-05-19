import { Icons } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getCreateBankFeedsUrl, getIsBankAccountsEmpty, getIsTableLoading } from '../BankFeedsSelectors';
import BankAccountsTableBody from './BankAccountsTableBody';
import BankAccountsTableHeader from './BankAccountsTableHeader';
import LinkButton from '../../../../components/Button/LinkButton';
import NoResultPageState from '../../../../components/NoResultPageState/NoResultPageState';
import TableView from '../../../../components/TableView/TableView';
import getBankAccountsTableResponsiveConfig from './getBankAccountsTableResponsiveConfig';
import styles from './BankAccountsTable.module.css';

export const tableConfig = {
  financialInstitution: { columnName: 'Financial institution', styles: { valign: 'middle' } },
  accountName: { columnName: 'Account name', styles: { valign: 'middle' } },
  BSB: { columnName: 'BSB', styles: { valign: 'middle' } },
  accountNumber: { columnName: 'Account number', styles: { valign: 'middle' } },
  linkedAccount: { columnName: 'Linked account', styles: { valign: 'middle', textWrap: 'wrap' } },
  status: { columnName: 'Status', styles: { valign: 'middle' } },
  removeButton: { styles: { width: '3.6rem', valign: 'middle' } },
};

const BankAccountsTable = ({
  isBankAccountsEmpty,
  isTableLoading,
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
      isLoading={isTableLoading}
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
  isTableLoading: getIsTableLoading(state),
});

export default connect(mapStateToProps)(BankAccountsTable);
