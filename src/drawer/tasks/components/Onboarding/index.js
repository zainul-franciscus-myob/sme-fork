import { Icons } from '@myob/myob-widgets';
import React from 'react';
import classNames from 'classnames';

import TaskIcon from '../TaskIcon';
import styles from './index.module.css';

const hasNoChildren = (task) => !task.tasks || !task.tasks.length;

/** @deprecated Here to support old and new app-state backends at the same time. */
const oldIsTaskActive = (task) =>
  task.action && decodeURI(window.location.href).indexOf(task.action) > -1;

/** In development, returns some text indicating a route could not be generated for a task.
 * Otherwise returns the children without a link wrapper. */
const BadRoute =
  process.env.NODE_ENV !== 'development'
    ? // eslint-disable-next-line no-unused-vars
      ({ task: _, children }) => <>{children}</>
    : ({ task, children }) => (
        <>
          <p>
            Can&apos;t construct route &quot;{task.routeName}&quot;. Check the
            route name exists and the route params are correct.
          </p>
          {children}
        </>
      );

const Onboarding = ({
  tasks,
  closeTasks,
  dismissTask,
  isActiveRoute,
  constructPath,
}) => {
  const isActiveTask = (task) => {
    return (
      hasNoChildren(task) &&
      (oldIsTaskActive(task) ||
        (task.routeName &&
          isActiveRoute(
            task.routeName,
            task.routeParams,
            !!task.ignoreQueryParams
          )))
    );
  };

  /** A link to the target route of a task. */
  const TaskLink = ({ task, children }) => {
    let href =
      task.action; /** @deprecated Remove task.action once app-state has been deployed. */
    if (!href) {
      try {
        href = `/#${constructPath(task.routeName, task.routeParams)}`;
      } catch (error) {
        return <BadRoute task={task}>{children}</BadRoute>;
      }
    }

    /** Trigger appcues of the active task on redirect */

    if (isActiveTask(task) && task.routeParams) {
      const { appcue } = task.routeParams;
      if (window.Appcues && appcue) window.Appcues.show(appcue);
    }

    return (
      <a
        href={href}
        onClick={() => {
          closeTasks({ closeEvent: `${task.key}Viewed` });
        }}
      >
        {children}
      </a>
    );
  };

  const CloseButton = ({ task }) => (
    <button
      type="button"
      className={styles.close}
      onClick={(event) => {
        event.preventDefault();
        dismissTask(task.key);
      }}
    >
      <Icons.Close />
    </button>
  );

  return (
    <ul className={styles.tasks}>
      {tasks.map((task) => {
        return (
          <li
            key={task.title}
            className={classNames({
              [styles.active]: isActiveTask(task),
            })}
          >
            <TaskLink task={task}>
              <TaskIcon task={task} width="36"></TaskIcon>

              <div className={styles.container}>
                <div>
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                </div>
                {task.isComplete ? (
                  <div className={styles.isComplete}>Done</div>
                ) : (
                  <CloseButton task={task}></CloseButton>
                )}
              </div>
            </TaskLink>

            {task.tasks && (
              <ol className={styles.subTasks}>
                {task.tasks.map((subTask) => (
                  <li
                    key={subTask.title}
                    className={classNames({
                      [styles.completed]: subTask.isComplete,
                      [styles.active]: isActiveTask(subTask),
                    })}
                  >
                    <TaskLink task={subTask}>
                      <span>{subTask.title}</span>
                    </TaskLink>
                  </li>
                ))}
              </ol>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Onboarding;
