import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import { findButtonWithTestId } from '../../../../../common/tests/selectors';
import PayRunModule from '../../PayRunModule';
import RecordPayRunModule from '../RecordPayRunModule';
import openBlob from '../../../../../common/blobOpener/openBlob';

jest.mock('../../../../../common/blobOpener/openBlob');

describe('RecordPayRunModule', () => {
  const constructRecordPayRunModule = () => {
    const integration = {
      readFile: ({ onSuccess }) => onSuccess('FOO'),
      write: ({ onSuccess }) => { onSuccess({ message: 'success' }); },
    };
    const pushMessage = () => {};
    const setRootView = () => (<div />);

    const payRunModule = new PayRunModule({
      integration, setRootView, pushMessage,
    });

    const recordPayRunModule = new RecordPayRunModule({
      integration, store: payRunModule.store, pushMessage,
    });
    const view = recordPayRunModule.getView();

    const wrappedView = (
      <Provider store={payRunModule.store}>
        {view}
      </Provider>
    );

    const wrapper = mount(wrappedView);

    wrapper.update();
    return wrapper;
  };

  describe('Save and close button', () => {
    it('renders the Save and close button', () => {
      const wrapper = constructRecordPayRunModule();

      const saveAndCloseButton = findButtonWithTestId(wrapper, 'saveAndCloseButton');

      expect(saveAndCloseButton).toHaveLength(1);
    });

    it('redirects to payRun url, when clicked', () => {
      const wrapper = constructRecordPayRunModule();

      findButtonWithTestId(wrapper, 'saveAndCloseButton').simulate('click');

      expect(window.location.href.endsWith('/payRun')).toBe(true);
    });
  });

  describe('preview pay run activity', () => {
    it('calls the openBlob function', () => {
      const wrapper = constructRecordPayRunModule();

      const reportLink = findButtonWithTestId(wrapper, 'previewPayRunActivityButton');
      reportLink.simulate('click');

      expect(openBlob).toHaveBeenCalled();
    });
  });

  describe('preview pay details', () => {
    it('calls the openBlob function', () => {
      const wrapper = constructRecordPayRunModule();

      const reportLink = findButtonWithTestId(wrapper, 'previewPayDetailsButton');
      reportLink.simulate('click');

      expect(openBlob).toHaveBeenCalled();
    });
  });
});
