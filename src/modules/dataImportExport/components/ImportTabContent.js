import { FormHorizontal, Select } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getCurrentDataTypeInCurrentTab } from '../selectors/DataImportExportSelectors';
import ImportChartOfAccountsDetail from './ImportChartOfAccountsDetail';
import ImportContactsDetail from './ImportContactsDetail';
import ImportEmployeesDetail from './ImportEmployeesDetail';
import ImportExportDataType from '../types/ImportExportDataType';
import ImportGeneralJournalsDetail from './ImportGeneralJournalsDetail';
import ImportItemsDetail from './ImportItemsDetail';
import ImportTimesheetsDetail from './ImportTimesheetsDetail';
import ImportTransactionJournalsDetail from './ImportTransactionJournalsDetail';
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
      {/* TODO: Enable when Imports endpoints are implemented. */}
      {false && <Select.Option value={ImportExportDataType.CONTACTS} label="Contacts" />}
      {false && <Select.Option value={ImportExportDataType.EMPLOYEES} label="Employees" />}
      {false && <Select.Option value={ImportExportDataType.GENERAL_JOURNALS} label="General journals" />}
      {false && <Select.Option value={ImportExportDataType.ITEMS} label="Items" />}
      {false && <Select.Option value={ImportExportDataType.TIMESHEETS} label="Timesheets" />}
      {false && <Select.Option value={ImportExportDataType.TRANSACTION_JOURNALS} label="Transaction journals" />}
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
      [ImportExportDataType.EMPLOYEES]: <ImportEmployeesDetail
        onFileSelected={onFileSelected}
        onFileRemove={onFileRemove}
        onDuplicateRecordsOptionChange={onDuplicateRecordsOptionChange}
        updateContactsIdentifyBy={updateContactsIdentifyBy}
      />,
      [ImportExportDataType.ITEMS]: <ImportItemsDetail
        onFileSelected={onFileSelected}
        onFileRemove={onFileRemove}
        onDuplicateRecordsOptionChange={onDuplicateRecordsOptionChange}
      />,
      [ImportExportDataType.GENERAL_JOURNALS]: <ImportGeneralJournalsDetail
        onFileSelected={onFileSelected}
        onFileRemove={onFileRemove}
      />,
      [ImportExportDataType.TRANSACTION_JOURNALS]: <ImportTransactionJournalsDetail
        onFileSelected={onFileSelected}
        onFileRemove={onFileRemove}
      />,
      [ImportExportDataType.TIMESHEETS]: <ImportTimesheetsDetail
        onFileSelected={onFileSelected}
        onFileRemove={onFileRemove}
        updateContactsIdentifyBy={updateContactsIdentifyBy}
      />,
    }[selectedDataType]}
  </FormHorizontal>
);

const mapStateToProps = state => ({
  selectedDataType: getCurrentDataTypeInCurrentTab(state, TabItem.IMPORT),
});

export default connect(mapStateToProps)(ImportTabContent);
