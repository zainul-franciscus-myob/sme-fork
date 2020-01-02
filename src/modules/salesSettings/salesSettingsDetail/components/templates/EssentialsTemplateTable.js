import {
  Card, FieldGroup, Label, Table,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getEssentialsTemplates } from '../../SalesSettingsDetailSelectors';
import styles from './EssentialsTemplateTable.module.css';

const TemplateTable = ({ essentialsTemplates }) => {
  const tableConfig = {
    name: { valign: 'top', columnName: 'Name' },
  };

  const renderTableHeader = () => (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.name}>
        {tableConfig.name.columnName}
      </Table.HeaderItem>
    </Table.Header>
  );
  const renderTableRow = template => (
    <Table.Row key={template.name}>
      <Table.RowItem {...tableConfig.name}>
        {template.name}
        {template.isDefault && (
          <span className={styles.defaultLabel}>
            <Label type="boxed" color="purple">
              Default
            </Label>
          </span>
        )}
      </Table.RowItem>
    </Table.Row>
  );
  const tableBody = () => (
    <Table.Body>{essentialsTemplates.map(renderTableRow)}</Table.Body>
  );

  const table = (
    <Table hasActions>
      {renderTableHeader()}
      {tableBody()}
    </Table>
  );

  return (
    <Card>
      <FieldGroup label="MYOB Essentials template">
        {
          "You can still use this template, but you won't be able to edit it. If something's changed, you'll need to create a new template."
        }
      </FieldGroup>
      {table}
    </Card>
  );
};

const mapStateToProps = state => ({
  essentialsTemplates: getEssentialsTemplates(state),
});
export default connect(mapStateToProps)(TemplateTable);
