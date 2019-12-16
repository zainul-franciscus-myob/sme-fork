import { Table } from '@myob/myob-widgets';
import PropTypes from 'prop-types';
import React from 'react';
import shortid from 'shortid';

import ColumnController from '../ColumnController';
import manageCollapsibles from './AccordionCollapsibleManager';


const AccordionTable = (props) => {
  const { header, body, onRowSelect } = props;

  // The AccordionTable generates a new whole extra column to hold the dropdowns and/or the
  // expansion buttons. This method clone the table header adding a new `Headeritem` (column) at
  // the end, to make room for the extra `RowItem` contributed by each row (`TableCollapsibleRow`),
  // containig the dropdown and/or the expansion button.

  const cloneTableHeader = tableHeader => React.cloneElement(tableHeader, {}, [
    ...tableHeader.props.children,
    <Table.HeaderItem
      cellRole="actions"
      key={shortid.generate()}
      width="66px"
    />,
  ]);

  // The AccordionTable supports normal `TableRows`s mixed with `TableCollapsibleRow`s. This method
  // is used only to process the normal `TableRows`s, to clone them, adding an extra `RowItem` at
  // the end, to make room for the extra `RowItem` contributed by the `TableCollapsibleRow`s.
  const cloneTableBodyRow = tableBodyRow => React.cloneElement(tableBodyRow, {}, [
    ...tableBodyRow.props.children,
    <Table.RowItem key={shortid.generate()} width="auto" />,
  ]);

  const cloneTableBody = (tableBody) => {
    const { addAccordionPropsToCollapsibles } = props;

    const childrenWithAccordionProps = addAccordionPropsToCollapsibles(
      tableBody.props.children,
      cloneTableBodyRow, // nonCollapsibleChildProcessor
    );

    return React.cloneElement(tableBody, {}, [...childrenWithAccordionProps]);
  };

  let finalTableHeader;
  if (header) {
    const currentTableHeader = header;
    if (currentTableHeader.type === ColumnController) {
      const columnControllerControlledHeader = currentTableHeader.props.children;
      const finalHeader = cloneTableHeader(columnControllerControlledHeader);
      finalTableHeader = React.cloneElement(currentTableHeader, {}, [
        finalHeader,
      ]);
    } else {
      // table without ColumnController
      finalTableHeader = cloneTableHeader(header);
    }
  }

  return (
    <Table onRowSelect={onRowSelect}>
      {header && finalTableHeader}
      {cloneTableBody(body)}
    </Table>
  );
};

AccordionTable.propTypes = {
  header: PropTypes.node.isRequired,
  body: PropTypes.node.isRequired,
  addAccordionPropsToCollapsibles: PropTypes.func.isRequired,
};

export default manageCollapsibles(AccordionTable);
