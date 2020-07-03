import Decimal from 'decimal.js';

import {
  GET_TAX_CALCULATIONS, LOAD_ACCOUNT_AFTER_CREATE, LOAD_GENERAL_JOURNAL_DETAIL,
  LOAD_JOB_AFTER_CREATE,
  LOAD_NEW_GENERAL_JOURNAL,
} from '../../GeneralJournalIntents';
import generalJournalReducer from '../generalJournalDetailReducer';

describe('generalJournalDetailReducer', () => {
  describe('getTaxCalculations', () => {
    it('should update lines and totals', () => {
      const taxCalculations = {
        lines: [
          {
            taxExclusiveAmount: Decimal(50),
            taxAmount: Decimal(5),
            amount: Decimal(55),
            isCredit: true,
          },
          {
            taxExclusiveAmount: Decimal(100),
            taxAmount: Decimal(10),
            amount: Decimal(110),
            isCredit: false,
          },
        ],
        totals: {
          totalCredit: Decimal(55),
          totalDebit: Decimal(110),
          totalOutOfBalance: Decimal(55),
          totalTax: Decimal(5),
        },
      };
      const state = {
        generalJournal: {
          gstReportingMethod: 'purchase',
          isTaxInclusive: true,
          lines: [
            {
              accountId: '1',
              debitAmount: '',
              creditAmount: '40',
              quantity: '1',
              description: '',
              taxCodeId: '1',
              taxAmount: '4',
              lineTypeId: '37',
              displayCreditAmount: '40',
              displayDebitAmount: '',
            },
            {
              accountId: '2',
              debitAmount: '90',
              creditAmount: '',
              quantity: '1',
              description: '',
              taxCodeId: '1',
              taxAmount: '49',
              lineTypeId: '37',
              displayCreditAmount: '90',
              displayDebitAmount: '',
            },
          ],
        },
      };

      const action = {
        intent: GET_TAX_CALCULATIONS,
        taxCalculations,
      };

      const actual = generalJournalReducer(state, action);

      const expected = {
        generalJournal: {
          gstReportingMethod: 'purchase',
          isTaxInclusive: true,
          lines: [
            {
              accountId: '1',
              creditAmount: '55',
              debitAmount: '',
              description: '',
              displayCreditAmount: '55.00',
              displayDebitAmount: '',
              lineTypeId: '37',
              quantity: '1',
              taxAmount: '4',
              taxCodeId: '1',
            },
            {
              accountId: '2',
              creditAmount: '',
              debitAmount: '110',
              description: '',
              displayCreditAmount: '90',
              displayDebitAmount: '110.00',
              lineTypeId: '37',
              quantity: '1',
              taxAmount: '49',
              taxCodeId: '1',
            },
          ],
        },
        isPageEdited: true,
        totals: {
          totalCredit: '$55.00',
          totalDebit: '$110.00',
          totalOutOfBalance: '$55.00',
          totalTax: '$5.00',
        },
      };
      expect(actual).toEqual(expected);
    });

    it('should set totals tax to negative, if gstReportingMethod is sale', () => {
      const taxCalculations = {
        lines: [
          {
            taxExclusiveAmount: Decimal(50),
            taxAmount: Decimal(5),
            amount: Decimal(55),
            isCredit: true,
          },
        ],
        totals: {
          totalCredit: Decimal(55),
          totalDebit: Decimal(110),
          totalOutOfBalance: Decimal(55),
          totalTax: Decimal(5),
        },
      };
      const state = {
        generalJournal: {
          gstReportingMethod: 'sale',
          isTaxInclusive: true,
          lines: [
            {
              accountId: '1',
              debitAmount: '',
              creditAmount: '40',
              quantity: '1',
              description: '',
              taxCodeId: '1',
              taxAmount: '4',
              lineTypeId: '37',
              displayCreditAmount: '40',
              displayDebitAmount: '',
            },
          ],
        },
      };

      const action = {
        intent: GET_TAX_CALCULATIONS,
        taxCalculations,
      };

      const actual = generalJournalReducer(state, action);

      expect(actual.totals.totalTax).toEqual('-$5.00');
    });
  });

  describe('loadAccountAfterCreate', () => {
    it('adds newly created account into the accounts list', () => {
      const state = {
        accountOptions: [
          {
            id: '1',
          },
        ],
      };

      const createdAccount = {
        id: '123',
        displayName: 'My quick account',
        accountType: 'Asset',
        taxCodeId: '123',
        displayId: '1-9944',
      };

      const action = {
        intent: LOAD_ACCOUNT_AFTER_CREATE,
        ...createdAccount,
      };

      const actual = generalJournalReducer(state, action);

      const expected = {
        accountOptions: [
          {
            id: '123',
            displayName: 'My quick account',
            accountType: 'Asset',
            taxCodeId: '123',
            displayId: '1-9944',
          },
          {
            id: '1',
          },
        ],
        isPageEdited: true,
      };

      expect(actual).toEqual(expected);
    });
  });
});

