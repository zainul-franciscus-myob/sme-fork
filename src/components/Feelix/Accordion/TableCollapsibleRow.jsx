/* eslint-disable react/destructuring-assignment */
import { Table } from '@myob/myob-widgets';
import PropTypes from 'prop-types';
import React from 'react';

import Collapsible from '../Collapsible/Collapsible';

const TableCollapsibleRow = (props) => {
  // This method implements the `customizeHeaderContent` Collapsible's prop. As Collapsible
  // already implements `setUpControls`, I make use of that method here. `Collapsible`
  // `binds(this)` this method if passed as props.
  function getHeaderContent(header, dropdown, expansionToggle) {
    // since hot reload breaks the normal `header.type === Component` check,
    // need to include name check for local development

    if (
      header.type === Table.Row
      || header.type.displayName === Table.Row.displayName
    ) {
      const controlsRowItem = (
        <Table.RowItem key="Actions" width="auto" cellRole="actions">
          { /* eslint-disable-next-line react/no-this-in-sfc */ }
          {this.setUpControls(dropdown, expansionToggle)}
        </Table.RowItem>
      );

      const children = React.Children.toArray(header.props.children);
      return React.cloneElement(header, {}, [
        ...children,
        controlsRowItem,
      ]);
    }
    return header;
  }

  const newProps = {
    customizeHeaderContent: getHeaderContent,
  };

  return (
    <Collapsible {...props} {...newProps}>
      {props.children}
    </Collapsible>
  );
};

TableCollapsibleRow.propTypes = {
  children: PropTypes.node.isRequired,
};

TableCollapsibleRow.displayName = 'Table.CollapsibleRow';

export default TableCollapsibleRow;
