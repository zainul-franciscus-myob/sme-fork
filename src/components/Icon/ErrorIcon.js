import React from 'react';

import errorImg from './asset/error.svg';

const ErrorIcon = ({ className }) => (
  <img src={errorImg} className={className} alt="something went wrong" />
);

export default ErrorIcon;
