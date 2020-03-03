import React from 'react';

import employeeImg from './assets/high_five_employees.svg';

const EmployeeLearnImage = ({ className }) => (
  <img
    src={employeeImg}
    className={className}
    alt="High five employee"
  />
);

export default EmployeeLearnImage;
