import {
  Badge, Card, FieldGroup, Table,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAttachmentCount, getHasAttachment } from '../spendMoneyDetailSelectors';
import AccordionTable from '../../../../components/Feelix/Accordion/AccordionTable';
import SpendMoneyAttachmentsContent from './SpendMoneyAttachmentsContent';
import SpendMoneyElementId from '../SpendMoneyElementId';
import TableCollapsibleRow from '../../../../components/Feelix/Accordion/TableCollapsibleRow';
import styles from './SpendMoneyAttachments.module.css';

const SpendMoneyAttachments = ({
  attachmentCount,
  hasAttachment,
  onAddAttachments,
  onRemoveAttachment,
  onOpenAttachment,
}) => (
  <Card classes={[styles.attachments]}>
    <FieldGroup
      label={<span id={SpendMoneyElementId.ATTACHMENTS_ELEMENT_ID}>More information</span>}
    >
      <AccordionTable
        expansionToggle
        openPosition={0}
        body={(
          <Table.Body>
            <TableCollapsibleRow
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
            </TableCollapsibleRow>
          </Table.Body>
        )}
      />
    </FieldGroup>
  </Card>
);

const mapStateToProps = state => ({
  attachmentCount: getAttachmentCount(state),
  hasAttachment: getHasAttachment(state),
});

export default connect(mapStateToProps)(SpendMoneyAttachments);
