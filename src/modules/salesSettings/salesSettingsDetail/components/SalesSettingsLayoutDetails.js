import {
  Card, FieldGroup, Select,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getLayout,
  getTabData,
} from '../SalesSettingsDetailSelectors';

const onInputChange = handler => e => handler({
  key: e.target.name,
  value: e.target.value,
});

const SalesSettingsLayoutDetails = ({
  salesSettings,
  onUpdateSalesSettingsItem,
  layout,
}) => (
  <Card>
    <FieldGroup label="Layout">
      <Select
        name="defaultSaleLayout"
        label="Field Layout"
        value={salesSettings.defaultSaleLayout}
        onChange={onInputChange(onUpdateSalesSettingsItem)}
      >
        {layout.map(({ name, value }) => (
          <Select.Option key={value} value={value} label={name} />
        ))}
      </Select>
    </FieldGroup>
  </Card>
);

const mapStateToProps = state => ({
  salesSettings: getTabData(state),
  layout: getLayout(state),
});

export default connect(mapStateToProps)(SalesSettingsLayoutDetails);
