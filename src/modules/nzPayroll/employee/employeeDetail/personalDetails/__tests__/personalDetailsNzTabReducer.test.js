import * as intents from '../../EmployeeDetailNzIntents';
import personalDetailsNzTabReducer from '../personalDetailsNzTabReducer';

describe('personalDetailsNzTabReducer', () => {
  it('updatePersonalDetails should update state with supplied key and value', () => {
    const reducer = personalDetailsNzTabReducer[intents.UPDATE_PERSONAL_DETAIL];
    const state = { personalDetail: { name: 'Test' } };
    const expected = {
      isPageEdited: true,
      personalDetail: { name: 'FirstName' },
    };

    const action = { key: 'name', value: 'FirstName' };

    expect(reducer(state, action)).toMatchObject(expected);
  });
  describe('updatepersonalDetails', () => {
    it('should update firstName field detail and set isPageEdited to true', () => {
      const state = {
        personalDetail: {
          firstName: 'test',
        },
      };
      const action = {
        intent: intents.UPDATE_PERSONAL_DETAIL,
        key: 'firstName',
        value: 'name',
      };
      const expected = {
        isPageEdited: true,
        personalDetail: {
          firstName: 'name',
        },
      };

      const reducer =
        personalDetailsNzTabReducer[intents.UPDATE_PERSONAL_DETAIL];

      const actual = reducer(state, action);

      expect(actual).toEqual(expected);
    });

    it('should update country and set isPageEdited to true', () => {
      const state = {
        personalDetail: {
          country: 'Australia',
        },
      };
      const action = {
        intent: intents.UPDATE_PERSONAL_DETAIL,
        key: 'country',
        value: 'New Zealand',
      };
      const expected = {
        isPageEdited: true,
        personalDetail: {
          country: 'New Zealand',
        },
      };

      const reducer =
        personalDetailsNzTabReducer[intents.UPDATE_PERSONAL_DETAIL];

      const actual = reducer(state, action);

      expect(actual).toEqual(expected);
    });
  });
});
