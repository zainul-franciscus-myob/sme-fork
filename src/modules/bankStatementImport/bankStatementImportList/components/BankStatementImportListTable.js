import { Button, Icons } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsTableEmpty,
  getIsTableLoading,
} from '../BankStatementImportListSelectors';
import BankStatementImportListTableBody from './BankStatementImportListTableBody';
import NoResultPageState from '../../../../components/NoResultPageState/NoResultPageState';
import StickyTableBody from '../../../../components/StickyTable/StickyTableBody';

const BankStatementImportListTable = ({
  isTableLoading,
  isTableEmpty,
  tableConfig,
  onImportButtonClick,
  onDeleteButtonClick,
}) => {
  const emptyView = (
    <NoResultPageState
      title="There are no imported statements for this bank account"
      description="Import bank statement files to make it easier to keep your ledger updated."
      actions={[
        <Button type="link" icon={<Icons.Add />} onClick={onImportButtonClick}>
          Import statement file
        </Button>,
      ]}
    />
  );

  return (
    <StickyTableBody
      isLoading={isTableLoading}
      isEmpty={isTableEmpty}
      emptyView={emptyView}
    >
      <BankStatementImportListTableBody
        tableConfig={tableConfig}
        onDeleteButtonClick={onDeleteButtonClick}
      />
    </StickyTableBody>
  );
};

const mapStateToProps = (state) => ({
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
});

export default connect(mapStateToProps)(BankStatementImportListTable);
