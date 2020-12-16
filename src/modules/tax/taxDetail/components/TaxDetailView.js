import { FormTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getLoadingState } from '../../../job/jobDetail/jobDetailSelectors';
import { getPageTitle } from '../taxDetailSelectors';
import FormCard from '../../../../components/FormCard/FormCard';
import PageView from '../../../../components/PageView/PageView';
import TaxDetailBody from './TaxDetailBody';

const TaxDetailView = ({
  loadingState,
  pageHeadTitle,
  renderContactCombobox,
}) => {
  const view = (
    <FormTemplate pageHead={pageHeadTitle} sticky="none">
      <FormCard>
        <TaxDetailBody renderContactCombobox={renderContactCombobox} />
      </FormCard>
    </FormTemplate>
  );
  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = (state) => ({
  loadingState: getLoadingState(state),
  pageHeadTitle: getPageTitle(state),
});

export default connect(mapStateToProps)(TaxDetailView);
