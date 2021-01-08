import { FormHorizontal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import * as selectors from '../EmploymentDetailsSelectors';
import Employment from './Employment';
import KiwiSaver from './KiwiSaver';
import TaxDeclaration from './TaxDeclaration';

const handleOnBlurWithKey = (key, handler) => ({ target: { value } }) => {
  handler({ key, value });
};

const EmploymentDetailsNzTab = ({
  employmentDetails,
  employmentStatusOptions,
  onEmploymentDetailsChange,

  taxDetails,
  taxCodeOptions,
  onTaxDetailsChange,

  kiwiSaverDetails,
  kiwiSaverOptions,
  onKiwiSaverDetailsChange,
}) => (
  <FormHorizontal layout="primary">
    <Employment
      employmentDetails={employmentDetails}
      employmentStatusOptions={employmentStatusOptions}
      onEmploymentDetailsChange={onEmploymentDetailsChange}
    />
    <TaxDeclaration
      taxDetails={taxDetails}
      taxCodeOptions={taxCodeOptions}
      onTaxDetailsChange={onTaxDetailsChange}
      handleOnBlurWithKey={handleOnBlurWithKey}
    />
    <KiwiSaver
      kiwiSaverDetails={kiwiSaverDetails}
      kiwiSaverOptions={kiwiSaverOptions}
      onKiwiSaverDetailsChange={onKiwiSaverDetailsChange}
      handleOnBlurWithKey={handleOnBlurWithKey}
    />
    {/* <PaymentDetails /> */}
  </FormHorizontal>
);

const mapStateToProps = (state) => ({
  employmentDetails: selectors.getEmploymentDetails(state),
  employmentStatusOptions: selectors.getEmploymentStatusOptions(state),
  taxDetails: selectors.getTaxDetails(state),
  taxCodeOptions: selectors.getTaxCodeOptions(state),
  kiwiSaverDetails: selectors.getKiwiSaverDetails(state),
  kiwiSaverOptions: selectors.getKiwiSaverOptions(state),
});

export default connect(mapStateToProps)(EmploymentDetailsNzTab);
