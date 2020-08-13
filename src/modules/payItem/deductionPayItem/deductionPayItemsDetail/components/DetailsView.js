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

import { getDetails, getShowEtpAlert } from '../DeductionPayItemSelectors';
import AccountCombobox from '../../../../../components/combobox/AccountCombobox';
import handleComboboxChange from '../../../../../components/handlers/handleComboboxChange';
import handleInputChange from '../../../../../components/handlers/handleInputChange';
import handleSelectChange from '../../../../../components/handlers/handleSelectChange';
import styles from './DeductionPayItemView.module.css';

const DetailsView = ({ details, onDetailsChange, showEtpAlert }) => (
  <FieldGroup label="Details">
    <Input
      label="Name"
      name="name"
      value={details.name}
      onChange={handleInputChange(onDetailsChange)}
      maxLength={31}
    />
    <AccountCombobox
      label="Linked payables account"
      hideLabel={false}
      items={details.accounts}
      selectedId={details.linkedPayableAccountId}
      onChange={handleComboboxChange('linkedPayableAccountId', onDetailsChange)}
    />
    <Select
      name="atoReportingCategory"
      label="ATO reporting category"
      value={details.atoReportingCategory}
      onChange={handleSelectChange(onDetailsChange)}
      labelAccessory={
        <Tooltip triggerContent={<Icons.Info />}>
          Select the ATO reporting category if you&apos;re using Single Touch
          Payroll.
        </Tooltip>
      }
    >
      {details.atoReportCategoryList.map((category) => (
        <Select.Option
          key={category.value}
          value={category.value}
          label={category.name}
        />
      ))}
    </Select>

    {showEtpAlert && (
      <div className={styles.etpAlert}>
        <Alert type="warning">
          Changing the ATO reporting category, does not update the category for
          previous pay runs recorded with the ATO.
        </Alert>
      </div>
    )}
  </FieldGroup>
);

const mapStateToProps = (state) => ({
  details: getDetails(state),
  showEtpAlert: getShowEtpAlert(state),
});

export default connect(mapStateToProps)(DetailsView);
