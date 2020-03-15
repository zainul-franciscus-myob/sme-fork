import { Input } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getDisplayId } from '../../JobModalSelectors';
import handleInputChange from '../../../../../components/handlers/handleInputChange';

const DisplayId = ({ displayId, onChange }) => (
  <Input
    name="displayId"
    label="DisplayId"
    autoSize
    maxLength={255}
    resize="vertical"
    value={displayId}
    onChange={handleInputChange(onChange)}
  />
);

const mapStateToProps = state => ({
  displayId: getDisplayId(state),
});

export default connect(mapStateToProps)(DisplayId);
