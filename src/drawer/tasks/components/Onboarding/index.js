import { Label } from '@myob/myob-widgets';
import React from 'react';
import classNames from 'classnames';

import styles from './index.module.css';

const svgPath = (key) => {
  try {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    return require(`./assets/${key}.svg`);
  } catch {
    return null;
  }
};

const isTaskActive = url => decodeURI(window.location.href).indexOf(url) > -1;

const Onboarding = ({ tasks, closeTasks }) => (
  <ul className={styles.tasks}>
    {tasks.map((task) => {
      const taskIconPath = svgPath(task.key) || svgPath(task.template);
      return (
        <li key={task.title}>
          <a
            href={`${task.action}`}
            onClick={() => {
              closeTasks({ closeEvent: `${task.key}Viewed` });
            }}
          >
            {taskIconPath && (
              <img src={taskIconPath} alt={task.title} width="36" />
            )}
            <div className={styles.container}>
              {task.isComplete && (
                <Label type="boxed" color="green" size="small">
                  Done
                </Label>
              )}
              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </div>
          </a>

          <ol className={styles.subTasks}>
            {task.tasks && task.tasks.map(subItem => (
              <li
                key={subItem.title}
                className={classNames({
                  [styles.completed]: subItem.isComplete,
                  [styles.active]: isTaskActive(subItem.action),
                })}
              >
                <a href={`${subItem.action}`}>
                  <span>{subItem.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </li>
      );
    })}
  </ul>
);

export default Onboarding;
