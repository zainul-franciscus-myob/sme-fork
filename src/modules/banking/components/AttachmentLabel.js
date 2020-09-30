import { Icons, Tooltip } from '@myob/myob-widgets';
import React from 'react';
import classNames from 'classnames';

import styles from './AttachmentLabel.module.css';

const AttachmentLabel = ({ className = '' }) => (
  <Tooltip
    className={classNames(styles.clip, className)}
    triggerContent={<Icons.File />}
  >
    This transaction contains attachments
  </Tooltip>
);

export default AttachmentLabel;
