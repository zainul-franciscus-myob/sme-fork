import { BaseTemplate, Card, Icons, PageState } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getMyMyobLink } from '../selectors';
import ErrorViewImage from './NoContentView.svg';
import LinkButton from '../../../components/Button/LinkButton';

const NoContentView = ({ errorLink }) => (
  <BaseTemplate>
    <Card>
      <PageState
        title="Connect your bank and we'll do the rest"
        description="Automatically import transactions so your books are always up-to-date, and you can spend more time uncovering invaluable cash flow insights."
        actions={[
          <LinkButton
            key={1}
            icon={<Icons.Add />}
            href={errorLink}
            isOpenInNewTab
          >
            Connect your bank from my.MYOB
          </LinkButton>,
        ]}
        image={
          <img
            src={ErrorViewImage}
            style={{ width: '60%' }}
            alt="Connect your bank and we'll do the rest"
          />
        }
      />
    </Card>
  </BaseTemplate>
);

const mapStateToProps = (state) => ({
  errorLink: getMyMyobLink(state),
});

export default connect(mapStateToProps)(NoContentView);
