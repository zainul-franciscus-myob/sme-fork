import { TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getJobDescription } from '../JobModalSelectors';
import handleInputChange from '../../../../components/handlers/handleInputChange';

const JobDescription = ({ description, onChange }) => (
  <TextArea
    name="description"
    label="Description"
    autoSize
    rows={3}
    resize="vertical"
    maxLength={255}
    value={description}
    onChange={handleInputChange(onChange)}
  />
);

const mapStateToProps = state => ({
  description: getJobDescription(state),
});

export default connect(mapStateToProps)(JobDescription);
