import { Button, Table } from '@myob/myob-widgets';
import React from 'react';

import style from './BankingView.css';

const SplitRowItem = ({ entry, onClick, ...props }) => (
  <Table.RowItem {...props}>
    <div className={style.splitButton}>
      <Button type="link" onClick={onClick}>{entry.allocateOrMatch}</Button>
    </div>
  </Table.RowItem>
);

export default SplitRowItem;
