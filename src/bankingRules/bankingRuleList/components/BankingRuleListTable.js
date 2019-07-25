import {
  HeaderSort,
  PageState,
  Spinner,
  Table,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsStatusDisplayed,
  getIsTableEmpty,
  getIsTableLoading,
  getOrder,
} from '../BankingRuleListSelectors';
import BankingRuleListTableBody from './BankingRuleListTableBody';

const emptyView = (
  <PageState
    title="Set up bank feed rules"
    description={(
      <p>
        Create rules to automatically match bank transactions to your bills,
        invoices and other transactions
      </p>
    )}
  />
);

const spinnerView = (
  <PageState
    title="Loading"
    description={<Spinner size="medium" />}
  />
);

const tableConfig = {
  ruleName: { width: 'flex-1' },
  status: { width: '10.8rem' },
  bankAccount: { width: '35.2rem' },
  transactionType: { width: '16.8rem' },
};

const BankingRuleListTable = ({
  isTableEmpty,
  isStatusDisplayed,
  isTableLoading,
  onSort,
  order,
}) => {
  let view;
  if (isTableLoading) {
    view = spinnerView;
  } else if (isTableEmpty) {
    view = emptyView;
  } else {
    view = <BankingRuleListTableBody tableConfig={tableConfig} />;
  }

  return (
    <Table>
      <Table.Header>
        <Table.HeaderItem {...tableConfig.ruleName}>
          <HeaderSort title="Rule name" sortName="Name" activeSort={order} onSort={onSort} />
        </Table.HeaderItem>
        { isStatusDisplayed
          && (
          <Table.HeaderItem {...tableConfig.status}>
            <HeaderSort title="Status" sortName="IsActive" activeSort={order} onSort={onSort} />
          </Table.HeaderItem>
          )
        }
        <Table.HeaderItem {...tableConfig.bankAccount}>
          <HeaderSort title="Bank account" sortName="AccountName" activeSort={order} onSort={onSort} />
        </Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.transactionType}>
          <HeaderSort title="Transaction type" sortName="RuleType" activeSort={order} onSort={onSort} />
        </Table.HeaderItem>
      </Table.Header>
      {view}
    </Table>
  );
};

const mapStateToProps = state => ({
  order: getOrder(state),
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
  isStatusDisplayed: getIsStatusDisplayed(state),
});

export default connect(mapStateToProps)(BankingRuleListTable);
