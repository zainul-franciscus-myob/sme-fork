import { useEffect } from 'react';

import liveChatConfig from './LiveChatConfig';

const LiveChat = ({
  businessId,
  businessName,
  businessRole,
  email,
  region,
  serialNumber,
}) => {
  const cxWindowManager = document.querySelector('.cx-window-manager');

  const aTags = [
    {
      type: 'link',
      id: 'genesysStyles',
      path: 'https://assets.digital.myob.com/css/genesys/widgets-9.0.016.07.min.css',
    },
    {
      type: 'script',
      id: 'genesysScripts',
      path: 'https://assets.digital.myob.com/js/genesys/widgets-9.0.016.07.min.js',
    },
  ];

  useEffect(() => {
    liveChatConfig(
      businessId,
      businessName,
      businessRole,
      email,
      region,
      serialNumber,
    );

    aTags.forEach((element) => {
      const fs = document.getElementsByTagName(element.type)[0];

      if (document.getElementById(element.id)) return;

      const e = document.createElement(element.type);

      e.id = element.id;

      if (element.type === 'script') {
        e.async = true;
        e.src = element.path;
        e.type = 'text/javascript';
      } else {
        e.href = element.path;
        e.rel = 'stylesheet';
        e.type = 'text/css';
      }

      if (fs) {
        fs.parentNode.insertBefore(e, fs);
      } else {
        document.head.appendChild(e);
      }
    });

    if (cxWindowManager !== null) cxWindowManager.style.display = 'block';

    return () => {
      if (cxWindowManager !== null) cxWindowManager.style.display = 'none';
    };
  });

  // eslint-disable-next-line global-require
  require('./LiveChat.css');

  return null;
};

export default LiveChat;
