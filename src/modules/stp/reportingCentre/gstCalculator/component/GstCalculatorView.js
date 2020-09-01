import {
  Button,
  Card,
  FormHorizontal,
  Heading,
  Label,
  ReadOnly,
  Separator,
  SubHeadingGroup,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getFormData,
  getTurnoverAmount,
  getTurnoverPercentage,
  isDirty,
} from '../GstCalculatorSelector';
import AmountInput from '../../../../../components/autoFormatter/AmountInput/AmountInput';
import PageView from '../../../../../components/PageView/PageView';
import formatCurrency from '../../../../../common/valueFormatters/formatCurrency';
import handleAmountInputChange from '../../../../../components/handlers/handleAmountInputChange';
import styles from './GstCalculator.module.css';

const GstCalculatorView = ({
  onCalculate,
  turnoverPercentage,
  turnoverAmount,
  formData,
  onFormChange,
  dirty,
}) => {
  const CalculationResult = () => (
    <>
      <div className={styles['calculation-result']}>
        <SubHeadingGroup size="md" subHeading="Turnover Change">
          <Heading variant="xxl" as="div">
            {turnoverPercentage}%
          </Heading>
          <Label type="boxed" color="red">
            {formatCurrency(turnoverAmount)}
          </Label>
        </SubHeadingGroup>
      </div>
    </>
  );

  const page = (
    <Card>
      <h3>Calculate decline in turn over</h3>
      <p>
        The JobKeeper payment has been extended. To be eligible for the
        extension, businesses need to prove a decline in turnover. You will need
        to run the Cash or Accruals reports (based on which method you report to
        the ATO) to obtain the figures.
        <a href="https://help.myob.com/wiki/x/AQVMAw">
          How do I get the actual GST Turnover?
        </a>
      </p>
      <Separator />

      <FormHorizontal>
        <div className={styles['year-section']}>
          <ReadOnly name="year1" label="2019-2020 (July - Sept)" />
          <AmountInput
            textAlign="right"
            label="Gst Exclusive Sales ($)"
            name="exclusiveSalesYear1"
            width="md"
            numeralPositiveOnly
            value={formData.exclusiveSalesYear1}
            onChange={handleAmountInputChange(onFormChange)}
          />
          <AmountInput
            textAlign="right"
            label="GST Free Sales ($)"
            name="freeSalesYear1"
            width="md"
            numeralPositiveOnly
            value={formData.freeSalesYear1}
            onChange={handleAmountInputChange(onFormChange)}
          />
        </div>

        <div className={styles['year-section']}>
          <ReadOnly name="year2" label="2020-2021 (July - Sept)" />
          <AmountInput
            textAlign="right"
            label="Gst Exclusive Sales ($)"
            name="exclusiveSalesYear2"
            width="md"
            numeralPositiveOnly
            value={formData.exclusiveSalesYear2}
            onChange={handleAmountInputChange(onFormChange)}
          />
          <AmountInput
            textAlign="right"
            label="GST Free Sales ($)"
            name="freeSalesYear2"
            width="md"
            numeralPositiveOnly
            value={formData.freeSalesYear2}
            onChange={handleAmountInputChange(onFormChange)}
          />
        </div>
      </FormHorizontal>

      <div className={styles['justify-right']}>
        <div style={{ width: '230px' }}>
          <Button type="primary" onClick={onCalculate}>
            Calculate
          </Button>
          {dirty && <CalculationResult />}
        </div>
      </div>
    </Card>
  );

  return <PageView view={page} />;
};

const mapStateToProps = (state) => ({
  turnoverPercentage: getTurnoverPercentage(state),
  turnoverAmount: getTurnoverAmount(state),
  formData: getFormData(state),
  dirty: isDirty(state),
});

export default connect(mapStateToProps)(GstCalculatorView);
