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

describe('InvoiceDetailModule_PaymentStatus', () => {
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

  it('should show a green closed when the invoice is fullypaid', () => {
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
      },
    });

    const statusLabel = wrapper.find('div[name="statusLabel"]');
    const statusLabelHtml = statusLabel.html();

    expect(statusLabel).toHaveLength(1);
    expect(statusLabelHtml.includes('green')).toEqual(true);
    expect(statusLabelHtml.includes('closed')).toEqual(true);
  });

  it('should show a red open when the invoice is not fullypaid and overdue', () => {
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
      },
    });

    const statusLabel = wrapper.find('div[name="statusLabel"]');
    const statusLabelHtml = statusLabel.html();

    expect(statusLabel).toHaveLength(1);
    expect(statusLabelHtml.includes('red')).toEqual(true);
    expect(statusLabelHtml.includes('open')).toEqual(true);
  });

  it('should show a white open when the invoice is not fullypaid and not overdue', () => {
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
      },
    });

    const statusLabel = wrapper.find('div[name="statusLabel"]');
    const statusLabelHtml = statusLabel.html();

    expect(statusLabel).toHaveLength(1);
    expect(statusLabelHtml.includes('white')).toEqual(true);
    expect(statusLabelHtml.includes('open')).toEqual(true);
  });

  it('should show a blue credit when the invoice is overpaid ', () => {
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
          ...getOverdueExpiration(),
        },
      },
    });

    const statusLabel = wrapper.find('div[name="statusLabel"]');
    const statusLabelHtml = statusLabel.html();

    expect(statusLabel).toHaveLength(1);
    expect(statusLabelHtml.includes('blue')).toEqual(true);
    expect(statusLabelHtml.includes('credit')).toEqual(true);
  });

  it('should not show status label on new invoice', () => {
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
      },
    });

    const statusLabel = wrapper.find('div[name="statusLabel"]');
    expect(statusLabel).toHaveLength(0);
  });
});
