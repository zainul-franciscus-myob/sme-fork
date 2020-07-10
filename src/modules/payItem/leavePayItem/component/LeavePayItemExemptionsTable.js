import { Button, Icons, Table, Tooltip } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getSelectedExemptions } from '../leavePayItemSelectors';

const onButtonClick = (handler, id) => () => {
  handler(id);
};

const LeavePayItemExemptionsTable = ({
  selectedExemptions,
  onRemoveExemption,
}) => {
  const tableConfig = {
    name: { width: 'flex-1', valign: 'middle' },
    type: { width: 'flex-1', valign: 'middle' },
    actions: { width: '5rem', valign: 'middle', align: 'right' },
  };

  const rows = selectedExemptions.map(({ id, name, type }) => (
    <Table.Row key={id}>
      <Table.RowItem {...tableConfig.name}>{name}</Table.RowItem>
      <Table.RowItem {...tableConfig.type}>{type}</Table.RowItem>
      <Table.RowItem cellRole="actions" {...tableConfig.actions}>
        <Tooltip
          placement="left"
          triggerContent={
            <Button
              type="secondary"
              size="xs"
              onClick={onButtonClick(onRemoveExemption, id)}
            >
              <Icons.Remove />
            </Button>
          }
        >
          Remove exemption
        </Tooltip>
      </Table.RowItem>
    </Table.Row>
  ));

  return (
    <Table hasActions>
      <Table.Header>
        <Table.HeaderItem {...tableConfig.name}>Name</Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.type}>Type</Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.actions} />
      </Table.Header>
      <Table.Body>{rows}</Table.Body>
    </Table>
  );
};

const mapStateToProps = (state) => ({
  selectedExemptions: getSelectedExemptions(state),
});

export default connect(mapStateToProps)(LeavePayItemExemptionsTable);
