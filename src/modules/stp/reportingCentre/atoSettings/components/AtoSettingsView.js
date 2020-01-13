import { connect } from 'react-redux';
import React from 'react';

import {
  getAgentContact,
  getAgentDetails,
  getBusinessConnection,
  getBusinessContact,
  getBusinessDetails,
  getIsAgent,
  getIsModalOpen,
  getLoadingState,
  getShowCountryField,
} from '../AtoSettingsSelectors';
import AgentContact from './AgentContact';
import BusinessConnection from './BusinessConnection';
import BusinessContact from './BusinessContact';
import BusinessDetails from './BusinessDetails';
import EditAbnConfirmationModal from './EditAbnConfirmationModal';
import PageView from '../../../../../components/PageView/PageView';

const AtoSettingsView = ({
  loadingState,
  isModalOpen,
  isAgent,
  agentDetails,
  businessDetails,
  businessContact,
  agentContact,
  businessConnection,
  showCountryField,
  onBusinessDetailsChange,
  onEditBusinessDetailsClick,
  onBusinessContactChange,
  onEditBusinessContactClick,
  onAgentContactChange,
  onEditAgentContactClick,
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

  const agentContactComponent = isAgent && (
    <AgentContact
      agentContact={agentContact}
      onBusinessContactChange={onAgentContactChange}
      onEditBusinessContactClick={onEditAgentContactClick}
    />
  );

  const page = (
    <>
      {confirmationModal}
      <BusinessDetails
        businessDetails={businessDetails}
        showCountryField={showCountryField}
        onBusinessDetailsChange={onBusinessDetailsChange}
        onEditBusinessDetailsClick={onEditBusinessDetailsClick}
      />
      <BusinessContact
        businessContact={businessContact}
        onBusinessContactChange={onBusinessContactChange}
        onEditBusinessContactClick={onEditBusinessContactClick}
      />
      {agentContactComponent}
      <BusinessConnection
        businessConnection={businessConnection}
        agentDetails={agentDetails}
        onEditBusinessConnectionClick={onEditBusinessConnectionClick}
      />
    </>
  );

  return <PageView loadingState={loadingState} view={page} />;
};

const mapStateToProps = state => ({
  loadingState: getLoadingState(state),
  isModalOpen: getIsModalOpen(state),
  isAgent: getIsAgent(state),
  agentDetails: getAgentDetails(state),
  businessDetails: getBusinessDetails(state),
  businessContact: getBusinessContact(state),
  agentContact: getAgentContact(state),
  businessConnection: getBusinessConnection(state),
  showCountryField: getShowCountryField(state),
});

export default connect(mapStateToProps)(AtoSettingsView);
