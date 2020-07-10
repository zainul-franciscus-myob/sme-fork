import { Button, Icons, Table, Tooltip } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getSuperPayItemExemptions } from '../superPayItemSelectors';

const onButtonClick = (handler, id) => () => {
  handler(id);
};

const SuperPayItemExemptionsTable = (props) => {
  const { exemptions, onRemoveSuperPayItemExemption } = props;

  const tableConfig = {
    name: { width: 'flex-1', valign: 'middle' },
    type: { width: 'flex-1', valign: 'middle' },
    actions: { width: '5rem', valign: 'middle', align: 'right' },
  };

  const rows = exemptions.map(({ id, name, type }) => (
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
              onClick={onButtonClick(onRemoveSuperPayItemExemption, id)}
            >
              <Icons.Remove />
            </Button>
          }
        >
          Remove pay item
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
  exemptions: getSuperPayItemExemptions(state),
});

export default connect(mapStateToProps)(SuperPayItemExemptionsTable);
