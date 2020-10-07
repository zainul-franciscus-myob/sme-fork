import {
  LOAD_BANKING_RULE,
  LOAD_JOB_AFTER_CREATE,
  LOAD_NEW_BANKING_RULE,
} from '../../BankingRuleDetailIntents';
import RuleTypes from '../../RuleTypes';
import bankingRuleDetailReducer from '..';

describe('bankingRuleReducer', () => {
  describe('LOAD_BANKING_RULE', () => {
    const state = {};
    const conditions = [
      {
        field: 'Description',
        predicates: [
          {
            matcher: 'Contains',
            value: 'something',
          },
        ],
      },
    ];
    const action = {
      intent: LOAD_BANKING_RULE,
      bankingRule: {
        conditions,
        allocations: [
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
        newAllocationLine: {
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
      },
    };

    describe('sets job options on each line and newLine', () => {
      it('shows inactive selected jobs against each line', () => {
        const lineOneExpectedOptions = action.bankingRule.jobs.filter(
          (job) => job.id !== '2'
        );
        const lineTwoExpectedOptions = action.bankingRule.jobs.filter(
          (job) => job.id !== '1'
        );
        const lineThreeExpectedOptions = action.bankingRule.jobs.filter(
          (job) => job.id !== '1' && job.id !== '2'
        );

        const actual = bankingRuleDetailReducer(state, action);

        expect(actual.allocations[0].lineJobOptions).toEqual(
          lineOneExpectedOptions
        );
        expect(actual.allocations[1].lineJobOptions).toEqual(
          lineTwoExpectedOptions
        );
        expect(actual.allocations[2].lineJobOptions).toEqual(
          lineThreeExpectedOptions
        );
      });

      it('shows active jobs against new line', () => {
        const expectedJobOptions = action.bankingRule.jobs.filter(
          (job) => job.isActive
        );
        const actual = bankingRuleDetailReducer(state, action);

        expect(actual.newAllocationLine.lineJobOptions).toEqual(
          expectedJobOptions
        );
      });
    });

    describe('conditions', () => {
      it('sets the conditions returned by the bank rule detail', () => {
        const actual = bankingRuleDetailReducer(state, action);
        expect(actual.conditions).toEqual(conditions);
      });
    });
  });

  describe('LOAD_NEW_BANKING_RULE', () => {
    describe('sets job options on the newLine', () => {
      const state = {};

      const action = {
        intent: LOAD_NEW_BANKING_RULE,
        bankingRule: {
          newAllocationLine: {
            lineJobOptions: [],
          },
          allocations: [],
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
        },
      };

      it('shows active jobs against new line', () => {
        const expectedJobOptions = action.bankingRule.jobs.filter(
          (job) => job.isActive
        );
        const actual = bankingRuleDetailReducer(state, action);

        expect(actual.newAllocationLine.lineJobOptions).toEqual(
          expectedJobOptions
        );
      });
    });

    describe('conditions', () => {
      const action = {
        intent: LOAD_NEW_BANKING_RULE,
        bankingRule: {
          newAllocationLine: {
            lineJobOptions: [],
          },
          allocations: [],
          conditions: [],
        },
      };

      const condition = {
        field: 'Description',
        predicates: [
          {
            matcher: 'Contains',
            value: '',
          },
        ],
      };

      describe('isNoConditionRule feature toggle enabled', () => {
        it.each([
          ['does not prefill', RuleTypes.spendMoney, 0],
          ['does not prefill', RuleTypes.receiveMoney, 0],
          ['does prefill', RuleTypes.bill, 1],
          ['does prefill', RuleTypes.invoice, 1],
        ])('%s condition for %s', (_, ruleType, expectedConditionCount) => {
          const state = {
            bankingRuleId: 'new',
            isNoConditionRuleEnabled: true,
            ruleType,
            conditions: [],
          };

          const actual = bankingRuleDetailReducer(state, action);
          expect(actual.conditions.length).toEqual(expectedConditionCount);
          if (actual.conditions.length > 0) {
            expect(actual.conditions[0]).toEqual(condition);
          }
        });
      });

      describe('isNoConditionRule feature toggle disabled', () => {
        it('always set the condition to be description', () => {
          const state = {
            bankingRuleId: 'new',
            isNoConditionRuleEnabled: false,
            conditions: [],
          };

          const actual = bankingRuleDetailReducer(state, action);
          expect(actual.conditions.length).toEqual(1);
          expect(actual.conditions[0]).toEqual(condition);
        });
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
      jobs: lineJobOptions,
      allocations: [
        {
          jobId: '1',
          lineJobOptions,
        },
        {
          jobId: '2',
          lineJobOptions,
        },
        {
          jobId: '3',
          lineJobOptions,
        },
      ],
      newAllocationLine: {
        lineJobOptions,
      },
      bankingRuleId: '1',
    };

    const action = {
      intent: LOAD_JOB_AFTER_CREATE,
      id: '3',
      jobNumber: '300',
    };

    const actual = bankingRuleDetailReducer(state, action);

    it('adds newly created job into the front of jobOptions on each line', () => {
      expect(
        actual.allocations.map((allocation) => allocation.lineJobOptions[0])
      ).toEqual([
        { id: '3', jobNumber: '300' },
        { id: '3', jobNumber: '300' },
        { id: '3', jobNumber: '300' },
      ]);
    });

    it('adds newly created job into the front of jobOptions on new line', () => {
      expect(actual.newAllocationLine.lineJobOptions[0]).toEqual({
        id: '3',
        jobNumber: '300',
      });
    });

    it('does not update other attributes in banking rule', () => {
      expect(actual.bankingRuleId).toBe('1');
    });
  });
});
