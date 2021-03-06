import {
  Button,
  Card,
  Dropdown,
  HeaderSort,
  Icons,
  Label,
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
import styles from './TemplateTable.module.css';

const ActionComponent = ({ name, handleActionSelect }) => (
  <Dropdown
    right
    items={[
      <Dropdown.Item
        key={actionTypes.editTemplate}
        label="Edit template"
        value={actionTypes.editTemplate}
      />,
      <Dropdown.Separator key="separator" />,
      <Dropdown.Item
        key={actionTypes.delete}
        label="Delete"
        value={actionTypes.delete}
      />,
    ]}
    onSelect={handleActionSelect(name)}
    toggle={
      <Dropdown.Toggle size="xs">
        <Icons.More />
      </Dropdown.Toggle>
    }
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
        "When you're done creating your masterpiece, save it to print and email."
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
      image={
        <img
          src={emptyState}
          alt="Change the way your invoices look with templates"
        />
      }
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

  const renderTableRow = (template) => (
    <Table.Row key={template.name}>
      <Table.RowItem {...tableConfig.name}>
        <a href={template.link}>{template.name}</a>
        {template.isDefault && (
          <span className={styles.defaultLabel}>
            <Label type="boxed" color="purple">
              Default
            </Label>
          </span>
        )}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.action} cellRole="actions">
        {
          <ActionComponent
            handleActionSelect={onActionSelect}
            name={template.name}
          />
        }
      </Table.RowItem>
    </Table.Row>
  );
  const tableBody = () => (
    <Table.Body>{templates.map(renderTableRow)}</Table.Body>
  );
  const renderTable = () => (hasTemplates ? tableBody() : emptyView());
  const table = (
    <Table hasActions>
      {renderTableHeader()}
      {isLoading ? <Spinner /> : renderTable()}
    </Table>
  );

  return <Card>{table}</Card>;
};

const mapStateToProps = (state) => ({
  order: getOrder(state),
  hasTemplates: getHasTemplates(state),
  isLoading: getIsTemplatesLoading(state),
  templates: getTemplates(state),
});
export default connect(mapStateToProps)(TemplateTable);
