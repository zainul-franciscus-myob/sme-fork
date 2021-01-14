import { Icons, Modal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classNames from 'classnames';

import { getIsReportingModalOpen } from '../../TasksSelectors';
import TaskIcon from '../TaskIcon';
import WistiaVideoPlayer from '../../../../components/WistiaVideoPlayer/WistiaVideoPlayer';
import styles from '../Onboarding/index.module.css';

const Reporting = ({
  tasks,
  closeTasks,
  dismissTask,
  constructPath,
  openReportingModal,
  closeReportingModal,
  isOpen,
}) => {
  if (!tasks) return null;

  const href = `/#${constructPath(tasks.routeName, tasks.routeParams)}`;

  const CloseButton = ({ task }) => (
    <button
      type="button"
      className={styles.close}
      onClick={(event) => {
        event.stopPropagation();
        dismissTask(task.key);
      }}
    >
      <Icons.Close />
    </button>
  );

  return (
    <ul className={styles.tasks}>
      <li
        key={tasks.title}
        className={classNames({
          [styles.active]: false,
        })}
      >
        <a
          href={href}
          onClick={() => {
            openReportingModal();
          }}
        >
          <div className={styles.container}>
            <TaskIcon task={tasks} width="36"></TaskIcon>
            <div>
              <h3>{tasks.title}</h3>
              <p>{tasks.description}</p>
            </div>

            {tasks.isComplete ? (
              <div className={styles.isComplete}>Done</div>
            ) : (
              <CloseButton task={tasks}></CloseButton>
            )}
          </div>
        </a>

        {isOpen && (
          <Modal
            size="large"
            title="Reporting"
            onCancel={() => {
              closeReportingModal();
              closeTasks({
                closeEvent: 'reportingViewed',
              });
            }}
          >
            <Modal.Body>
              <WistiaVideoPlayer hashedId="vqd9p8vw0m" />
            </Modal.Body>
          </Modal>
        )}
      </li>
    </ul>
  );
};

const mapStateToProps = (state) => ({
  isOpen: getIsReportingModalOpen(state),
});
export default connect(mapStateToProps)(Reporting);
