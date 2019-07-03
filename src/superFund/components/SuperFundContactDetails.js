import {
  Button, Field, Icons, Input,
} from '@myob/myob-widgets';
import React from 'react';

const onInputChange = handler => (e) => {
  const { value, name } = e.target;
  handler({ key: name, value });
};

const SuperFundContactDetails = ({
  superFundContactDetails,
  listeners: { onShowContactDetails, onUpdateSuperFundDetail },
  showContactDetails,
}) => (showContactDetails
  ? (
    <React.Fragment>
      <Input name="phoneNumber" label="Phone" value={superFundContactDetails.phoneNumber} maxLength={13} onChange={onInputChange(onUpdateSuperFundDetail)} />
      <Input name="webSite" label="Website" value={superFundContactDetails.webSite} maxLength={225} onChange={onInputChange(onUpdateSuperFundDetail)} />
    </React.Fragment>
  )
  : (
    <Field
      label="Show contact details"
      hideLabel
      renderField={
        () => (
          <Button type="link" icon={<Icons.Add />} onClick={onShowContactDetails}>
            Add fund contact details
          </Button>
        )
      }
    />
  )
);

export default SuperFundContactDetails;
