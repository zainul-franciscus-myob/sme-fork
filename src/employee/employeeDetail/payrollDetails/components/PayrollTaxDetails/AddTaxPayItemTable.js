import {
  Button, Icons, Table, Tooltip,
} from '@myob/myob-widgets';
import React from 'react';

import Combobox from '../../../../../components/Feelix/ComboBox/Combobox';
import styles from './AddTaxPayItemTable.module.css';

const tableConfig = {
  name: { width: 'flex-1', valign: 'middle' },
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

const AddTaxPayItemTable = ({
  label = 'Add pay item',
  selected = [],
  items = [],
  onAddPayItem,
  onRemovePayItem,
  onTaxPayItemClick,
}) => (
  <div className={styles.editableTable}>
    <Table hasActions>
      <Table.Header>
        <Table.HeaderItem {...tableConfig.name}>Name</Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.actions} />
      </Table.Header>
      <Table.Body>
        {
          selected.map(({ id, name }) => (
            <Table.Row key={id}>
              <Table.RowItem {...tableConfig.name}>
                <Button type="link" onClick={onTaxPayItemClick}>
                  {name}
                </Button>
              </Table.RowItem>
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
          ))
        }
      </Table.Body>
    </Table>
    { items.length > 0
      && (
      <div className={styles.addCombobox}>
        <Combobox
          label={label}
          hideLabel
          hintText={label}
          metaData={comboboxMetaData}
          selected={{}}
          items={items}
          onChange={handleComboboxChange(onAddPayItem)}
        />
      </div>
      )
    }
  </div>
);

export default AddTaxPayItemTable;
