import { FormHorizontal, Select } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getCurrentDataTypeInCurrentTab } from '../selectors/DataImportExportSelectors';
import ImportChartOfAccountsDetail from './ImportChartOfAccountsDetail';
import ImportContactsDetail from './ImportContactsDetail';
import ImportExportDataType from '../types/ImportExportDataType';
import TabItem from '../types/TabItem';
import handleSelectChange from '../../../components/handlers/handleSelectChange';

const ImportTabContent = ({
  selectedDataType,
  onFileSelected,
  onFileRemove,
  onDuplicateRecordsOptionChange,
  onUpdateImportDataType,
  updateContactsIdentifyBy,
  updateContactsType,
}) => (
  <FormHorizontal layout="primary">
    <Select
      label="Data type"
      value={selectedDataType}
      requiredLabel="This is required"
      onChange={handleSelectChange(onUpdateImportDataType)}
    >
      <Select.Option hidden value={ImportExportDataType.NONE} label="" />
      <Select.Option value={ImportExportDataType.CHART_OF_ACCOUNTS} label="Chart of accounts" />
      {/* TODO: Display contacts after the endpoint is deployed. */}
      {false && <Select.Option value={ImportExportDataType.CONTACTS} label="Contacts" />}
    </Select>

    {selectedDataType && {
      [ImportExportDataType.CHART_OF_ACCOUNTS]: <ImportChartOfAccountsDetail
        onFileSelected={onFileSelected}
        onFileRemove={onFileRemove}
        onDuplicateRecordsOptionChange={onDuplicateRecordsOptionChange}
      />,
      [ImportExportDataType.CONTACTS]: <ImportContactsDetail
        onFileSelected={onFileSelected}
        onFileRemove={onFileRemove}
        onDuplicateRecordsOptionChange={onDuplicateRecordsOptionChange}
        updateContactsIdentifyBy={updateContactsIdentifyBy}
        updateContactsType={updateContactsType}
      />,
    }[selectedDataType]}
  </FormHorizontal>
);

const mapStateToProps = state => ({
  selectedDataType: getCurrentDataTypeInCurrentTab(state, TabItem.IMPORT),
});

export default connect(mapStateToProps)(ImportTabContent);
