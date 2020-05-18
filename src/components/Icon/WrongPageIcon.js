import React from 'react';

import wrongPageImg from './asset/wrong-page.svg';

const WrongPageIcon = ({ className, alt }) => (
  <img
    src={wrongPageImg}
    className={className}
    alt={alt || 'Wrong page.'}
  />
);

export default WrongPageIcon;
