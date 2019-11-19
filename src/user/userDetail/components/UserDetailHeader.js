import { Label, TotalsHeader } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getStatusTag, getSubtitle, getTitle } from '../userDetailSelectors';

const UserDetailHeader = ({
  title,
  subtitle,
  status,
}) => (
  <TotalsHeader
    title={title}
    subtitle={subtitle}
    tag={(
      <Label type="boxed" color="light-grey">
        {status}
      </Label>
    )}
  />
);

const mapStateToProps = state => ({
  title: getTitle(state),
  subtitle: getSubtitle(state),
  status: getStatusTag(state),
});

export default connect(mapStateToProps)(UserDetailHeader);
