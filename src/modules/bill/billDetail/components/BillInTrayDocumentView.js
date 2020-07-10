import { Button, Card, Icons } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getHasInTrayDocumentId,
  getInTrayDocument,
  getIsDocumentLoading,
} from '../selectors/BillInTrayDocumentSelectors';
import {
  getIsCreatingFromInTray,
  getIsReadOnly,
  getPrefillButtonText,
} from '../selectors/billSelectors';
import Thumbnail from '../../../../components/Thumbnail/Thumbnail';
import styles from './BillInTrayDocumentView.module.css';

const BillInTrayDocumentView = ({
  hasInTrayDocumentId,
  inTrayDocument,
  isCreatingFromInTray,
  prefillButtonText,
  isReadOnly,
  onPrefillButtonClick,
  onOpenSplitViewButtonClick,
  onUnlinkDocumentButtonClick,
}) => {
  const title = inTrayDocument.uploadedDate ? `Source document uploaded ${inTrayDocument.uploadedDate}` : 'Source document';

  const documentView = (
    <div className={styles.documentView}>
      <Thumbnail
        thumbnailUri={inTrayDocument.thumbnailUrl}
        alt="Document thumbnail"
      />
      <div className={styles.pdf}>
        <div><h4>{title}</h4></div>
        <div className={styles.buttonGroup}>
          <Button onClick={onOpenSplitViewButtonClick} type="link" icon={<Icons.Expand />}>
            Open split view
          </Button>
          { !isCreatingFromInTray && !isReadOnly && (
            <Button onClick={onUnlinkDocumentButtonClick} type="link" icon={<Icons.UnLink />}>
              Unlink
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  const noDocumentView = (
    <div>
      <Button type="link" onClick={onPrefillButtonClick} icon={<Icons.GenericDocument />}>
        {prefillButtonText}
      </Button>
    </div>
  );

  const view = hasInTrayDocumentId ? documentView : noDocumentView;

  return (
    <Card
      classes={[styles.card]}
      body={(<Card.Body child={view} />)}
    />
  );
};

const mapStateToProps = state => ({
  hasInTrayDocumentId: getHasInTrayDocumentId(state),
  inTrayDocument: getInTrayDocument(state),
  isDocumentLoading: getIsDocumentLoading(state),
  isCreatingFromInTray: getIsCreatingFromInTray(state),
  prefillButtonText: getPrefillButtonText(state),
  isReadOnly: getIsReadOnly(state),
});

export default connect(mapStateToProps)(BillInTrayDocumentView);
