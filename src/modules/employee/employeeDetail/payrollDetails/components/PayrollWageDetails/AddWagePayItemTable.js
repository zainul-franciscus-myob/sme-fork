import {
  Button, Icons, Table, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getFilteredWagePayItemOptions, getSelectedWagePayItems, getShowAddWagePayItemButton } from '../../selectors/PayrollWageSelectors';
import Combobox from '../../../../../../components/Feelix/Combobox/Combobox';
import styles from './AddWagePayItemTable.module.css';

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

const onPayItemSelect = (handler, id) => () => {
  handler(id);
};

const addWagePayItemLabel = 'Add wage pay item';

const getActionsColumnContent = ({
  id, tooltipText, isRemovable, onRemoveWagePayItem,
}) => (isRemovable
  ? (
    <Tooltip triggerContent={(
      <Button type="secondary" size="xs" onClick={onRemoveButtonClick(onRemoveWagePayItem, id)}>
        <Icons.Remove />
      </Button>
        )}
    >
      Remove from employee
    </Tooltip>
  )
  : (
    <Tooltip
      className={styles.payItemInfoTooltip}
      triggerContent={(
        <Icons.Info />
        )}
    >
      {tooltipText}
    </Tooltip>
  ));

const AddWagePayItemTable = ({
  filteredWagePayItemOptions,
  selectedWagePayItems,
  onAddWagePayItem,
  onRemoveWagePayItem,
  onOpenWagePayItemModal,
  showAddWagePayItemButton,
  onAddWagePayItemButtonClick,
}) => (
  <div className={styles.editableTable}>
    <Table hasActions>
      <Table.Header>
        <Table.HeaderItem {...tableConfig.name}>Name</Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.type}>Type</Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.actions} />
      </Table.Header>
      <Table.Body>
        {
          selectedWagePayItems.map(({
            id, name, displayType, isRemovable, tooltipText,
          }) => (
            <Table.Row key={id}>
              <Table.RowItem {...tableConfig.name}>
                <Button type="link" onClick={onPayItemSelect(onOpenWagePayItemModal, id)}>{name}</Button>
              </Table.RowItem>
              <Table.RowItem {...tableConfig.type}>{displayType}</Table.RowItem>
              <Table.RowItem cellRole="actions" {...tableConfig.actions}>
                {getActionsColumnContent({
                  isRemovable, tooltipText, id, onRemoveWagePayItem,
                }) }
              </Table.RowItem>
            </Table.Row>
          ))
        }
      </Table.Body>
    </Table>
    { filteredWagePayItemOptions.length > 0
      && (
        showAddWagePayItemButton
          ? (
            <Button type="link" icon={<Icons.Add />} onClick={onAddWagePayItemButtonClick}>
          Add wage pay item
            </Button>
          )
          : (
            <Combobox
              label={addWagePayItemLabel}
              hideLabel
              hintText={addWagePayItemLabel}
              metaData={comboboxMetaData}
              selected={{}}
              items={filteredWagePayItemOptions}
              onChange={handleComboboxChange(onAddWagePayItem)}
              initialIsOpen
              addNewItem={{
                label: 'Create wage pay item',
                onAddNew: onPayItemSelect(onOpenWagePayItemModal, 'new'),
              }}
              width="lg"
            />
          )
      )
    }
  </div>
);

const mapStateToProps = state => ({
  filteredWagePayItemOptions: getFilteredWagePayItemOptions(state),
  selectedWagePayItems: getSelectedWagePayItems(state),
  showAddWagePayItemButton: getShowAddWagePayItemButton(state),
});

export default connect(mapStateToProps)(AddWagePayItemTable);
