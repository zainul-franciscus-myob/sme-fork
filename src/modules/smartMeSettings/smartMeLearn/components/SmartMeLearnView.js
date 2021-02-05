import { Button, ButtonRow } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  Column,
  LearnCallToAction,
  LearnTemplate,
  LearnVideo,
  Row,
} from '../../../../components/LearnTemplate/LearnTemplate';
import SmartMeModal from './SmartMeModal';
import getIsReportingModalOpen from '../smartMeSelectors';

const SmartMeLearnView = ({
  isReportingModalOpen,
  onClick,
  onCancel,
  onContinue,
}) => (
  <LearnTemplate title="Spend less energy finding the right energy plan">
    {isReportingModalOpen && (
      <SmartMeModal
        onCancelButtonClick={onCancel}
        onContinueButtonClick={onContinue}
      />
    )}
    <Row>
      <Column>
        <p>
          MYOB has partnered with SmartMe to automatically compare every energy
          bill you upload into MYOB with great electricity and gas plans from
          the energy market.
        </p>

        <p>It&apos;s quick and easy, no call centers, no lengthy forms.</p>

        <p>
          Connect your bills to SmartMe Once and never wonder whether your
          business is paying too much again.
        </p>

        <h3>How to connect your bills:</h3>

        <ol>
          <li>Click the &apos;Connect bills&apos; button below</li>
          <li>
            Click the &apos;Provide permission&apos; button so that SmartMe can
            connect to your bills in MYOB
          </li>
          <li>
            In seconds you&apos;ll see the savings amount for each bill SmartMe
            connected to within your MYOB account
          </li>
        </ol>

        <LearnCallToAction>
          <ButtonRow
            secondary={[
              <Button type="primary" key="connectBills" onClick={onClick}>
                Connect bills
              </Button>,
            ]}
          />
        </LearnCallToAction>
      </Column>

      <Column>
        <LearnVideo hashedId="m5y4qkpnzg" />
      </Column>
    </Row>
  </LearnTemplate>
);

const mapStateToProps = (state) => ({
  isReportingModalOpen: getIsReportingModalOpen(state),
});

export default connect(mapStateToProps)(SmartMeLearnView);
