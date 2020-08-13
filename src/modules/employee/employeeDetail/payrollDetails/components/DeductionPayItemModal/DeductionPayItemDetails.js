import {
  Alert,
  FieldGroup,
  Icons,
  Input,
  Select,
  Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getDetails,
  getShowEtpAlert,
} from '../../selectors/DeductionPayItemModalSelectors';
import AccountCombobox from '../../../../../../components/combobox/AccountCombobox';
import handleComboboxChange from '../../../../../../components/handlers/handleComboboxChange';
import handleInputChange from '../../../../../../components/handlers/handleInputChange';
import handleSelectChange from '../../../../../../components/handlers/handleSelectChange';

const DeductionPayItemDetails = ({ details, onChange, showEtpAlert }) => (
  <FieldGroup label="Details">
    <Input
      label="Name"
      name="name"
      value={details.name}
      onChange={handleInputChange(onChange)}
      maxLength={31}
    />
    <AccountCombobox
      label="Linked payables account"
      hideLabel={false}
      items={details.accountOptions}
      selectedId={details.linkedPayableAccountId}
      onChange={handleComboboxChange('linkedPayableAccountId', onChange)}
    />
    <Select
      name="atoReportingCategory"
      label="ATO reporting category"
      value={details.atoReportingCategory}
      onChange={handleSelectChange(onChange)}
      labelAccessory={
        <Tooltip triggerContent={<Icons.Info />}>
          Select the ATO reporting category if you&apos;re using Single Touch
          Payroll.
        </Tooltip>
      }
    >
      {details.atoReportCategoryOptions.map((category) => (
        <Select.Option
          key={category.value}
          value={category.value}
          label={category.name}
        />
      ))}
    </Select>

    {showEtpAlert && (
      <Alert type="warning">
        Changing the ATO reporting category, does not update the category for
        previous pay runs recorded with the ATO.
      </Alert>
    )}
  </FieldGroup>
);

const mapStateToProps = (state) => ({
  details: getDetails(state),
  showEtpAlert: getShowEtpAlert(state),
});

export default connect(mapStateToProps)(DeductionPayItemDetails);
