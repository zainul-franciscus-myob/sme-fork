import { Provider } from 'react-redux';
import { mount } from 'enzyme/build';
import React from 'react';

import { findButtonWithTestId } from '../../../../../common/tests/selectors';
import ActionButtons from '../ActionButtons';
import Store from '../../../../../store/Store';

describe('ActionButtons', () => {
  const constructActionButtons = (state = {}) => {
    const store = new Store(() => ({ ...state }));
    const wrappedComponent = (
      <Provider store={store}>
        <ActionButtons
          status={store.state.status}
          isReversal={store.state.isReversal}
          onAuthoriseClick={() => {}}
          onCancelClick={() => {}}
          onRecordReverseClick={() => {}}
          onReverseClick={() => {}}
        />
      </Provider>
    );

    return mount(wrappedComponent);
  };

  it.each([
    'FundsUnavailable',
    'FundsTransferError',
    'PaymentDispersmentError',
    'PartiallyAuthorised',
    'Created',
  ])('should show reversal transaction button on %s status', (testStatus) => {
    const buttons = constructActionButtons({
      status: testStatus,
    });
    expect(findButtonWithTestId(buttons, 'reversalButton')).toHaveLength(1);
  });

  it.each(['RecordReversal', ''])(
    'should not show reversal transaction button on %s status',
    (testStatus) => {
      const buttons = constructActionButtons({
        status: testStatus,
      });
      expect(findButtonWithTestId(buttons, 'reversalButton')).toHaveLength(0);
    }
  );

  it.each(['PartiallyAuthorised', 'Created'])(
    'should show authorize button on %s status',
    (testStatus) => {
      const buttons = constructActionButtons({
        status: testStatus,
      });
      expect(findButtonWithTestId(buttons, 'authorizeButton')).toHaveLength(1);
    }
  );

  it.each(['FundsUnavailable', '', 'Random'])(
    'should not show authorize button on %s status',
    (testStatus) => {
      const buttons = constructActionButtons({
        status: testStatus,
      });
      expect(findButtonWithTestId(buttons, 'authorizeButton')).toHaveLength(0);
    }
  );

  it('should only show record reversal button on RecordReversal status', () => {
    const buttons = constructActionButtons({
      status: 'RecordReversal',
    });
    expect(findButtonWithTestId(buttons, 'recordReversalButton')).toHaveLength(
      1
    );
    expect(findButtonWithTestId(buttons, 'authorizeButton')).toHaveLength(0);
    expect(findButtonWithTestId(buttons, 'reversalButton')).toHaveLength(0);
  });

  it.each([
    'FundsUnavailable',
    'FundsTransferError',
    'PaymentDispersmentError',
    'PartiallyAuthorised',
    'Created',
    '',
    'abcd',
  ])(
    'should not show any action button when it is a reversal transaction for status %s',
    (testStatus) => {
      const buttons = constructActionButtons({
        status: testStatus,
        isReversal: true,
      });
      expect(findButtonWithTestId(buttons, 'authorizeButton')).toHaveLength(0);
      expect(findButtonWithTestId(buttons, 'reversalButton')).toHaveLength(0);
    }
  );

  it('should show action buttons when it is not a reversal transaction', () => {
    const buttons = constructActionButtons({
      status: 'PartiallyAuthorised',
      isReversal: false,
    });
    expect(findButtonWithTestId(buttons, 'authorizeButton')).toHaveLength(1);
    expect(findButtonWithTestId(buttons, 'reversalButton')).toHaveLength(1);
  });
});
