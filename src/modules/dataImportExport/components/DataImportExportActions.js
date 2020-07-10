import { Button, ButtonRow } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsActionDisabled,
  getTab,
} from '../selectors/DataImportExportSelectors';
import TabItem from '../types/TabItem';

const DataImportExportActions = ({
  isActionDisabled,
  onSaveButtonClick,
  selectedTab,
}) => (
  <ButtonRow>
    <Button
      key="save"
      name={selectedTab}
      type="primary"
      onClick={onSaveButtonClick}
      disabled={isActionDisabled}
    >
      {
        {
          [TabItem.IMPORT]: 'Import',
          [TabItem.EXPORT]: 'Export',
        }[selectedTab]
      }
    </Button>
  </ButtonRow>
);

const mapStateToProps = (state) => ({
  isActionDisabled: getIsActionDisabled(state),
  selectedTab: getTab(state),
});

export default connect(mapStateToProps)(DataImportExportActions);
