import React from 'react';
import classNames from 'classnames';

// @FEELIX
// We are mimicking a feelix button, but using an `<a>`
const LinkButton = ({
  href, isOpenInNewTab, icon, iconRight, children, className,
}) => (
  <a
    href={href}
    target={isOpenInNewTab ? '_blank' : undefined}
    className={classNames('btn', 'btn-link', className)}
  >
    <div className={classNames('btn__container', {
      'btn--reverse': iconRight,
    })}
    >
      <span className="btn__icon">
        {icon}
      </span>
      <span className="btn__content">{children}</span>
    </div>
  </a>
);

export default LinkButton;
