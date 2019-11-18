import { Card, Icons } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getCreateBankFeedsUrl, getLearnMoreBankFeedsLink } from '../BankFeedsSelectors';
import { tableConfig } from './BankAccountsTable';
import BankAccountsTableHeader from './BankAccountsTableHeader';
import LinkButton from '../../components/Button/LinkButton';
import NoResultPageState from '../../components/NoResultPageState/NoResultPageState';
import TableView from '../../components/TableView/TableView';
import getBankAccountsTableResponsiveConfig from './getBankAccountsTableResponsiveConfig';

const BankFeedsEmptyView = ({
  learnMoreBankFeedsLink,
  manageBankFeedsLink,
}) => {
  const emptyViewActions = [
    <LinkButton
      key={1}
      type="link"
      icon={<Icons.Info />}
      href={learnMoreBankFeedsLink}
      isOpenInNewTab
    >
      Learn more
    </LinkButton>,
    <LinkButton
      key={2}
      type="link"
      icon={<Icons.Add />}
      href={manageBankFeedsLink}
      isOpenInNewTab
    >
    Create bank feed
    </LinkButton>,
  ];

  const emptyView = (
    <NoResultPageState
      title="Get a feed of all your transactions, straight from your bank"
      description="It'll speed up your transaction entry, and make bank reconciliation a breeze"
      actions={emptyViewActions}
      showNoResultImage={false}
    />
  );

  const emptyViewHeader = (
    <BankAccountsTableHeader tableConfig={tableConfig} />
  );

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

const mapStateToProps = state => ({
  manageBankFeedsLink: getCreateBankFeedsUrl(state),
  learnMoreBankFeedsLink: getLearnMoreBankFeedsLink(state),
});

export default connect(mapStateToProps)(BankFeedsEmptyView);
