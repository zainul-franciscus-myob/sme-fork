import { FieldGroup, TextArea } from '@myob/myob-widgets';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import { getMoreDetails } from '../contactDetailSelectors';
import style from './MoreDetails.module.css';


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
      <span className={style.notes}>
        <TextArea
          name="notes"
          label="Notes"
          autoSize
          rows={3}
          maxLength={255}
          resize="vertical"
          value={notes}
          onChange={onInputChange(onContactDetailsChange)}
        />
      </span>
    </FieldGroup>
  );
};

MoreDetails.propTypes = {
  notes: PropTypes.string.isRequired,
  onContactDetailsChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => getMoreDetails(state);

export default connect(mapStateToProps)(MoreDetails);
