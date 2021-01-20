import { Card, FieldGroup } from '@myob/myob-widgets';
import React from 'react';

const SalesSettingsSubscribedEInvoicingDetails = ({ eInvoicingAppName }) => (
  <Card>
    <FieldGroup label="E-invoicing settings">
      <p>
        You are registered for E-invoicing with <b>{eInvoicingAppName}</b>. To
        manage your E-invoicing account please contact your provider.
      </p>
    </FieldGroup>
  </Card>
);

export default SalesSettingsSubscribedEInvoicingDetails;
