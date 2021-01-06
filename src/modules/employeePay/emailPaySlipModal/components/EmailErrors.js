import { Alert } from '@myob/myob-widgets';
import React from 'react';

const EmailErrors = ({ employees }) => (
  <Alert type="danger">
    <p>
      Failed to send emails to the following employees. Check to make sure you
      have entered a ‘Reply-to email address’ in Payroll settings, email
      defaults. This might be causing the error.
    </p>
    <br />
    <ul>
      {employees.map((employee) => (
        <li>
          {employee.name} at <strong>{employee.email}</strong>
        </li>
      ))}
    </ul>
  </Alert>
);

export default EmailErrors;
