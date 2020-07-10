import { Button, Icons, Table } from '@myob/myob-widgets';
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import AccordionRowTypes from './AccordionRowTypes';
import shouldRenderCollapsibleTableRow from './shouldRenderCollapsibleTableRow';
import styles from './CollapsibleTableRow.module.css';

const CollapsibleTableRow = ({
  id,
  index,
  rowType,
  header,
  children,
  isRowOpen,
  onExpand,
  handleHeaderClick,

  /* Props for Table.Row */
  className,
  columns,
  isActive,
  isInactive,
  isSelected,
  onRowBlur,
  onRowFocus,
  onRowSelect,
  rowData,
}) => {
  const collapsibleExpansionToggleStyling = isRowOpen
    ? styles.collapsibleExpansionToggleOpen
    : styles.collapsibleExpansionToggleClosed;

  const additionalRowItem = {
    [AccordionRowTypes.COLLAPSIBLE]: (
      <Table.RowItem
        width="auto"
        cellRole="actions"
        className={collapsibleExpansionToggleStyling}
      >
        <div className={styles.expansionToggle}>
          <Button
            type="clear"
            icon={isRowOpen ? <Icons.UpChevron /> : <Icons.DownChevron />}
            aria-label="show row content"
            size="xs"
            onClick={() => {
              if (handleHeaderClick) {
                handleHeaderClick(index);
              } else {
                onExpand(index);
              }
            }}
          />
        </div>
      </Table.RowItem>
    ),
    [AccordionRowTypes.NORMAL]: <div />,
  }[rowType];

  const rowHeaderStyling = isRowOpen
    ? styles.rowHeaderOpen
    : styles.rowHeaderClosed;

  /*
    Adding table-data--selected stops Feelix from applying styles to the row when the user
    hovers over the row.
  */
  const tableDataSelected = isRowOpen ? 'table-data--selected' : '';
  const tableRowStyling = classnames(
    className,
    styles.rowHeaderToggle,
    rowHeaderStyling,
    tableDataSelected
  );
  const rowHeader = (
    <div>
      <Table.Row
        key={id}
        className={tableRowStyling}
        columns={columns}
        isActive={isActive}
        isInactive={isInactive}
        isSelected={isSelected}
        onRowBlur={onRowBlur}
        onRowFocus={onRowFocus}
        onRowSelect={onRowSelect}
        rowData={rowData}
      >
        {header}
        {additionalRowItem}
      </Table.Row>
    </div>
  );

  const rowContentStyling = isRowOpen
    ? styles.rowContentOpen
    : styles.rowContentClosed;
  const rowContent = (
    <div className={rowContentStyling}>
      <div className={styles.rowContentStylingInner}>{children}</div>
    </div>
  );

  const collapsibleStyling = isRowOpen
    ? styles.collapsibleOpen
    : styles.collapsibleClosed;

  return (
    <div className={collapsibleStyling}>
      {rowHeader}
      {rowContent}
    </div>
  );
};

CollapsibleTableRow.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  // eslint-disable-next-line consistent-return
  rowType: PropTypes.oneOf([
    AccordionRowTypes.COLLAPSIBLE,
    AccordionRowTypes.NORMAL,
  ]).isRequired,
  header: PropTypes.element.isRequired,
  isRowOpen: PropTypes.bool.isRequired,
  onExpand: PropTypes.func,
  handleHeaderClick: PropTypes.func,
  children: PropTypes.node,

  /* Prop types for Table.Row */
  className: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.shape),
  isActive: PropTypes.bool,
  isInactive: PropTypes.bool,
  isSelected: PropTypes.bool,
  onRowBlur: PropTypes.func,
  onRowFocus: PropTypes.func,
  onRowSelect: PropTypes.func,
};

CollapsibleTableRow.defaultProps = {
  handleHeaderClick: undefined,
  onExpand: undefined,

  /* Default prop types for Table.Row */
  columns: [],
  isActive: false,
  isInactive: false,
  isSelected: false,
  onRowBlur: undefined,
  onRowFocus: undefined,
  onRowSelect: undefined,
};

export default React.memo(CollapsibleTableRow, shouldRenderCollapsibleTableRow);
