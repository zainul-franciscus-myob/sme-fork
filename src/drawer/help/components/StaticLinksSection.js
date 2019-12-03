import { connect } from 'react-redux';
import React from 'react';

import { getSupportByRegionLink } from '../HelpSelectors';
import styles from './StaticLinksSection.module.css';

const StaticLinksSection = ({
  supportLinkByRegion,
}) => (
  <>
    <div className={styles.staticLinks}>
      <a href={supportLinkByRegion} target="_blank" rel="noopener noreferrer">Browse all articles</a>
      <a href="https://community.myob.com/t5/MYOB-X/ct-p/MYOBX" target="_blank" rel="noopener noreferrer">Get help on the community forum</a>
      <a href="https://academy.myob.com/" target="_blank" rel="noopener noreferrer">MYOB Academy</a>
    </div>
  </>
);

const mapStateToProps = state => ({
  supportLinkByRegion: getSupportByRegionLink(state),
});

export default connect(mapStateToProps)(StaticLinksSection);
