import { FieldGroup, Input, ReadOnly } from '@myob/myob-widgets';
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
  <FieldGroup label="Business Details">
    <ReadOnly name="serialNumber" label="MYOB serial number">
      {serialNumber}
    </ReadOnly>
    <Input
      name="organisationName"
      label="Business name"
      value={organisationName}
      requiredLabel="required"
      onChange={onInputChange(onChange)}
      width="xl"
    />
    {isAu ? <AuTaxDetails onChange={onChange} /> : <NzTaxDetails onChange={onChange} />}
  </FieldGroup>
);

const mapStateToProps = state => ({
  ...getBusinessDetails(state),
  isAu: getIsRegionAu(state),
});

export default connect(mapStateToProps)(BusinessDetailsSection);
