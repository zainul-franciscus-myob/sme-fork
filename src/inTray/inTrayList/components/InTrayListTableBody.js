import {
  Dropdown,
  Icons,
  Spinner,
  Table,
  Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classNames from 'classnames';

import { getTableEntries } from '../selectors/InTrayListSelectors';
import InTrayDropzoneTableRow from './InTrayDropzoneTableRow';
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
  uploadedDate,
  isUploading,
  isOcrInProgress,
  isSubmitting,
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
<Tooltip triggerContent={<Icons.Info />}>Information not available</Tooltip>
);

const ActionComponent = ({ id, handleActionSelect }) => (
  // Prevent onRowSelect from being triggered on dropdown click within table.
  <div tabIndex="-1" role="button" onClick={(e) => { e.stopPropagation(); }} onKeyUp={() => {}}>
    <Dropdown
      right
      items={[
        <Dropdown.Item
          key={actionTypes.linkToExistingBill}
          label="Link to existing bill"
          value={actionTypes.linkToExistingBill}
        />,
        <Dropdown.Item
          key={actionTypes.createBill}
          label="Create bill"
          value={actionTypes.createBill}
        />,
        <Dropdown.Separator key="separator" />,
        <Dropdown.Item
          key={actionTypes.download}
          label="Download document"
          value={actionTypes.download}
        />,
        <Dropdown.Item
          key={actionTypes.delete}
          label="Delete document"
          value={actionTypes.delete}
        />,
      ]}
      onSelect={handleActionSelect(id)}
      toggle={(
        <Dropdown.Toggle size="xs">
          <Icons.More />
        </Dropdown.Toggle>
)}
    />
  </div>
);

const InTrayListTableBody = ({
  tableConfig,
  entries,
  handleActionSelect,
  onRowSelect,
  onAddAttachments,
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
        <Table.RowItem {...tableConfig.action} cellRole="actions">
          {showActions
            && (
            <ActionComponent
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
      <InTrayDropzoneTableRow
        onAddAttachment={onAddAttachments}
      />
      {rows}
    </Table.Body>
  );
};

const mapStateToProps = state => ({
  entries: getTableEntries(state),
});

export default connect(mapStateToProps)(InTrayListTableBody);
