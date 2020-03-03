import {
  Badge, Card, FieldGroup, Table,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAttachmentCount, getHasAttachment } from '../spendMoneyDetailSelectors';
import AccordionRowTypes from '../../../../components/Accordion/AccordionRowTypes';
import AccordionTable from '../../../../components/Accordion/AccordionTable';
import CollapsibleTableRow from '../../../../components/Accordion/CollapsibleTableRow';
import SpendMoneyAttachmentsContent from './SpendMoneyAttachmentsContent';
import SpendMoneyElementId from '../SpendMoneyElementId';
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
        openPosition={0}
        data={[{}]}
        renderRow={(index, _, buildRowProps) => (
          <CollapsibleTableRow
            {...buildRowProps({
              id: 'loading',
              rowType: AccordionRowTypes.COLLAPSIBLE,
              header: (
                <Table.RowItem>
                  Attachments
                  { hasAttachment && (
                  <span className={styles.badge}>
                    <Badge color="light-grey">{attachmentCount}</Badge>
                  </span>
                  )}
                </Table.RowItem>
              ),
              index,
            })}
          >
            <SpendMoneyAttachmentsContent
              onAddAttachments={onAddAttachments}
              onRemoveAttachment={onRemoveAttachment}
              onOpenAttachment={onOpenAttachment}
            />
          </CollapsibleTableRow>
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
