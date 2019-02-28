import { Input, Tooltip } from '@myob/myob-widgets';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import { getAuTaxDetails } from '../businessDetailSelectors';

const onInputChange = handler => (e) => {
  const { value, name } = e.target;
  handler({ key: name, value });
};

const AuTaxDetails = ({
  abn, gstBranchNumber, acn, payeeNumber, onChange,
}) => (
  <div>
    <Input
      name="abn"
      label="Australian Business Number (ABN)"
      value={abn}
      onChange={onInputChange(onChange)}
    />
    <Input
      name="gstBranchNumber"
      label="GST branch number"
      tooltip={(
        <Tooltip>
          A number given by the ATO if you&#39;ve separately registered a branch of your business.
        </Tooltip>
      )}
      value={gstBranchNumber}
      onChange={onInputChange(onChange)}
    />
    <Input
      name="acn"
      label="Australian Company Number (ACN)"
      value={acn}
      onChange={onInputChange(onChange)}
    />
    <Input
      name="payeeNumber"
      tooltip={(
        <Tooltip>
          A unique number given by MYOB for those using the M-Powered Invoices service.
        </Tooltip>
      )}
      label="Payee number (if using M-powered)"
      value={payeeNumber}
      onChange={onInputChange(onChange)}
    />
  </div>
);

AuTaxDetails.propTypes = {
  abn: PropTypes.string.isRequired,
  gstBranchNumber: PropTypes.string.isRequired,
  acn: PropTypes.string.isRequired,
  payeeNumber: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => getAuTaxDetails(state);

export default connect(mapStateToProps)(AuTaxDetails);
