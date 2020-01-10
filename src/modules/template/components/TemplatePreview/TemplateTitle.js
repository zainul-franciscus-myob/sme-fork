import React from 'react';
import classnames from 'classnames';

import { HeaderBusinessDetailStyle } from '../../templateOptions';
import styles from './TemplateTitle.module.css';

const TemplateTitle = ({
  headerTextColour,
  isLogoOnTheLeft,
  headerBusinessDetailsStyle,
  logoImage,
  logoSize,
  headerImage,
  businessName,
  tradingName,
  streetAddress,
  phoneNumber,
  email,
  website,
  abn,
}) => {
  switch (headerBusinessDetailsStyle) {
    case HeaderBusinessDetailStyle.fullWidthHeaderImage: {
      const header = headerImage && (
        <img className={styles.header} src={headerImage} alt="Header banner" />
      );
      return (
        <div
          className={classnames(
            styles.title,
            styles.withHeader,
          )}
        >
          {header}
        </div>
      );
    }
    case HeaderBusinessDetailStyle.logoAndBusinessDetails:
    default: {
      const headerText = tradingName || businessName;
      const header = headerText && <h3 style={{ color: headerTextColour }}>{headerText}</h3>;
      const details = (
        <div>
          {header}
          {tradingName && businessName && <div>{businessName}</div>}
          {streetAddress && <div>{streetAddress}</div>}
          {phoneNumber && <div>{phoneNumber}</div>}
          {email && <div>{email}</div>}
          {website && <div>{website}</div>}
          {abn && <div>{abn}</div>}
        </div>
      );
      const logo = logoImage && (
        <img
          className={styles.logo}
          style={{ transform: `scale(calc(${logoSize} / 100))` }}
          src={logoImage}
          alt="Logo section"
        />
      );
      return (
        <div
          className={classnames(styles.title, {
            [styles.reverse]: !isLogoOnTheLeft,
          })}
        >
          {details}
          {logo}
        </div>
      );
    }
  }
};

export default TemplateTitle;
