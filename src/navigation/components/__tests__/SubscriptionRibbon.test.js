import React from 'react';
import ReactDOM from 'react-dom';

import SubscriptionRibbon from '../SubscriptionRibbon';

const msPerMinute = 60 * 1000;
const msPerDay = 24 * 60 * msPerMinute;

describe('SubscriptionPanel', () => {
  let div;

  beforeEach(() => { div = document.createElement('div'); });
  afterEach(() => {
    ReactDOM.unmountComponentAtNode(div);
    div = null;
  });

  const view = endDate => (
    <SubscriptionRibbon trialEndDate={endDate} onSubscribeNowClick={() => {}} />
  );

  const daysFromNow = days => new Date(Date.now() + (days * msPerDay) + msPerMinute);

  it('renders 0 days', () => {
    const endDate = daysFromNow(0);
    ReactDOM.render(view(endDate), div);
    expect(div.textContent).toMatch(/\b0 days\b/);
  });

  it('renders 1 day ahead', () => {
    const endDate = daysFromNow(1);
    ReactDOM.render(view(endDate), div);
    expect(div.textContent).toMatch(/\b1 day\b/);
  });

  it('renders multiple days ahead', () => {
    const endDate = daysFromNow(3);
    ReactDOM.render(view(endDate), div);
    expect(div.textContent).toMatch(/\b3 days\b/);
  });

  it('renders expired', () => {
    const endDate = daysFromNow(-3);
    ReactDOM.render(view(endDate), div);
    expect(div.textContent).toMatch('expired');
  });
});
