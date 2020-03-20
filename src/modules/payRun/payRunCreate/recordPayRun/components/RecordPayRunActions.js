import {
  Button,
  ButtonRow,
  Separator,
} from '@myob/myob-widgets';
import React from 'react';

const RecordPayRunActions = ({
  onRecordButtonClick,
  onPreviousButtonClick,
  onSaveAndCloseButtonClick,
  onPreviewPayRunActivityClick,
  onPreviewPayDetailsClick,
  isPayRunReportsEnabled,
}) => {
  const actionButtons = isPayRunReportsEnabled ? [
    <Button
      key="previewPayRunActivity"
      name="previewPayRunActivity"
      type="secondary"
      testid="previewPayRunActivityButton"
      onClick={onPreviewPayRunActivityClick}
    >
        Preview pay run activity
      </Button>,
      <Button
        key="previewPayDetails"
        name="previewPayDetails"
        type="secondary"
        testid="previewPayDetailsButton"
        onClick={onPreviewPayDetailsClick}
      >
        Preview pay details
      </Button>,
      <Separator direction="vertical" />,
      <Button key="saveAndClose" testid="saveAndCloseButton" name="saveAndClose" type="secondary" onClick={onSaveAndCloseButtonClick}>
          Save and close
      </Button>,
      <Button key="previous" name="previous" type="secondary" onClick={onPreviousButtonClick}>
          Previous
      </Button>,
      <Button key="save" name="save" type="primary" onClick={onRecordButtonClick}>
          Record
      </Button>,
  ]
    : [
      <Button key="saveAndClose" testid="saveAndCloseButton" name="saveAndClose" type="secondary" onClick={onSaveAndCloseButtonClick}>
          Save and close
      </Button>,
      <Button key="previous" name="previous" type="secondary" onClick={onPreviousButtonClick}>
          Previous
      </Button>,
      <Button key="save" name="save" type="primary" onClick={onRecordButtonClick}>
          Record
      </Button>,
    ];

  return (<ButtonRow
    primary={actionButtons}
  />);
};

export default RecordPayRunActions;
