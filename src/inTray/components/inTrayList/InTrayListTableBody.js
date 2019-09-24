import {
  Dropdown, Icons, Spinner, Table, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classNames from 'classnames';

import { getTableEntries } from '../../selectors/InTrayListSelectors';
import actionTypes from '../../actionTypes';
import styles from './InTrayListTableBody.module.css';

const handleActionSelect = (handlers, id) => (action) => {
  const { onDelete, onDownload } = handlers;

  if (action === actionTypes.delete) {
    onDelete(id);
  }

  if (action === actionTypes.download) {
    onDownload(id);
  }
};

const ThumbnailComponent = ({ isUploading, thumbnailUri, alt }) => {
  const thumbnailClass = classNames({
    [styles.thumbnail]: true,
    [styles.thumbnailEmpty]: isUploading,
  });

  return (
    <div className={thumbnailClass}>
      {thumbnailUri && <img src={thumbnailUri} alt={alt} />}
    </div>
  );
};

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

const InvoiceComponent = value => value || (
  <Tooltip triggerContent={<Icons.Info />}>
    Information not available
  </Tooltip>
);

const ActionComponent = (handlers, id) => (
  <Dropdown
    right
    items={[
      <Dropdown.Item key={actionTypes.download} label="Download" value={actionTypes.download} />,
      <Dropdown.Item key={actionTypes.delete} label="Delete" value={actionTypes.delete} />,
    ]}
    onSelect={handleActionSelect(handlers, id)}
    toggle={(
      <Dropdown.Toggle size="xs">
        <Icons.More />
      </Dropdown.Toggle>
      )}
  />
);

const InTrayListTableBody = ({
  tableConfig,
  entries,
  onDelete,
  onDownload,
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

    return (
      <Table.Row key={`${id}-${uploadId}`}>
        <Table.RowItem {...tableConfig.thumbnail}>
          {ThumbnailComponent({ isUploading, thumbnailUri, uploadedDate })}
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
        <Table.RowItem {...tableConfig.totalAmount}>
          {showInvoiceDetails && InvoiceComponent(totalAmount)}
        </Table.RowItem>
        <Table.RowItem {...tableConfig.action} cellRole="actions">
          {showActions && ActionComponent({ onDelete, onDownload }, id)}
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
});

export default connect(mapStateToProps)(InTrayListTableBody);
