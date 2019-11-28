import {
  CHANGE_STP_DECLARATION_NAME,
  CLOSE_STP_DECLARATION_MODAL,
  OPEN_STP_DECLARATION_MODAL,
  SET_STP_DECLARATION_ALERT_MESSAGE,
  SET_STP_DECLARATION_LOADING_STATE,
} from '../../PayRunIntents';
import payRunReducer from '../../payRunReducer';

describe('recordPayRunReducer', () => {
  describe('openStpDeclarationModal', () => {
    it('should set the STP declaration modal to be opened', () => {
      const state = {
        recordPayRun: {
          stp: {
            isOpen: false,
          },
        },
      };

      const action = {
        intent: OPEN_STP_DECLARATION_MODAL,
      };

      const actual = payRunReducer(state, action);

      expect(actual.recordPayRun.stp.isOpen).toEqual(true);
    });
  });

  describe('closeStpDeclarationModal', () => {
    it('should set the STP declaration modal to be closed', () => {
      const state = {
        recordPayRun: {
          stp: {
            isOpen: true,
          },
        },
      };

      const action = {
        intent: CLOSE_STP_DECLARATION_MODAL,
      };

      const actual = payRunReducer(state, action);

      expect(actual.recordPayRun.stp.isOpen).toEqual(false);
    });
  });

  describe('setStpDeclarationModalLoadingState', () => {
    it('should set the STP declaration modal loading state', () => {
      const state = {
        recordPayRun: {
          stp: {
            isLoading: true,
          },
        },
      };

      const action = {
        intent: SET_STP_DECLARATION_LOADING_STATE,
        isLoading: false,
      };

      const actual = payRunReducer(state, action);

      expect(actual.recordPayRun.stp.isLoading).toEqual(false);
    });
  });

  describe('changeStpDeclarationName', () => {
    it('should change the STP declaration name', () => {
      const state = {
        recordPayRun: {
          stp: {
            name: '',
          },
        },
      };

      const action = {
        intent: CHANGE_STP_DECLARATION_NAME,
        name: 'Johnny Bravo',
      };

      const actual = payRunReducer(state, action);

      expect(actual.recordPayRun.stp.name).toEqual('Johnny Bravo');
    });
  });

  describe('setStpDeclarationModalAlertMessage', () => {
    it('should set the STP declaration modal alert', () => {
      const state = {
        recordPayRun: {
          stp: {
            alert: undefined,
          },
        },
      };

      const action = {
        intent: SET_STP_DECLARATION_ALERT_MESSAGE,
        alertMessage: 'Alert',
      };

      const actual = payRunReducer(state, action);

      expect(actual.recordPayRun.stp.alertMessage).toEqual('Alert');
    });
  });
});
