import { Alert, Button, HeaderSort, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsSubmitting,
  getPracticeListOrder,
  getPractices,
} from '../userListSelectors';

const ExistingAdvisorList = ({
  practices,
  onSort,
  order,
  onRemovePracticeAccessClick,
  isSubmitting,
}) => {
  const practiceRows = practices.map((practice) => (
    <Table.Row key={practice.practiceId}>
      <Table.RowItem>{practice.practiceName}</Table.RowItem>
      <Table.RowItem align="right">
        <Button
          disabled={isSubmitting}
          type="link"
          onClick={() => onRemovePracticeAccessClick(practice.practiceId)}
        >
          Remove access
        </Button>
      </Table.RowItem>
    </Table.Row>
  ));

  return (
    <>
      <Alert type="info">
        These are advisors that had access to your Essentials file before it was
        upgraded. They still have access and you can remove that access here.
        Any new advisors you invite will appear in the list above and you’ll
        have more granular control over their access.&nbsp;
        <a
          href="https://help.myob.com/wiki/x/-a5qAg"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more
        </a>
      </Alert>
      <Table>
        <Table.Header>
          <Table.HeaderItem>
            <HeaderSort
              title="Name"
              sortName="Name"
              onSort={onSort}
              activeSort={order}
            />
          </Table.HeaderItem>
        </Table.Header>
        <Table.Body>{practiceRows}</Table.Body>
      </Table>
    </>
  );
};

const mapStateToProps = (state) => ({
  practices: getPractices(state),
  order: getPracticeListOrder(state),
  isSubmitting: getIsSubmitting(state),
});

export default connect(mapStateToProps)(ExistingAdvisorList);
