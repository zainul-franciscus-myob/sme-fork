import { Input } from '@myob/myob-widgets';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import { getNzTaxDetails } from '../businessDetailSelectors';

const onInputChange = handler => (e) => {
  const { value, name } = e.target;
  handler({ key: name, value });
};

const NzTaxDetails = ({ irdNumber, nzbn, onChange }) => (
  <div>
    <Input
      name="abn"
      label="IRD Number/GST Number"
      value={irdNumber}
      onChange={onInputChange(onChange)}
    />
    <Input
      name="nzbn"
      label="NZBN"
      value={nzbn}
      onChange={onInputChange(onChange)}
    />
  </div>
);

NzTaxDetails.propTypes = {
  irdNumber: PropTypes.string.isRequired,
  nzbn: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => getNzTaxDetails(state);

export default connect(mapStateToProps)(NzTaxDetails);
