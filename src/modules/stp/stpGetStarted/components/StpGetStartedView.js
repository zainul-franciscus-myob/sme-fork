import { Button, Columns, StandardTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsModalOpen, getLoadingState } from '../stpGetStartedSelectors';
import PageView from '../../../../components/PageView/PageView';
import RegistrationErrorsModal from './RegistrationErrorsModal';
import landingPageImage from './images/landing-page.svg';
import styles from './StpGetStartedView.module.css';

const StpGetStartedView = ({
  loadingState,
  isModalOpen,
  onGetStartedClick,
  onModalCancelClick,
  onViewErrorsButtonClick,
}) => {
  const modalComponent = isModalOpen && (
    <RegistrationErrorsModal
      onCancelButtonClick={onModalCancelClick}
      onViewErrorsButtonClick={onViewErrorsButtonClick}
    />
  );

  const view = (
    <StandardTemplate pageHead="Set up Single Touch Payroll reporting">
      {modalComponent}
      <Columns>
        <div className={styles.container}>
          <h3>What is Single Touch Payroll reporting?</h3>
          <p>
            Single Touch Payroll (STP) is an ATO initiative where you report
            your payroll and super information at the same time as you pay your
            employees.
          </p>
          <h3>Getting started</h3>
          <p>
            Before you get started, make sure you&apos;ve assigned all your pay
            items to an ATO reporting category.
          </p>
          <p>Once you&apos;ve done that, let&apos;s get set up!</p>
          <Button testid="getStartedButton" onClick={onGetStartedClick}>
            Get started
          </Button>
        </div>
        <img
          className={styles.image}
          src={landingPageImage}
          alt="ato stp reporting"
        />
      </Columns>
    </StandardTemplate>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = (state) => ({
  loadingState: getLoadingState(state),
  isModalOpen: getIsModalOpen(state),
});

export default connect(mapStateToProps)(StpGetStartedView);
