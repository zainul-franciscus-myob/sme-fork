import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getAuthorisationCode,
  getEmail,
  getIsOpen,
  getModalType,
  getPassword,
} from '../paySuperAuthorisationModalSelector';
import AuthorisationModal from './AuthorisationModal';
import LoginModal from './LoginModal';
import ModalType from '../ModalType';

const PaySuperAuthorisationModal = ({
  authorisationModalListeners,
  loginModalListeners,
  isOpen,
  modalType,
  email,
  password,
  authorisationCode,
  alert,
}) => {
  if (!isOpen) {
    return null;
  }
  if (modalType === ModalType.AUTHORISE_CODE) {
    return (
      <AuthorisationModal
        authorisationCode={authorisationCode}
        alert={alert}
        {...authorisationModalListeners}
      />
    );
  }

  return (
    <LoginModal
      {...loginModalListeners}
      email={email}
      password={password}
      alert={alert}
    />
  );
};

const mapStateToProps = state => ({
  isOpen: getIsOpen(state),
  modalType: getModalType(state),
  email: getEmail(state),
  password: getPassword(state),
  authorisationCode: getAuthorisationCode(state),
  alert: getAlert(state),
});

export default connect(mapStateToProps)(PaySuperAuthorisationModal);
