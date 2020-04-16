import { Alert, ReadOnly } from '@myob/myob-widgets';
import { mount } from 'enzyme';

import {
  LOAD_PAY_SLIP_EMAIL_DEFAULTS, SET_EMPLOYMENT_CLASSIFICATION_LIST_FILTER_OPTIONS,
  SET_EMPLOYMENT_CLASSIFICATION_LIST_SORT_ORDER,
  SET_EMPLOYMENT_CLASSIFICATION_LIST_TABLE_LOADING_STATE, SET_SUPER_FUND_LIST_FILTER_OPTIONS,
  SET_SUPER_FUND_LIST_SORT_ORDER,
  SET_SUPER_FUND_LIST_TABLE_LOADING_STATE,
  SORT_AND_FILTER_EMPLOYMENT_CLASSIFICATION_LIST,
  SORT_AND_FILTER_SUPER_FUND_LIST,
  SUBMIT_PAY_SLIP_EMAIL_DEFAULTS,
} from '../PayrollSettingsIntents';
import { findButtonWithTestId } from '../../../common/tests/selectors';
import { tabIds } from '../tabItems';
import LoadingState from '../../../components/PageView/LoadingState';
import PayrollSettingsModule from '../PayrollSettingsModule';
import TestIntegration from '../../../integration/TestIntegration';
import TestStore from '../../../store/TestStore';
import YearInput from '../../../components/autoFormatter/YearInput/YearInput';
import createPayrollSettingsDispatcher from '../createPayrollSettingsDispatcher';
import createPayrollSettingsIntegrator from '../createPayrollSettingsIntegrator';
import loadGeneralPayrollInformationResponse from '../mappings/data/loadGeneralPayrollInformationResponse';
import loadPaySlipEmailDefaultsResponse from '../mappings/data/loadPaySlipEmailDefaultsResponse';
import payrollSettingsReducer from '../reducer/payrollSettingsReducer';

const defaultIntegration = {
  read: ({ onSuccess }) => {
    onSuccess(
      loadGeneralPayrollInformationResponse,
    );
  },
};

