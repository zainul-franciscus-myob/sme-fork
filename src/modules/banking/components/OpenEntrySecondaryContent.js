import { Button, FileChip, Icons, Spinner } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classNames from 'classnames';

import {
  getAttachments,
  getIsAttachmentsLoading,
} from '../selectors/attachmentsSelectors';
import styles from './OpenEntrySecondaryContent.module.css';

const wrapAttachmentHandler = (handler, index) => () => handler(index);

const spinner = (
  <div className={styles.spinnerContainer}>
    <Spinner size="small" />
  </div>
);

const OpenEntrySecondaryContent = ({
  attachments,
  isAttachmentsLoading,
  onDownloadAttachment,
  onRemoveAttachment,
}) => {
  if (isAttachmentsLoading) {
    return spinner;
  }

  if (attachments.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      {attachments.map(
        ({ id, canOperate, isInProgress, ...otherProps }, index) => (
          <div
            key={id || index}
            className={classNames(styles.file, {
              [styles.inProgress]: isInProgress,
            })}
          >
            <FileChip
              {...otherProps}
              onRemove={
                canOperate
                  ? wrapAttachmentHandler(onRemoveAttachment, index)
                  : undefined
              }
            >
              {canOperate && (
                <Button
                  type="secondary"
                  onClick={wrapAttachmentHandler(onDownloadAttachment, index)}
                  icon={<Icons.Download />}
                  aria-label="Download file"
                  size="xs"
                />
              )}
            </FileChip>
          </div>
        )
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  attachments: getAttachments(state),
  isAttachmentsLoading: getIsAttachmentsLoading(state),
});

export default connect(mapStateToProps)(OpenEntrySecondaryContent);
