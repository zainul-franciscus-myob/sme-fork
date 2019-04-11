import { FieldGroup, Input, ReadOnly } from '@myob/myob-widgets';
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
  <FieldGroup label="Business Details" hideLabel>
    <ReadOnly name="serialNumber" label="MYOB serial number">
      {serialNumber}
    </ReadOnly>
    <Input
      name="organisationName"
      label="Organisation name"
      value={organisationName}
      onChange={onInputChange(onChange)}
    />
    {isAu ? <AuTaxDetails onChange={onChange} /> : <NzTaxDetails onChange={onChange} />}
  </FieldGroup>
);

BusinessDetailsSection.propTypes = {
  serialNumber: PropTypes.string.isRequired,
  organisationName: PropTypes.string.isRequired,
  isAu: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  ...getBusinessDetails(state),
  isAu: getIsRegionAu(state),
});

export default connect(mapStateToProps)(BusinessDetailsSection);
