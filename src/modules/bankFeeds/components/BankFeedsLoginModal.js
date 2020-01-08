import {
  Button, Input, Modal,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getBankFeedsLoginDetails } from '../BankFeedsSelectors';
import handleInputChange from '../../../components/handlers/handleInputChange';

const BankFeedsLoginModal = ({
  onCancelBankFeedsLogin,
  onConfirmBankFeedsLogin,
  onUpdateBankFeedsLoginDetails,
  username,
  password,
}) => (
  <Modal title="Login to bank feeds" onCancel={onCancelBankFeedsLogin}>
    <Modal.Body>
      <Input
        name="username"
        label="Email"
        value={username}
        onChange={handleInputChange(onUpdateBankFeedsLoginDetails)}
      />
      <Input
        name="password"
        type="password"
        label="Password"
        value={password}
        onChange={handleInputChange(onUpdateBankFeedsLoginDetails)}
      />
    </Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCancelBankFeedsLogin}>Cancel</Button>
      <Button type="primary" onClick={onConfirmBankFeedsLogin}>OK</Button>
    </Modal.Footer>
  </Modal>
);

const mapStateToProps = state => getBankFeedsLoginDetails(state);

export default connect(mapStateToProps)(BankFeedsLoginModal);
