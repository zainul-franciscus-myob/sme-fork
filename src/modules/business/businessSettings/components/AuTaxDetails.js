import { Icons, Input, Tooltip } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAuTaxDetails } from '../businessSettingsSelectors';
import AbnInput from '../../../../components/autoFormatter/AbnInput/AbnInput';
import AcnInput from '../../../../components/autoFormatter/AcnInput/AcnInput';

const onInputChange = (handler) => (e) => {
  const { value, name } = e.target;
  handler({ key: name, value });
};

const AuTaxDetails = ({ abn, gstBranchNumber, acn, onChange }) => (
  <React.Fragment>
    <AbnInput
      name="abn"
      label="ABN"
      value={abn}
      maxLength={14}
      onChange={onInputChange(onChange)}
      width="sm"
    />
    <Input
      name="gstBranchNumber"
      label="GST branch number"
      labelAccessory={
        <Tooltip triggerContent={<Icons.Info />}>
          {`If you've registered each branch of your business separately for GST,
          enter the number given by the ATO for this branch`}
        </Tooltip>
      }
      value={gstBranchNumber}
      onChange={onInputChange(onChange)}
      width="sm"
    />
    <AcnInput
      name="acn"
      label="ACN"
      maxLength={11}
      value={acn}
      onChange={onInputChange(onChange)}
      width="sm"
    />
  </React.Fragment>
);

const mapStateToProps = (state) => getAuTaxDetails(state);

export default connect(mapStateToProps)(AuTaxDetails);
