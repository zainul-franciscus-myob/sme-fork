import {
  AccordionTable, Badge, FieldGroup, StandardTemplate, Table,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAttachmentCount, getHasAttachment } from '../spendMoneyDetailSelectors';
import SpendMoneyAttachmentsContent from './SpendMoneyAttachmentsContent';
import styles from './SpendMoneyAttachments.module.css';

const SpendMoneyAttachments = ({
  attachmentCount,
  hasAttachment,
  onAddAttachments,
  onRemoveAttachment,
  onOpenAttachment,
}) => (
  <StandardTemplate sticky="none">
    <FieldGroup label="More information">
      <AccordionTable
        body={(
          <Table.Body>
            <Table.CollapsibleRow
              key="attachments"
              header={(
                <Table.Row>
                  <Table.RowItem>
                    Attachments
                    { hasAttachment && (
                      <span className={styles.badge}>
                        <Badge color="light-grey">{attachmentCount}</Badge>
                      </span>
                    )}
                  </Table.RowItem>
                  {/* Feelix CollapsibleRow need more than two row items */}
                  <Table.RowItem />
                </Table.Row>
              )}
            >
              <SpendMoneyAttachmentsContent
                onAddAttachments={onAddAttachments}
                onRemoveAttachment={onRemoveAttachment}
                onOpenAttachment={onOpenAttachment}
              />
            </Table.CollapsibleRow>
          </Table.Body>
        )}
      />
    </FieldGroup>
  </StandardTemplate>
);

const mapStateToProps = state => ({
  attachmentCount: getAttachmentCount(state),
  hasAttachment: getHasAttachment(state),
});

export default connect(mapStateToProps)(SpendMoneyAttachments);
