import {
  Alert, Button, Input, Modal, Select,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAbnBranch,
  getAbnWpn,
  getBusinessDetailModalAlertMessage,
  getBusinessDetailsModalIsLoading,
  getBusinessName,
  getCity,
  getCountry,
  getPostcode,
  getShouldShowCountryField,
  getState,
  getStreetAddress1,
  getStreetAddress2,
} from '../stpErrorsSelectors';
import AbnInput from '../../../../components/autoFormatter/AbnInput/AbnInput';
import LoadingPageState from '../../../../components/LoadingPageState/LoadingPageState';
import States from '../States';
import handleInputChange from '../../../../components/handlers/handleInputChange';

const BusinessDetailsModal = ({
  onCancelClick,
  onSaveClick,
  onFieldChange,
  isLoading,
  businessName,
  abnWpn,
  abnBranch,
  streetAddress1,
  streetAddress2,
  city,
  state,
  postcode,
  country,
  alertMessage,
  showCountryField,
}) => {
  if (isLoading) {
    return (
      <Modal
        title="Business details"
        onCancel={onCancelClick}
      >
        <Modal.Body>
          <LoadingPageState />
        </Modal.Body>
      </Modal>
    );
  }

  const selectOptions = States.all.map(s => (
    <Select.Option value={s} label={s} />
  ));

  return (
    <Modal
      title="Business details"
      onCancel={onCancelClick}
    >
      <Modal.Body>
        {alertMessage && (
          <Alert type="danger">{alertMessage}</Alert>
        )}
        <Input
          label="Business Name"
          name="businessName"
          value={businessName}
          onChange={handleInputChange(onFieldChange)}
          requiredLabel="This is required"
        />
        <AbnInput
          label="ABN"
          name="abnWpn"
          value={abnWpn}
          onChange={handleInputChange(onFieldChange)}
          requiredLabel="This is required"
          width="md"
        />
        <Input
          label="ABN branch"
          name="abnBranch"
          value={abnBranch}
          onChange={handleInputChange(onFieldChange)}
          width="xs"
        />
        <Input
          label="Address 1"
          name="streetAddress1"
          value={streetAddress1}
          onChange={handleInputChange(onFieldChange)}
          requiredLabel="This is required"
        />
        <Input
          label="Address 2"
          name="streetAddress2"
          value={streetAddress2}
          onChange={handleInputChange(onFieldChange)}
          requiredLabel="This is required"
        />
        <Input
          label="Suburb/town/locality"
          name="city"
          value={city}
          onChange={handleInputChange(onFieldChange)}
          requiredLabel="This is required"
        />
        <Select
          name="state"
          label="State/territory"
          value={state}
          onChange={handleInputChange(onFieldChange)}
          requiredLabel="This is required"
          width="xs"
        >
          {selectOptions}
        </Select>
        <Input
          label="Postcode"
          name="postcode"
          value={postcode}
          onChange={handleInputChange(onFieldChange)}
          requiredLabel="This is required"
          width="xs"
        />
        {showCountryField && (
          <Input
            label="Country"
            name="country"
            onChange={handleInputChange(onFieldChange)}
            value={country}
            width="md"
          />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button type="secondary" onClick={onCancelClick}>Cancel</Button>
        <Button type="primary" onClick={onSaveClick}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = state => ({
  isLoading: getBusinessDetailsModalIsLoading(state),
  businessName: getBusinessName(state),
  abnWpn: getAbnWpn(state),
  abnBranch: getAbnBranch(state),
  streetAddress1: getStreetAddress1(state),
  streetAddress2: getStreetAddress2(state),
  city: getCity(state),
  state: getState(state),
  postcode: getPostcode(state),
  country: getCountry(state),
  alertMessage: getBusinessDetailModalAlertMessage(state),
  showCountryField: getShouldShowCountryField(state),
});

export default connect(mapStateToProps)(BusinessDetailsModal);
