import {
  Button, Input, Modal,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getBankFeedsLoginDetails } from '../bankingSelectors/bankFeedsLoginSelectors';

const onInputChange = handler => (e) => {
  const { name, value } = e.target;
  handler({ key: name, value });
};

const BankFeedsLoginModal = ({
  onCancelBankFeedsLogin,
  onConfirmBankFeedsLogin,
  onUpdateBankFeedsLoginDetails,
  username,
  password,
}) => (
  <Modal title="Log in to bank feeds service" onCancel={onCancelBankFeedsLogin}>
    <Modal.Body>
      <Input
        name="username"
        label="Username"
        value={username}
        onChange={onInputChange(onUpdateBankFeedsLoginDetails)}
      />
      <Input
        name="password"
        type="password"
        label="Password"
        value={password}
        onChange={onInputChange(onUpdateBankFeedsLoginDetails)}
      />
    </Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCancelBankFeedsLogin}>Cancel</Button>
      <Button type="primary" onClick={onConfirmBankFeedsLogin}>OK</Button>
    </Modal.Footer>
  </Modal>
);

BankFeedsLoginModal.propTypes = {
  onCancelBankFeedsLogin: PropTypes.func.isRequired,
  onConfirmBankFeedsLogin: PropTypes.func.isRequired,
  onUpdateBankFeedsLoginDetails: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

const mapStateToProps = state => getBankFeedsLoginDetails(state);

export default connect(mapStateToProps)(BankFeedsLoginModal);
