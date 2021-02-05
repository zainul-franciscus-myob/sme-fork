import { Button, Modal } from '@myob/myob-widgets';
import React from 'react';

import Leaving from '../assets/leaving.svg';
import style from '../SmartMEView.module.css';

const SmartMeModal = ({ onCancelButtonClick, onContinueButtonClick }) => (
  <Modal title="You're heading out" size="small" onCancel={onCancelButtonClick}>
    <Modal.Body>
      <div className={style.imageContainer}>
        <img alt="Leaving" src={Leaving} height="140" />
      </div>
      <div className={style.headerOnly}>
        You&apos;re now being taken to one of MYOB&apos;s
        <br />
        trusted partners to continue the sign up*
      </div>

      <div className={style.disclaimer}>
        <em>
          *You are being re-directed to a third-party supplier of products or
          services (“Supplier”). Any products, services or financial information
          are provided by the Supplier only. MYOB does not provide any
          recommendation or opinion regarding the Supplier products or services
          and is not acting on behalf of the Supplier. MYOB has a referral
          agreement with the Supplier under which it earns a commission on any
          referrals to the Supplier.
        </em>
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button
        key="modal-go-back-btn"
        id="modal-go-back-btn"
        type="secondary"
        onClick={onCancelButtonClick}
      >
        Cancel
      </Button>
      <Button
        key="modal-continue-btn"
        id="modal-continue-btn"
        type="primary"
        onClick={onContinueButtonClick}
      >
        Continue
      </Button>
    </Modal.Footer>
  </Modal>
);

export default SmartMeModal;
