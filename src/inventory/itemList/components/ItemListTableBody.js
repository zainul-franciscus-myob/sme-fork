import { PropTypes } from 'prop-types';
import { Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getFormattedTableEntries } from '../itemListSelectors';
import style from './ItemListTableBody.css';

/* eslint-disable react/no-array-index-key */

const ItemListTableBody = (props) => {
  const {
    tableConfig,
    entries,
  } = props;
  const rows = entries.map((entry, index) => {
    const className = entry.isActive ? '' : style.inActive;

    return (
      <Table.Row key={index}>
        <Table.RowItem {...tableConfig.referenceId}>
          <a href={entry.link} className={className}>{entry.referenceId}</a>
        </Table.RowItem>
        <Table.RowItem {...tableConfig.name}>{entry.name}</Table.RowItem>
        <Table.RowItem {...tableConfig.sellingPrice}>{entry.sellingPrice}</Table.RowItem>
        <Table.RowItem {...tableConfig.tax}>
          {entry.tax}
        </Table.RowItem>
      </Table.Row>
    );
  });

  return (
    <Table.Body>
      {rows}
    </Table.Body>
  );
};

ItemListTableBody.propTypes = {
  tableConfig: PropTypes.shape({}).isRequired,
  entries: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = state => ({
  entries: getFormattedTableEntries(state),
});

export default connect(mapStateToProps)(ItemListTableBody);
