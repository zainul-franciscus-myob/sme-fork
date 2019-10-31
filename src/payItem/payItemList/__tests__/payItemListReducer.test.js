import { CLOSE_MODAL, UPDATE_TAX_PAY_ITEM_DETAIL } from '../../PayItemIntents';
import payItemListReducer from '../payItemListReducer';

describe('PayItemListReducer', () => {
  it('sets isPageEdited to false initially', () => {
    const actual = payItemListReducer(undefined, {});

    expect(actual.isPageEdited).toEqual(false);
  });

  it('sets isPageEdited to true when page is edited', () => {
    const action = {
      intent: UPDATE_TAX_PAY_ITEM_DETAIL,
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
