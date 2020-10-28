import { Button, Combobox, Icons, Table, Tooltip } from '@myob/myob-widgets';
import React from 'react';

import styles from './PayrollExpenseDetailsTable.module.css';

const tableConfig = {
  name: { columnName: 'Name', width: 'flex-1', valign: 'middle' },
  type: { columnName: 'Type', width: 'flex-1', valign: 'middle' },
  actions: { width: '5rem', valign: 'middle', align: 'right' },
};

const comboboxMetaData = [{ columnName: 'name', showData: true }];

const handleComboboxChange = (handler) => (item) => {
  handler(item);
};

const onPayItemSelect = (handler, id) => () => {
  handler(id);
};

const PayrollExpenseDetailsTable = ({
  selected = [],
  items = [],
  onAddPayItem,
  onRemovePayItem,
  onOpenExpensePayItemModal,
  showAddPayItemButton,
  onAddPayItemComboBlur,
  onAddPayItemComboClick,
}) => {
  const tableBodyView = selected.map(({ id, name, displayType }) => (
    <Table.Row key={id}>
      <Table.RowItem {...tableConfig.name}>
        <Button
          type="link"
          onClick={onPayItemSelect(onOpenExpensePayItemModal, id)}
        >
          {name}
        </Button>
      </Table.RowItem>
      <Table.RowItem {...tableConfig.type}>{displayType}</Table.RowItem>
      <Table.RowItem cellRole="actions" {...tableConfig.actions}>
        <Tooltip
          placement="left"
          triggerContent={
            <Button
              type="secondary"
              size="xs"
              onClick={onPayItemSelect(onRemovePayItem, id)}
            >
              <Icons.Remove />
            </Button>
          }
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
        <Table.Body>{tableBodyView}</Table.Body>
      </Table>
      {showAddPayItemButton ? (
        <Button
          type="link"
          icon={<Icons.Add />}
          onClick={onAddPayItemComboClick}
        >
          Add expense pay item
        </Button>
      ) : (
        <Combobox
          label="Add expense pay item"
          hideLabel
          hintText="Add expense pay item"
          metaData={comboboxMetaData}
          items={items}
          defaultIsOpen
          selected={{}}
          onBlur={onAddPayItemComboBlur}
          onInputChange={() => {}}
          onChange={handleComboboxChange(onAddPayItem)}
          addNewItem={{
            label: 'Create expense pay item',
            onAddNew: onPayItemSelect(onOpenExpensePayItemModal, 'new'),
          }}
          width="lg"
        />
      )}
    </div>
  );
};

export default PayrollExpenseDetailsTable;
