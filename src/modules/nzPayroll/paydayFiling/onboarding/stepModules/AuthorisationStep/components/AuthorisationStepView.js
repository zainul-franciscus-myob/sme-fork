import {
  Button,
  ButtonRow,
  Card,
  FormHorizontal,
  PageHead,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getBusinessDetailsUrl,
  getIrdNumber,
} from '../../../OnboardingSelectors';
import LinkButton from '../../../../../../../components/Button/LinkButton';
import TfnInput from '../../../../../../../components/autoFormatter/TfnInput/TfnInput';
import bankImage from './images/bank.svg';
import styles from './AuthorisationStepView.module.css';

const AuthorisationStepView = ({
  onPreviousClick,
  onAuthorisationClick,
  irdNumber,
  businessDetailsUrl,
}) => {
  const cardHeader = (
    <>
      <PageHead title="Confirm your business IRD number and authorise MYOB" />
      <div className={styles.pageSubHeader}>
        Link MYOB Essentials with Inland Revenue.
      </div>
    </>
  );

  return (
    <div>
      <Card header={<Card.Header child={cardHeader} />}>
        <div className={styles.imageAndText}>
          <img src={bankImage} className={styles.image} alt="bank" />
          <div>
            <p>
              Confirm this business IRD number is the same as what&apos;s in
              myIR.
            </p>
            <FormHorizontal layout="primary" className={styles.irdForm}>
              <TfnInput
                name="irdNumber"
                label="Business IRD number"
                width="sm"
                value={irdNumber}
                disabled
              />
              <LinkButton
                className={styles.linkButton}
                href={businessDetailsUrl}
              >
                Update now
              </LinkButton>
            </FormHorizontal>
            <p>
              <br />
              Note: This should be the IRD number of the business, not your
              personal IRD number.
            </p>
          </div>
        </div>
      </Card>
      <ButtonRow
        primary={[
          <Button testid="previous" onClick={onPreviousClick} type="secondary">
            Previous
          </Button>,
          <Button
            testid="confirmAndAuthorise"
            onClick={onAuthorisationClick}
            type="primary"
          >
            Confirm and authorise
          </Button>,
        ]}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  irdNumber: getIrdNumber(state),
  businessDetailsUrl: getBusinessDetailsUrl(state),
});

export default connect(mapStateToProps)(AuthorisationStepView);
