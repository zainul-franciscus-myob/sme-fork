import { connect } from 'react-redux';
import React from 'react';

import { getEditingMode } from '../AccountListSelectors';
import AccountListBulkEditView from './bulkEditList/AccountListBulkEditView';
import AccountListView from './readOnlyList/AccountListView';

const AccountListRootView = ({ editingMode, ...props }) =>
  editingMode ? (
    <AccountListBulkEditView {...props} />
  ) : (
    <AccountListView {...props} />
  );

const mapStateToProps = (state) => ({
  editingMode: getEditingMode(state),
});

export default connect(mapStateToProps)(AccountListRootView);
