import { Card } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTab } from '../selectors/DataImportExportSelectors';
import ExportTabContent from './ExportTabContent';
import ImportTabContent from './ImportTabContent';
import TabItem from '../types/TabItem';

const DataImportExportContent = ({
  selectedTab,
  importChartOfAccountsListeners,
  onDataTypeChange,
  exportChartOfAccountsListeners,
}) => (
  <Card>
    {{
      [TabItem.IMPORT]: <ImportTabContent
        importChartOfAccountsListeners={importChartOfAccountsListeners}
        onDataTypeChange={onDataTypeChange}
      />,
      [TabItem.EXPORT]: <ExportTabContent
        onDataTypeChange={onDataTypeChange}
        exportChartOfAccountsListeners={exportChartOfAccountsListeners}
      />,
    }[selectedTab]}
  </Card>
);

const mapStateToProps = state => ({
  selectedTab: getTab(state),
});

export default connect(mapStateToProps)(DataImportExportContent);
