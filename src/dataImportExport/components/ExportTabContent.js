import { FormHorizontal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getCurrentDataTypeInCurrentTab, getExportDataTypes } from '../selectors/DataImportExportSelectors';
import DataTypeSection from './DataTypeSection';
import ExportChartOfAccountsDetail from './ExportChartOfAccountsDetail';
import ImportExportDataType from '../types/ImportExportDataType';
import TabItem from '../types/TabItem';

const ExportTabContent = ({
  onDataTypeChange,
  exportChartOfAccountsListeners: {
    onExportChartOfAccountsDetailChange,
  },
  selectedDataType,
  dataTypes,
}) => (
  <FormHorizontal layout="primary">
    <DataTypeSection
      type={TabItem.EXPORT}
      dataTypes={dataTypes}
      selectedDataType={selectedDataType}
      onChange={onDataTypeChange}
    />
    {selectedDataType && {
      [ImportExportDataType.CHART_OF_ACCOUNTS]: <ExportChartOfAccountsDetail
        onChange={onExportChartOfAccountsDetailChange}
      />,
    }[selectedDataType]}
  </FormHorizontal>
);

const mapStateToProps = state => ({
  selectedDataType: getCurrentDataTypeInCurrentTab(state, TabItem.EXPORT),
  dataTypes: getExportDataTypes(state),
});

export default connect(mapStateToProps)(ExportTabContent);
