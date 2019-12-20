import {
  Button, Combobox, FieldGroup, Icons, PageState, Table, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAllocatedPayItems, getFilteredSuperPayItemOptions } from '../../selectors/PayrollSuperSelectors';
import styles from './PayrollDetailSuperannuationTable.module.css';

const tableConfig = {
  name: { width: 'flex-1', valign: 'middle' },
  displayType: { width: 'flex-1', valign: 'middle' },
  actions: { width: '5rem', valign: 'middle', align: 'right' },
};

const comboboxMetaData = [{ columnName: 'name', showData: true }];

const handleComboboxChange = handler => (item) => {
  handler(item);
};

const onRemoveButtonClick = (handler, id) => () => {
  handler(id);
};

const onPayItemSelect = (handler, id) => () => {
  handler(id);
};

const PayrollDetailSuperannuationTable = ({
  allocatedPayItems = [],
  superPayItemsOptions = [],
  onAddPayrollSuperPayItem,
  onRemovePayrollSuperPayItem,
  onOpenSuperPayItemModal,
}) => {
  const superPayItemsFieldGroupLabel = (
    <div>
      <span>Allocated super pay items&nbsp;</span>
      <Tooltip triggerContent={<Icons.Info />} placement="right">
        Add all the relevant super pay items for this employee
      </Tooltip>
    </div>
  );

  const emptyView = (
    <PageState title="You have not added any super pay items yet." />
  );

  const tableBodyView = allocatedPayItems.map(({ id, name, displayType }) => (
    <Table.Row key={id}>
      <Table.RowItem {...tableConfig.name}>
        <Button type="link" onClick={onPayItemSelect(onOpenSuperPayItemModal, id)}>{name}</Button>
      </Table.RowItem>
      <Table.RowItem {...tableConfig.displayType}>{displayType}</Table.RowItem>
      <Table.RowItem cellRole="actions" {...tableConfig.actions}>
        <Tooltip triggerContent={(
          <Button type="secondary" size="xs" onClick={onRemoveButtonClick(onRemovePayrollSuperPayItem, id)}>
            <Icons.Remove />
          </Button>
        )}
        >
          Remove from employee
        </Tooltip>
      </Table.RowItem>
    </Table.Row>
  ));

  const payItemCombobox = (
    <Combobox
      label="Add superannuation pay item"
      hideLabel
      hintText="Add superannuation pay item"
      metaData={comboboxMetaData}
      items={superPayItemsOptions}
      selected={{}}
      onChange={handleComboboxChange(onAddPayrollSuperPayItem)}
      addNewItem={{
        label: 'Create super pay item',
        onAddNew: onPayItemSelect(onOpenSuperPayItemModal, 'new'),
      }}
      width="lg"
    />
  );

  return (
    <FieldGroup label={superPayItemsFieldGroupLabel}>
      <div className={styles.editableTable}>
        <Table hasActions>
          <Table.Header>
            <Table.HeaderItem {...tableConfig.name}>Name</Table.HeaderItem>
            <Table.HeaderItem {...tableConfig.displayType}>
              Type
            </Table.HeaderItem>
            <Table.HeaderItem {...tableConfig.actions} />
          </Table.Header>
          <Table.Body>
            {allocatedPayItems.length ? tableBodyView : emptyView}
          </Table.Body>
        </Table>
        {payItemCombobox}
      </div>
    </FieldGroup>
  );
};

const mapStateToProps = state => ({
  allocatedPayItems: getAllocatedPayItems(state),
  superPayItemsOptions: getFilteredSuperPayItemOptions(state),
});

export default connect(mapStateToProps)(PayrollDetailSuperannuationTable);
