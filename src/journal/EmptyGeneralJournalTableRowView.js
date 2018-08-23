import React, {Component} from 'react';
import { Table } from '@myob/myob-widgets';

class EmptyGeneralJournalTableRowView extends Component {
  render() {
    return (
      <div className="table-empty-list-state">
        There are no general journal entries for this period.
      </div>
    )
  }
}

export default EmptyGeneralJournalTableRowView;
