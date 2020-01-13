import {
  Alert,
  Button,
  Input,
  Modal,
  PageState,
  Spinner,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getEmail,
  getIsLoading,
  getIsOpen,
  getPassword,
} from '../stsLoginSelectors';
import handleInputChange from '../../../../components/handlers/handleInputChange';

const StsLoginModal = ({
  isOpen,
  isLoading,
  alert,
  email,
  password,
  updateLoginInfo,
  onCancelButtonClick,
  onLoginClick,
}) => {
  const loading = (
    <PageState
      title="Loading"
      image={<Spinner size="large" />}
    />
  );

  const modalBody = (
    <>
      {alert && <Alert type="danger">{alert}</Alert>}
      <Input
        name="email"
        label="Email"
        value={email}
        onChange={handleInputChange(updateLoginInfo)}
      />
      <Input
        name="password"
        label="Password"
        type="password"
        value={password}
        onChange={handleInputChange(updateLoginInfo)}
      />
    </>
  );

  return isOpen && (
    <Modal title="Login to pay super" onCancel={onCancelButtonClick}>
      <Modal.Body>
        {isLoading ? loading : modalBody}
      </Modal.Body>
      <Modal.Footer>
        <Button testid="loginButton" onClick={onLoginClick}>
          Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = state => ({
  isOpen: getIsOpen(state),
  isLoading: getIsLoading(state),
  alert: getAlert(state),
  email: getEmail(state),
  password: getPassword(state),
});

export default connect(mapStateToProps)(StsLoginModal);
