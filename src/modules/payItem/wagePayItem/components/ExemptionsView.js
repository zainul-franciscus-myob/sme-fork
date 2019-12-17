import {
  Button, Combobox, FieldGroup, Icons, Table, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getExemptionAllocations } from '../wagePayItemSelector';
import handleComboboxChange from '../../../../components/handlers/handleComboboxChange';
import styles from './WagePayItemView.module.css';

const filteredListExemptionsMetadata = [{ columnName: 'name', showData: true }];

const title = (
  <React.Fragment>
    Exemptions&nbsp;
    <Tooltip triggerContent={(<Icons.Info />)}>
      Select any deductions or taxes that will be excluded from this pay item
    </Tooltip>
  </React.Fragment>
);

const tableConfig = {
  name: { width: 'flex-1', valign: 'middle' },
  type: { width: 'flex-1', valign: 'middle' },
  actions: { width: '5rem', valign: 'middle', align: 'right' },
};

const ExemptionsView = ({
  selectedExemptions, filteredListOfExemptions, onExemptionSelected, onRemoveExemption,
}) => (
  <FieldGroup className={styles.editableTable} label={title}>
    <Table hasActions>
      <Table.Header>
        <Table.HeaderItem {...tableConfig.name}>Name</Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.type}>Type</Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.actions} />
      </Table.Header>
      <Table.Body>
        {selectedExemptions.map(({ name, id, itemType }) => (
          <Table.Row key={id}>
            <Table.RowItem {...tableConfig.name}>{name}</Table.RowItem>
            <Table.RowItem {...tableConfig.type}>{itemType}</Table.RowItem>
            <Table.RowItem {...tableConfig.actions} cellRole="actions">
              <Tooltip triggerContent={(
                <Button type="secondary" size="xs" onClick={() => onRemoveExemption(id)}>
                  <Icons.Remove />
                </Button>
              )}
              >
              Remove exemption
              </Tooltip>
            </Table.RowItem>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
    <div className={styles.addCombobox}>
      <Combobox
        label="Exemptions"
        hideLabel
        items={filteredListOfExemptions}
        metaData={filteredListExemptionsMetadata}
        hintText="Add exemption"
        selected={{}}
        onChange={handleComboboxChange('exemptions', onExemptionSelected)}
      />
    </div>
  </FieldGroup>);

const mapToStateProps = getExemptionAllocations;

export default connect(mapToStateProps)(ExemptionsView);
