import {
  FieldGroup, Input, TextArea,
} from '@myob/myob-widgets';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import { getContactDetails } from '../contactDetailSelectors';

const onInputChange = handler => (e) => {
  const { value, name } = e.target;
  handler({ key: name, value });
};

const ContactDetails = ({
  companyName,
  abn,
  notes,
  isCompany,
  firstName,
  lastName,
  onContactDetailsChange,
}) => (
  <FieldGroup label="Contact details">
    {isCompany
    && <Input name="companyName" label="Company name" value={companyName} onChange={onInputChange(onContactDetailsChange)} />
    }
    {!isCompany
    && <Input name="lastName" label="Last name" value={lastName} onChange={onInputChange(onContactDetailsChange)} />
    }
    {!isCompany
    && <Input name="firstName" label="First name" value={firstName} onChange={onInputChange(onContactDetailsChange)} />
    }
    <Input
      name="abn"
      label="ABN"
      maxLength={11}
      placeholder="Must be 11 characters"
      value={abn}
      onChange={onInputChange(onContactDetailsChange)}
    />
    <TextArea
      name="notes"
      label="Notes"
      autoSize
      maxLength={255}
      placeholder="Max 255 characters"
      resize="vertical"
      value={notes}
      onChange={onInputChange(onContactDetailsChange)}
    />
  </FieldGroup>
);

ContactDetails.propTypes = {
  companyName: PropTypes.string.isRequired,
  abn: PropTypes.string.isRequired,
  notes: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  isCompany: PropTypes.bool.isRequired,
  onContactDetailsChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => getContactDetails(state);

export default connect(mapStateToProps)(ContactDetails);
