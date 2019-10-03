import { Card, Separator } from '@myob/myob-widgets';
import React from 'react';

import LinkBillListOptions from './LinkBillListOptions';
import LinkBillListTable from './LinkBillListTable';

const LinkBillListView = ({
  onUpdateFilterOptions,
  onApplyFilters,
  onSort,
  onBillSelect,
}) => {
  const cardBody = (
    <Card.Body
      child={(
        <>
          <LinkBillListOptions
            onUpdateFilterOptions={onUpdateFilterOptions}
            onApplyFilters={onApplyFilters}
          />
          <Separator />
          <LinkBillListTable
            onSort={onSort}
            onBillSelect={onBillSelect}
          />
        </>
      )}
    />
  );

  return (
    <Card
      body={cardBody}
    />
  );
};

export default LinkBillListView;
