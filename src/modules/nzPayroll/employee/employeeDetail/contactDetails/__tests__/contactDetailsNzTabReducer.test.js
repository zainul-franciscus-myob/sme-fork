
import { UPDATE_CONTACT_DETAIL } from '../../EmployeeDetailIntents';
import contactDetailsNzTabReducer from '../contactDetailsNzTabReducer';

describe('updateContactDetails', () => {
  const reducer = contactDetailsNzTabReducer[UPDATE_CONTACT_DETAIL];

  it('should update firstName field detail and set isPageEdited to true', () => {
    const state = {
      contactDetail: {
        firstName: 'test',
      },
    };
    const action = {
      intent: UPDATE_CONTACT_DETAIL,
      key: 'firstName',
      value: 'name',
    };
    const expected = {
      userInterface: { isPageEdited: true },
      contactDetail: { firstName: 'name' },
    };

    const actual = reducer(state, action);

    expect(actual).toEqual(expected);
  });

  it('should update country and set isPageEdited to true', () => {
    const state = { contactDetail: { country: 'Australia' } };
    const action = {
      intent: UPDATE_CONTACT_DETAIL,
      key: 'country',
      value: 'New Zealand',
    };
    const expected = {
      userInterface: { isPageEdited: true },
      contactDetail: {
        country: 'New Zealand',
      },
    };

    const actual = reducer(state, action);

    expect(actual).toEqual(expected);
  });
});
