import { PageHead } from '@myob/myob-widgets';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './SimplePageTemplate.css';

const SimplePageTemplate = ({ children, pageHead }) => {
  const safePageHead = typeof pageHead === 'string'
    ? <PageHead title={pageHead} />
    : pageHead;

  return (
    <div className="flx-container">
      <div className={`flx-template ${styles.template}`}>
        <div className="flx-template__header">{safePageHead}</div>
        {children}
      </div>
    </div>
  );
};

SimplePageTemplate.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  pageHead: PropTypes.node.isRequired,
};

export default SimplePageTemplate;
