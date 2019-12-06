import React from 'react';

import ImageIconMenu from './ImageIconMenu';
import helpIconImage from './images/HelpIcon.svg';

const Help = ({ onMenuLinkClick }) => (
  <ImageIconMenu
    image={helpIconImage}
    tooltip="Help"
    onSelect={onMenuLinkClick}
  />
);

export default Help;
