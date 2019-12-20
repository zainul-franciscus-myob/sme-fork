import {
  Alert,
  Button,
  Input,
  Modal,
} from '@myob/myob-widgets';
import React from 'react';

import handleInputChange from '../../../components/handlers/handleInputChange';

const LoginModal = ({
  onCancelButtonClick,
  email,
  password,
  updateLoginInfo,
  onLoginClick,
  alert,
}) => (
  <Modal title="Login to pay super" onCancel={onCancelButtonClick}>
    <Modal.Body>
      {alert && <Alert type={alert.type}>{alert.message}</Alert>}
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
    </Modal.Body>
    <Modal.Footer>
      <Button testId="loginButton" onClick={onLoginClick}>Login</Button>
    </Modal.Footer>
  </Modal>
);

export default LoginModal;
