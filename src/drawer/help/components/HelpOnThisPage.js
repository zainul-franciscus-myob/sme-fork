import React from 'react';

import RichText from './RichText';
import styles from './HelpView.module.css';

const HelpOnThisPage = ({ document }) => (
  <>
    <h3>Help on this page</h3>
    <RichText document={document} />
    <div className={styles.bottomHrBreak}>
      <hr />
    </div>
  </>
);

export default HelpOnThisPage;
