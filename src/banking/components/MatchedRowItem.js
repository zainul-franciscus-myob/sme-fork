import { Button, Table } from '@myob/myob-widgets';
import React from 'react';

const MatchedRowItem = ({ entry, ...props }) => (
  <Table.RowItem {...props}>
    <Button type="link" onClick={() => {}}>{entry.matchedDisplayText}</Button>
  </Table.RowItem>
);

export default MatchedRowItem;
