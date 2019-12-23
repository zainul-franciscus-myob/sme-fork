import {
  Card, Dropdown, FieldGroup, Icons, Table,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getEssentialsTemplates } from '../../SalesSettingsDetailSelectors';
import actionTypes from './actionTypes';

const ActionComponent = ({ name, handleActionSelect }) => (
  <Dropdown
    right
    items={[
      <Dropdown.Item
        key={actionTypes.makeDefaultTemplate}
        label="Make default"
        value={actionTypes.makeDefaultTemplate}
      />,
    ]}
    onSelect={handleActionSelect(name)}
    toggle={(
      <Dropdown.Toggle size="xs">
        <Icons.More />
      </Dropdown.Toggle>
)}
  />
);

const TemplateTable = ({ essentialsTemplates, onActionSelect }) => {
  const tableConfig = {
    name: { valign: 'top', columnName: 'Name' },
    action: { width: 'auto', valign: 'middle' },
  };

  const renderTableHeader = () => (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.name}>
        {tableConfig.name.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.action} />
    </Table.Header>
  );
  const renderTableRow = template => (
    <Table.Row key={template.name}>
      <Table.RowItem {...tableConfig.name}>{template.name}</Table.RowItem>
      <Table.RowItem {...tableConfig.action} cellRole="actions">
        {<ActionComponent handleActionSelect={onActionSelect} name={template.name} />}
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
