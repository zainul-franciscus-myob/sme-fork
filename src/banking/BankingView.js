import React, { Component } from 'react';
import { StandardTemplate, Table } from '@myob/myob-widgets';
import './BankingView.css';

class BankingView extends Component {
  render() {
    const tableConfig = {
      date: { width: '96px', valign: 'top'},
      account: { width: '102px', valign: 'top'},
      description: { width: 'flex-1', valign: 'top'},
      withdrawal: { width: '124px', valign: 'top', align: 'right'},
      deposit: { width: '124px', valign: 'top', align: 'right'},
      allocatedAccount: { width: '268px', valign: 'top' }
    };
    return (
      <div className="banking-transactions container">
        <StandardTemplate pageHead='Bank transactions'>
          <Table>
            <Table.Header>
              <Table.HeaderItem {...tableConfig.date} >Date</Table.HeaderItem>
              <Table.HeaderItem {...tableConfig.account} >Account</Table.HeaderItem>
              <Table.HeaderItem {...tableConfig.description} >Description</Table.HeaderItem>
              <Table.HeaderItem {...tableConfig.withdrawal} >Withdrawal ($)</Table.HeaderItem>
              <Table.HeaderItem {...tableConfig.deposit} >Deposit ($)</Table.HeaderItem>
              <Table.HeaderItem {...tableConfig.allocatedAccount} >Allocate or Match</Table.HeaderItem>
            </Table.Header>
            <Table.Body>
              {this.props.renderRows(tableConfig)}
            </Table.Body>
          </Table>
        </StandardTemplate>
      </div>
    );
  }

}

export default BankingView;
