import { connect } from 'react-redux';
import React from 'react';

import {
  getIsTableEmpty, getIsTableLoading,
} from '../contactListSelector';
import ContactListTableBody from './ContactListTableBody';
import StickyTableBody from '../../../components/StickyTable/StickyTableBody';


const ContactListTable = ({
  isTableEmpty,
  isTableLoading,
  tableConfig,
  emptyTableView,
}) => (
  <StickyTableBody
    isLoading={isTableLoading}
    isEmpty={isTableEmpty}
    emptyView={emptyTableView}
  >
    <ContactListTableBody tableConfig={tableConfig} />
  </StickyTableBody>
);

const mapStateToProps = state => ({
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
});

export default connect(mapStateToProps)(ContactListTable);
