import { Icons, Navigation } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getActiveNav, getPayrollUrls } from '../NavigationSelectors';

const getItems = urls => [
  urls.employeeList && <Navigation.MenuLink key="Employees" url={urls.employeeList} label="Employees" />,
].filter(Boolean);

const PayrollMenu = ({ urls, onMenuSelect, activeNav }) => (
  <Navigation.Menu
    label="Payroll"
    icon={<Icons.Caret />}
    onSelect={onMenuSelect}
    items={getItems(urls)}
    active={activeNav === 'payroll'}
  />
);

const mapStateToProps = (state, props) => ({
  activeNav: getActiveNav(state),
  urls: getPayrollUrls(state, props),
});

PayrollMenu.propTypes = {
  urls: PropTypes.shape().isRequired,
  activeNav: PropTypes.string.isRequired,
  onMenuSelect: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(PayrollMenu);
