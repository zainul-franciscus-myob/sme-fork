import { Dropdown, Icons, Select } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getEtpCodeCategory } from '../EmployeePayListSelectors';
import EtpCodeCategory from '../types/EtpCodeCategory';
import handleSelectChange from '../../../components/handlers/handleSelectChange';

const EtpModalSelect = ({ etpCodeCategory, onChangeEtpCodeCategory }) => (
  <Select
    label="Benefit type"
    name="etpCodeCategory"
    onChange={handleSelectChange(onChangeEtpCodeCategory)}
    selected={etpCodeCategory}
    toggle={(
      <Dropdown.Toggle>
            Select an option
        <Icons.Caret />
      </Dropdown.Toggle>
)}
  >
    <Select.Option value={undefined} label="Select an option" />
    <Select.Option value={EtpCodeCategory.LIFE} label="Life benefit ETP" />
    <Select.Option value={EtpCodeCategory.MULTIPLE} label="Multiple payments for same termination" />
    <Select.Option value={EtpCodeCategory.DEATH} label="Death benefit ETP" />
  </Select>
);

const mapStateToProps = state => ({
  etpCodeCategory: getEtpCodeCategory(state),
});

export default connect(mapStateToProps)(EtpModalSelect);
