import {
  BulkActions, Button, Dropdown, Icons, Separator,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAreActionsDisabled, getCustomersSelected, getIsSomeSelected, getIsTableLoading,
} from '../selectors/customerStatementListSelectors';
import PDFType from '../PDFType';

const CustomerStatementListTableActions = ({
  isTableLoading,
  isSomeSelected,
  areActionsDisabled,
  customersSelected,
  onSelectPdfDropdown,
  onClickEmailButton,
}) => {
  const items = [
    <Dropdown.Item
      key={PDFType.DEFAULT_TEMPLATE}
      label="Use default template"
      value={PDFType.DEFAULT_TEMPLATE}
      disabled={isTableLoading || areActionsDisabled}
    />,
    <Dropdown.Item
      key={PDFType.CHOOSE_TEMPLATE}
      label="Choose template..."
      value={PDFType.CHOOSE_TEMPLATE}
      disabled={isTableLoading || areActionsDisabled}
    />,
  ];

  const pdfDropdown = (
    <Dropdown
      onSelect={onSelectPdfDropdown}
      toggle={(
        <Dropdown.Toggle disabled={isTableLoading || areActionsDisabled}>
          Download PDF
          {' '}
          <Icons.Caret />
        </Dropdown.Toggle>
      )}
      items={items}
    />
  );

  return isSomeSelected && (
    <BulkActions>
      {pdfDropdown}
      <Button type="secondary" onClick={onClickEmailButton} disabled={isTableLoading || areActionsDisabled}>Email</Button>
      <Separator direction="vertical" />
      {`${customersSelected} customers selected`}
    </BulkActions>
  );
};

const mapStateToProps = state => ({
  isTableLoading: getIsTableLoading(state),
  isSomeSelected: getIsSomeSelected(state),
  areActionsDisabled: getAreActionsDisabled(state),
  customersSelected: getCustomersSelected(state),
});

export default connect(mapStateToProps)(CustomerStatementListTableActions);
