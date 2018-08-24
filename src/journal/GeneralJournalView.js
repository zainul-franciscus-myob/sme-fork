import React, {Component} from 'react';
import {StandardTemplate, Table} from '@myob/myob-widgets';
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
          <div className="general-journal-view__list">
          <Table>
            <Table.Header>
              <Table.HeaderItem {...tableConfig.date}>Date </Table.HeaderItem>
              <Table.HeaderItem {...tableConfig.referenceId}>Reference </Table.HeaderItem>
              <Table.HeaderItem {...tableConfig.description}>Description </Table.HeaderItem>
              <Table.HeaderItem {...tableConfig.displayAmount}>Amount ($)</Table.HeaderItem>
            </Table.Header>
            <Table.Body>
              {this.props.renderRows(tableConfig)}
            </Table.Body>
          </Table>
          {this.props.isEmpty && <div className="general-journal-view__empty">There are no general journal entries for this period.</div>}
          </div>
        </StandardTemplate>
      </div>
    );
  }

}

export default GeneralJournalView;
