import { Button, FileChip } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAttachments } from '../spendMoneyDetailSelectors';
import SpendMoneyFileBrowser from './SpendMoneyFileBrowser';
import styles from './SpendMoneyAttachmentsContent.module.css';

const wrapAttachmentHandler = (handler, index) => () => handler(index);

const description = (
  <p>
    Upload your file as&nbsp;
    <strong>PDF</strong>
    ,&nbsp;
    <strong>TIFF</strong>
    ,&nbsp;
    <strong>JPEG</strong>
    &nbsp;or&nbsp;
    <strong>PNG</strong>
    &nbsp;and make sure it&#39;s&nbsp;
    <strong>below 10MB</strong>
    .
  </p>
);

const SpendMoneyAttachmentsContent = ({
  attachments,
  onAddAttachments,
  onRemoveAttachment,
  onOpenAttachment,
}) => (
  <>
    <div className={styles.attachments}>
      <SpendMoneyFileBrowser
        accept=".pdf, .tiff, .jpeg, .jpg, .png"
        onAddAttachments={onAddAttachments}
      />
      {
        attachments.map(({
          name, state, id, canRemove, isInProgress, ...otherProps
        }, index) => (
          <div key={id || index} className={isInProgress ? styles.inProgress : ''}>
            <FileChip
              name={
                id ? (
                  <Button
                    type="link"
                    onClick={wrapAttachmentHandler(onOpenAttachment, index)}
                  >
                    {name}
                  </Button>
                ) : name
              }
              state={state}
              {...otherProps}
              onRemove={canRemove ? wrapAttachmentHandler(onRemoveAttachment, index) : undefined}
            />
          </div>
        ))
      }
    </div>
    {description}
  </>
);

const mapStateToProps = state => ({
  attachments: getAttachments(state),
});

export default connect(mapStateToProps)(SpendMoneyAttachmentsContent);
