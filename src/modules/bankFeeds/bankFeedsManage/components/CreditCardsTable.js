import { AddIcon, Button } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsCreditCardsEmpty,
  getIsTableLoading,
} from '../BankFeedsSelectors';
import CreditCardsTableBody from './CreditCardsTableBody';
import CreditCardsTableHeader from './CreditCardsTableHeader';
import NoResultPageState from '../../../../components/NoResultPageState/NoResultPageState';
import TableView from '../../../../components/TableView/TableView';
import getCreditCardsTableResponsiveConfig from './getCreditCardsTableResponsiveConfig';
import styles from './CreditCardsTable.module.css';

const tableConfig = {
  financialInstitution: {
    columnName: 'Financial institution',
    styles: { valign: 'middle' },
  },
  cardName: { columnName: 'Card name', styles: { valign: 'middle' } },
  cardNumber: { columnName: 'Card number', styles: { valign: 'middle' } },
  linkedAccount: {
    columnName: 'Linked account',
    styles: { valign: 'middle', textWrap: 'wrap' },
  },
  status: { columnName: 'Status', styles: { valign: 'middle' } },
  removeButton: { styles: { width: '3.6rem', valign: 'middle' } },
};

const CreditCardsTable = ({
  isCreditCardsEmpty,
  isTableLoading,
  onCreditCardLinkedAccountChange,
  onCreateBankFeedButtonClick,
  onDeleteBankFeedAccountClick,
}) => {
  const emptyViewActions = [
    <Button
      type="link"
      icon={<AddIcon />}
      onClick={onCreateBankFeedButtonClick}
    >
      Create bank feed
    </Button>,
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
      isLoading={isTableLoading}
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

const mapStateToProps = (state) => ({
  isCreditCardsEmpty: getIsCreditCardsEmpty(state),
  isTableLoading: getIsTableLoading(state),
});

export default connect(mapStateToProps)(CreditCardsTable);
