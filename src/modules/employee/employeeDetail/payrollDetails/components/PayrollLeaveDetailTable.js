import {
  Button, Icons, Table, Tooltip,
} from '@myob/myob-widgets';
import React from 'react';

import AmountInput from '../../../../../components/autoFormatter/AmountInput/AmountInput';
import Combobox from '../../../../../components/Feelix/Combobox/Combobox';
import styles from './PayrollLeaveDetailTable.module.css';

const tableConfig = {
  name: { columnName: 'Name', width: 'flex-1', valign: 'middle' },
  carryOver: {
    columnName: 'Carry over', width: 'flex-1', valign: 'middle', align: 'right',
  },
  yearToDate: {
    columnName: 'Year-to-date', width: 'flex-1', valign: 'middle', align: 'right',
  },
  total: {
    columnName: 'Total', width: 'flex-1', valign: 'middle', align: 'right',
  },
  actions: { width: '5rem', valign: 'middle', align: 'right' },
};

const comboboxMetaData = [
  { columnName: 'name', showData: true },
];

const handleComboboxChange = handler => (item) => {
  handler(item);
};

const onRemoveButtonClick = (handler, payItemId) => () => {
  handler(payItemId);
};

const onPayItemSelect = (handler, id) => () => {
  handler(id);
};

const handleInputChange = (handler, payItemId) => (e) => {
  const { rawValue } = e.target;
  handler({ payItemId, value: rawValue });
};

const PayrollLeaveDetailTable = ({
  selected = [],
  items = [],
  onAddAllocatedLeaveItem,
  onRemoveAllocatedLeaveItem,
  onUpdateCarryOver,
  onOpenLeavePayItemModal,
  showAddPayItemButton,
  onAddPayItemComboBlur,
  onAddPayItemComboClick,
}) => {
  const tableBodyView = selected.map((payItem) => {
    const {
      payItemId, name, carryOver, yearToDate, total,
    } = payItem;

    return (
      <Table.Row key={payItemId}>
        <Table.RowItem {...tableConfig.name}>
          <Button type="link" onClick={onPayItemSelect(onOpenLeavePayItemModal, payItemId)}>{name}</Button>
        </Table.RowItem>
        <Table.RowItem {...tableConfig.carryOver}>
          <AmountInput
            name="carryOver"
            label="Carry Over"
            hideLabel
            textAlign="right"
            value={carryOver}
            onChange={handleInputChange(onUpdateCarryOver, payItemId)}
            numeralIntegerScale={29}
            numeralDecimalScaleMax={30}
          />
        </Table.RowItem>
        <Table.RowItem {...tableConfig.yearToDate}>{yearToDate}</Table.RowItem>
        <Table.RowItem {...tableConfig.total}>{total}</Table.RowItem>
        <Table.RowItem cellRole="actions" {...tableConfig.actions}>
          <Tooltip triggerContent={(
            <Button type="secondary" size="xs" onClick={onRemoveButtonClick(onRemoveAllocatedLeaveItem, payItem)}>
              <Icons.Remove />
            </Button>
          )}
          >
            Remove from employee
          </Tooltip>
        </Table.RowItem>
      </Table.Row>
    );
  });

  return (
    <div className={styles.editableTable}>
      <Table hasActions>
        <Table.Header>
          <Table.HeaderItem {...tableConfig.name}>Name</Table.HeaderItem>
          <Table.HeaderItem {...tableConfig.carryOver}>Carry over</Table.HeaderItem>
          <Table.HeaderItem {...tableConfig.yearToDate}>Year-to-date</Table.HeaderItem>
          <Table.HeaderItem {...tableConfig.total}>Total</Table.HeaderItem>
          <Table.HeaderItem {...tableConfig.actions} />
        </Table.Header>
        <Table.Body>
          {tableBodyView}
        </Table.Body>
      </Table>
      { showAddPayItemButton
        ? (
          <Button type="link" icon={<Icons.Add />} onClick={onAddPayItemComboClick}>
            Add leave pay item
          </Button>
        )
        : (
          <Combobox
            label="Add Leave pay item"
            hideLabel
            hintText="Add Leave pay item"
            metaData={comboboxMetaData}
            items={items}
            selected={{}}
            onChange={handleComboboxChange(onAddAllocatedLeaveItem)}
            initialIsOpen
            onBlur={onAddPayItemComboBlur}
            onInputChange={() => {}}
            addNewItem={{
              label: 'Create leave pay item',
              onAddNew: onPayItemSelect(onOpenLeavePayItemModal, 'new'),
            }}
            width="lg"
          />
        )}
    </div>
  );
};

export default PayrollLeaveDetailTable;
