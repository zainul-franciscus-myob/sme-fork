import React from 'react';

import styles from './ErrorsList.module.css';

const EmployeeErrorsList = ({ employeeErrors }) => {
  const errorsList = (errors) => (
    <ul>
      {errors.map((error) => (
        <li key={error.code} className={styles.listItems}>
          {error.text}
          <br />
          {`(ATO error code: ${error.code})`}
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <h3>Employee information errors</h3>
      {employeeErrors.map((employee) => (
        <div key={employee.id}>
          <strong>{employee.name}</strong>
          {errorsList(employee.errors)}
        </div>
      ))}
    </>
  );
};

export default EmployeeErrorsList;
