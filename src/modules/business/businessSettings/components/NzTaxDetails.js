import { Input } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getNzTaxDetails } from '../businessSettingsSelectors';

const onInputChange = (handler) => (e) => {
  const { value, name } = e.target;
  handler({ key: name, value });
};

const NzTaxDetails = ({ irdNumber, nzbn, onChange }) => (
  <React.Fragment>
    <Input
      name="irdNumber"
      label="IRD Number/GST Number"
      value={irdNumber}
      onChange={onInputChange(onChange)}
      width="sm"
    />
    <Input
      name="nzbn"
      label="NZ Business Number (NZBN)"
      maxLength={19}
      value={nzbn}
      onChange={onInputChange(onChange)}
      width="sm"
    />
  </React.Fragment>
);

const mapStateToProps = (state) => getNzTaxDetails(state);

export default connect(mapStateToProps)(NzTaxDetails);
