import {
  RadioButton, RadioButtonGroup, Select,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getContactIdentifyBy,
  getContactType,
} from '../selectors/DataImportExportSelectors';
import ContactIdentifyBy from '../types/ContactIdentifyBy';
import ContactType from '../types/ContactType';
import DuplicateRecords from './DuplicateRecords';
import UploadFile from './UploadFile';
import handleRadioButtonChange from '../../../components/handlers/handleRadioButtonChange';
import handleSelectChange from '../../../components/handlers/handleSelectChange';

const ImportContactsDetail = ({
  onFileSelected,
  onFileRemove,
  onDuplicateRecordsOptionChange,
  contactIdentifyBy,
  contactType,
  updateContactsIdentifyBy,
  updateContactsType,
}) => (
  <>
    <RadioButtonGroup
      label="Contact type"
      onChange={handleRadioButtonChange('', updateContactsType)}
      requiredLabel="This is required"
      renderRadios={({ id, value, ...props }) => [
        <RadioButton
          {...props}
          checked={contactType === ContactType.CUSTOMER}
          key={ContactType.CUSTOMER}
          value={ContactType.CUSTOMER}
          label="Customer"
        />,
        <RadioButton
          {...props}
          checked={contactType === ContactType.SUPPLIER}
          key={ContactType.SUPPLIER}
          value={ContactType.SUPPLIER}
          label="Supplier"
        />,
      ]}
    />
    <UploadFile
      onFileSelected={onFileSelected}
      onFileRemove={onFileRemove}
    />
    <Select
      label="Match contacts using"
      value={contactIdentifyBy}
      requiredLabel="This is required"
      onChange={handleSelectChange(updateContactsIdentifyBy)}
    >
      <Select.Option value={ContactIdentifyBy.NAME} label="Company name or last name" />
      <Select.Option value={ContactIdentifyBy.DISPLAY_ID} label="Contact ID" />
      <Select.Option value={ContactIdentifyBy.ID} label="Record ID" />
    </Select>
    <DuplicateRecords
      onDuplicateRecordsOptionChange={onDuplicateRecordsOptionChange}
    />
  </>
);

const mapStateToProps = state => ({
  contactIdentifyBy: getContactIdentifyBy(state),
  contactType: getContactType(state),
});

export default connect(mapStateToProps)(ImportContactsDetail);
