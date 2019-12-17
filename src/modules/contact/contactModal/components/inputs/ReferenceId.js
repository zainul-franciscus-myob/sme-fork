import { Input } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getReferenceId } from '../../ContactModalSelectors';
import handleInputChange from '../../../../../components/handlers/handleInputChange';
import style from './ReferenceId.module.css';


const ReferenceId = ({ referenceId, onChange }) => (
  <Input
    name="referenceId"
    label="Contact ID"
    requiredLabel="This is required"
    className={style.contactId}
    value={referenceId}
    onChange={handleInputChange(onChange)}
  />
);

const mapStateToProps = state => ({
  referenceId: getReferenceId(state),
});

export default connect(mapStateToProps)(ReferenceId);
