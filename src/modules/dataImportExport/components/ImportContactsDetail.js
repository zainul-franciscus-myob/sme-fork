import {
  RadioButton, RadioButtonGroup,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getContactType,
} from '../selectors/DataImportExportSelectors';
import ContactType from '../types/ContactType';
import DuplicateRecords from './DuplicateRecords';
import IdentifyBy from './IdentifyBy';
import UploadFile from './UploadFile';
import handleRadioButtonChange from '../../../components/handlers/handleRadioButtonChange';

const ImportContactsDetail = ({
  onFileSelected,
  onFileRemove,
  onDuplicateRecordsOptionChange,
  contactType,
  onUpdateContactsIdentifyBy,
  onUpdateContactsType,
}) => (
  <>
    <RadioButtonGroup
      label="Contact type"
      onChange={handleRadioButtonChange('', onUpdateContactsType)}
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
    <IdentifyBy
      label="Match contacts using"
      onUpdateContactsIdentifyBy={onUpdateContactsIdentifyBy}
    />
    <DuplicateRecords
      onDuplicateRecordsOptionChange={onDuplicateRecordsOptionChange}
    />
  </>
);

const mapStateToProps = state => ({
  contactType: getContactType(state),
});

export default connect(mapStateToProps)(ImportContactsDetail);
