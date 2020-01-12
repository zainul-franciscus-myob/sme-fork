import { Button, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTableEntries } from '../../selectors/employmentClassificationListSelectors';

const onLinkButtonClick = (handler, id) => () => {
  handler(id);
};

const EmploymentClassificationListTableBody = (props) => {
  const { tableConfig, entries, onClickRowButton } = props;

  const rows = entries.map(entry => (
    <Table.Row key={entry.id}>
      <Table.RowItem {...tableConfig.classification}>
        <Button type="link" onClick={onLinkButtonClick(onClickRowButton, entry.id)}>
          {entry.classification}
        </Button>
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

export default connect(mapStateToProps)(EmploymentClassificationListTableBody);
