import {
  FieldGroup, Icons, Input, Select, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getDetails } from '../../selectors/DeductionPayItemModalSelectors';
import AccountCombobox from '../../../../../components/combobox/AccountCombobox';
import handleComboboxChange from '../../../../../components/handlers/handleComboboxChange';
import handleInputChange from '../../../../../components/handlers/handleInputChange';
import handleSelectChange from '../../../../../components/handlers/handleSelectChange';

const DeductionPayItemDetails = ({
  name,
  linkedPayableAccountId,
  atoReportingCategory,
  accountOptions,
  atoReportCategoryOptions,
  onChange,
}) => (
  <FieldGroup label="Details">
    <Input
      label="Name"
      name="name"
      value={name}
      onChange={handleInputChange(onChange)}
      maxLength={31}
    />
    <AccountCombobox
      label="Linked payables account"
      hideLabel={false}
      items={accountOptions}
      selectedId={linkedPayableAccountId}
      onChange={handleComboboxChange('linkedPayableAccountId', onChange)}
    />
    <Select
      name="atoReportingCategory"
      label="ATO reporting category"
      value={atoReportingCategory}
      onChange={handleSelectChange(onChange)}
      labelAccessory={(
        <Tooltip triggerContent={<Icons.Info />}>
          Select the ATO reporting category if you&apos;re using Single Touch Payroll.
        </Tooltip>
      )}
    >
      {
        atoReportCategoryOptions.map(category => (
          <Select.Option key={category.value} value={category.value} label={category.name} />
        ))
      }
    </Select>
  </FieldGroup>
);

const mapStateToProps = state => getDetails(state);

export default connect(mapStateToProps)(DeductionPayItemDetails);
