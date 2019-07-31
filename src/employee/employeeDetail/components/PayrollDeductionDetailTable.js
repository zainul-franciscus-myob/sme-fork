import {
  Button, Icons, PageState, Table, Tooltip,
} from '@myob/myob-widgets';
import React from 'react';

import Combobox from '../../../components/Feelix/ComboBox/Combobox';
import styles from './PayrollDeductionDetailTable.module.css';

const tableConfig = {
  name: { width: 'flex-1', valign: 'middle' },
  type: { width: 'flex-1', valign: 'middle' },
  actions: { width: '5rem', valign: 'middle', align: 'right' },
};

const comboboxMetaData = [
  { columnName: 'name', showData: true },
];

const handleComboboxChange = handler => (item) => {
  handler(item);
};

const onRemoveButtonClick = (handler, id) => () => {
  handler(id);
};

const PayrollDeductionDetailTable = ({
  selected = [],
  items = [],
  onAddPayItem,
  onRemovePayItem,
}) => {
  const emptyView = (
    <PageState title="You have not added any deduction pay items yet." />
  );

  const tableBodyView = selected.map(({ id, name, displayType }) => (
    <Table.Row key={id}>
      <Table.RowItem {...tableConfig.name}>{name}</Table.RowItem>
      <Table.RowItem {...tableConfig.type}>{displayType}</Table.RowItem>
      <Table.RowItem cellRole="actions" {...tableConfig.actions}>
        <Tooltip triggerContent={(
          <Button type="secondary" size="xs" onClick={onRemoveButtonClick(onRemovePayItem, id)}>
            <Icons.Remove />
          </Button>
        )}
        >
          Remove from employee
        </Tooltip>
      </Table.RowItem>
    </Table.Row>
  ));

  return (
    <div className={styles.editableTable}>
      <Table hasActions>
        <Table.Header>
          <Table.HeaderItem {...tableConfig.name}>Name</Table.HeaderItem>
          <Table.HeaderItem {...tableConfig.type}>Type</Table.HeaderItem>
          <Table.HeaderItem {...tableConfig.actions} />
        </Table.Header>
        <Table.Body>
          { selected.length ? tableBodyView : emptyView}
        </Table.Body>
      </Table>
      <div className={styles.addCombobox}>
        <Combobox
          label="Add deduction pay item"
          hideLabel
          hintText="Add deduction pay item"
          metaData={comboboxMetaData}
          items={items}
          onChange={handleComboboxChange(onAddPayItem)}
        />
      </div>
    </div>
  );
};

export default PayrollDeductionDetailTable;
