import {
  Button,
  ButtonRow,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getIsCreating } from '../userDetailSelectors';

const UserDetailButtons = ({
  onCancelButtonClick,
  onSaveButtonClick,
  isCreating,
  onDeleteButtonClick,
  isSubmitting,
}) => (
  <ButtonRow
    primary={[
      <Button key="cancel" name="cancel" type="secondary" onClick={onCancelButtonClick}>
        Cancel
      </Button>,
      <Button key="save" name="save" type="primary" onClick={onSaveButtonClick}>
        {isCreating ? 'Save and Invite' : 'Save'}
      </Button>,
    ]}
    secondary={[
      !isCreating
      && (
        <Button
          key="delete"
          name="delete"
          type="secondary"
          onClick={onDeleteButtonClick}
          disabled={isSubmitting}
        >
          Delete
        </Button>
      ),
    ]}
  />
);

UserDetailButtons.propTypes = {
  onCancelButtonClick: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired,
  isCreating: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isCreating: getIsCreating(state),
});

export default connect(mapStateToProps)(UserDetailButtons);
