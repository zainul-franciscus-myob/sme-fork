import {
  Alert,
  Badge,
  Box,
  Button,
  InfoIcon,
  Spinner,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getEntries,
  getHasError,
  getInTrayAlert,
  getInTrayLink,
  getIsLoading,
  getIsUploading,
} from '../../selectors/DashboardInTraySelectors';
import CardView from '../../../../components/CardView/CardView';
import DashboardCardHeader from '../DashboardCardHeader';
import DropZoneHorizontal from '../../../../components/DropZone/DropZoneHorizontal';
import ErrorCard from '../ErrorCard';
import styles from './DashboardInTrayCard.module.css';

const handleLinkClick = (handler, link) => () => {
  handler(link);
};

const DashboardInTrayCard = ({
  alert,
  entries,
  hasError,
  inTrayLink,
  isLoading,
  isUploading,
  onDismissAlert,
  onLinkClick,
  onMoreWaysToUploadButtonClick,
  onReload,
  onUpload,
}) => {
  if (hasError) return <ErrorCard onTry={onReload} />;

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const spinner = (
    <div className={styles.loading}>
      <Spinner size="small" />
      <span>Uploading</span>
    </div>
  );

  const linkDocuments = entries.length ? (
    <div className={styles.linkDocuments}>
      <Badge color="purple">{entries.length}</Badge>
      <span>Documents in your In Tray</span>
      <Button type="link" onClick={handleLinkClick(onLinkClick, inTrayLink)}>
        Link documents
      </Button>
    </div>
  ) : (
    <span>Upload your bills and receipts to pre-fill transactions.</span>
  );

  const view = (
    <div className={styles.container}>
      <DashboardCardHeader title="In tray">
        <Button
          type="link"
          icon={<InfoIcon />}
          onClick={onMoreWaysToUploadButtonClick}
        >
          More ways to upload
        </Button>
      </DashboardCardHeader>
      <hr />
      {alertComponent}
      {isUploading ? spinner : linkDocuments}
      <Box marginTop="sm">
        <DropZoneHorizontal className={styles.dropZone} onUpload={onUpload} />
      </Box>
    </div>
  );

  return <CardView isLoading={isLoading} view={view} />;
};

const mapStateToProps = (state) => ({
  alert: getInTrayAlert(state),
  hasError: getHasError(state),
  isLoading: getIsLoading(state),
  isUploading: getIsUploading(state),
  inTrayLink: getInTrayLink(state),
  entries: getEntries(state),
});

export default connect(mapStateToProps)(DashboardInTrayCard);
