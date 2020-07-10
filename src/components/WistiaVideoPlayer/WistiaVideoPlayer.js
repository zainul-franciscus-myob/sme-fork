import React, { Component } from 'react';
import classNames from 'classnames';

import styles from './WistiaVideoPlayer.module.css';

// This class was copied from 'https://glitch.com/edit/#!/wistia-player-react?path=src/components/wistia_embed.jsx:1:0'
class WistiaVideoPlayer extends Component {
  constructor(props) {
    super(props);
    const { hashedId, className, ...embedOptions } = this.props;
    // _wq is used in the Wistia Video Library and needs to stay as it is
    /* eslint no-underscore-dangle: ["error", { "allow": ['_wq', '_w2q'] }] */
    window._wq = window._wq || [];
    window._wq.push({
      id: hashedId,
      options: embedOptions,
      onHasData: (video) => {
        this.handle = video;
      },
    });
  }

  componentDidMount() {
    if (!document.getElementById('wistia_script')) {
      const wistiaScript = document.createElement('script');
      wistiaScript.id = 'wistia_script';
      wistiaScript.type = 'text/javascript';
      wistiaScript.src = 'https://fast.wistia.com/assets/external/E-v1.js';
      wistiaScript.async = true;
      document.body.appendChild(wistiaScript);
    }
  }

  componentWillUnmount() {
    // eslint-disable-next-line no-unused-expressions
    this.handle && this.handle.remove();
  }

  render() {
    const { className, hashedId } = this.props;
    const wistiaEmbedDefaultClass = `wistia_embed wistia_async_${hashedId} videoFoam=true`;

    return (
      <div className={classNames(className, styles.wistiaVideoPlayer)}>
        <div className={styles.wistiaVideoPlayer__wrapper}>
          <div
            className={classNames(
              wistiaEmbedDefaultClass,
              styles.wistiaVideoPlayer__embed
            )}
          >
            &nbsp;
          </div>
        </div>
      </div>
    );
  }
}

export default WistiaVideoPlayer;
