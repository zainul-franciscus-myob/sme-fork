import {
  Button, FieldGroup, Icons, Table, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getExemptions,
  getFilteredExemptionOptions,
  getIsExemptionDisabled,
} from '../../selectors/SuperPayItemModalSelectors';
import PayItemCombobox from './PayItemCombobox';
import styles from './SuperPayItemExemptions.module.css';

const tableConfig = {
  name: { width: 'flex-1', valign: 'middle' },
  type: { width: 'flex-1', valign: 'middle' },
  actions: { width: '5rem', valign: 'middle', align: 'right' },
};

const onButtonClick = (handler, key, itemId) => () => {
  handler({ key, itemId });
};

const handleComboboxChange = (handler, key) => (item) => {
  handler({ key, item });
};

const SuperPayItemExemptions = (props) => {
  const {
    exemptions = [],
    exemptionOptions = [],
    isExemptionDisabled,
    onAddItem,
    onRemoveItem,
  } = props;

  const fieldGroupLabel = (
    <div>
      <span>Exemptions&nbsp;</span>
      <Tooltip triggerContent={<Icons.Info />} placement="right">
        Select wage pay items to be excluded before calculating this per pay item
      </Tooltip>
    </div>
  );

  return (
    <FieldGroup label={fieldGroupLabel} className={styles.editableTable}>
      <Table hasActions>
        <Table.Header>
          <Table.HeaderItem {...tableConfig.name}>Name</Table.HeaderItem>
          <Table.HeaderItem {...tableConfig.type}>Type</Table.HeaderItem>
          <Table.HeaderItem {...tableConfig.actions} />
        </Table.Header>
        <Table.Body>
          {exemptions.map(({ id, name, type }) => (
            <Table.Row key={id}>
              <Table.RowItem {...tableConfig.name}>{name}</Table.RowItem>
              <Table.RowItem {...tableConfig.type}>{type}</Table.RowItem>
              <Table.RowItem cellRole="actions" {...tableConfig.actions}>
                <Tooltip triggerContent={(
                  <Button type="secondary" size="xs" onClick={onButtonClick(onRemoveItem, 'exemptions', id)}>
                    <Icons.Remove />
                  </Button>
                )}
                >
                  Remove pay item
                </Tooltip>
              </Table.RowItem>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <PayItemCombobox
        label="Exemptions"
        hideLabel
        hintText="Add exemption"
        items={exemptionOptions}
        onChange={handleComboboxChange(onAddItem, 'exemptions')}
        disabled={isExemptionDisabled}
        width="lg"
      />
    </FieldGroup>
  );
};

const mapStateToProps = state => ({
  exemptions: getExemptions(state),
  exemptionOptions: getFilteredExemptionOptions(state),
  isExemptionDisabled: getIsExemptionDisabled(state),
});

export default connect(mapStateToProps)(SuperPayItemExemptions);
