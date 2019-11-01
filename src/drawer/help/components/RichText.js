import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import React from 'react';

import ImageViewer from '../../../components/ImageViewer/ImageViewer';
import WistiaVideoPlayer from '../../../components/WistiaVideoPlayer/WistiaVideoPlayer';
import styles from './RichText.module.css';

export const getWistiaUriId = (wistiaLink) => {
  const last = arr => arr[arr.length - 1];
  return last(wistiaLink.split('/'));
};

const contentOptions = ({
  [BLOCKS.EMBEDDED_ASSET]: (node) => {
    const { url, title } = node.data.target.fields.file;
    return (
      <div className={styles.imageWrapper}>
        <ImageViewer mediaSrc={url} className={styles.image} title={title} />
      </div>
    );
  },
  [INLINES.HYPERLINK]: (node) => {
    const { uri } = node.data;
    const isAWistiaLink = uri.includes('wistia');
    if (isAWistiaLink) {
      return <WistiaVideoPlayer hashedId={getWistiaUriId(uri)} popoverAnimateThumbnail />;
    }
    const { value } = node.content[0];
    const linkText = value || uri;
    return <a href={uri} target="_blank" rel="noopener noreferrer">{linkText}</a>;
  },
});

const RichText = ({ document }) => (
  <div className={styles.richText}>
    {documentToReactComponents(document, { renderNode: { ...contentOptions } })}
  </div>
);

export default RichText;
