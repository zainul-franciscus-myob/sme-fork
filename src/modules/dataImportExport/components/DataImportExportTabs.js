import { Tabs } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTab } from '../selectors/DataImportExportSelectors';
import TabItem from '../types/TabItem';

const DataImportExportTabs = ({ selectedTab, onSelectTab }) => (
  <Tabs
    items={[
      {
        id: TabItem.IMPORT,
        label: 'Import',
      },
      {
        id: TabItem.EXPORT,
        label: 'Export',
      },
    ]}
    selected={selectedTab}
    onSelected={onSelectTab}
  />
);

const mapStateToProps = (state) => ({
  selectedTab: getTab(state),
});

export default connect(mapStateToProps)(DataImportExportTabs);
