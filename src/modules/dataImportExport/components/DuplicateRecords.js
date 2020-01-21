import {
  Select,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getDuplicateRecordsOption, getIsDuplicateRecordsAddShown } from '../selectors/DataImportExportSelectors';
import DuplicateRecordOption from '../types/DuplicateRecordOption';
import handleSelectChange from '../../../components/handlers/handleSelectChange';

const DuplicateRecords = ({
  duplicateRecordsOption,
  onDuplicateRecordsOptionChange,
  isDuplicateRecordsAddShown,
}) => (
  <Select
    label="If duplicate records are found"
    value={duplicateRecordsOption}
    requiredLabel="This is required"
    onChange={handleSelectChange(onDuplicateRecordsOptionChange)}
  >
    <Select.Option value={DuplicateRecordOption.UPDATE_EXISTING} label="Update existing data" />
    <Select.Option value={DuplicateRecordOption.REJECT} label="Reject duplicates" />
    {isDuplicateRecordsAddShown && <Select.Option value={DuplicateRecordOption.ADD} label="Add duplicates" />}
  </Select>
);

const mapStateToProps = state => ({
  duplicateRecordsOption: getDuplicateRecordsOption(state),
  isDuplicateRecordsAddShown: getIsDuplicateRecordsAddShown(state),
});

export default connect(mapStateToProps)(DuplicateRecords);
