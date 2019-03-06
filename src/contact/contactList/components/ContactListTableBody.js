import { PropTypes } from 'prop-types';
import { Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTableEntries } from '../contactListSelector';
import style from './ContactListTableBody.css';

/* eslint-disable react/no-array-index-key */


const ContactListTableBody = (props) => {
  const {
    tableConfig,
    entries,
  } = props;
  const rows = entries.map((entry, index) => {
    const className = entry.isActive ? '' : style.inActive;

    return (
      <Table.Row key={index}>
        <Table.RowItem {...tableConfig.name}>
          <a href={entry.link} className={className}>{entry.name}</a>
        </Table.RowItem>
        <Table.RowItem {...tableConfig.type}>{entry.type}</Table.RowItem>
        <Table.RowItem {...tableConfig.phoneNumber}>{entry.phoneNumber}</Table.RowItem>
        <Table.RowItem {...tableConfig.email}>{entry.email}</Table.RowItem>
        <Table.RowItem {...tableConfig.outstandingBalance}>
          {entry.outstandingBalance}
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

ContactListTableBody.propTypes = {
  tableConfig: PropTypes.shape({}).isRequired,
  entries: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = state => ({
  entries: getTableEntries(state),
});

export default connect(mapStateToProps)(ContactListTableBody);
