import {
  Button,
  Icons,
  StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getLodgeStatementLink, getPageHead,
} from '../prepareBasSelectors';

const openNewTab = url => () => window.open(url);

const PrepareBasView = ({ lodgeStatementLink, pageHead }) => (
  <StandardTemplate
    sticky="none"
    pageHead={pageHead}
  >
    <Button type="link" icon={<Icons.OpenExternalLink />} iconRight onClick={openNewTab(lodgeStatementLink)}>
      Lodge statement
    </Button>
  </StandardTemplate>

);

const mapStateToProps = state => ({
  lodgeStatementLink: getLodgeStatementLink(state),
  pageHead: getPageHead(state),
});

export default connect(mapStateToProps)(PrepareBasView);
