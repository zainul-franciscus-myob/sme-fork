import { Table, Tooltip } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getEarningsDetails } from '../StandardPayTabSelector';
import AmountInput from '../../../../../../components/autoFormatter/AmountInput/AmountInput';
import FormattedAmountInput from '../../../../../../components/autoFormatter/AmountInput/FormattedAmountInput';
import handleAmountInputChange from '../../../../../../components/handlers/handleAmountInputChange';

const handleOnBlur = (handler) => (e) => {
  const { rawValue, name } = e.target;
  handler({ key: name, value: rawValue, shouldFormat: true });
};

const EarningsRowGroup = ({
  tableConfig,
  earningsDetails,
  onWageDetailsChange,
}) => (
  <>
    <Table.Row key="earningsHeader">
      <Table.RowItem cellRole="heading">Earnings</Table.RowItem>
    </Table.Row>
    <Table.Row key="baseHourly">
      <Table.RowItem {...tableConfig.name} indentLevel={1}>
        Base hourly
      </Table.RowItem>
      <Table.RowItem {...tableConfig.quantity}>
        <AmountInput
          key="payPeriodHours"
          name="payPeriodHours"
          label="Hours"
          numeralDecimalScaleMax={4}
          numeralDecimalScaleMin={2}
          numeralIntegerScale={3}
          numeralPositiveOnly
          value={earningsDetails.payPeriodHours}
          textAlign="right"
          onChange={handleAmountInputChange(onWageDetailsChange)}
          onBlur={handleOnBlur(onWageDetailsChange)}
        />
      </Table.RowItem>
      <Table.RowItem {...tableConfig.rate}>
        <AmountInput
          name="hourlyRate"
          key="hourlyRate"
          label="hourlyRate"
          value={earningsDetails.hourlyRate}
          numeralDecimalScaleMax={4}
          numeralDecimalScaleMin={2}
          numeralIntegerScale={4}
          numeralPositiveOnly
          hideLabel
          textAlign="right"
          onChange={handleAmountInputChange(onWageDetailsChange)}
          onBlur={handleOnBlur(onWageDetailsChange)}
        />
      </Table.RowItem>
      <Table.RowItem {...tableConfig.amount}>
        <FormattedAmountInput
          name="amount"
          label="amount"
          textAlign="right"
          value={earningsDetails.calculatedAmount}
          numeralDecimalScaleMax={4}
          numeralDecimalScaleMin={2}
          numeralIntegerScale={12}
          numeralPositiveOnly
          hideLabel
          disabled
        />
      </Table.RowItem>
      <Table.RowItem {...tableConfig.action} valign="middle">
        <Tooltip>
          Employees on hourly pay basis must be linked to the base hourly pay
          item.
        </Tooltip>
      </Table.RowItem>
    </Table.Row>
  </>
);

const mapStateToProps = (state) => ({
  earningsDetails: getEarningsDetails(state),
});

export default connect(mapStateToProps)(EarningsRowGroup);
