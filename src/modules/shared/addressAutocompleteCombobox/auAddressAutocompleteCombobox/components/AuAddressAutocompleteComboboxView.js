import { Combobox } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classnames from 'classnames';

import {
  getAutocompleteAddresses,
  getSelectedAutocompleteAddress,
} from '../auAddressAutocompleteComboboxSelectors';
import styles from './AuAddressAutocompleteComboboxView.module.css';

const AuAddressAutocompleteComboboxView = (props) => {
  const metaData = [{ columnName: 'streetLine', showData: true }];
  const renderItem = (_, item) => item.address;

  return (
    <Combobox
      className={classnames(styles.hideArrow, styles.hideErrorMessage)}
      metaData={metaData}
      renderItem={renderItem}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  items: getAutocompleteAddresses(state),
  selected: getSelectedAutocompleteAddress(state),
});

export default connect(mapStateToProps)(AuAddressAutocompleteComboboxView);
