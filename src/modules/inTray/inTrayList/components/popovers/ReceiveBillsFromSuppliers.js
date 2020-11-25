import {
  BusinessIcon,
  Button,
  OpenExternalLinkIcon,
  Popover,
} from '@myob/myob-widgets';
import React from 'react';

import BunningsWarehouse from '../assets/BunningsWarehouse.svg';
import Officeworks from '../assets/Officeworks.svg';
import styles from '../InTrayView.module.css';

const ReceiveBillsFromSuppliers = ({ region, navigateToSuppliersWiki }) => (
  <Popover
    className={styles.popover}
    body={
      <Popover.Body
        child={
          <>
            <h3>Automated supplier receipts</h3>

            <p>
              We&apos;ve partnered with a number of large suppliers to have
              their invoices automatically sent to your In tray.
            </p>

            <img
              alt="Bunnings Warehouse"
              className={styles.popoverImage}
              height="40"
              src={BunningsWarehouse}
              width="129"
            />

            {region === 'au' && (
              <img
                alt="Office works"
                className={styles.popoverImage}
                height="40"
                src={Officeworks}
                width="162"
              />
            )}

            <Button
              className={styles.popoverButton}
              icon={<OpenExternalLinkIcon />}
              iconRight
              onClick={navigateToSuppliersWiki}
              type="link"
            >
              All partners and how to connect
            </Button>
          </>
        }
        classes={[styles.popoverBody]}
      />
    }
    closeOnOuterAction
    preferPlace="above"
  >
    <Button type="link" icon={<BusinessIcon />}>
      Receive bills from suppliers
    </Button>
  </Popover>
);

export default ReceiveBillsFromSuppliers;
