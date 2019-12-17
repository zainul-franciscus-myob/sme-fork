import { connect } from 'react-redux';
import React from 'react';

import { getShowContactDetails, getSuperFundContactDetails } from '../SuperFundNoPaySuperSelectors';
import SuperFundContactDetails from '../../components/SuperFundContactDetails';

const SuperFundNoPaySuperContactDetails = ({
  superFundContactDetails,
  showContactDetails,
  listeners,
}) => (
  <SuperFundContactDetails
    superFundContactDetails={superFundContactDetails}
    showContactDetails={showContactDetails}
    listeners={listeners}
  />
);


const mapStateToProps = state => ({
  superFundContactDetails: getSuperFundContactDetails(state),
  showContactDetails: getShowContactDetails(state),
});

export default connect(mapStateToProps)(SuperFundNoPaySuperContactDetails);
