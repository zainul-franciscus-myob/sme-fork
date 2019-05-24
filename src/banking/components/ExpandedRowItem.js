import { Table } from '@myob/myob-widgets';
import React from 'react';

import style from './BankingView.css';

const ExpandedRowItem = ({ entry, ...props }) => (
  <Table.RowItem {...props}>
    <div title={entry.allocateOrMatch} className={style.ellipsisText}>
      {entry.allocateOrMatch}
    </div>
  </Table.RowItem>
);

export default ExpandedRowItem;