describe('loadNewGeneralJournal', () => {
  const state = {};

  const action = {
    intent: LOAD_NEW_GENERAL_JOURNAL,
    generalJournal: {
      lines: [
        {
          jobId: '1',
        },
        {
          jobId: '2',
        },
        {
          jobId: '3',
        },
      ],
    },
    newLine: {
      lineJobOptions: [],
    },
    jobs: [
      {
        id: '1',
        isActive: false,
      },
      {
        id: '2',
        isActive: false,
      },
      {
        id: '3',
        isActive: true,
      },
      {
        id: '4',
        isActive: true,
      },
    ],
  };
  describe('sets job options on newLine', () => {
    it('shows active jobs against new line', () => {
      const expectedJobOptions = action.jobs.filter(job => job.isActive);
      const actual = generalJournalReducer(state, action);
      expect(actual.newLine.lineJobOptions).toEqual(expectedJobOptions);
    });
  });
});


describe('LOAD_JOB_AFTER_CREATE', () => {
  const lineJobOptions = [
    {
      id: '1',
      jobNumber: '100',
    },
    {
      id: '2',
      jobNumber: '200',
    },
  ];

  const state = {
    generalJournal: {
      lines: [{ lineJobOptions }, { lineJobOptions }, { lineJobOptions }],
    },
    newLine: {
      lineJobOptions,
    },
  };

  const action = {
    intent: LOAD_JOB_AFTER_CREATE,
    id: '3',
    jobName: 'Job 3',
    jobNumber: '300',
  };

  it('adds new job payload to the front of all line job options', () => {
    const actual = generalJournalReducer(state, action);
    expect(actual.generalJournal.lines.map(line => line.lineJobOptions[0])).toEqual([
      { id: '3', jobName: 'Job 3', jobNumber: '300' },
      { id: '3', jobName: 'Job 3', jobNumber: '300' },
      { id: '3', jobName: 'Job 3', jobNumber: '300' },
    ]);
  });

  it('adds new job payload to the front of lineJobOptions on newLine', () => {
    const actual = generalJournalReducer(state, action);

    expect(actual.newLine.lineJobOptions[0]).toEqual({
      id: '3',
      jobName: 'Job 3',
      jobNumber: '300',
    });
  });

  it('sets page state to edited', () => {
    const actual = generalJournalReducer(state, action);

    expect(actual.isPageEdited).toEqual(true);
  });
});

describe('LOAD_GENERAL_JOURNAL_DETAIL', () => {
  const state = {};

  const action = {
    intent: LOAD_GENERAL_JOURNAL_DETAIL,
    generalJournal: {
      lines: [
        {
          jobId: '1',
        },
        {
          jobId: '2',
        },
        {
          jobId: '3',
        },
      ],
    },
    newLine: {
      lineJobOptions: [{
        id: '1',
        isActive: false,
      },
      {
        id: '2',
        isActive: false,
      },
      {
        id: '3',
        isActive: true,
      },
      {
        id: '4',
        isActive: true,
      }],
    },
    jobs: [
      {
        id: '1',
        isActive: false,
      },
      {
        id: '2',
        isActive: false,
      },
      {
        id: '3',
        isActive: true,
      },
      {
        id: '4',
        isActive: true,
      },
    ],
  };
  describe('sets job options on each line and newLine', () => {
    it('shows inactive selected jobs against each line', () => {
      const lineOneExpectedOptions = action.jobs.filter(job => job.id !== '2');
      const lineTwoExpectedOptions = action.jobs.filter(job => job.id !== '1');
      const lineThreeExpectedOptions = action.jobs.filter(job => job.id !== '1' && job.id !== '2');

      const actual = generalJournalReducer(state, action);

      expect(actual.generalJournal.lines[0].lineJobOptions).toEqual(lineOneExpectedOptions);
      expect(actual.generalJournal.lines[1].lineJobOptions).toEqual(lineTwoExpectedOptions);
      expect(actual.generalJournal.lines[2].lineJobOptions).toEqual(lineThreeExpectedOptions);
    });

    it('shows active jobs against new line', () => {
      const expectedJobOptions = action.jobs.filter(job => job.isActive);
      const actual = generalJournalReducer(state, action);
      expect(actual.newLine.lineJobOptions).toEqual(expectedJobOptions);
    });
  });
});
