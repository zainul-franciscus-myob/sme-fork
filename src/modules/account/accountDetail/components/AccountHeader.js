import { PageHead } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsCreating } from '../accountDetailSelectors';

const AccountHeader = (props) => {
  const { isCreating } = props;

  return isCreating ? (
    <PageHead title="Create account" />
  ) : (
    <PageHead title="Edit account" />
  );
};

const mapStateToProps = (state) => ({
  isCreating: getIsCreating(state),
});

export default connect(mapStateToProps)(AccountHeader);
