import { Card, FieldGroup, TreeTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getArlTemplates } from '../../SalesSettingsDetailSelectors';
import styles from './ArlTemplateTable.module.css';

const indentToClassMapping = {
  0: styles.rootHeader,
};

const ArlTemplateTreeTable = ({ arlTemplates }) => {
  const tableConfig = {
    name: { valign: 'top', align: 'left', columnName: 'Name' },
  };

  const treeTableHeader = (
    <TreeTable.Header>
      <TreeTable.HeaderItem {...tableConfig.name}>
        {tableConfig.name.columnName}
      </TreeTable.HeaderItem>
    </TreeTable.Header>
  );

  const TreeTableRow = ({
    template,
    level = 0,
  }) => (
    <TreeTable.Row
      key={template.name}
      labelContent={template.name}
      ariaLabel={template.name}
      indentLevel={level}
      columnName={tableConfig.name.columnName}
    />
  );

  const TreeTableRowGroup = ({ template, level = 0 }) => (
    <TreeTable.RowGroup>
      <TreeTable.HeaderRow
        className={indentToClassMapping[level]}
        visible
        labelContent={template.name}
        ariaLabel={template.name}
        indentLevel={level}
        rowData={{ id: template.name }}
      >
        {template.children.map(nestedTemplate => (nestedTemplate.collapsible ? (
          <TreeTableRowGroup template={nestedTemplate} level={level + 1} />
        ) : (
          <TreeTableRow template={nestedTemplate} level={level + 1} />
        )))}
      </TreeTable.HeaderRow>
    </TreeTable.RowGroup>
  );
  const tableBody = (
    <TreeTable.Body>
      {arlTemplates.map(template => (template.collapsible ? (
        <TreeTableRowGroup template={template} />
      ) : (
        <TreeTableRow template={template} />
      )))}
    </TreeTable.Body>
  );

  return (
    <Card>
      <FieldGroup label="MYOB AccountRight desktop templates">
        {
          "You can still use these templates, but you won't be able to edit them. If something's changed, you'll need to create a new template."
        }
      </FieldGroup>
      <TreeTable hasCard={false} hasActions>
        {treeTableHeader}
        {tableBody}
      </TreeTable>
    </Card>
  );
};

const mapStateToProps = state => ({
  arlTemplates: getArlTemplates(state),
});
export default connect(mapStateToProps)(ArlTemplateTreeTable);
