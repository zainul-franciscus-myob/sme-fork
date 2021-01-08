import { FormHorizontal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import * as selectors from '../StandardPayTabSelector';
import BasePayDetails from './BasePayDetails';
import PayItemsTable from './PayItemsTable';

const StandardPayTab = ({
  payCycleOptions,
  basePayDetails,
  onWageDetailsChange,
}) => (
  <FormHorizontal layout="primary">
    <BasePayDetails
      payCycleOptions={payCycleOptions}
      basePayDetails={basePayDetails}
      onWageDetailsChange={onWageDetailsChange}
    />
    <PayItemsTable onWageDetailsChange={onWageDetailsChange} />
  </FormHorizontal>
);

const mapStateToProps = (state) => ({
  payCycleOptions: selectors.getPayCycleOptions(state),
  basePayDetails: selectors.getBasePayDetails(state),
});

export default connect(mapStateToProps)(StandardPayTab);
