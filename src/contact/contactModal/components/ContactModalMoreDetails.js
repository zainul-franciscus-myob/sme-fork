import { FieldGroup } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getNotes } from '../ContactModalSelectors';
import Notes from './inputs/Notes';

const ContactModalMoreDetails = ({ onChange }) => (
  <FieldGroup label="More information">
    <Notes onChange={onChange} />
  </FieldGroup>
);

const mapStateToProps = state => ({
  notes: getNotes(state),
});

export default connect(mapStateToProps)(ContactModalMoreDetails);
