import { Button, Icons, Table } from '@myob/myob-widgets';
import React from 'react';

const AddHolidayOrLeaveRow = ({ tableConfig, onAddHolidayAndLeaveClick }) => {
  const row = (
    <Table.Row key="Add holidays or leave">
      <Table.RowItem {...tableConfig.name} indentLevel={1}>
        <Button
          key="Add holidays or leave"
          type="link"
          icon={<Icons.Add />}
          onClick={onAddHolidayAndLeaveClick}
        >
          Add holidays or leave
        </Button>
      </Table.RowItem>
    </Table.Row>
  );

  return row;
};

export default AddHolidayOrLeaveRow;
