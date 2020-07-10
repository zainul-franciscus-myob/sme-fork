import { connect } from 'react-redux';
import React from 'react';

import {
  getShowContactDetails,
  getSuperFundContactDetails,
} from '../SuperFundWithPaySuperSelectors';
import SuperFundContactDetails from '../../components/SuperFundContactDetails';

const SuperFundWithPaySuperContactDetails = ({
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

const mapStateToProps = (state) => ({
  superFundContactDetails: getSuperFundContactDetails(state),
  showContactDetails: getShowContactDetails(state),
});

export default connect(mapStateToProps)(SuperFundWithPaySuperContactDetails);
