import { detect } from 'detect-browser';

import IEBlockPage from './components/IE/IEBlockPage';

const browser = detect();
const isIE = browser.name === 'ie';

if (isIE) {
  document.write(IEBlockPage);
} else {
  // eslint-disable-next-line global-require
  require('./main.js');
}
