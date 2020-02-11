import {
  Button, Columns, DropZone, Field, FileChip, Icons, Spinner,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAttachments, getIsAttachmentsLoading } from '../bankingSelectors/attachmentsSelectors';
import openBlob from '../../../common/blobOpener/openBlob';
import styles from './OpenEntrySecondaryContent.module.css';

const wrapAttachmentHandler = (handler, index) => () => handler(index);

const header = (
  <div className={styles.dropzoneHeader}>
    <Field label="Attachments" renderField={() => {}} />
    <div className={styles.description}>
      <p>
        Upload your files as&nbsp;
        <strong>PDF</strong>
        ,&nbsp;
        <strong>TIFF</strong>
        ,&nbsp;
        <strong>JPEG</strong>
        &nbsp;or&nbsp;
        <strong>PNG</strong>
        &nbsp;and make sure it&apos;s&nbsp;
        <strong>below 10MB</strong>
        .
      </p>
    </div>
  </div>
);

const spinner = (
  <div className={styles.spinnerContainer}>
    <Spinner size="small" />
  </div>
);

const downloadAttachment = file => openBlob({ blob: file, filename: file.name });

const OpenEntrySecondaryContent = ({
  attachments,
  isAttachmentsLoading,
  onAddAttachments,
  onRemoveAttachment,
}) => {
  const dropzone = isAttachmentsLoading ? spinner : (
    <DropZone
      onDrop={onAddAttachments}
      onFileSelected={onAddAttachments}
    >
      <div className={styles.columns}>
        <Columns type="two">
          {
            attachments.map(({
              id, canRemove, isInProgress, file, ...otherProps
            }, index) => (
              <div key={id || index} className={isInProgress ? styles.inProgress : ''}>
                <FileChip
                  {...otherProps}
                  onRemove={
                    canRemove ? wrapAttachmentHandler(onRemoveAttachment, index) : undefined
                  }
                >
                  {
                    file && canRemove && (
                      <Button
                        type="secondary"
                        onClick={() => downloadAttachment(file)}
                        icon={<Icons.Download />}
                        aria-label="Download file"
                        size="xs"
                      />
                    )
                  }
                </FileChip>
              </div>
            ))
          }
        </Columns>
      </div>
    </DropZone>
  );

  return (
    <div className={styles.secondary}>
      <div className={styles.dropzone}>
        { header }
        { dropzone }
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  attachments: getAttachments(state),
  isAttachmentsLoading: getIsAttachmentsLoading(state),
});

export default connect(mapStateToProps)(OpenEntrySecondaryContent);