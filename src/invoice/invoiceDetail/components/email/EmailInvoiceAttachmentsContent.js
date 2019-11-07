import { DropZone, FileChip } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getEmailAttachments } from '../../selectors/emailSelectors';
import styles from './EmailInvoiceAttachmentsContent.module.css';

const EmailInvoiceAttachmentsContent = ({
  attachments, onRemoveAttachment, onAddAttachments,
}) => (
  <div className={styles.infoAlert}>
    <DropZone onDrop={onAddAttachments} onFileSelected={onAddAttachments}>
      {
        attachments.map(({
          keyName, canRemove, ...otherProps
        }, index) => (
          <div key={keyName || index}>
            <FileChip
              onRemove={canRemove ? (() => onRemoveAttachment(index)) : undefined}
              {...otherProps}
            />
          </div>
        ))
      }
    </DropZone>
  </div>
);

const mapStateToProps = state => ({
  attachments: getEmailAttachments(state),
});

export default connect(mapStateToProps)(EmailInvoiceAttachmentsContent);
