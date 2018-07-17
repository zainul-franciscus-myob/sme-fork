import React, {Component} from 'react';
import {Table} from '@myob/myob-widgets';

class BankingTableRowView extends Component {
  render() {
    const {tableConfig, transactions} = this.props;
    return transactions.map((transaction) => (
      <Table.Row key={transaction.id}>
        <Table.RowItem {...tableConfig.date} >{transaction.displayDate}</Table.RowItem>
        <Table.RowItem {...tableConfig.account} >{transaction.sourceAccount}</Table.RowItem>
        <Table.RowItem {...tableConfig.description} >{transaction.description}</Table.RowItem>
        <Table.RowItem {...tableConfig.withdrawal} >{transaction.withdrawalDisplayAmount}</Table.RowItem>
        <Table.RowItem {...tableConfig.deposit} >{transaction.depositDisplayAmount}</Table.RowItem>
      </Table.Row>
    ))
  }

}

export default BankingTableRowView;