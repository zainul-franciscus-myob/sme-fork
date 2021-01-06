import { Alert } from '@myob/myob-widgets';
import { mount } from 'enzyme';
import React from 'react';

import EmailSendingMessage from '../EmailSendingMessage';

describe('EmailSendingMessage', () => {
  describe('sending complete', () => {
    it('shows a success alert when all emails succeed', () => {
      const component = mount(
        <EmailSendingMessage isLoading={false} errors={[]} />
      );

      const alert = component.find(Alert);

      expect(alert).toHaveLength(1);
      expect(alert.prop('type')).toEqual('success');
      expect(
        alert.contains('Your emails have been successfully sent.')
      ).toBeTruthy();
    });

    it('shows a danger alert when any emails fail', () => {
      const component = mount(
        <EmailSendingMessage
          isLoading={false}
          errors={[
            {
              name: 'Sue',
              email: 'sue@example.com',
            },
          ]}
        />
      );

      const alert = component.find(Alert);

      expect(alert).toHaveLength(1);
      expect(alert.prop('type')).toEqual('danger');
      expect(alert.text()).toContain(
        'Failed to send emails to the following employees. Check to make sure you have entered a ‘Reply-to email address’ in Payroll settings, email defaults. This might be causing the error.'
      );
      expect(alert.text()).toContain('Sue');
      expect(alert.text()).toContain('sue@example.com');
    });
  });
});
