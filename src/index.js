import { detect } from 'detect-browser';

import NotSupportedPage from './components/NotSupportedPage/NotSupportedPage';
import isNotSupportedAndBlocking from './common/browser/isNotSupportedAndBlocking';

const browser = detect();

if (isNotSupportedAndBlocking()) {
  document.write(NotSupportedPage(browser.os));
} else {
  // eslint-disable-next-line global-require
  require('./main.js');
}
