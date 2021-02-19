import { mount } from 'enzyme';
import React from 'react';

import { findButtonWithTestId } from '../../../../../../../common/tests/selectors';
import EiSubmissionsDetailView from '../EiSubmissionsDetailView';
import EiSubmissionsDetailedInformation from '../EiSubmissionsDetailedInformation';
import EiSubmissionsStatusLabel from '../EiSubmissionsStatusLabel';
import EiSubmissionsStatusMessage from '../EiSubmissionsStatusMessage';
import formatDateTime from '../../../../../../../common/valueFormatters/formatDate/formatDateTime';

describe('EiSubmissionsDetailView', () => {
  const onClose = jest.fn();
  const onViewPayRunReportClick = jest.fn();
  const onSubmitToIrClick = jest.fn();
  const shouldDisplaySubmissionInfo = true;

  const payRun = {
    id: '1234d3e7-4c5b-4a50-a114-3e652c123456',
    status: {
      label: 'Submitted',
      color: 'green',
    },
    payPeriod: '01/10/2020 - 15/10/2020',
    payOnDate: '05/10/2020',
    dateRecorded: formatDateTime('2020-10-01T07:18:14.174Z'),
    employeeCount: 2,
    totalPaye: '3,400.00',
    totalGross: '13,340.00',
    submissionKey: '123456789',
    username: 'payday@mailinator.com',
    detail: 'Submitted successfully',
    responseCode: '0',
  };

  const props = {
    onClose,
    payRun,
    onViewPayRunReportClick,
    shouldDisplaySubmissionInfo,
    onSubmitToIrClick,
  };

  afterEach(jest.clearAllMocks);

  describe('Ei submission status', () => {
    it('should have status label and status message', () => {
      const wrapper = mount(<EiSubmissionsDetailView {...props} />);
      expect(wrapper.exists(EiSubmissionsStatusLabel)).toEqual(true);
      expect(wrapper.exists(EiSubmissionsStatusMessage)).toEqual(true);
    });
  });

  describe('Submission information', () => {
    it('should have correct labels and values', () => {
      const wrapper = mount(<EiSubmissionsDetailView {...props} />);
      const submissionInformationForm = wrapper.find(
        EiSubmissionsDetailedInformation
      );

      const expectedLabels = ['Submitted by', 'Receipt number'];

      const expectedValues = ['payday@mailinator.com', '123456789'];

      const submissionInfoLabels = submissionInformationForm
        .find('ReadOnly')
        .find('label')
        .map((x) => x.text());

      const submissionInfoValues = submissionInformationForm
        .find('ReadOnly')
        .find('ReadOnlyBox')
        .map((x) => x.text());

      expect(submissionInfoLabels).toEqual(expectedLabels);
      expect(submissionInfoValues).toEqual(expectedValues);
    });

    it('should not render ei submission info if flag is false', () => {
      const propsWithFalseFlag = {
        ...props,
        shouldDisplaySubmissionInfo: false,
      };
      const wrapper = mount(
        <EiSubmissionsDetailView {...propsWithFalseFlag} />
      );

      expect(wrapper.find(EiSubmissionsDetailedInformation)).toHaveLength(0);
    });
  });

  describe('Pay run', () => {
    it('should have correct labels and values', () => {
      const wrapper = mount(<EiSubmissionsDetailView {...props} />);
      const submissionInformationForm = wrapper.find({
        testid: 'payRunInfoForm',
      });

      const expectedLabels = [
        'Pay period',
        'Pay on date',
        'Date recorded',
        'Employees',
        'Gross payments ($)',
        'PAYE and/or schedular tax ($)',
      ];

      const expectedValues = [
        '01/10/2020 - 15/10/2020',
        '05/10/2020',
        formatDateTime('2020-10-01T07:18:14.174Z'),
        '2',
        '13,340.00',
        '3,400.00',
      ];

      const submissionInfoLabels = submissionInformationForm
        .find('ReadOnly')
        .find('label')
        .map((x) => x.text());
      const submissionInfoValues = submissionInformationForm
        .find('ReadOnly')
        .find('ReadOnlyBox')
        .map((x) => x.text());

      expect(submissionInfoLabels).toEqual(expectedLabels);
      expect(submissionInfoValues).toEqual(expectedValues);
    });
  });

  describe('On view pdf click', () => {
    it('Clicking view pdf link should call the expected handler', () => {
      // Arrange
      const wrapper = mount(<EiSubmissionsDetailView {...props} />);
      const button = findButtonWithTestId(wrapper, 'viewPayRunReportPdf');

      // Act
      button.simulate('click');

      // Assert
      expect(props.onViewPayRunReportClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('On close click', () => {
    it('Clicking esc should call the expected handler', () => {
      // Arrange
      const wrapper = mount(<EiSubmissionsDetailView {...props} />);
      const escButton = wrapper.find({ testid: 'onCloseTestId' }).first();

      // Act
      escButton.simulate('click');

      // Assert
      expect(props.onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Submit button', () => {
    it('should not be rendered if submit to ir flag is false', () => {
      // Arrange
      const showSubmitToIr = false;
      const submitToIrProps = { showSubmitToIr, ...props };
      const wrapper = mount(<EiSubmissionsDetailView {...submitToIrProps} />);
      const submitToIrButton = findButtonWithTestId(
        wrapper,
        'submitToIrTestId'
      );

      // Assert
      expect(submitToIrButton).toHaveLength(0);
    });

    it('should call the expected handler when submit to ir is clicked', () => {
      // Arrange
      const showSubmitToIr = true;
      const submitToIrProps = { showSubmitToIr, ...props };
      const wrapper = mount(<EiSubmissionsDetailView {...submitToIrProps} />);
      const submitToIrButton = findButtonWithTestId(
        wrapper,
        'submitToIrTestId'
      );

      // Act
      submitToIrButton.simulate('click');

      // Assert
      expect(props.onSubmitToIrClick).toHaveBeenCalledTimes(1);
    });
  });
});
