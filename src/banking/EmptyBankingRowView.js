import React, {Component} from 'react';
import {Table} from '@myob/myob-widgets';

class EmptyBankingRowView extends Component {
  render() {
    return (
      <Table.Row>
        <Table.RowItem valign="top" align="center" width="flex-1">There are no transactions to display</Table.RowItem>
      </Table.Row>
    )
  }
}

export default EmptyBankingRowView;
