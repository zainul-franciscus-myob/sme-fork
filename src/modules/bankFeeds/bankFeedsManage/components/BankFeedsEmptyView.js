import { AddIcon, Button, Card, InfoIcon } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getCreateBankFeedsUrl,
  getNewBankFeedsAccess,
} from '../BankFeedsSelectors';
import { tableConfig } from './BankAccountsTable';
import BankAccountsTableHeader from './BankAccountsTableHeader';
import NoResultPageState from '../../../../components/NoResultPageState/NoResultPageState';
import TableView from '../../../../components/TableView/TableView';
import getBankAccountsTableResponsiveConfig from './getBankAccountsTableResponsiveConfig';

const BankFeedsEmptyView = ({
  onCreateBankFeedButtonClick,
  onLearnMoreButtonClick,
}) => {
  const emptyViewActions = [
    <Button type="link" icon={<InfoIcon />} onClick={onLearnMoreButtonClick}>
      Learn More
    </Button>,
    <Button
      type="link"
      icon={<AddIcon />}
      onClick={onCreateBankFeedButtonClick}
    >
      Create bank feed
    </Button>,
  ];

  const emptyView = (
    <NoResultPageState
      title="Get a feed of all your transactions, straight from your bank"
      description="It'll speed up your transaction entry, and make bank reconciliation a breeze"
      actions={emptyViewActions}
      showNoResultImage={false}
    />
  );

  const emptyViewHeader = <BankAccountsTableHeader tableConfig={tableConfig} />;

  return (
    <Card>
      <TableView
        responsiveWidths={getBankAccountsTableResponsiveConfig(tableConfig)}
        header={emptyViewHeader}
        isEmpty
        emptyView={emptyView}
      />
    </Card>
  );
};

const mapStateToProps = (state) => ({
  manageBankFeedsLink: getCreateBankFeedsUrl(state),
  hasAccessToNewBankFeeds: getNewBankFeedsAccess(state),
});

export default connect(mapStateToProps)(BankFeedsEmptyView);
