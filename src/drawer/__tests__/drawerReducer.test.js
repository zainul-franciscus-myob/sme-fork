import * as views from '../drawerViews';
import { CLOSE_DRAWER, TOGGLE_ACTIVITIES, TOGGLE_HELP } from '../drawerIntents';
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
      createState(true, views.ACTIVITIES),
    ];
    testCases.forEach(testCase => test(testCase, action, { ...testCase, isOpen: false }));
  });

  describe('TOGGLE_ACTIVITIES', () => {
    const action = { intent: TOGGLE_ACTIVITIES, view: views.ACTIVITIES };
    const testCases = [
      [createState(false, null), createState(true, views.ACTIVITIES)],
      [createState(false, views.HELP), createState(true, views.ACTIVITIES)],
      [createState(true, views.HELP), createState(true, views.ACTIVITIES)],
      [createState(false, views.ACTIVITIES), createState(true, views.ACTIVITIES)],
      [createState(true, views.ACTIVITIES), createState(false, views.ACTIVITIES)],
    ];
    testCases.forEach(([testCase, expectedResult]) => test(testCase, action, expectedResult));
  });

  describe('TOGGLE_HELP', () => {
    const action = { intent: TOGGLE_HELP, view: views.HELP };
    const testCases = [
      [createState(false, null), createState(true, views.HELP)],
      [createState(false, views.ACTIVITIES), createState(true, views.HELP)],
      [createState(true, views.ACTIVITIES), createState(true, views.HELP)],
      [createState(false, views.HELP), createState(true, views.HELP)],
      [createState(true, views.HELP), createState(false, views.HELP)],
    ];
    testCases.forEach(([testCase, expectedResult]) => test(testCase, action, expectedResult));
  });
});
