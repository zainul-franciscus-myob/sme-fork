import { Button, Table } from '@myob/myob-widgets';
import React from 'react';

import style from './BankingView.css';

const MatchedRowItem = ({ entry, ...props }) => (
  <Table.RowItem {...props}>
    <div className={style.buttonLinkWrapper}>
      <Button type="link" onClick={() => {}}>{entry.allocateOrMatch}</Button>
    </div>
  </Table.RowItem>
);

export default MatchedRowItem;
