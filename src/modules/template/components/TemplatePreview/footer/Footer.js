import React from 'react';

import styles from './Footer.module.css';

const Footer = ({ items }) => (
  <div className={styles.footer}>
    <div>Page 1 of 1</div>
    <div className={styles.footerItems}>
      {items.map(({ title, content }) => (
        <span>
          {title}: {content}
        </span>
      ))}
    </div>
  </div>
);

export default Footer;
