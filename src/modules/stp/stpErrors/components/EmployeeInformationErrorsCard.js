import { Button, Card, Table } from '@myob/myob-widgets';
import React from 'react';

const EmployeeInformationErrorsCard = ({ errors, onEmployeeNameClick }) => {
  if (errors.length < 1) {
    return null;
  }

  const tableHeader = (
    <Table.Header>
      <Table.HeaderItem
        name="name"
        label="Name"
      >
        Name
      </Table.HeaderItem>
      <Table.HeaderItem
        name="error"
        label="Error"
      >
        Error
      </Table.HeaderItem>
    </Table.Header>
  );

  const tableRows = errors.map(error => (
    <Table.Row
      key={error.id}
    >
      <Table.RowItem columnName="Name">
        <Button type="link" onClick={() => onEmployeeNameClick(error.id)}>
          {error.name}
        </Button>
      </Table.RowItem>
      <Table.RowItem columnName="Error">
        {error.error}
      </Table.RowItem>
    </Table.Row>
  ));

  return (
    <Card>
      <h3>Employee information</h3>
      <Table>
        {tableHeader}
        <Table.Body>
          {tableRows}
        </Table.Body>
      </Table>
    </Card>
  );
};

export default EmployeeInformationErrorsCard;
