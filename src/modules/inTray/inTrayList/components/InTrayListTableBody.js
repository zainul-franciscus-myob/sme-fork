import { Dropdown, Icons, Spinner, Table, Tooltip } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classNames from 'classnames';

import {
  getAllowedActions,
  getTableEntries,
} from '../selectors/InTrayListSelectors';
import DropZoneHorizontal from '../../../../components/DropZone/DropZoneHorizontal';
import ScanIcon from '../../../../components/Icon/scan-icon/ScanIcon';
import actionTypes from '../actionTypes';
import styles from './InTrayListTableBody.module.css';

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

const UploadingComponent = () => (
  <div className={styles.loading}>
    <Spinner size="small" />
    <span>Uploading</span>
  </div>
);

const ScanningComponent = () => (
  <div className={styles.loading}>
    <ScanIcon />
    <span>Scanning</span>
  </div>
);

const SubmittingComponent = () => (
  <div className={styles.loading}>
    <Spinner size="small" />
  </div>
);

const UploadDateComponent = ({
  uploadedDate,
  isUploading,
  isOcrInProgress,
  isSubmitting,
}) => {
  if (isUploading) {
    return UploadingComponent();
  }

  if (isOcrInProgress) {
    return ScanningComponent();
  }

  if (isSubmitting) {
    return SubmittingComponent();
  }

  return uploadedDate;
};

const InvoiceComponent = (value) =>
  value || (
    <Tooltip triggerContent={<Icons.Info />}>Information not available</Tooltip>
  );

const getDropdownItem = (key, label, value) => (
  <Dropdown.Item key={key} label={label} value={value} />
);

const getItems = (allowedActions) => [
  allowedActions.includes(actionTypes.linkToExistingBill) &&
    getDropdownItem(
      actionTypes.linkToExistingBill,
      'Link to existing bill',
      actionTypes.linkToExistingBill
    ),
  allowedActions.includes(actionTypes.createBill) &&
    getDropdownItem(
      actionTypes.createBill,
      'Create bill',
      actionTypes.createBill
    ),
  allowedActions.includes(actionTypes.createSpendMoney) &&
    getDropdownItem(
      actionTypes.createSpendMoney,
      'Create spend money transaction',
      actionTypes.createSpendMoney
    ),
  <Dropdown.Separator key="separator" />,
  allowedActions.includes(actionTypes.download) &&
    getDropdownItem(
      actionTypes.download,
      'Download document',
      actionTypes.download
    ),
  allowedActions.includes(actionTypes.delete) &&
    getDropdownItem(actionTypes.delete, 'Delete document', actionTypes.delete),
];

const ActionComponent = ({ id, handleActionSelect, allowedActions }) => (
  // Prevent onRowSelect from being triggered on dropdown click within table.
  <div
    tabIndex="-1"
    role="button"
    onClick={(e) => {
      e.stopPropagation();
    }}
    onKeyUp={() => {}}
  >
    <Dropdown
      right
      items={getItems(allowedActions)}
      onSelect={handleActionSelect(id)}
      toggle={
        <Dropdown.Toggle size="xs">
          <Icons.More />
        </Dropdown.Toggle>
      }
    />
  </div>
);

const InTrayListTableBody = ({
  tableConfig,
  entries,
  allowedActions,
  handleActionSelect,
  onRowSelect,
  onUpload,
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
      isActive,
    } = entry;

    return (
      <Table.Row
        onRowSelect={() => onRowSelect(id)}
        isActive={isActive}
        key={`${id}-${uploadId}`}
      >
        <Table.RowItem {...tableConfig.thumbnail}>
          {ThumbnailComponent({ isUploading, thumbnailUri, uploadedDate })}
        </Table.RowItem>
        <Table.RowItem {...tableConfig.uploadedDate}>
          {UploadDateComponent({
            uploadedDate,
            isUploading,
            isOcrInProgress,
            isSubmitting,
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
        <Table.RowItem
          {...tableConfig.action}
          cellRole="actions"
          className={styles.action}
        >
          {showActions && (
            <ActionComponent
              allowedActions={allowedActions}
              handleActionSelect={handleActionSelect}
              id={id}
            />
          )}
        </Table.RowItem>
      </Table.Row>
    );
  });

  return (
    <Table.Body>
      <DropZoneHorizontal
        className={styles.dropZone}
        onDrop={onUpload}
        onFileSelected={onUpload}
      />
      {rows}
    </Table.Body>
  );
};

const mapStateToProps = (state) => ({
  entries: getTableEntries(state),
  allowedActions: getAllowedActions(state),
});

export default connect(mapStateToProps)(InTrayListTableBody);
