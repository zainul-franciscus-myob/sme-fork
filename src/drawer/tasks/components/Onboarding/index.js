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

const isCompleted = (task, item) => (task.data.closed || []).includes(item.key);

const isTaskActive = url => decodeURI(window.location.href).indexOf(url) > -1;

const Onboarding = ({ tasks, closeTasks }) => (
  <ul className={styles.tasks}>
    {tasks.map(task => (
      task.tasks.map((item) => {
        const taskIconPath = svgPath(item.key);
        return (
          <li key={item.title}>
            <a
              href={`${item.action}`}
              onClick={() => { closeTasks({ closeEvent: `${item.key}Viewed` }); }}
            >
              {taskIconPath && <img src={taskIconPath} alt={item.title} width="36" />}
              <div className={styles.container}>
                {isCompleted(task, item) && <Label type="boxed" color="green" size="small">Done</Label>}
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </a>

            <ol className={styles.subTasks}>
              {item.tasks && item.tasks.map(subItem => (
                <li
                  key={subItem.title}
                  className={classNames({
                    [styles.completed]: subItem.completed,
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
      })
    ))}
  </ul>
);

export default Onboarding;
