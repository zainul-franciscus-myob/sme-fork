import { TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getNotes } from '../accountDetailSelectors';
import handleTextAreaChange from '../../../components/handlers/handleTextAreaChange';
import style from './AccountNotes.module.css';


const AccountNotes = ({ notes, onChange }) => (
  <div className={style.notes}>
    <TextArea
      name="notes"
      label="Notes"
      value={notes}
      rows={3}
      resize="vertical"
      onChange={handleTextAreaChange(onChange)}
    />
  </div>
);

const mapStateToProps = state => ({
  notes: getNotes(state),
});

export default connect(mapStateToProps)(AccountNotes);
