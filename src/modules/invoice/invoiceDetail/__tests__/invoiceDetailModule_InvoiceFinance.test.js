import { format } from 'date-fns';
import { mount } from 'enzyme';

import * as telemetry from '../../../../telemetry/index';
import { LOAD_INVOICE_DETAIL } from '../../InvoiceIntents';
import InvoiceDetailModule from '../InvoiceDetailModule';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import createInvoiceDetailDispatcher from '../createInvoiceDetailDispatcher';
import createInvoiceDetailIntegrator from '../createInvoiceDetailIntegrator';
import defaultResponse from '../../mappings/data/serviceLayout/invoiceServiceDetail';
import invoiceDetailReducer from '../reducer/invoiceDetailReducer';

describe('InvoiceDetailModule_InvoiceFinance', () => {
  beforeEach(() => {
    telemetry.trackUserEvent = jest.fn();
  });

  afterEach(() => {
    telemetry.trackUserEvent.mockClear();
  });

  const line = {
    id: '345',
    type: 'service',
    description: 'Yak shaving - 1/2 an hour',
    accountId: '123',
    taxAmount: '0',
    taxExclusiveAmount: '48',
    taxCodeId: '2',
    lineTypeId: 17,
  };

  const getOntimeExpiration = () => {
    const today = new Date();
    const issueDate = format(today, 'yyyy-MM-dd');
    const expirationTerm = 'InAGivenNumberOfDays';
    const expirationDays = '1';
    return { issueDate, expirationTerm, expirationDays };
  };

  const getOverdueExpiration = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const issueDate = format(yesterday, 'yyyy-MM-dd');
    const expirationTerm = 'InAGivenNumberOfDays';
    const expirationDays = '1';
    return { issueDate, expirationTerm, expirationDays };
  };

  const setup = ({ invoiceId, desiredResponse }) => {
    let wrapper;
    const setRootView = (component) => {
      wrapper = mount(component);
    };
    const store = new TestStore(invoiceDetailReducer);
    const integration = new TestIntegration();
    integration.overrideMapping(LOAD_INVOICE_DETAIL, ({ onSuccess }) => {
      onSuccess(desiredResponse);
    });
    const module = new InvoiceDetailModule({
      integration,
      setRootView,
      pushMessage: () => {},
      popMessages: () => [],
      replaceURLParams: () => {},
      reload: () => {},
      featureToggles: { isRecurringTransactionEnabled: false },
      isToggleOn: () => {},
    });
    module.store = store;
    module.dispatcher = createInvoiceDetailDispatcher(store);
    module.integrator = createInvoiceDetailIntegrator(store, integration);
    module.run({ invoiceId, businessId: 'bizId', region: 'au' });
    module.updateHeaderOptions({ key: 'option', value: 'A' });
    store.resetActions();
    integration.resetRequests();
    wrapper.update();
    return { wrapper, module };
  };

  it('should show invoice finance button to eligible companies when the invoice is not overdue and open', () => {
    const { wrapper } = setup({
      invoiceId: '123',
      desiredResponse: {
        ...defaultResponse,
        invoice: {
          ...defaultResponse.invoice,
          lines: [
            {
              ...line,
              taxExclusiveAmount: '48',
            },
          ],
          amountPaid: '0',
          ...getOntimeExpiration(),
        },
        eligibility: {
          eligible: true,
          entryUrl: 'www.myob_invoice_finance_url.com',
          message: 'Get paid now',
        },
      },
    });

    const invoiceFinanceButton = wrapper.find('button[name="invoiceFinance"]');
    expect(invoiceFinanceButton).toHaveLength(1);
  });

  it('should not show invoice finance button when eligivility is null', () => {
    const { wrapper } = setup({
      invoiceId: '123',
      desiredResponse: {
        ...defaultResponse,
        invoice: {
          ...defaultResponse.invoice,
          lines: [
            {
              ...line,
              taxExclusiveAmount: '48',
            },
          ],
          amountPaid: '0',
          ...getOntimeExpiration(),
        },
        eligibility: null,
      },
    });

    const invoiceFinanceButton = wrapper.find('button[name="invoiceFinance"]');
    expect(invoiceFinanceButton).toHaveLength(0);
  });

  it('should not show invoice finance button to uneligible companes', () => {
    const { wrapper } = setup({
      invoiceId: '123',
      desiredResponse: {
        ...defaultResponse,
        invoice: {
          ...defaultResponse.invoice,
          lines: [
            {
              ...line,
              taxExclusiveAmount: '48',
            },
          ],
          amountPaid: '0',
          ...getOntimeExpiration(),
        },
        eligibility: {
          eligible: false,
          entryUrl: 'www.myob_invoice_finance_url.com',
          message: 'Get paid now',
        },
      },
    });

    const invoiceFinanceButton = wrapper.find('button[name="invoiceFinance"]');
    expect(invoiceFinanceButton).toHaveLength(0);
  });

  it('should not show invoice finance button on new invoice', () => {
    const { wrapper } = setup({
      invoiceId: 'new',
      desiredResponse: {
        ...defaultResponse,
        invoice: {
          ...defaultResponse.invoice,
          lines: [
            {
              ...line,
              taxExclusiveAmount: '48',
            },
          ],
          amountPaid: '0',
          ...getOntimeExpiration(),
        },
        eligibility: {
          eligible: true,
          entryUrl: 'www.myob_invoice_finance_url.com',
          message: 'Get paid now',
        },
      },
    });
    const invoiceFinanceButton = wrapper.find('button[name="invoiceFinance"]');
    expect(invoiceFinanceButton).toHaveLength(0);
  });

  it('should not show invoice finance button when it is fully paid', () => {
    const { wrapper } = setup({
      invoiceId: '123',
      desiredResponse: {
        ...defaultResponse,
        invoice: {
          ...defaultResponse.invoice,
          lines: [
            {
              ...line,
              taxExclusiveAmount: '48',
            },
          ],
          amountPaid: '48',
          ...getOntimeExpiration(),
        },
        eligibility: {
          eligible: true,
          entryUrl: 'www.myob_invoice_finance_url.com',
          message: 'Get paid now',
        },
      },
    });
    const invoiceFinanceButton = wrapper.find('button[name="invoiceFinance"]');
    expect(invoiceFinanceButton).toHaveLength(0);
  });

  it('should not show invoice finance button when it is over paid', () => {
    const { wrapper } = setup({
      invoiceId: '123',
      desiredResponse: {
        ...defaultResponse,
        invoice: {
          ...defaultResponse.invoice,
          lines: [
            {
              ...line,
              taxExclusiveAmount: '48',
            },
          ],
          amountPaid: '100',
          ...getOntimeExpiration(),
        },
        eligibility: {
          eligible: true,
          entryUrl: 'www.myob_invoice_finance_url.com',
          message: 'Get paid now',
        },
      },
    });
    const invoiceFinanceButton = wrapper.find('button[name="invoiceFinance"]');
    expect(invoiceFinanceButton).toHaveLength(0);
  });

  it('should not show invoice finance button when it is closed', () => {
    const { wrapper } = setup({
      invoiceId: '123',
      desiredResponse: {
        ...defaultResponse,
        invoice: {
          ...defaultResponse.invoice,
          lines: [
            {
              ...line,
              taxExclusiveAmount: '48',
            },
          ],
          amountPaid: '48',
          ...getOntimeExpiration(),
        },
        eligibility: {
          eligible: true,
          entryUrl: 'www.myob_invoice_finance_url.com',
          message: 'Get paid now',
        },
      },
    });
    const invoiceFinanceButton = wrapper.find('button[name="invoiceFinance"]');
    expect(invoiceFinanceButton).toHaveLength(0);
  });

  it('should not show invoice finance button when it is overdue', () => {
    const { wrapper } = setup({
      invoiceId: '123',
      desiredResponse: {
        ...defaultResponse,
        invoice: {
          ...defaultResponse.invoice,
          lines: [
            {
              ...line,
              taxExclusiveAmount: '48',
            },
          ],
          amountPaid: '0',
          ...getOverdueExpiration(),
        },
        eligibility: {
          eligible: true,
          entryUrl: 'www.myob_invoice_finance_url.com',
          message: 'Get paid now',
        },
      },
    });
    const invoiceFinanceButton = wrapper.find('button[name="invoiceFinance"]');
    expect(invoiceFinanceButton).toHaveLength(0);
  });

  it('should send telemetry when the button is visible', () => {
    setup({
      invoiceId: '123',
      desiredResponse: {
        ...defaultResponse,
        invoice: {
          ...defaultResponse.invoice,
          lines: [
            {
              ...line,
              taxExclusiveAmount: '48',
            },
          ],
          amountPaid: '0',
          ...getOntimeExpiration(),
        },
        eligibility: {
          eligible: true,
          entryUrl: 'www.myob_invoice_finance_url.com',
          message: 'Get paid now',
        },
      },
    });

    expect(telemetry.trackUserEvent).toHaveBeenCalledWith({
      customProperties: {
        action: 'load_invoice_finance_button',
        label: 'load_invoice_finance_button',
        productLine: 'Lending',
      },
      eventName: 'invoiceFinance',
    });
  });

  it('should not send telemetry when the button is not visible', () => {
    setup({
      invoiceId: '123',
      desiredResponse: {
        ...defaultResponse,
        invoice: {
          ...defaultResponse.invoice,
          lines: [
            {
              ...line,
              taxExclusiveAmount: '48',
            },
          ],
          amountPaid: '0',
        },
        eligibility: {
          eligible: false,
          entryUrl: 'www.myob_invoice_finance_url.com',
          message: 'Get paid now',
        },
      },
    });

    expect(telemetry.trackUserEvent).toHaveBeenCalledTimes(0);
  });

  it('should open invoice finance url in new tab when invoice finance button is clicked', () => {
    const { wrapper, module } = setup({
      invoiceId: '123',
      desiredResponse: {
        ...defaultResponse,
        invoice: {
          ...defaultResponse.invoice,
          lines: [
            {
              ...line,
              taxExclusiveAmount: '48',
            },
          ],
          amountPaid: '0',
          ...getOntimeExpiration(),
        },
        eligibility: {
          eligible: true,
          entryUrl: 'www.myob_invoice_finance_url.com',
          message: 'Get paid now',
        },
      },
    });

    module.navigateTo = jest.fn();

    const invoiceFinanceButton = wrapper.find('button[name="invoiceFinance"]');
    invoiceFinanceButton.simulate('click');
    wrapper.update();

    expect(module.navigateTo).toHaveBeenCalledWith(
      'www.myob_invoice_finance_url.com',
      true
    );
  });

  it('should send telementry when button is clicked', () => {
    const { wrapper, module } = setup({
      invoiceId: '123',
      desiredResponse: {
        ...defaultResponse,
        invoice: {
          ...defaultResponse.invoice,
          lines: [
            {
              ...line,
              taxExclusiveAmount: '48',
            },
          ],
          amountPaid: '0',
          ...getOntimeExpiration(),
        },
        eligibility: {
          eligible: true,
          entryUrl: 'www.myob_invoice_finance_url.com',
          message: 'Get paid now',
        },
      },
    });

    module.navigateTo = jest.fn();
    const invoiceFinanceButton = wrapper.find('button[name="invoiceFinance"]');
    invoiceFinanceButton.simulate('click');

    expect(telemetry.trackUserEvent).toHaveBeenCalledWith({
      customProperties: {
        action: 'click_invoice_finance_button',
        label: 'click_invoice_finance_button',
        productLine: 'Lending',
      },
      eventName: 'invoiceFinance',
    });
  });
});
