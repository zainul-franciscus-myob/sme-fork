import { Accordion } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getNotes } from '../ContactModalSelectors';
import Notes from './inputs/Notes';

const ContactModalMoreDetails = ({ onChange }) => (
  <Accordion label={'Notes'}>
    <Notes onChange={onChange} />
  </Accordion>
);

const mapStateToProps = (state) => ({
  notes: getNotes(state),
});

export default connect(mapStateToProps)(ContactModalMoreDetails);
