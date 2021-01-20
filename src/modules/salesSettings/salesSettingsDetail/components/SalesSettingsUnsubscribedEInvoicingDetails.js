import { Button, ButtonRow } from '@myob/myob-widgets';
import React from 'react';

import {
  Column,
  LearnTemplate,
  Row,
} from '../../../../components/LearnTemplate/LearnTemplate';
import eInvoiceHero from './e-invoices.svg';
import styles from './SalesSettingsUnsubscribedEInvoicingDetails.module.css';

const SalesSettingsUnsubscribedEInvoicingDetails = ({ onMarketPlaceClick }) => (
  <LearnTemplate>
    <Row>
      <Column>
        <h3>A smarter way to send invoices</h3>

        <p>
          Sending an e-invoice means you can send invoices directly into your
          customer&apos;s financial system. It helps reduce costs and improve
          payment times.
        </p>
        <p>
          We&apos;ve partnered with some prominent e-invoicing providers to
          ensure you have capability to send e-invoices effectively and
          securely.
        </p>

        <ButtonRow
          secondary={[
            <Button
              type="primary"
              key="eInvoiceMarketplace"
              onClick={onMarketPlaceClick}
            >
              Learn how
            </Button>,
          ]}
        />
      </Column>

      <Column>
        <img
          src={eInvoiceHero}
          alt="E-Invoicing"
          className={styles.eInvoiceHero}
        />
      </Column>
    </Row>
  </LearnTemplate>
);

export default SalesSettingsUnsubscribedEInvoicingDetails;
