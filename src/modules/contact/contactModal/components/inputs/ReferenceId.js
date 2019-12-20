import { Input } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getReferenceId } from '../../ContactModalSelectors';
import handleInputChange from '../../../../../components/handlers/handleInputChange';

const ReferenceId = ({ referenceId, onChange }) => (
  <Input
    name="referenceId"
    label="Contact ID"
    requiredLabel="This is required"
    value={referenceId}
    onChange={handleInputChange(onChange)}
    width="sm"
  />
);

const mapStateToProps = state => ({
  referenceId: getReferenceId(state),
});

export default connect(mapStateToProps)(ReferenceId);
