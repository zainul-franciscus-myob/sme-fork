import { Button, Columns, DropZone, FileChip, Icons } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAttachments } from '../spendMoneyDetailSelectors';
import styles from './SpendMoneyAttachmentsContent.module.css';

const wrapAttachmentHandler = (handler, index) => () => handler(index);

const description = (
  <p>
    Your files need to be&nbsp;
    <strong>PDF</strong>
    ,&nbsp;
    <strong>TIFF</strong>
    ,&nbsp;
    <strong>JPEG</strong>
    &nbsp;or&nbsp;
    <strong>PNG</strong>
    &nbsp;and&nbsp;
    <strong>below 10MB</strong>.
  </p>
);

const SpendMoneyAttachmentsContent = ({
  attachments,
  onAddAttachments,
  onRemoveAttachment,
  onOpenAttachment,
}) => (
  <div className={styles.dropzone}>
    <DropZone onDrop={onAddAttachments} onFileSelected={onAddAttachments}>
      <div className={styles.columns}>
        <Columns type="two">
          {attachments.map(
            ({ state, id, canRemove, isInProgress, ...otherProps }, index) => (
              <div
                key={id || index}
                className={isInProgress ? styles.inProgress : ''}
              >
                <FileChip
                  state={state}
                  {...otherProps}
                  onRemove={
                    canRemove
                      ? wrapAttachmentHandler(onRemoveAttachment, index)
                      : undefined
                  }
                >
                  {id && (
                    <Button
                      type="secondary"
                      onClick={wrapAttachmentHandler(onOpenAttachment, index)}
                      icon={<Icons.Download />}
                      aria-label="Download file"
                      size="xs"
                    />
                  )}
                </FileChip>
              </div>
            )
          )}
        </Columns>
      </div>
    </DropZone>
    <div className={styles.description}>{description}</div>
  </div>
);

const mapStateToProps = (state) => ({
  attachments: getAttachments(state),
});

export default connect(mapStateToProps)(SpendMoneyAttachmentsContent);
