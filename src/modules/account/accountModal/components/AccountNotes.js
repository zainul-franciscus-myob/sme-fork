import { TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getNotes } from '../accountModalSelectors';
import handleTextAreaChange from '../../../../components/handlers/handleTextAreaChange';

const AccountNotes = ({ notes, onChange }) => (
  <TextArea
    name="notes"
    label="Notes"
    value={notes}
    rows={3}
    resize="vertical"
    onChange={handleTextAreaChange(onChange)}
    width="xl"
  />
);

const mapStateToProps = state => ({
  notes: getNotes(state),
});

export default connect(mapStateToProps)(AccountNotes);
