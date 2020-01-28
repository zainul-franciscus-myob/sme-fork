import {
  Select,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getContactIdentifyBy,
} from '../selectors/DataImportExportSelectors';
import ContactIdentifyBy from '../types/ContactIdentifyBy';
import handleSelectChange from '../../../components/handlers/handleSelectChange';

const ImportContactsDetail = ({
  contactIdentifyBy,
  onUpdateContactsIdentifyBy,
  label,
}) => (
  <Select
    label={label}
    value={contactIdentifyBy}
    onChange={handleSelectChange(onUpdateContactsIdentifyBy)}
  >
    <Select.Option value={ContactIdentifyBy.NAME} label="Company name or last name" />
    <Select.Option value={ContactIdentifyBy.DISPLAY_ID} label="Contact ID" />
    <Select.Option value={ContactIdentifyBy.ID} label="Record ID - only for same company file" />
  </Select>
);

const mapStateToProps = state => ({
  contactIdentifyBy: getContactIdentifyBy(state),
});

export default connect(mapStateToProps)(ImportContactsDetail);
