import { Table } from '@myob/myob-widgets';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import classnames from 'classnames';

import styles from './AccordionTable.module.css';

const ALL_ROWS_CLOSED = -1;

const AccordionTable = ({
  className,
  header,
  data,
  openPosition,
  renderRow,
  onRowSelect,
  handleHeaderClick,
}) => {
  const initOpenRow = openPosition >= 0 ? openPosition : ALL_ROWS_CLOSED;
  const [currOpenRow, setCurrOpenRow] = useState(initOpenRow);
  const [prevOpenRow, setPrevOpenRow] = useState(ALL_ROWS_CLOSED);

  const setCurrAndPrevOpenRow = (nextOpenRow) => {
    if (nextOpenRow === currOpenRow) {
      setPrevOpenRow(currOpenRow);
      setCurrOpenRow(ALL_ROWS_CLOSED);
    } else {
      setPrevOpenRow(currOpenRow);
      setCurrOpenRow(nextOpenRow);
    }
  };

  const buildRowProps = (props) => ({
    ...props,
    onExpand: setCurrAndPrevOpenRow,
    isRowOpen: props.isRowOpen !== undefined ? props.isRowOpen : false,
    handleHeaderClick:
      props.handleHeaderClick !== undefined
        ? props.handleHeaderClick
        : handleHeaderClick,
  });

  const memoizedBuildRowProps = useCallback(buildRowProps, []);

  const getRenderRow = (index, item) => {
    let rowPropsBuilder = memoizedBuildRowProps;

    if (index === currOpenRow) {
      rowPropsBuilder = (props) => ({
        ...buildRowProps(props),
        isRowOpen: props.isRowOpen !== undefined ? props.isRowOpen : true,
      });
    }

    if (index === prevOpenRow) {
      rowPropsBuilder = (props) => ({
        ...buildRowProps(props),
        isRowOpen: props.isRowOpen !== undefined ? props.isRowOpen : false,
      });
    }

    return renderRow(index, item, rowPropsBuilder);
  };

  return (
    <Table
      className={classnames(className, styles.header)}
      onRowSelect={onRowSelect}
    >
      {header}
      <Table.Body>
        {data.map((item, index) => getRenderRow(index, item))}
      </Table.Body>
    </Table>
  );
};

AccordionTable.propTypes = {
  renderRow: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  header: PropTypes.element,
  className: PropTypes.string,
  openPosition: PropTypes.number,
  onRowSelect: PropTypes.func,
  handleHeaderClick: PropTypes.func,
};

AccordionTable.defaultProps = {
  openPosition: -1,
  handleHeaderClick: undefined,
};

export default AccordionTable;
