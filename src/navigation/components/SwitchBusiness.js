import { Navigation } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  getBusinessId,
} from '../NavigationSelectors';

const SwitchBusiness = ({ businessId }) => (businessId ? (<Navigation.Link key="Switch Business" url="#/business" label="Switch clients" />) : null);

const mapStateToProps = state => ({
  businessId: getBusinessId(state),
});

SwitchBusiness.propTypes = {
  businessId: PropTypes.string.isRequired,
};
export default connect(mapStateToProps)(SwitchBusiness);
