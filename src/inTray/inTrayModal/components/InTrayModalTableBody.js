import {
  Button, Icons, RadioButton, Spinner, Table, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getSelectedId, getTableEntries } from '../InTrayModalSelectors';
import Thumbnail from '../../../components/Thumbnail/Thumbnail';
import styles from './InTrayModalTableBody.module.css';

const LoadingComponent = () => (
  <div className={styles.loading}>
    <Spinner size="small" />
    <span>Processing</span>
  </div>
);

const SubmittingComponent = () => (
  <div className={styles.loading}>
    <Spinner size="small" />
  </div>
);

const UploadDateComponent = ({
  uploadedDate, isUploading, isOcrInProgress, isSubmitting,
}) => {
  if (isUploading || isOcrInProgress) {
    return LoadingComponent();
  }

  if (isSubmitting) {
    return SubmittingComponent();
  }

  return uploadedDate;
};

const handleViewButtonClick = (handler, id) => (e) => {
  e.stopPropagation();

  handler(id);
};

const handleRadioButtonChange = handler => (e) => {
  const { value } = e.target;

  handler(value);
};

const InvoiceComponent = value => value || (
  <Tooltip triggerContent={<Icons.Info />}>
    Information not available
  </Tooltip>
);

const InTrayModalTableBody = ({
  tableConfig,
  entries,
  selectedId,
  onView,
  onSelect,
}) => {
  const rows = entries.map((entry) => {
    const {
      id,
      uploadId,
      thumbnailUri,
      uploadedDate,
      invoiceNumber,
      issuedDate,
      totalAmount,
      isUploading,
      isOcrInProgress,
      isSubmitting,
      showInvoiceDetails,
      showActions,
    } = entry;

    const radioButton = (
      <RadioButton
        name="selectedId"
        label="selectedId"
        hideLabel
        value={id}
        checked={selectedId === id}
        disabled={isUploading}
        onChange={handleRadioButtonChange(onSelect)}
      />
    );

    const onRowSelect = !isUploading ? () => onSelect(id) : undefined;

    return (
      <Table.Row onRowSelect={onRowSelect} key={`${id}-${uploadId}`}>
        <Table.RowItem {...tableConfig.radioButton}>
          {radioButton}
        </Table.RowItem>
        <Table.RowItem {...tableConfig.thumbnail}>
          <Thumbnail
            isUploading={isUploading}
            thumbnailUri={thumbnailUri}
            alt={uploadedDate}
          />
        </Table.RowItem>
        <Table.RowItem {...tableConfig.uploadedDate}>
          { UploadDateComponent({
            uploadedDate, isUploading, isOcrInProgress, isSubmitting,
          })}
        </Table.RowItem>
        <Table.RowItem {...tableConfig.invoiceNumber}>
          {showInvoiceDetails && InvoiceComponent(invoiceNumber)}
        </Table.RowItem>
        <Table.RowItem {...tableConfig.issuedDate}>
          {showInvoiceDetails && InvoiceComponent(issuedDate)}
        </Table.RowItem>
        <Table.RowItem {...tableConfig.amount}>
          {showInvoiceDetails && InvoiceComponent(totalAmount)}
        </Table.RowItem>
        <Table.RowItem {...tableConfig.action} cellRole="actions">
          {showActions && (
            <Button type="link" onClick={handleViewButtonClick(onView, id)} onKeyUp={() => {}} icon={<Icons.Show />}>
              View
            </Button>
          )}
        </Table.RowItem>
      </Table.Row>
    );
  });

  return (
    <Table.Body>
      {rows}
    </Table.Body>
  );
};

const mapStateToProps = state => ({
  entries: getTableEntries(state),
  selectedId: getSelectedId(state),
});

export default connect(mapStateToProps)(InTrayModalTableBody);
