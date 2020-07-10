import { Button, Field, Icons, Input } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getShowContactDetails,
  getSuperFundContactDetails,
} from '../../selectors/SuperFundModalSelectors';
import handleInputChange from '../../../../../../components/handlers/handleInputChange';

const SuperFundContactDetails = ({
  superFundContactDetails,
  superFundModalListeners: { onShowContactDetails, onUpdateSuperFundDetail },
  showContactDetails,
}) =>
  showContactDetails ? (
    <>
      <Input
        name="phoneNumber"
        label="Phone"
        value={superFundContactDetails.phoneNumber}
        maxLength={13}
        onChange={handleInputChange(onUpdateSuperFundDetail)}
      />
      <Input
        name="webSite"
        label="Website"
        value={superFundContactDetails.webSite}
        maxLength={225}
        onChange={handleInputChange(onUpdateSuperFundDetail)}
      />
    </>
  ) : (
    <Field
      label="Show contact details"
      hideLabel
      renderField={() => (
        <Button type="link" icon={<Icons.Add />} onClick={onShowContactDetails}>
          Add fund contact details
        </Button>
      )}
    />
  );

const mapStateToProps = (state) => ({
  superFundContactDetails: getSuperFundContactDetails(state),
  showContactDetails: getShowContactDetails(state),
});

export default connect(mapStateToProps)(SuperFundContactDetails);
