import {
  Alert,
  Button,
  Combobox,
  FieldGroup,
  Icons,
  Table,
  Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getExemptionAllocations } from '../../selectors/DeductionPayItemModalSelectors';
import styles from './DeductionPayItemExemptions.module.css';

const tableConfig = {
  name: { width: 'flex-1', valign: 'middle' },
  type: { width: 'flex-1', valign: 'middle' },
  actions: { width: '5rem', valign: 'middle', align: 'right' },
};

const metaData = [{ columnName: 'name', showData: true }];

const title = (
  <React.Fragment>
    Exemptions&nbsp;
    <Tooltip triggerContent={<Icons.Info />}>
      Select if this deduction pay item will be exempt from taxes.
    </Tooltip>
  </React.Fragment>
);

const onButtonClick = (handler, key, itemId) => () => {
  handler({ key, itemId });
};

const handleComboboxChange = (handler, key) => (item) => {
  handler({ key, item });
};

const DeductionPayItemExemptions = ({
  exemptions,
  exemptionOptions,
  isSelectedExemptionPayGWithholding,
  onAddItem,
  onRemoveItem,
}) => (
  <FieldGroup label={title}>
    <div className={styles.editableTable}>
      <Table hasActions>
        <Table.Header>
          <Table.HeaderItem {...tableConfig.name}>Name</Table.HeaderItem>
          <Table.HeaderItem {...tableConfig.type}>Type</Table.HeaderItem>
          <Table.HeaderItem {...tableConfig.actions} />
        </Table.Header>
        <Table.Body>
          {exemptions.map(({ name, id, itemType }) => (
            <Table.Row key={id}>
              <Table.RowItem {...tableConfig.name}>{name}</Table.RowItem>
              <Table.RowItem {...tableConfig.type}>{itemType}</Table.RowItem>
              <Table.RowItem cellRole="actions" {...tableConfig.actions}>
                <Tooltip
                  triggerContent={
                    <Button
                      type="secondary"
                      size="xs"
                      onClick={onButtonClick(onRemoveItem, 'exemptions', id)}
                    >
                      <Icons.Remove />
                    </Button>
                  }
                >
                  Remove pay item
                </Tooltip>
              </Table.RowItem>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
    <Combobox
      label="Exemptions"
      hideLabel
      items={exemptionOptions}
      metaData={metaData}
      hintText="Add exemption"
      selected={{}}
      onChange={handleComboboxChange(onAddItem, 'exemptions')}
      width="lg"
    />
    {isSelectedExemptionPayGWithholding && (
      <Alert type="info">
        Deductions exempt from tax automatically reduce the employee&apos;s
        gross pay.
      </Alert>
    )}
  </FieldGroup>
);

const mapToStateProps = getExemptionAllocations;

export default connect(mapToStateProps)(DeductionPayItemExemptions);
