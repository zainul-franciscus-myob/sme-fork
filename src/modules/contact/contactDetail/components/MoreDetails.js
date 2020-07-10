import { FieldGroup, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getMoreDetails } from '../contactDetailSelectors';

const onInputChange = (handler) => (e) => {
  const { value, name } = e.target;
  handler({ key: name, value });
};

const MoreDetails = (props) => {
  const { notes, onContactDetailsChange } = props;

  return (
    <FieldGroup label="More information">
      <TextArea
        name="notes"
        label="Notes"
        autoSize
        rows={3}
        maxLength={255}
        resize="vertical"
        value={notes}
        onChange={onInputChange(onContactDetailsChange)}
        width="lg"
      />
    </FieldGroup>
  );
};

const mapStateToProps = (state) => getMoreDetails(state);

export default connect(mapStateToProps)(MoreDetails);
