import {
  BulkActions, Button, Dropdown, Icons, Separator,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAreActionsDisabled,
  getCustomersSelected,
  getIsDownloadPDFDisabled,
  getIsSomeSelected,
} from '../selectors/customerStatementListSelectors';
import PDFType from '../PDFType';

const CustomerStatementListTableActions = ({
  isSomeSelected,
  isDownloadPDFDisabled,
  areActionsDisabled,
  customersSelected,
  onSelectPDFDropdown,
  onClickEmailButton,
}) => {
  const items = [
    <Dropdown.Item
      key={PDFType.DEFAULT_TEMPLATE}
      label="Use default template"
      value={PDFType.DEFAULT_TEMPLATE}
      disabled={areActionsDisabled}
    />,
    <Dropdown.Item
      key={PDFType.CHOOSE_TEMPLATE}
      label="Choose template..."
      value={PDFType.CHOOSE_TEMPLATE}
      disabled={areActionsDisabled}
    />,
  ];

  const PDFDropdown = (
    <Dropdown
      onSelect={onSelectPDFDropdown}
      toggle={(
        <Dropdown.Toggle disabled={areActionsDisabled || isDownloadPDFDisabled}>
          Download PDF
          {' '}
          <Icons.Caret />
        </Dropdown.Toggle>
      )}
      items={items}
    />
  );

  const PDFDisabledText = isDownloadPDFDisabled ? '(PDF\'s cannot be downloaded with 30 or more customers selected)' : '';

  return isSomeSelected && (
    <BulkActions>
      {PDFDropdown}
      <Button type="secondary" onClick={onClickEmailButton} disabled={areActionsDisabled}>Email</Button>
      <Separator direction="vertical" />
      {`${customersSelected} customers selected ${PDFDisabledText}`}
    </BulkActions>
  );
};

const mapStateToProps = state => ({
  isSomeSelected: getIsSomeSelected(state),
  isDownloadPDFDisabled: getIsDownloadPDFDisabled(state),
  areActionsDisabled: getAreActionsDisabled(state),
  customersSelected: getCustomersSelected(state),
});

export default connect(mapStateToProps)(CustomerStatementListTableActions);
