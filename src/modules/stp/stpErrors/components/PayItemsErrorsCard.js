import { Button, Card, Table } from '@myob/myob-widgets';
import React from 'react';

const PayItemsErrorsCard = ({ errors, onPayItemClick }) => {
  if (errors.length < 1) {
    return null;
  }

  const tableHeader = (
    <Table.Header>
      <Table.HeaderItem name="payItem" label="Pay item">
        Pay item
      </Table.HeaderItem>
      <Table.HeaderItem name="error" label="Error">
        Error
      </Table.HeaderItem>
    </Table.Header>
  );

  const tableRows = errors.map((error) => (
    <Table.Row key={error.id}>
      <Table.RowItem columnName="Name">
        <Button type="link" onClick={() => onPayItemClick(error)}>
          {error.name}
        </Button>
      </Table.RowItem>
      <Table.RowItem columnName="Error">{error.error}</Table.RowItem>
    </Table.Row>
  ));

  return (
    <Card>
      <h3>Pay items</h3>
      <p>
        Each of your pay items, including inactive and deleted, must be assigned
        an ATO reporting category to indicate what information to report to the
        ATO. This is a complex area, if you are not sure what to assign, please
        contact your advisor.
      </p>
      <Table>
        {tableHeader}
        <Table.Body>{tableRows}</Table.Body>
      </Table>
    </Card>
  );
};

export default PayItemsErrorsCard;
