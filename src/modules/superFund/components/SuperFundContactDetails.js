import {
  Button, Field, Icons, Input,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsCreating,
  getIsSMSFSuperFund,
} from '../superFundWithPaySuper/SuperFundWithPaySuperSelectors';

const onInputChange = handler => (e) => {
  const { value, name } = e.target;
  handler({ key: name, value });
};

const SuperFundContactDetails = ({
  superFundContactDetails,
  listeners: { onShowContactDetails, onUpdateSuperFundDetail },
  showContactDetails,
  isUpdateSMSFSuperFund,
}) => (showContactDetails
  ? (
    <React.Fragment>
      <Input name="phoneNumber" label="Phone" value={superFundContactDetails.phoneNumber} maxLength={13} onChange={onInputChange(onUpdateSuperFundDetail)} disabled={isUpdateSMSFSuperFund} />
      <Input name="webSite" label="Website" value={superFundContactDetails.webSite} maxLength={225} onChange={onInputChange(onUpdateSuperFundDetail)} disabled={isUpdateSMSFSuperFund} />
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

const mapStateToProps = state => ({
  isUpdateSMSFSuperFund: getIsSMSFSuperFund(state) && !getIsCreating(state),
});

export default connect(mapStateToProps)(SuperFundContactDetails);
