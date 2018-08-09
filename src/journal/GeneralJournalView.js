import React, { Component } from 'react';
import { StandardTemplate, Table } from '@myob/myob-widgets';
import './GeneralJournalView.css';

class GeneralJournalView extends Component {

  render() {
    const tableConfig = {
      date: { width: '96px', valign: 'top'},
      referenceId: { width: '102px', valign: 'top'},
      description: { width: 'flex-1', valign: 'top'},
      displayAmount: { width: '124px', valign: 'top', align: 'right'},
    };

    return (
      <div className="general-journal-view container">
        <StandardTemplate pageHead='General Journal'>
          <Table>
            <Table.Header>
              <Table.HeaderItem {...tableConfig.date}>Date </Table.HeaderItem>
              <Table.HeaderItem {...tableConfig.referenceId}>Reference </Table.HeaderItem>
              <Table.HeaderItem {...tableConfig.description}>Description </Table.HeaderItem>
              <Table.HeaderItem {...tableConfig.displayAmount}>Amount </Table.HeaderItem>
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

export default GeneralJournalView;
