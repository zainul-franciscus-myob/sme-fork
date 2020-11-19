import { Table } from '@myob/myob-widgets';
import React from 'react';

import AddHolidayOrLeaveRow from './AddHolidaysOrLeaveRow';

const HolidaysAndLeaveRows = ({
  name,
  title,
  tableConfig,
  onAddHolidayAndLeaveClick,
}) => {
  const headerRow = (
    <Table.Row key={name}>
      <Table.RowItem cellRole="heading">{title}</Table.RowItem>
    </Table.Row>
  );

  const tableRows = (
    <>
      {headerRow}
      <AddHolidayOrLeaveRow
        tableConfig={tableConfig}
        onAddHolidayAndLeaveClick={onAddHolidayAndLeaveClick}
      />
    </>
  );

  return tableRows;
};

export default HolidaysAndLeaveRows;
