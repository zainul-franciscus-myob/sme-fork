import { Select } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getCashFlowClassification, getCashFlowClassifications } from '../accountModalSelectors';
import handleSelectChange from '../../../components/handlers/handleSelectChange';
import style from './AccountCashFlowClassification.module.css';

const buildClassificationTypes = cashFlowClassifications => cashFlowClassifications
  .map(({ displayName, value }) => (
    <Select.Option value={value} label={displayName} key={value} />
  ));

const AccountCashFlowClassification = ({
  cashFlowClassification,
  cashFlowClassifications,
  onChange,
}) => (
  <Select
    className={style.classification}
    name="cashFlowClassification"
    label="Classification for statements of cash flows"
    value={cashFlowClassification}
    requiredLabel="This is required"
    onChange={handleSelectChange(onChange)}
  >
    {buildClassificationTypes(cashFlowClassifications)}
  </Select>
);

const mapStateToProps = state => ({
  cashFlowClassification: getCashFlowClassification(state),
  cashFlowClassifications: getCashFlowClassifications(state),
});

export default connect(mapStateToProps)(AccountCashFlowClassification);
