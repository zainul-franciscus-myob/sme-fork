import {
  Button,
  Icons,
  StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getLodgeStatementLink,
} from '../prepareBasSelectors';

const openNewTab = url => () => window.open(url);

const PrepareBasView = ({ lodgeStatementLink }) => (
  <StandardTemplate
    sticky="none"
    pageHead="Prepare BAS or IAS"
  >
    <Button type="link" icon={<Icons.OpenExternalLink />} iconRight onClick={openNewTab(lodgeStatementLink)}>
      Open ABN lookup website
    </Button>
  </StandardTemplate>

);

const mapStateToProps = state => ({
  lodgeStatementLink: getLodgeStatementLink(state),
});

export default connect(mapStateToProps)(PrepareBasView);
