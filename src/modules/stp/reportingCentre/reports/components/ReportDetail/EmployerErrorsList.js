import React from 'react';

import styles from './ErrorsList.module.css';

const EmployerErrorsList = ({ errors }) => (
  <>
    <h3>Employer information errors</h3>
    <ul>
      {errors.map(error => (
        <li key={error.code} className={styles.listItems}>
          {error.text}
          <br />
          {`(ATO error code: ${error.code})`}
        </li>
      ))}
    </ul>
  </>
);

export default EmployerErrorsList;
