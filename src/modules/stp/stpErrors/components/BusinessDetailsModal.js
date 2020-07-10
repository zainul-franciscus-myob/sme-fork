import { Alert, Button, Input, Modal, Select } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAbnBranch,
  getAbnWpn,
  getBusinessDetailModalAlertMessage,
  getBusinessDetailsErrors,
  getBusinessDetailsModalIsLoading,
  getBusinessName,
  getCity,
  getCountry,
  getPostcode,
  getShowCountryField,
  getState,
  getStreetAddress1,
  getStreetAddress2,
} from '../stpErrorsSelectors';
import AbnInput from '../../../../components/autoFormatter/AbnInput/AbnInput';
import CountryCombobox from '../../../../components/combobox/CountryCombobox';
import LoadingPageState from '../../../../components/LoadingPageState/LoadingPageState';
import States from '../../common/States';
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
  businessDetailErrors,
  showCountryField,
}) => {
  const onComboBoxChange = (handler, key) => (option) => {
    const { id: value } = option;
    handler({ key, value });
  };

  const alertContent = alertMessage || (
    <>
      <p>The following need to be fixed for Single Touch Payroll reporting</p>
      <ul>
        {businessDetailErrors.map((e) => (
          <li key={e.error}>{e.error}</li>
        ))}
      </ul>
    </>
  );

  const modalBody = isLoading ? (
    <LoadingPageState />
  ) : (
    <>
      <Alert type="danger">{alertContent}</Alert>
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
        label="Address"
        name="streetAddress1"
        value={streetAddress1}
        onChange={handleInputChange(onFieldChange)}
        requiredLabel="This is required"
      />
      <Input
        name="streetAddress2"
        value={streetAddress2}
        onChange={handleInputChange(onFieldChange)}
      />
      <Input
        label="Suburb/town/locality"
        name="city"
        value={city}
        onChange={handleInputChange(onFieldChange)}
        requiredLabel="This is required"
        width="md"
      />
      <Select
        name="state"
        label="State/territory"
        value={state}
        onChange={handleInputChange(onFieldChange)}
        requiredLabel="This is required"
        width="xs"
      >
        {States.all.map((s) => (
          <Select.Option value={s} label={s} />
        ))}
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
        <CountryCombobox
          label="Country"
          name="country"
          selectedId={country}
          onChange={onComboBoxChange(onFieldChange, 'country')}
          width="lg"
        />
      )}
    </>
  );

  const modalFooter = isLoading ? null : (
    <Modal.Footer>
      <Button type="secondary" onClick={onCancelClick}>
        Cancel
      </Button>
      <Button type="primary" onClick={onSaveClick}>
        Save
      </Button>
    </Modal.Footer>
  );

  return (
    <Modal title="Business details" onCancel={onCancelClick}>
      <Modal.Body>{modalBody}</Modal.Body>
      {modalFooter}
    </Modal>
  );
};

const mapStateToProps = (state) => ({
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
  showCountryField: getShowCountryField(state),
  businessDetailErrors: getBusinessDetailsErrors(state),
});

export default connect(mapStateToProps)(BusinessDetailsModal);
