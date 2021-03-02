import { mount } from 'enzyme';
import React from 'react';

import EiSubmissionsStatusMessage from '../EiSubmissionsDetail/EiSubmissionsStatusMessage';
import ErrorStatusMessage from '../EiSubmissionsDetail/StatusMessages/ErrorStatusMessage';
import NotSubmittedStatusMessage from '../EiSubmissionsDetail/StatusMessages/NotSubmittedStatusMessage';
import SubmittedStatusMessage from '../EiSubmissionsDetail/StatusMessages/SubmittedStatusMessage';
import SubmittingStatusMessage from '../EiSubmissionsDetail/StatusMessages/SubmittingStatusMessage';

describe('EiSubmissionsStatusMessage', () => {
  describe('ei submission status message', () => {
    it('should render not submitted status message given status of not submitted', () => {
      const props = {
        status: 'Not submitted',
        responseCode: '',
        detail: '',
      };

      const wrapper = mount(<EiSubmissionsStatusMessage {...props} />);
      expect(wrapper.find(NotSubmittedStatusMessage)).toHaveLength(1);
    });

    ['Error', 'Rejected'].forEach((status) => {
      it(`should render error status message given status of ${status}`, () => {
        const props = {
          status,
          responseCode: '1',
          detail: 'User unauthorised',
        };

        const wrapper = mount(<EiSubmissionsStatusMessage {...props} />);
        const errorStatusMessage = wrapper.find(ErrorStatusMessage);

        expect(errorStatusMessage).toHaveLength(1);
        expect(errorStatusMessage.prop('responseCode')).toEqual('1');
        expect(errorStatusMessage.prop('detail')).toEqual('User unauthorised');
      });
    });

    it('should render submitted status message given status of submitted', () => {
      const props = {
        status: 'Submitted',
        responseCode: '0',
        detail: 'Submitted successfully',
      };

      const wrapper = mount(<EiSubmissionsStatusMessage {...props} />);
      expect(wrapper.find(SubmittedStatusMessage)).toHaveLength(1);
    });

    it('should render submitting status message given status of submitting', () => {
      const props = {
        status: 'Submitting',
        responseCode: '1',
        detail: 'User unauthorised',
      };

      const wrapper = mount(<EiSubmissionsStatusMessage {...props} />);
      expect(wrapper.find(SubmittingStatusMessage)).toHaveLength(1);
    });

    it('should return undefined given unknown status', () => {
      const props = {
        status: 'foo bar',
        responseCode: '1',
        detail: 'User unauthorised',
      };

      const actual = mount(<EiSubmissionsStatusMessage {...props} />);
      expect(actual.isEmptyRender()).toBe(true);
    });
  });
});
