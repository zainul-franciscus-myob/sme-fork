import { FormHorizontal, Select } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getCurrentDataTypeInCurrentTab } from '../selectors/DataImportExportSelectors';
import ExportChartOfAccountsDetail from './ExportChartOfAccountsDetail';
import ExportCompanyFile from './ExportCompanyFile';
import ImportExportDataType from '../types/ImportExportDataType';
import TabItem from '../types/TabItem';
import handleSelectChange from '../../../components/handlers/handleSelectChange';

const ExportTabContent = ({
  onUpdateExportDataType,
  exportChartOfAccountsListeners: {
    onExportChartOfAccountsDetailChange,
  },
  exportCompanyFileListeners,
  selectedDataType,
}) => (
  <FormHorizontal layout="primary">
    <Select
      label="Data type"
      value={selectedDataType}
      requiredLabel="This is required"
      onChange={handleSelectChange(onUpdateExportDataType)}
    >
      <Select.Option hidden value={ImportExportDataType.NONE} label="" />
      <Select.Option value={ImportExportDataType.CHART_OF_ACCOUNTS} label="Chart of accounts" />
      <Select.Option value={ImportExportDataType.COMPANY_FILE} label="Data for your accountant" />
    </Select>
    {selectedDataType && {
      [ImportExportDataType.CHART_OF_ACCOUNTS]: <ExportChartOfAccountsDetail
        onChange={onExportChartOfAccountsDetailChange}
      />,
      [ImportExportDataType.COMPANY_FILE]: (
        <ExportCompanyFile onChange={exportCompanyFileListeners.onChange} />
      ),
    }[selectedDataType]}
  </FormHorizontal>
);

const mapStateToProps = state => ({
  selectedDataType: getCurrentDataTypeInCurrentTab(state, TabItem.EXPORT),
});

export default connect(mapStateToProps)(ExportTabContent);
