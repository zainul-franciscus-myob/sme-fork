import { Alert } from '@myob/myob-widgets';
import React from 'react';

const EmailErrors = ({ employees }) => (
  <Alert type="danger">
    <p>Failed to send emails to the following</p>
    <ul>
      {employees.map(employee => (
        <li>
          {employee.name}
          {' '}
at
          {' '}
          <strong>{employee.email}</strong>
        </li>
      ))}
    </ul>
  </Alert>
);

export default EmailErrors;
