import { Button, DropZone, FileChip, Icons } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getEmailAttachments } from '../../selectors/EmailSelectors';
import openBlob from '../../../../../common/blobOpener/openBlob';
import styles from './EmailPurchaseOrderAttachments.module.css';

const downloadAttachment = (file) =>
  openBlob({ blob: file, filename: file.name });

const EmailPurchaseOrderAttachments = ({
  attachments = [],
  onRemoveAttachment,
  onAddAttachments,
}) => (
  <div className={styles.infoAlert}>
    <DropZone onDrop={onAddAttachments} onFileSelected={onAddAttachments}>
      {attachments.map(({ keyName, canRemove, file, ...otherProps }, index) => (
        <div key={keyName || index}>
          <FileChip
            onRemove={canRemove ? () => onRemoveAttachment(index) : undefined}
            {...otherProps}
          >
            {canRemove && (
              <Button
                type="secondary"
                onClick={() => downloadAttachment(file)}
                icon={<Icons.Download />}
                aria-label="Download file"
                size="xs"
              />
            )}
          </FileChip>
        </div>
      ))}
    </DropZone>
  </div>
);

const mapStateToProps = (state) => ({
  attachments: getEmailAttachments(state),
});

export default connect(mapStateToProps)(EmailPurchaseOrderAttachments);