describe('PayrollSettingsModule', () => {
  const businessId = 'businessId';
  const region = 'au';

  const constructPayrollSettingsModule = (
    integration = defaultIntegration, tab = tabIds.general,
  ) => {
    const context = { tab };
    const popMessages = () => (['']);
    const replaceURLParams = url => (url);

    let wrapper;
    const setRootView = (component) => {
      wrapper = mount(component);
    };

    const module = new PayrollSettingsModule({
      integration,
      setRootView,
      popMessages,
      replaceURLParams,
    });

    module.run(context);
    module.dispatcher.setGeneralPayrollInformationLoadingState(LoadingState.LOADING_SUCCESS);
    wrapper.update();

    return wrapper;
  };

  const setup = () => {
    const store = new TestStore(payrollSettingsReducer);
    const integration = new TestIntegration();
    const module = new PayrollSettingsModule({
      integration,
      setRootView: () => {},
      popMessages: () => [],
      replaceURLParams: () => {},
      globalCallbacks: () => {},
    });
    module.store = store;
    module.dispatcher = createPayrollSettingsDispatcher(store);
    module.integrator = createPayrollSettingsIntegrator(store, integration);

    return { store, module, integration };
  };

  const setupWithRun = () => {
    const { store, integration, module } = setup();

    module.run({ businessId, region });
    store.resetActions();
    integration.resetRequests();

    return { store, integration, module };
  };

  describe('Current Year field', () => {
    it('sets the current year to ReadOnly when current year is provided', () => {
      const integration = {
        read: ({ onSuccess }) => {
          onSuccess(
            loadGeneralPayrollInformationResponse,
          );
        },
      };
      const wrapper = constructPayrollSettingsModule(integration);

      const currentYearField = wrapper.find({ testid: 'currentYearField' }).find(ReadOnly);
      expect(currentYearField).toHaveLength(1);

      expect(currentYearField.contains('2019')).toEqual(true);
    });

    it('sets the current year to YearInput when current year is not provided', () => {
      const generalPayrollInformationResponse = {
        ...loadGeneralPayrollInformationResponse,
        currentYear: null,
      };
      const integration = {
        read: ({ onSuccess }) => {
          onSuccess(
            generalPayrollInformationResponse,
          );
        },
      };

      const wrapper = constructPayrollSettingsModule(integration);

      const currentYearField = wrapper.find({ testid: 'currentYearField' }).find(YearInput);

      expect(currentYearField).toHaveLength(1);
    });
  });

  describe('pay slip email defaults tab', () => {
    it('should include the paySlipEmailDefaultsTab', () => {
      const wrapper = constructPayrollSettingsModule();
      const paySlipEmailDefaultsTab = wrapper.findWhere(
        c => c.name() === 'TabItem' && c.text().includes('Pay slip email defaults'),
      );

      expect(paySlipEmailDefaultsTab).toHaveLength(1);
    });

    describe('value loading', () => {
      it('should fetch current defaults', () => {
        const integration = {
          read: jest.fn(),
        };
        constructPayrollSettingsModule(integration, tabIds.paySlipEmailDefaults);

        expect(integration.read).toHaveBeenCalledWith(expect.objectContaining({
          intent: LOAD_PAY_SLIP_EMAIL_DEFAULTS,
        }));
      });

      it('should populate fields with response data', () => {
        const integration = {
          read: ({ onSuccess }) => onSuccess(loadPaySlipEmailDefaultsResponse),
        };
        const wrapper = constructPayrollSettingsModule(integration, tabIds.paySlipEmailDefaults);

        const subjectInput = wrapper.findWhere(
          c => c.name() === 'Input' && c.prop('label') === 'Subject',
        );
        const messageInput = wrapper.findWhere(
          c => c.name() === 'TextArea' && c.prop('label') === 'Message',
        );
        const fromNameInput = wrapper.findWhere(
          c => c.name() === 'Input' && c.prop('label') === 'From name',
        );
        const replyToEmailInput = wrapper.findWhere(
          c => c.name() === 'Input' && c.prop('label') === 'Reply-to email address',
        );
        expect(subjectInput.prop('value')).toEqual(loadPaySlipEmailDefaultsResponse.subject);
        expect(messageInput.prop('value')).toEqual(loadPaySlipEmailDefaultsResponse.message);
        expect(fromNameInput.prop('value')).toEqual(loadPaySlipEmailDefaultsResponse.fromName);
        expect(replyToEmailInput.prop('value')).toEqual(loadPaySlipEmailDefaultsResponse.replyToEmail);
      });
    });

    describe('saving', () => {
      it('should write data to the integration on save button click', () => {
        const integration = {
          read: ({ onSuccess }) => onSuccess(loadPaySlipEmailDefaultsResponse),
          write: jest.fn(),
        };
        const wrapper = constructPayrollSettingsModule(integration, tabIds.paySlipEmailDefaults);
        const saveButton = findButtonWithTestId(wrapper, 'saveButton');
        saveButton.simulate('click');

        expect(integration.write).toHaveBeenCalledWith(expect.objectContaining({
          intent: SUBMIT_PAY_SLIP_EMAIL_DEFAULTS,
        }));
      });

      it('should render an alert if the submission fails', () => {
        const integration = {
          read: ({ onSuccess }) => onSuccess(loadPaySlipEmailDefaultsResponse),
          write: ({ onFailure }) => onFailure({ message: 'test message' }),
        };
        const wrapper = constructPayrollSettingsModule(integration, tabIds.paySlipEmailDefaults);
        const saveButton = findButtonWithTestId(wrapper, 'saveButton');

        saveButton.simulate('click');

        const alert = wrapper.find(Alert);
        expect(alert).toHaveLength(1);
        expect(alert.text()).toContain('test message');
        expect(alert.prop('type')).toEqual('danger');
      });

      it('should render success message if the submission succeeds', () => {
        const integration = {
          read: ({ onSuccess }) => onSuccess(loadPaySlipEmailDefaultsResponse),
          write: ({ onSuccess }) => onSuccess({ message: 'test message' }),
        };
        const wrapper = constructPayrollSettingsModule(integration, tabIds.paySlipEmailDefaults);
        const saveButton = findButtonWithTestId(wrapper, 'saveButton');

        saveButton.simulate('click');

        const alert = wrapper.find(Alert);
        expect(alert).toHaveLength(1);
        expect(alert.text()).toContain('test message');
        expect(alert.prop('type')).toEqual('success');
      });
    });
  });

  describe('Super fund list', () => {
    const setupWithLoad = () => {
      const { store, integration, module } = setupWithRun();

      module.loadSuperFundList();
      store.resetActions();
      integration.resetRequests();

      return { store, integration, module };
    };

    describe('setSuperFundListFilterOptions', () => {
      it('set filters options and triggers filtering', () => {
        const { store, integration, module } = setupWithLoad();
        jest.useFakeTimers();

        module.setSuperFundListFilterOptions({ key: 'keywords', value: 'value' });
        jest.runAllTimers();

        expect(store.getActions()).toEqual([
          { intent: SET_SUPER_FUND_LIST_FILTER_OPTIONS, key: 'keywords', value: 'value' },
          { intent: SET_SUPER_FUND_LIST_TABLE_LOADING_STATE, isTableLoading: true },
          { intent: SET_SUPER_FUND_LIST_TABLE_LOADING_STATE, isTableLoading: false },
          expect.objectContaining({ intent: SORT_AND_FILTER_SUPER_FUND_LIST }),
        ]);

        expect(integration.getRequests()).toEqual([
          {
            intent: SORT_AND_FILTER_SUPER_FUND_LIST,
            params: { keywords: 'value', orderBy: 'Name', sortOrder: 'asc' },
            urlParams: { businessId },
          },
        ]);
      });
    });

    describe('sortSuperFundList', () => {
      it('flip sort order and sort super fund list', () => {
        const orderBy = 'Name';
        const sortOrder = 'desc';

        const { store, integration, module } = setupWithLoad();

        module.sortSuperFundList(orderBy);
        expect(store.getActions()).toEqual([
          { intent: SET_SUPER_FUND_LIST_SORT_ORDER, orderBy, sortOrder },
          { intent: SET_SUPER_FUND_LIST_TABLE_LOADING_STATE, isTableLoading: true },
          { intent: SET_SUPER_FUND_LIST_TABLE_LOADING_STATE, isTableLoading: false },
          expect.objectContaining({ intent: SORT_AND_FILTER_SUPER_FUND_LIST }),
        ]);

        expect(integration.getRequests()).toEqual([
          {
            intent: SORT_AND_FILTER_SUPER_FUND_LIST,
            params: { keywords: '', orderBy, sortOrder },
            urlParams: { businessId },
          },
        ]);
      });
    });
  });

  describe('Employment classification list', () => {
    const setupWithLoad = () => {
      const { store, integration, module } = setupWithRun();

      module.loadEmploymentClassificationList();
      store.resetActions();
      integration.resetRequests();

      return { store, integration, module };
    };

    describe('setEmploymentClassificationListFilterOptions', () => {
      it('set filters options and triggers filtering', () => {
        const { store, integration, module } = setupWithLoad();
        jest.useFakeTimers();

        module.setEmploymentClassificationListFilterOptions({ key: 'keywords', value: 'value' });
        jest.runAllTimers();

        expect(store.getActions()).toEqual([
          { intent: SET_EMPLOYMENT_CLASSIFICATION_LIST_FILTER_OPTIONS, key: 'keywords', value: 'value' },
          { intent: SET_EMPLOYMENT_CLASSIFICATION_LIST_TABLE_LOADING_STATE, isTableLoading: true },
          { intent: SET_EMPLOYMENT_CLASSIFICATION_LIST_TABLE_LOADING_STATE, isTableLoading: false },
          expect.objectContaining({ intent: SORT_AND_FILTER_EMPLOYMENT_CLASSIFICATION_LIST }),
        ]);

        expect(integration.getRequests()).toEqual([
          {
            intent: SORT_AND_FILTER_EMPLOYMENT_CLASSIFICATION_LIST,
            params: { keywords: 'value', orderBy: 'Description', sortOrder: 'asc' },
            urlParams: { businessId },
          },
        ]);
      });
    });

    describe('sortEmploymentClassificationList', () => {
      it('filps sort order and sort employment classification list', () => {
        const orderBy = 'Description';
        const sortOrder = 'desc';

        const { store, integration, module } = setupWithLoad();

        module.sortEmploymentClassificationList(orderBy);

        expect(store.getActions()).toEqual([
          { intent: SET_EMPLOYMENT_CLASSIFICATION_LIST_SORT_ORDER, orderBy, sortOrder },
          { intent: SET_EMPLOYMENT_CLASSIFICATION_LIST_TABLE_LOADING_STATE, isTableLoading: true },
          { intent: SET_EMPLOYMENT_CLASSIFICATION_LIST_TABLE_LOADING_STATE, isTableLoading: false },
          expect.objectContaining({ intent: SORT_AND_FILTER_EMPLOYMENT_CLASSIFICATION_LIST }),
        ]);

        expect(integration.getRequests()).toEqual([
          {
            intent: SORT_AND_FILTER_EMPLOYMENT_CLASSIFICATION_LIST,
            params: { keywords: '', orderBy, sortOrder },
            urlParams: { businessId },
          },
        ]);
      });
    });
  });
});
