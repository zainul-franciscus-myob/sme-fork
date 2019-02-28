import { Input } from '@myob/myob-widgets';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import { getBusinessDetails, getIsRegionAu } from '../businessDetailSelectors';
import AuTaxDetails from './AuTaxDetails';
import NzTaxDetails from './NzTaxDetails';

const onInputChange = handler => (e) => {
  const { value, name } = e.target;
  handler({ key: name, value });
};

const BusinessDetailsSection = ({
  serialNumber, organisationName, isAu, onChange,
}) => (
  <div>
    <Input
      name="serialNumber"
      label="MYOB serial number"
      disabled
      value={serialNumber}
    />
    <Input
      name="organisationName"
      label="Organisation Name"
      value={organisationName}
      onChange={onInputChange(onChange)}
    />
    {isAu ? <AuTaxDetails onChange={onChange} /> : <NzTaxDetails onChange={onChange} />}

  </div>
);

BusinessDetailsSection.propTypes = {
  serialNumber: PropTypes.string.isRequired,
  organisationName: PropTypes.string.isRequired,
  isAu: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  ...getBusinessDetails(state),
  isAu: getIsRegionAu(state),
});

export default connect(mapStateToProps)(BusinessDetailsSection);
