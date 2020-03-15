import { connect } from 'react-redux';
import React from 'react';

import { getJobDetails } from '../jobDetailSelectors';

const JobDetails = () => (
  <h1>Create Job</h1>
);

const mapStateToProps = state => ({
  ...getJobDetails(state),
});

export default connect(mapStateToProps)(JobDetails);
