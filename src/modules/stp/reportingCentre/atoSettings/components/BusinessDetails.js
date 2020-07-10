import {
  Button,
  ButtonRow,
  Card,
  FormHorizontal,
  Input,
  Select,
} from '@myob/myob-widgets';
import React from 'react';

import AbnInput from '../../../../../components/autoFormatter/AbnInput/AbnInput';
import AutoFormatter from '../../../../../components/autoFormatter/AutoFormatterCore/AutoFormatter';
import CountryCombobox from '../../../../../components/combobox/CountryCombobox';
import States from '../../../common/States';
import handleInputChange from '../../../../../components/handlers/handleInputChange';

const BusinessDetails = ({
  businessDetails: {
    businessName,
    abn,
    branch,
    address1,
    address2,
    city,
    state,
    postcode,
    country,
  },
  showCountryField,
  onBusinessDetailsChange,
  onEditBusinessDetailsClick,
}) => {
  const onComboBoxChange = (handler, key) => (option) => {
    const { id: value } = option;
    handler({ key, value });
  };

  const cardBody = (
    <>
      <h3>Business details for the ATO</h3>
      <p>
        These are the details the ATO has for your business, keep this up to
        date.
      </p>
      <FormHorizontal layout="primary">
        <Input
          label="Business Name"
          name="businessName"
          value={businessName}
          onChange={handleInputChange(onBusinessDetailsChange)}
          requiredLabel="This is required"
        />
        <AbnInput
          label="ABN"
          name="abn"
          value={abn}
          onChange={handleInputChange(onBusinessDetailsChange)}
          requiredLabel="This is required"
          width="md"
        />
        <AutoFormatter
          label="GST branch number"
          name="branch"
          value={branch}
          width="xs"
          onChange={handleInputChange(onBusinessDetailsChange)}
          options={{
            numericOnly: true,
            blocks: [3],
          }}
        />
        <Input
          label="Address"
          name="address1"
          value={address1}
          onChange={handleInputChange(onBusinessDetailsChange)}
          requiredLabel="This is required"
        />
        <Input
          name="address2"
          value={address2}
          onChange={handleInputChange(onBusinessDetailsChange)}
        />
        <Input
          label="Suburb/town/locality"
          name="city"
          value={city}
          onChange={handleInputChange(onBusinessDetailsChange)}
          requiredLabel="This is required"
          width="md"
        />
        <Select
          label="State/territory"
          name="state"
          value={state}
          onChange={handleInputChange(onBusinessDetailsChange)}
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
          onChange={handleInputChange(onBusinessDetailsChange)}
          requiredLabel="This is required"
          width="xs"
        />
        {showCountryField && (
          <CountryCombobox
            label="Country"
            name="country"
            selectedId={country}
            onChange={onComboBoxChange(onBusinessDetailsChange, 'country')}
            width="lg"
          />
        )}
      </FormHorizontal>
      <ButtonRow>
        <Button onClick={onEditBusinessDetailsClick}>
          Update business details
        </Button>
      </ButtonRow>
    </>
  );

  return <Card body={<Card.Body child={cardBody} />} />;
};

export default BusinessDetails;
