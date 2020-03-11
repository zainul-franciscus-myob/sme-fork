import {
  Button, Combobox, FieldGroup, Icons, Table, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getExemptionAllocations } from '../DeductionPayItemSelectors';
import handleComboboxChange from '../../../../../components/handlers/handleComboboxChange';
import styles from './DeductionPayItemView.module.css';

const filteredListExemptionsMetadata = [{ columnName: 'name', showData: true }];

const title = (
  <React.Fragment>
    Exemptions&nbsp;
    <Tooltip triggerContent={(<Icons.Info />)}>
      Select if this deduction  pay item will be exempt from taxes.
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
  <FieldGroup label={title} className={styles.editableTable}>
    <Table>
      <Table.Header>
        <Table.HeaderItem key="name" {...tableConfig.name}>Name</Table.HeaderItem>
        <Table.HeaderItem key="type" {...tableConfig.type}>Type</Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.actions} />
      </Table.Header>
      <Table.Body>
        {selectedExemptions.map(({ name, id, itemType }) => (
          <Table.Row key={id}>
            <Table.RowItem {...tableConfig.name}>{name}</Table.RowItem>
            <Table.RowItem {...tableConfig.type}>{itemType}</Table.RowItem>
            <Table.RowItem {...tableConfig.actions}>
              <Tooltip
                placement="left"
                triggerContent={(
                <Button className={styles.removeRow} type="secondary" size="xs" onClick={() => onRemoveExemption(id)}>
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
    <Combobox
      label="Exemptions"
      hideLabel
      items={filteredListOfExemptions}
      metaData={filteredListExemptionsMetadata}
      hintText="Add exemption"
      selected={{}}
      onChange={handleComboboxChange('exemptions', onExemptionSelected)}
      width="lg"
    />
  </FieldGroup>);

const mapToStateProps = getExemptionAllocations;

export default connect(mapToStateProps)(ExemptionsView);
