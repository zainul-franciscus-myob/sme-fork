import { FormHorizontal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getCurrentDataTypeInCurrentTab, getImportDataTypes } from '../selectors/DataImportExportSelectors';
import DataTypeSection from './DataTypeSection';
import ImportChartOfAccountsDetail from './ImportChartOfAccountsDetail';
import ImportDataType from '../types/ImportExportDataType';
import TabItem from '../types/TabItem';

const ImportTabContent = ({
  selectedDataType,
  dataTypes,
  importChartOfAccountsListeners,
  onDataTypeChange,
}) => (
  <FormHorizontal layout="primary">
    <DataTypeSection
      type={TabItem.IMPORT}
      dataTypes={dataTypes}
      selectedDataType={selectedDataType}
      onChange={onDataTypeChange}
    />
    {selectedDataType && {
      [ImportDataType.CHART_OF_ACCOUNTS]: <ImportChartOfAccountsDetail
        importChartOfAccountsListeners={importChartOfAccountsListeners}
      />,
    }[selectedDataType]}
  </FormHorizontal>
);

const mapStateToProps = state => ({
  selectedDataType: getCurrentDataTypeInCurrentTab(state, TabItem.IMPORT),
  dataTypes: getImportDataTypes(state),
});

export default connect(mapStateToProps)(ImportTabContent);
