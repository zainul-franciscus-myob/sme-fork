import React, { Component } from 'react';
import { Table, StandardTemplate } from '@myob/myob-widgets';
import './BankingView.css';

class BankingView extends Component {
  render() {
    return (
      <div className="BankingView container">
        <StandardTemplate pageHead='Bank transactions'>
          <Table>
            <Table.Header>
              <Table.HeaderItem width="96px">Date</Table.HeaderItem>
              <Table.HeaderItem width="102px">Account</Table.HeaderItem>
              <Table.HeaderItem width="flex-1">Descriptions</Table.HeaderItem>
              <Table.HeaderItem width="124px" align="right">Withdrawal ($)</Table.HeaderItem>
              <Table.HeaderItem width="124px" align="right">Deposit ($)</Table.HeaderItem>
            </Table.Header>
            <Table.Body>
              {this.props.transactions.map((transaction) => (
                <Table.Row key={transaction.id}>
                  <Table.RowItem valign="top" width="96px">{transaction.displayDate}</Table.RowItem>
                  <Table.RowItem valign="top" width="102px">{transaction.sourceAccount}</Table.RowItem>
                  <Table.RowItem valign="top" width="flex-1">{transaction.description}</Table.RowItem>
                  <Table.RowItem valign="top" width="124px" align="right">{transaction.withdrawalDisplayAmount}</Table.RowItem>
                  <Table.RowItem valign="top" width="124px" align="right">{transaction.depositDisplayAmount}</Table.RowItem>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </StandardTemplate>
      </div>
    );
  }

}

export default BankingView;