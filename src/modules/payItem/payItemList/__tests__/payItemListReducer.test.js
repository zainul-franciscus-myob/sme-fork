import { CLOSE_MODAL, SET_IS_PAGE_EDITED } from '../../PayItemIntents';
import payItemListReducer from '../payItemListReducer';

describe('PayItemListReducer', () => {
  it('sets isPageEdited to false initially', () => {
    const actual = payItemListReducer(undefined, {});

    expect(actual.isPageEdited).toEqual(false);
  });

  it('sets isPageEdited correctly', () => {
    const action = {
      intent: SET_IS_PAGE_EDITED,
      isPageEdited: true,
    };

    const reducer = payItemListReducer(undefined, action);

    expect(reducer.isPageEdited).toEqual(true);
  });

  it('sets the modal to undefined when close modal', () => {
    const action = {
      intent: CLOSE_MODAL,
    };

    const reducer = payItemListReducer({ modal: { type: 'UNSAVED' } }, action);

    expect(reducer.modal).toEqual(undefined);
  });
});
