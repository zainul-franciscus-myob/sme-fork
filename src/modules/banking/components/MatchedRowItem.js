import React from 'react';

import AttachmentLabel from './AttachmentLabel';
import FocusWrapper from './FocusWrapper';
import styles from './MatchedRowItem.module.css';

// @TODO: Feelix currently doesn't support forwarding refs to its `Button` component,
//        therefore we've handrolled a simple button element that is visually the same.
//        We should revert back to the Feelix `Button` once they support forwading refs.
const MatchedRowItem = ({ entry, isFocused, ...props }) => (
  <div className={styles.matchInfo}>
    <FocusWrapper isFocused={isFocused}>
      {(ref) => (
        <button
          ref={ref}
          type="button"
          className={styles.buttonLink}
          {...props}
        >
          {entry.allocateOrMatch}
        </button>
      )}
    </FocusWrapper>
    {entry.hasAttachment && (
      <AttachmentLabel className={styles.attachmentClip} />
    )}
  </div>
);

export default MatchedRowItem;
