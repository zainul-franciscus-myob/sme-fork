import {
  Button,
  ButtonRow,
  Card,
  FormHorizontal,
  Input,
} from '@myob/myob-widgets';
import React from 'react';

import handleInputChange from '../../../../../components/handlers/handleInputChange';

const BusinessContact = ({
  businessContact: { firstName, lastName, email, phone },
  onBusinessContactChange,
  onEditBusinessContactClick,
}) => {
  const cardBody = (
    <>
      <h3>Business contact details for the ATO</h3>
      <p>
        The ATO will use these details if they need to get in contact with
        someone from the business.
      </p>
      <FormHorizontal layout="primary">
        <Input
          name="firstName"
          label="First name"
          requiredLabel="This field is required"
          value={firstName}
          onChange={handleInputChange(onBusinessContactChange)}
          width="md"
        />
        <Input
          name="lastName"
          label="Surname or family name"
          requiredLabel="This field is required"
          value={lastName}
          onChange={handleInputChange(onBusinessContactChange)}
          width="md"
        />
        <Input
          name="email"
          label="Email"
          requiredLabel="This field is required"
          value={email}
          onChange={handleInputChange(onBusinessContactChange)}
          type="email"
          width="md"
        />
        <Input
          name="phone"
          label="Phone"
          requiredLabel="This field is required"
          value={phone}
          onChange={handleInputChange(onBusinessContactChange)}
          type="tel"
          width="sm"
        />
      </FormHorizontal>
      <ButtonRow>
        <Button onClick={onEditBusinessContactClick}>
          Update contact details
        </Button>
      </ButtonRow>
    </>
  );

  return <Card body={<Card.Body child={cardBody} />} />;
};

export default BusinessContact;
