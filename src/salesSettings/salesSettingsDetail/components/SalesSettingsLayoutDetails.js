import {
  Card, FieldGroup, ReadOnly, Select,
} from '@myob/myob-widgets';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import {
  getLayout, getLayoutDescription,
  getTabData,
} from '../SalesSettingsDetailSelectors';
import styles from './SalesSettingsLayoutDetails.module.css';

const onInputChange = handler => e => handler({
  key: e.target.name,
  value: e.target.value,
});

const SalesSettingsLayoutDetails = ({
  salesSettings,
  onUpdateSalesSettingsItem,
  layout,
  layoutDescription,
}) => (
  <Card>
    <FieldGroup label="Layout">
      <p>
        Choose a layout to determine what information shows on your invoices and quotes.
      </p>
      <Select
        name="defaultSaleLayout"
        label="Layout"
        value={salesSettings.defaultSaleLayout}
        onChange={onInputChange(onUpdateSalesSettingsItem)}
      >
        {layout.map(({ name, value }) => (
          <Select.Option key={value} value={value} label={name} />
        ))}
      </Select>
      <ReadOnly
        name="description"
        label="Description"
        hideLabel
        className={styles.layoutDescription}
      >
        { layoutDescription }
      </ReadOnly>
    </FieldGroup>
  </Card>
);

SalesSettingsLayoutDetails.propTypes = {
  salesSettings: PropTypes.shape({}).isRequired,
  layout: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onUpdateSalesSettingsItem: PropTypes.func.isRequired,
  layoutDescription: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  salesSettings: getTabData(state),
  layout: getLayout(state),
  layoutDescription: getLayoutDescription(state),
});

export default connect(mapStateToProps)(SalesSettingsLayoutDetails);
