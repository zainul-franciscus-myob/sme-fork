import { connect } from 'react-redux';
import React from 'react';

import {
  getBusinessConnection,
  getBusinessContact,
  getIsLoading,
  getIsModalOpen,
} from '../AtoSettingsSelectors';
import BusinessConnection from './BusinessConnection';
import BusinessContact from './BusinessContact';
import EditAbnConfirmationModal from './EditAbnConfirmationModal';
import PageView from '../../../../../components/PageView/PageView';

const AtoSettingsView = ({
  isLoading,
  isModalOpen,
  businessContact,
  businessConnection,
  onBusinessContactChange,
  onEditBusinessContactClick,
  onEditBusinessConnectionClick,
  onEditBusinessConnectionConfirm,
  onEditBusinessConnectionCancel,
}) => {
  const confirmationModal = isModalOpen && (
    <EditAbnConfirmationModal
      onCancel={onEditBusinessConnectionCancel}
      onConfirm={onEditBusinessConnectionConfirm}
    />
  );

  const page = (
    <>
      {confirmationModal}
      <BusinessContact
        firstName={businessContact.firstName}
        lastName={businessContact.lastName}
        email={businessContact.email}
        phone={businessContact.phone}
        onBusinessContactChange={onBusinessContactChange}
        onEditBusinessContactClick={onEditBusinessContactClick}
      />
      <BusinessConnection
        abn={businessConnection.abn}
        softwareId={businessConnection.softwareId}
        onEditBusinessConnectionClick={onEditBusinessConnectionClick}
      />
    </>
  );

  return <PageView isLoading={isLoading} view={page} />;
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  isModalOpen: getIsModalOpen(state),
  businessContact: getBusinessContact(state),
  businessConnection: getBusinessConnection(state),
});

export default connect(mapStateToProps)(AtoSettingsView);