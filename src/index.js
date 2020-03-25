import { detect } from 'detect-browser';

import NotSupportedPage from './components/NotSupportedPage/NotSupportedPage';
import isSupported from './common/browser/isSupported';

const browser = detect();

if (!isSupported()) {
  document.write(NotSupportedPage(browser.os));
} else {
  // eslint-disable-next-line global-require
  require('./main.js');
}
