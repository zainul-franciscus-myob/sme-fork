import React from 'react';

import ImageIconMenu from './ImageIconMenu';
import helpIconImage from './images/HelpIcon.svg';

const Help = ({ onMenuLinkClick, className }) => (
  <ImageIconMenu
    image={helpIconImage}
    tooltip="Help"
    onSelect={onMenuLinkClick}
    className={className}
  />
);

export default Help;
