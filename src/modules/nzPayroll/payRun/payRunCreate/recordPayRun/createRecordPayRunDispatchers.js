import {
  CLOSE_RECORD_PAYRUN_WITH_IR_FILING_MODAL,
  OPEN_RECORD_PAYRUN_WITH_IR_FILING_MODAL,
} from '../PayRunIntents';
import createPayRunDispatchers from '../createPayRunDispatchers';

const createRecordPayRunDispatchers = (store) => ({
  openRecordPayRunIRFileModal: () => {
    const intent = OPEN_RECORD_PAYRUN_WITH_IR_FILING_MODAL;
    store.dispatch({
      intent,
    });
  },

  closeRecordPayRunIRFileModal: () => {
    const intent = CLOSE_RECORD_PAYRUN_WITH_IR_FILING_MODAL;
    store.dispatch({
      intent,
    });
  },

  ...createPayRunDispatchers(store),
});

export default createRecordPayRunDispatchers;
