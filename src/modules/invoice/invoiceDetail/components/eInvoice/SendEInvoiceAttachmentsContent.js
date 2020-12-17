import { Button, DropZone, FileChip, Icons } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getSendEInvoiceOptions } from '../../selectors/eInvoiceSelectors';
import openBlob from '../../../../../common/blobOpener/openBlob';

const downloadAttachment = (file) =>
  openBlob({ blob: file, filename: file.name });

const SendEInvoiceAttachmentsContent = ({
  attachments,
  onRemoveAttachment,
  onAddAttachments,
}) => (
  <div>
    <DropZone onDrop={onAddAttachments} onFileSelected={onAddAttachments}>
      {attachments.map(({ key, canRemove, file, ...otherProps }, index) => (
        <div key={key || index}>
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

const mapStateToProps = (state) => getSendEInvoiceOptions(state);

export default connect(mapStateToProps)(SendEInvoiceAttachmentsContent);
