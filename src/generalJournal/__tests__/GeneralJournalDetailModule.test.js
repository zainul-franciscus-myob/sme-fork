import ReactDOM from 'react-dom';

import GeneralJournalDetailModule from '../GeneralJournalDetailModule';

describe('GeneralJournalDetailModule', () => {
  it('should render into the supplied DOM element', () => {
    const rootElement = document.createElement('div');
    const setRootView = (component) => {
      ReactDOM.render(component, rootElement);
    };

    const integration = {
      read: ({ onSuccess }) => onSuccess({
        generalJournal:
        {
          id: '',
          referenceId: '',
          date: '',
          gstReportingMethod: '',
          isEndOfYearAdjustment: false,
          isTaxInclusive: false,
          description: '',
          lines: [],
        },
        newLine:
        {
          accountId: '',
          debitAmount: '',
          creditAmount: '',
          description: '',
          taxCodeId: '',
          taxAmount: '',
          accounts: [],
          taxCodes: [],
        },
        modalType: '',
        alertMessage: '',
        isLoading: true,
      }),
      write: () => {},
    };

    const pushMessage = () => {};
    const module = new GeneralJournalDetailModule({ integration, setRootView, pushMessage });
    const context = {
      businessId: '1234',
      journalId: '12',
    };
    module.run(context);

    expect(rootElement.innerHTML).not.toBe('');
  });
});
