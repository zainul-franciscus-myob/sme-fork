import {
  Select,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getContactIdentifyBy,
} from '../selectors/DataImportExportSelectors';
import ContactIdentifyBy from '../types/ContactIdentifyBy';
import UploadFile from './UploadFile';
import handleSelectChange from '../../../components/handlers/handleSelectChange';

const ImportTimesheetsDetail = ({
  onFileSelected,
  onFileRemove,
  contactIdentifyBy,
  updateContactsIdentifyBy,
}) => (
  <>
    <UploadFile
      onFileSelected={onFileSelected}
      onFileRemove={onFileRemove}
    />
    <Select
      label="Match employees using"
      value={contactIdentifyBy}
      requiredLabel="This is required"
      onChange={handleSelectChange(updateContactsIdentifyBy)}
    >
      <Select.Option value={ContactIdentifyBy.NAME} label="Company name or last name" />
      <Select.Option value={ContactIdentifyBy.DISPLAY_ID} label="Contact ID" />
      <Select.Option value={ContactIdentifyBy.ID} label="Record ID" />
    </Select>
  </>
);

const mapStateToProps = state => ({
  contactIdentifyBy: getContactIdentifyBy(state),
});

export default connect(mapStateToProps)(ImportTimesheetsDetail);
