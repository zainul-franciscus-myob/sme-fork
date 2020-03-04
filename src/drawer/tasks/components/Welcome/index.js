import { Button, Icons, Modal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import WistiaVideoPlayer from '../../../../components/WistiaVideoPlayer/WistiaVideoPlayer';
import styles from './index.module.css';

const Welcome = ({
  task,
  closeTasks,
  openIntroModal,
  closeIntroModal,
  isOpen,
}) => {
  if (!task || task.isComplete) return null;
  const onCloseWelcomeTask = (e) => {
    e.preventDefault();
    closeTasks({ closeEvent: 'welcomeViewed' });
  };

  return (
    <div className={styles.spotlight}>
      <button type="button" className={styles.close} onClick={onCloseWelcomeTask}>
        <Icons.Close />
      </button>
      <h2>Getting started</h2>
      {isOpen
      && (
      <Modal size="large" title="Welcome to MYOB" onCancel={() => { closeIntroModal(); }}>
        <Modal.Body>
          <WistiaVideoPlayer hashedId="xe0wwpzd7u" />
        </Modal.Body>
      </Modal>
      )}
      <p>
        We&apos;ve picked a few tasks to get your business up and running.
        Make sure to check back here later for more setup tasks.
      </p>

      <Button type="link" icon={<Icons.Hints />} onClick={() => { openIntroModal(); }}>Take a short tour</Button>
    </div>
  );
};

const mapStateToProps = state => ({
  isOpen: state.introModal.isOpen,
});
export default connect(mapStateToProps)(Welcome);
