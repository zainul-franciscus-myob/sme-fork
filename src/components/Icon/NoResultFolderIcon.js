import React from 'react';

import noResultsFolderImg from './asset/no-results-folder.svg';

const NoResultFolderIcon = ({ className, alt }) => (
  <img
    src={noResultsFolderImg}
    className={className}
    alt={alt || 'No results found.'}
  />
);

export default NoResultFolderIcon;
