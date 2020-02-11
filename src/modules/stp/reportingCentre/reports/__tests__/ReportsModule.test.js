import { Table } from '@myob/myob-widgets';
import { mount } from 'enzyme/build';

import {
  LOAD_EMPLOYEE_YTD_REPORT,
  LOAD_PAY_EVENTS,
  LOAD_PAY_EVENT_DETAILS,
} from '../ReportsIntents';
import { findButtonWithTestId } from '../../../../../common/tests/selectors';
import ReportsModule from '../ReportsModule';
import loadPayEventDetailResponse from '../../mappings/data/loadPayEventDetailResponse';
import loadPayEventsResponse from '../../mappings/data/loadPayEventsResponse';
import openBlob from '../../../../../common/blobOpener/openBlob';

jest.mock('../../../../../common/blobOpener/openBlob');

describe('ReportsModule', () => {
  const defaultIntegration = {
    read: ({ intent, onSuccess }) => {
      switch (intent) {
        case LOAD_EMPLOYEE_YTD_REPORT: onSuccess('');
          break;
        case LOAD_PAY_EVENTS: onSuccess(loadPayEventsResponse);
          break;
        case LOAD_PAY_EVENT_DETAILS: onSuccess(loadPayEventDetailResponse);
          break;
        default:
          throw new Error(`unmocked intent "${intent.toString()}"`);
      }
    },
    readFile: ({ onSuccess }) => onSuccess(''),
  };

  const constructModule = (integration = {}) => {
    const module = new ReportsModule({
      integration: {
        ...defaultIntegration,
        ...integration,
      },
    });

    const wrapper = mount(module.getView());
    module.run();
    wrapper.update();

    return {
      wrapper,
      module,
    };
  };


  describe('View Employee ytd report', () => {
    it('should call open Blob to view employee ytd report', () => {
      const { wrapper } = constructModule();

      wrapper.find(Table.Row).first().simulate('click');
      const reportButton = findButtonWithTestId(wrapper, 'viewEmployeeReportLink');

      reportButton.simulate('click');

      expect(openBlob).toHaveBeenCalled();
    });
  });
});
