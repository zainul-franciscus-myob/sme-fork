import React from 'react';

import JobDescription from './JobDescription';
import JobName from './JobName';
import JobNumber from './JobNumber';
import LinkedCustomer from './LinkedCustomer';

const DetailView = ({ onJobChange }) => (
  <React.Fragment>
    <JobNumber onChange={onJobChange} />
    <JobName onChange={onJobChange} />
    <LinkedCustomer onChange={onJobChange} />
    <JobDescription onChange={onJobChange} />
  </React.Fragment>
);

export default DetailView;
