import {
  Button, Icons, PageState, Table, Tooltip,
} from '@myob/myob-widgets';
import React from 'react';

import AmountInput from '../../../components/autoFormatter/AmountInput/AmountInput';
import Combobox from '../../../components/Feelix/ComboBox/Combobox';
import styles from './PayrollLeaveDetailTable.module.css';

const tableConfig = {
  name: { width: 'flex-1', valign: 'middle' },
  carryOver: { width: 'flex-1', valign: 'middle', align: 'right' },
  yearToDate: { width: 'flex-1', valign: 'middle', align: 'right' },
  total: { width: 'flex-1', valign: 'middle', align: 'right' },
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

const handleInputChange = (handler, payItemId) => (e) => {
  const { value } = e.target;
  handler({ payItemId, value });
};

const PayrollLeaveDetailTable = ({
  selected = [],
  items = [],
  onAddAllocatedLeaveItem,
  onRemoveAllocatedLeaveItem,
  onUpdateCarryOver,
}) => {
  const emptyView = (
    <PageState title="You have not allocated any Leave items yet." />
  );
  const tableBodyView = selected.map((payItem) => {
    const {
      payItemId, name, carryOver, yearToDate, total,
    } = payItem;

    return (
      <Table.Row key={payItemId}>
        <Table.RowItem {...tableConfig.name}>{name}</Table.RowItem>
        <Table.RowItem {...tableConfig.carryOver}>
          <AmountInput
            name="carryOver"
            label="Carry Over"
            hideLabel
            textAlign="right"
            value={carryOver}
            onChange={handleInputChange(onUpdateCarryOver, payItemId)}
            numeralIntegerScale={29}
            decimalScale={30}
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
          { selected.length ? tableBodyView : emptyView}
        </Table.Body>
      </Table>
      <div className={styles.addCombobox}>
        <Combobox
          label="Add Leave pay item"
          hideLabel
          hintText="Add Leave pay item"
          metaData={comboboxMetaData}
          items={items}
          selected={{}}
          onChange={handleComboboxChange(onAddAllocatedLeaveItem)}
        />
      </div>
    </div>
  );
};

export default PayrollLeaveDetailTable;
