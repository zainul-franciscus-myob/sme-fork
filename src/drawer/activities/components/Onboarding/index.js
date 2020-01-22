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

const isCompleted = (activity, item) => (activity.data.closed || []).includes(item.key);

const isActivityActive = url => decodeURI(window.location.href).indexOf(url) > -1;

const Onboarding = ({ activities, closeTask }) => (
  <ul className={styles.activities}>
    {activities.map(activity => (
      activity.tasks.map((item) => {
        const taskIconPath = svgPath(item.key);
        return (
          <li key={item.title}>
            <a
              href={`${item.action}`}
              onClick={() => { closeTask({ activityId: activity.id, activityKey: item.key }); }}
            >
              {taskIconPath && <img src={taskIconPath} alt={item.title} width="36" />}
              <div className={styles.container}>
                {isCompleted(activity, item) && <Label type="boxed" color="green" size="small">Done</Label>}
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </a>

            <ol className={styles.subActivities}>
              {item.activities && item.activities.map(subItem => (
                <li
                  key={subItem.title}
                  className={classNames({
                    [styles.completed]: subItem.completed,
                    [styles.active]: isActivityActive(subItem.action),
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
