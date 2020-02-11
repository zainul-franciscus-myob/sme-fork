import { FieldGroup } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getRegion, getTabData } from '../../salesSettings/salesSettingsDetail/SalesSettingsDetailSelectors';
import AuDirectDeposit from '../../salesSettings/salesSettingsDetail/components/AuDirectDeposit';
import NzDirectDeposit from '../../salesSettings/salesSettingsDetail/components/NzDirectDeposit';
import Region from '../../../common/types/Region';

const InvoicePaymentSettingsDetails = ({
  onUpdateSalesSettingsItem,
  region,
}) => {
  const PaymentOptions = ({
    [Region.au]: AuDirectDeposit,
    [Region.nz]: NzDirectDeposit,
  })[region];

  return (
    <FieldGroup label="Invoice payment options">
      <p>
        Make it easy for your customers to pay by adding your direct deposit details
        to your invoices. Once you subscribe, you can also set up online payments.
      </p>

      <PaymentOptions onUpdateSalesSettingsItem={onUpdateSalesSettingsItem} />
    </FieldGroup>
  );
};

const mapStateToProps = state => ({
  ...getTabData(state),
  region: getRegion(state),
});

export default connect(mapStateToProps)(InvoicePaymentSettingsDetails);
