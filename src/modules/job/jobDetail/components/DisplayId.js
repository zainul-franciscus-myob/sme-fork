import { FieldGroup, Input } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getDisplayId } from '../jobDetailSelectors';
import handleInputChange from '../../../../components/handlers/handleInputChange';

const DisplayId = (props) => {
  const {
    displayId,
    onJobDetailsChange,
  } = props;

  return (
    <FieldGroup label="Job Details">
      <Input
        name="displayIid"
        label="DisplayId"
        autoSize
        maxLength={255}
        resize="vertical"
        value={displayId}
        onChange={handleInputChange(onJobDetailsChange)}
        width="lg"
      />
    </FieldGroup>
  );
};

const mapStateToProps = state => getDisplayId(state);

export default connect(mapStateToProps)(DisplayId);
