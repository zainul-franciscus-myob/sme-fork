import { Button, Combobox, Icons, Table, Tooltip } from '@myob/myob-widgets';
import React from 'react';

import styles from './PayrollDeductionDetailsTable.module.css';

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

const PayrollDeductionDetailsTable = ({
  selected = [],
  items = [],
  onAddPayItem,
  onRemovePayItem,
  onOpenDeductionPayItemModal,
  showAddPayItemButton,
  onAddPayItemComboClick,
  onAddPayItemComboBlur,
}) => {
  const tableBodyView = selected.map(({ id, name, displayType }) => (
    <Table.Row key={id}>
      <Table.RowItem {...tableConfig.name}>
        <Button
          type="link"
          onClick={onPayItemSelect(onOpenDeductionPayItemModal, id)}
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
          Add deduction pay item
        </Button>
      ) : (
        <Combobox
          label="Add deduction pay item"
          hideLabel
          hintText="Add deduction pay item"
          metaData={comboboxMetaData}
          items={items}
          selected={{}}
          onBlur={onAddPayItemComboBlur}
          onChange={handleComboboxChange(onAddPayItem)}
          onInputChange={() => {}}
          defaultIsOpen
          addNewItem={{
            label: 'Create deduction pay item',
            onAddNew: onPayItemSelect(onOpenDeductionPayItemModal, 'new'),
          }}
          width="lg"
        />
      )}
    </div>
  );
};

export default PayrollDeductionDetailsTable;
