import { TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getNotes } from '../../ContactModalSelectors';
import handleInputChange from '../../../../../components/handlers/handleInputChange';

const Notes = ({ notes, onChange }) => (
  <TextArea
    name="notes"
    label="Notes"
    autoSize
    rows={3}
    maxLength={255}
    resize="vertical"
    value={notes}
    onChange={handleInputChange(onChange)}
  />
);

const mapStateToProps = (state) => ({
  notes: getNotes(state),
});

export default connect(mapStateToProps)(Notes);
