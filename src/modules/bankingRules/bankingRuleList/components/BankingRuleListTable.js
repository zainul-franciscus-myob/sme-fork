import { HeaderSort, PageState, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsFilterStateChanged,
  getIsStatusDisplayed,
  getIsTableEmpty,
  getIsTableLoading,
  getOrder,
} from '../BankingRuleListSelectors';
import BankingRuleListTableBody from './BankingRuleListTableBody';
import NoResultPageState from '../../../../components/NoResultPageState/NoResultPageState';
import TableView from '../../../../components/TableView/TableView';

const emptyView = (isFilterSateChanged) =>
  isFilterSateChanged ? (
    <NoResultPageState
      title="No results found :("
      description="Perhaps check spelling or remove filters and try again"
    />
  ) : (
    <PageState
      title="Set up bank feed rules"
      description={
        <p>
          Create rules to automatically match bank transactions to your bills,
          invoices and other transactions
        </p>
      }
    />
  );

const tableConfig = {
  ruleName: { width: 'flex-1' },
  status: { width: '10.8rem' },
  bankAccount: { width: '35.2rem' },
  transactionType: { width: '16.8rem' },
  ruleIntent: { width: '16.8rem' },
};

const BankingRuleListTable = ({
  isTableEmpty,
  isStatusDisplayed,
  isTableLoading,
  onSort,
  order,
  isFilterStateChanged,
}) => {
  const header = (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.ruleName}>
        <HeaderSort
          title="Rule name"
          sortName="Name"
          activeSort={order}
          onSort={onSort}
        />
      </Table.HeaderItem>
      {isStatusDisplayed && (
        <Table.HeaderItem {...tableConfig.status}>
          <HeaderSort
            title="Status"
            sortName="IsActive"
            activeSort={order}
            onSort={onSort}
          />
        </Table.HeaderItem>
      )}
      <Table.HeaderItem {...tableConfig.bankAccount}>
        <HeaderSort
          title="Bank account"
          sortName="AccountName"
          activeSort={order}
          onSort={onSort}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.transactionType}>
        <HeaderSort
          title="Transaction type"
          sortName="RuleType"
          activeSort={order}
          onSort={onSort}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.ruleIntent}>
        <HeaderSort
          title="Rule type"
          sortName="IsAutomated"
          activeSort={order}
          onSort={onSort}
        />
      </Table.HeaderItem>
    </Table.Header>
  );

  return (
    <TableView
      isLoading={isTableLoading}
      isEmpty={isTableEmpty}
      emptyView={emptyView(isFilterStateChanged)}
      header={header}
    >
      <BankingRuleListTableBody tableConfig={tableConfig} />
    </TableView>
  );
};

const mapStateToProps = (state) => ({
  order: getOrder(state),
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
  isStatusDisplayed: getIsStatusDisplayed(state),
  isFilterStateChanged: getIsFilterStateChanged(state),
});

export default connect(mapStateToProps)(BankingRuleListTable);
