import { Label, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsNoConditionRuleEnabled,
  getIsStatusDisplayed,
  getTableEntries,
} from '../BankingRuleListSelectors';

/* eslint-disable react/no-array-index-key */

const InActiveRow = ({ tableConfig, entry }) => (
  <Table.RowItem {...tableConfig.status}>
    {entry.status && (
      <Label type="boxed" color="light-grey" size="small">
        {entry.status}
      </Label>
    )}
  </Table.RowItem>
);

const BankingRuleTableBody = ({
  tableConfig,
  isStatusDisplayed,
  isNoConditionRuleEnabled,
  entries,
}) => {
  const rows = entries.map((entry, index) => (
    <Table.Row key={index}>
      <Table.RowItem {...tableConfig.ruleName}>
        <a href={entry.link}>{entry.ruleName}</a>
      </Table.RowItem>
      {isStatusDisplayed && (
        <InActiveRow tableConfig={tableConfig} entry={entry} />
      )}
      <Table.RowItem {...tableConfig.bankAccount}>
        {entry.bankAccountName}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.transactionType}>
        {entry.displayTransactionType}
      </Table.RowItem>
      {isNoConditionRuleEnabled && (
        <Table.RowItem {...tableConfig.ruleIntent}>
          {entry.displayRuleIntent}
        </Table.RowItem>
      )}
    </Table.Row>
  ));

  return <Table.Body>{rows}</Table.Body>;
};

const mapStateToProps = (state) => ({
  entries: getTableEntries(state),
  isStatusDisplayed: getIsStatusDisplayed(state),
  isNoConditionRuleEnabled: getIsNoConditionRuleEnabled(state),
});

export default connect(mapStateToProps)(BankingRuleTableBody);
