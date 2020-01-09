import {
  Button,
  Columns,
  StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getModal } from '../stpGetStartedSelectors';
import ModalType from '../ModalType';
import RegistrationErrorsModal from './RegistrationErrorsModal';
import landingPageImage from './landing-page.svg';

const imageStyle = {
  alignSelf: 'end',
  marginBottom: '-16px',
};

const StpGetStartedView = ({
  modal,
  onGetStartedClick,
  onModalCancelClick,
  onViewErrorsButtonClick,
}) => (
  <StandardTemplate
    pageHead="Set up Single Touch Payroll reporting"
  >
    {modal === ModalType.REGISTRATION_ERRORS
      && (
      <RegistrationErrorsModal
        onCancelButtonClick={onModalCancelClick}
        onViewErrorsButtonClick={onViewErrorsButtonClick}
      />
      )
    }
    <Columns>
      <div>
        <h3>What is Single Touch Payroll reporting?</h3>
        <p>
          Single Touch Payroll (STP) is an ATO initiative where you report your payroll and
          super information at the same time as you pay your employees.
        </p>
        <h3>
          Getting started
        </h3>
        <p>
          Before you get started, make sure you&apos;ve assigned all your pay items to an ATO
          reporting category.
        </p>
        <p>
          Once you&apos;ve done that, let&apos;s get set up!
        </p>
        <Button testId="getStartedButton" onClick={onGetStartedClick}>Get started</Button>
      </div>
      <img style={imageStyle} src={landingPageImage} alt="ato stp reporting" />
    </Columns>
  </StandardTemplate>
);

const mapStateToProps = state => ({
  modal: getModal(state),
});

export default connect(mapStateToProps)(StpGetStartedView);
