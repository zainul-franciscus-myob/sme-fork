import { Table } from '@myob/myob-widgets';
import React from 'react';

const StickyTableHeader = ({ children }) => (
  <div className="flx-card flx-card__table--sticky">
    <div className="flx-card__body">
      <Table>
        <Table.Header>{children}</Table.Header>
      </Table>
    </div>
  </div>
);

export default StickyTableHeader;
