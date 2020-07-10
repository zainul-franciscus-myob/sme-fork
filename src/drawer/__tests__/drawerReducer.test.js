import * as views from '../drawerViews';
import { CLOSE_DRAWER, TOGGLE_HELP, TOGGLE_TASKS } from '../drawerIntents';
import reducer from '../drawerReducer';

describe('drawerReducer', () => {
  const test = (testCase, action, expectedResult) => {
    it(`for state { isOpen: ${testCase.isOpen}, drawerView: ${testCase.drawerView}}`, () => {
      const actual = reducer(testCase, action);
      expect(actual).toStrictEqual(expectedResult);
    });
  };

  const createState = (isOpen, drawerView) => ({ isOpen, drawerView });

  describe('CLOSE_DRAWER', () => {
    const action = { intent: CLOSE_DRAWER, view: null };
    const testCases = [
      createState(false, null),
      createState(true, views.HELP),
      createState(true, views.TASKS),
    ];
    testCases.forEach((testCase) =>
      test(testCase, action, { ...testCase, isOpen: false })
    );
  });

  describe('TOGGLE_TASKS', () => {
    const action = { intent: TOGGLE_TASKS, view: views.TASKS };
    const testCases = [
      [createState(false, null), createState(true, views.TASKS)],
      [createState(false, views.HELP), createState(true, views.TASKS)],
      [createState(true, views.HELP), createState(true, views.TASKS)],
      [createState(false, views.TASKS), createState(true, views.TASKS)],
      [createState(true, views.TASKS), createState(false, views.TASKS)],
    ];
    testCases.forEach(([testCase, expectedResult]) =>
      test(testCase, action, expectedResult)
    );
  });

  describe('TOGGLE_HELP', () => {
    const action = { intent: TOGGLE_HELP, view: views.HELP };
    const testCases = [
      [createState(false, null), createState(true, views.HELP)],
      [createState(false, views.TASKS), createState(true, views.HELP)],
      [createState(true, views.TASKS), createState(true, views.HELP)],
      [createState(false, views.HELP), createState(true, views.HELP)],
      [createState(true, views.HELP), createState(false, views.HELP)],
    ];
    testCases.forEach(([testCase, expectedResult]) =>
      test(testCase, action, expectedResult)
    );
  });
});
