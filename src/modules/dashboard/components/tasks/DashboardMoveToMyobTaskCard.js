import { Button, CloseIcon, InventoryIcon } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getMoveToMyobTask } from '../../selectors/DashboardSelectors';
import CardView from '../../../../components/CardView/CardView';
import styles from './DashboardMoveToMyobTaskCard.module.css';

const handleLinkClick = (handler, link) => () => {
  handler(link);
};

const DashboardMoveToMyobTaskCard = ({
  task,
  closeTask,
  constructPath,
  onLinkClick,
}) => {
  const view = (
    <div className={styles.taskContainer}>
      <div className={styles.task}>
        <InventoryIcon />
        <div className={styles.taskDesc}>
          <span>{task.description}</span>
          <Button
            type="link"
            onClick={handleLinkClick(
              onLinkClick,
              `/#${constructPath(task.routeName, task.routeParams)}`
            )}
          >
            {task.title}
          </Button>
        </div>
      </div>
      <Button
        type="clear"
        icon={<CloseIcon />}
        aria-label="close"
        size="xs"
        onClick={(event) => {
          event.stopPropagation();
          closeTask(task.closeEvent);
        }}
      />
    </div>
  );

  return <CardView view={view} />;
};

const mapStateToProps = (state) => ({
  task: getMoveToMyobTask(state),
});

export default connect(mapStateToProps)(DashboardMoveToMyobTaskCard);
