import { Icons } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getCreateBankFeedsUrl, getIsCreditCardsEmpty } from '../BankFeedsSelectors';
import CreditCardsTableBody from './CreditCardsTableBody';
import CreditCardsTableHeader from './CreditCardsTableHeader';
import LinkButton from '../../components/Button/LinkButton';
import NoResultPageState from '../../components/NoResultPageState/NoResultPageState';
import TableView from '../../components/TableView/TableView';
import getCreditCardsTableResponsiveConfig from './getCreditCardsTableResponsiveConfig';
import styles from './CreditCardsTable.module.css';

const tableConfig = {
  financialInstitution: { columnName: 'Financial institution', styles: { width: 'flex-1', valign: 'middle' } },
  cardName: { columnName: 'Card name', styles: { width: 'flex-1', valign: 'middle' } },
  cardNumber: { columnName: 'Card number', styles: { width: 'flex-1', valign: 'middle' } },
  linkedAccount: { columnName: 'Linked account', styles: { width: '290px', valign: 'middle' } },
  status: { columnName: 'Status', styles: { width: 'flex-1', valign: 'middle' } },
};

const CreditCardsTable = ({
  isCreditCardsEmpty,
  manageBankFeedsLink,
  onCreditCardLinkedAccountChange,
  onDeleteBankFeedAccountClick,
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
    <div className={styles.emptyCreditCardsPageState}>
      <NoResultPageState
        title="Get a feed of your credit card transactions, straight from your bank"
        description="It'll speed up your transaction entry, and make bank reconciliation a breeze"
        actions={emptyViewActions}
        showNoResultImage={false}
      />
    </div>
  );

  return (
    <TableView
      responsiveWidths={getCreditCardsTableResponsiveConfig(tableConfig)}
      header={<CreditCardsTableHeader tableConfig={tableConfig} />}
      isEmpty={isCreditCardsEmpty}
      emptyView={emptyView}
    >
      <CreditCardsTableBody
        tableConfig={tableConfig}
        onCreditCardLinkedAccountChange={onCreditCardLinkedAccountChange}
        onDeleteBankFeedAccountClick={onDeleteBankFeedAccountClick}
      />
    </TableView>
  );
};

const mapStateToProps = state => ({
  isCreditCardsEmpty: getIsCreditCardsEmpty(state),
  manageBankFeedsLink: getCreateBankFeedsUrl(state),
});

export default connect(mapStateToProps)(CreditCardsTable);
