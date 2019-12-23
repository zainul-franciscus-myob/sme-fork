import {
  Button,
  Card,
  Dropdown,
  HeaderSort,
  Icons,
  PageState,
  Spinner,
  Table,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getHasTemplates,
  getIsTemplatesLoading,
  getOrder,
  getTemplates,
} from '../../SalesSettingsDetailSelectors';
import actionTypes from './actionTypes';
import emptyState from './emptyState.svg';

const ActionComponent = ({ name, handleActionSelect }) => (
  <Dropdown
    right
    items={[
      <Dropdown.Item
        key={actionTypes.editTemplate}
        label="Edit template"
        value={actionTypes.editTemplate}
      />,
      <Dropdown.Item
        key={actionTypes.makeDefaultTemplate}
        label="Make default"
        value={actionTypes.makeDefaultTemplate}
      />,
      <Dropdown.Separator key="separator" />,
      <Dropdown.Item
        key={actionTypes.delete}
        label="Delete"
        value={actionTypes.delete}
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

const TemplateTable = ({
  onSortTemplateList,
  onCreateTemplate,
  onActionSelect,
  order,
  hasTemplates,
  isLoading,
  templates,
}) => {
  const tableConfig = {
    name: { valign: 'top', columnName: 'Name' },
    action: { width: 'auto', valign: 'middle' },
  };

  const emptyView = () => (
    <PageState
      title="Change the way your invoices look with templates"
      description={
        "When you're done createing your masterpiece, save it and make it the default template to print and email."
      }
      actions={[
        <Button
          key="createTemplate"
          type="link"
          onClick={onCreateTemplate}
          icon={<Icons.Add />}
        >
          Create template
        </Button>,
      ]}
      image={(
        <img
          src={emptyState}
          alt="Change the way your invoices look with templates"
        />
)}
    />
  );

  const renderTableHeader = () => (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.name}>
        <HeaderSort
          title={tableConfig.name.columnName}
          sortName="name"
          activeSort={order}
          onSort={onSortTemplateList}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.action} />
    </Table.Header>
  );
  const renderTableRow = template => (
    <Table.Row key={template.name}>
      <Table.RowItem {...tableConfig.name}>
        <a href={template.link}>{template.name}</a>
      </Table.RowItem>
      <Table.RowItem {...tableConfig.action} cellRole="actions">
        {<ActionComponent handleActionSelect={onActionSelect} id={template.name} />}
      </Table.RowItem>
    </Table.Row>
  );
  const tableBody = () => (
    <Table.Body>{templates.map(renderTableRow)}</Table.Body>
  );

  const table = (
    <Table hasActions>
      {renderTableHeader()}
      {hasTemplates ? tableBody() : emptyView()}
    </Table>
  );

  return (
    <Card>
      {isLoading ? <Spinner /> : table}
    </Card>
  );
};

const mapStateToProps = state => ({
  order: getOrder(state),
  hasTemplates: getHasTemplates(state),
  isLoading: getIsTemplatesLoading(state),
  templates: getTemplates(state),
});
export default connect(mapStateToProps)(TemplateTable);
