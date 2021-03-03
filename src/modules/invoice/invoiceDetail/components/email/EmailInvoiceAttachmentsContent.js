import { Alert, Button, DownloadIcon, FileChip } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getEmailAttachments,
  getIsTotalMoreThan25MB,
} from '../../selectors/emailSelectors';
import DropZoneHorizontal from '../../../../../components/DropZone/DropZoneHorizontal';
import openBlob from '../../../../../common/blobOpener/openBlob';
import styles from './EmailInvoiceAttachmentsContent.module.css';

const downloadAttachment = (file) =>
  openBlob({ blob: file, filename: file.name });

const EmailInvoiceAttachmentsContent = ({
  attachments,
  isTotalMoreThan25MB,
  onRemoveAttachment,
  onAddAttachments,
}) => (
  <>
    <div className={styles.infoAlert}>
      <DropZoneHorizontal
        onDrop={onAddAttachments}
        onFileSelected={onAddAttachments}
      >
        {attachments.map(
          ({ keyName, canRemove, file, ...otherProps }, index) => (
            <div key={keyName || index}>
              <FileChip
                onRemove={
                  canRemove ? () => onRemoveAttachment(index) : undefined
                }
                {...otherProps}
              >
                {canRemove && (
                  <Button
                    type="secondary"
                    onClick={() => downloadAttachment(file)}
                    icon={<DownloadIcon />}
                    aria-label="Download file"
                    size="xs"
                  />
                )}
              </FileChip>
            </div>
          )
        )}
      </DropZoneHorizontal>
    </div>
    {isTotalMoreThan25MB && (
      <Alert type="danger">
        Total size of uploaded documents cannot exceed 25MB
      </Alert>
    )}
  </>
);

const mapStateToProps = (state) => ({
  attachments: getEmailAttachments(state),
  isTotalMoreThan25MB: getIsTotalMoreThan25MB(state),
});

export default connect(mapStateToProps)(EmailInvoiceAttachmentsContent);
