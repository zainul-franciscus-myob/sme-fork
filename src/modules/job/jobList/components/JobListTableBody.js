import { Label, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classNames from 'classnames';

import { getShowStatusColumn, getTableEntries } from '../jobListSelector';
import styles from './JobListTableBody.module.css';

const inactiveRow = ({ tableConfig, entry }) => (
  <Table.RowItem
    columnName={tableConfig.isActive.columnName}
    {...tableConfig.isActive.style}
  >
    {!entry.isActive && (
      <Label type="boxed" color="light-grey" size="small">
        Inactive
      </Label>
    )}
  </Table.RowItem>
);

const JobRowItem = ({
  config,
  value,
  indentLevel,
  isHeader,
  title,
}) => {
  const className = classNames({
    [styles.headerJob]: isHeader,
    [styles.indent]: indentLevel > 0,
  });

  return (
    <Table.RowItem columnName={config.columnName} {...config.headerStyle}>
      <span title={title} className={className} data-indent-level={indentLevel}>{value}</span>
    </Table.RowItem>
  );
};

const JobListTableBody = (props) => {
  const { tableConfig, entries, showStatusColumn } = props;

  const rows = entries.map(entry => {
    const {
      id,
      number,
      name,
      income,
      cost,
      expenses,
      netProfit,
      link,
      isHeader,
      level,
    } = entry;

    return (
    <Table.Row key={id}>
      <JobRowItem
        config={tableConfig.number}
        value={isHeader ? number : <a href={link}>{number}</a>}
        title={number}
        indentLevel={level}
        isHeader={isHeader}
      />
      <JobRowItem
        config={tableConfig.name}
        value={isHeader ? name : <a href={link}>{name}</a>}
        title={name}
        isHeader={isHeader}
      />
      {showStatusColumn ? inactiveRow({ tableConfig, entry }) : undefined}
      <JobRowItem
        config={tableConfig.income}
        value={income}
        title={income}
        isHeader={isHeader}
      />
      <JobRowItem
        config={tableConfig.cost}
        value={cost}
        title={cost}
        isHeader={isHeader}
      />
      <JobRowItem
        config={tableConfig.expenses}
        value={expenses}
        title={expenses}
        isHeader={isHeader}
      />
      <JobRowItem
        config={tableConfig.netProfit}
        value={netProfit}
        title={netProfit}
        isHeader={isHeader}
      />
    </Table.Row>
    );
  });

  return <React.Fragment>{rows}</React.Fragment>;
};

const mapStateToProps = state => ({
  entries: getTableEntries(state),
  showStatusColumn: getShowStatusColumn(state),
});

export default connect(mapStateToProps)(JobListTableBody);
