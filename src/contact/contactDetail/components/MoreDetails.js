import { FieldGroup, TextArea } from '@myob/myob-widgets';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import { getMoreDetails } from '../contactDetailSelectors';

const onInputChange = handler => (e) => {
  const { value, name } = e.target;
  handler({ key: name, value });
};

const MoreDetails = (props) => {
  const {
    notes,
    onContactDetailsChange,
  } = props;

  return (
    <FieldGroup label="More information">
      <TextArea
        name="notes"
        label="Notes"
        autoSize
        maxLength={255}
        resize="vertical"
        value={notes}
        onChange={onInputChange(onContactDetailsChange)}
      />
    </FieldGroup>
  );
};

MoreDetails.propTypes = {
  notes: PropTypes.string.isRequired,
  onContactDetailsChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => getMoreDetails(state);

export default connect(mapStateToProps)(MoreDetails);
