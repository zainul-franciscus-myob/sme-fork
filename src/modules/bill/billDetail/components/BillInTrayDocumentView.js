import {
  Button, Card, Icons, Spinner,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getHasInTrayDocumentId,
  getInTrayDocument,
  getIsDocumentLoading,
} from '../selectors/BillInTrayDocumentSelectors';
import { getIsCreatingFromInTray } from '../selectors/billSelectors';
import Thumbnail from '../../../../components/Thumbnail/Thumbnail';
import styles from './BillInTrayDocumentView.module.css';

const BillInTrayDocumentView = ({
  isDocumentLoading,
  hasInTrayDocumentId,
  inTrayDocument,
  isCreatingFromInTray,
  onPrefillButtonClick,
  onOpenSplitViewButtonClick,
  onUnlinkDocumentButtonClick,
}) => {
  const documentView = (
    <div className={styles.documentView}>
      <Thumbnail
        thumbnailUri={inTrayDocument.thumbnailUrl}
        alt="Document thumbnail"
      />
      <div className={styles.pdf}>
        <div><h4>{`Source document uploaded ${inTrayDocument.uploadedDate}`}</h4></div>
        <div className={styles.buttonGroup}>
          <Button onClick={onOpenSplitViewButtonClick} type="link" icon={<Icons.Expand />}>
            Open split view
          </Button>
          { !isCreatingFromInTray && (
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
        Prefill from a source document
      </Button>
    </div>
  );

  const spinnerView = (
    <div className={styles.spinnerView}>
      <Spinner size="small" />
    </div>
  );

  let view;
  if (isDocumentLoading) {
    view = spinnerView;
  } else if (hasInTrayDocumentId) {
    view = documentView;
  } else {
    view = noDocumentView;
  }

  return (
    <Card
      classes={[styles.card]}
      body={(
        <Card.Body
          child={view}
        />
      )}
    />
  );
};

const mapStateToProps = state => ({
  hasInTrayDocumentId: getHasInTrayDocumentId(state),
  inTrayDocument: getInTrayDocument(state),
  isDocumentLoading: getIsDocumentLoading(state),
  isCreatingFromInTray: getIsCreatingFromInTray(state),
});

export default connect(mapStateToProps)(BillInTrayDocumentView);
