import { Button, Icons, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getExemptionPayItems } from '../../selectors/ExpensePayItemModalSelectors';

const onButtonClick = (handler, id) => () => {
  handler(id);
};

const tableConfig = {
  name: {
    width: 'flex-1',
    valign: 'middle',
  },
  type: {
    width: 'flex-1',
    valign: 'middle',
  },
  actions: {
    width: '5rem',
    valign: 'middle',
    align: 'right',
  },
};

const ExemptionsTable = ({ exemptionPayItems, onRemoveExemptionPayItem }) => {
  const rows = exemptionPayItems.map(({ id, name, mappedType }) => (
    <Table.Row key={id}>
      <Table.RowItem {...tableConfig.name}>{name}</Table.RowItem>
      <Table.RowItem {...tableConfig.type}>{mappedType}</Table.RowItem>
      <Table.RowItem {...tableConfig.actions} cellRole="actions">
        <Button
          type="secondary"
          size="xs"
          onClick={onButtonClick(onRemoveExemptionPayItem, id)}
        >
          <Icons.Remove />
        </Button>
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
  exemptionPayItems: getExemptionPayItems(state),
});

export default connect(mapStateToProps)(ExemptionsTable);
