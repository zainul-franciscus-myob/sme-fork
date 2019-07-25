import { Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getTableEntries } from '../../selectors/employmentClassificationListSelectors';

const EmploymentClassificationListTableBody = (props) => {
  const { tableConfig, entries } = props;

  const rows = entries.map(entry => (
    <Table.Row key={entry.id}>
      <Table.RowItem {...tableConfig.classification}>
        <a href={entry.link}>{entry.classification}</a>
      </Table.RowItem>
    </Table.Row>
  ));

  return (
    <Table.Body>
      {rows}
    </Table.Body>
  );
};

const mapStateToProps = state => ({
  entries: getTableEntries(state),
});

EmploymentClassificationListTableBody.propTypes = {
  tableConfig: PropTypes.shape().isRequired,
  entries: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(mapStateToProps)(EmploymentClassificationListTableBody);
