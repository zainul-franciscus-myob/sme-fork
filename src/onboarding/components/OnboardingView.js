import {
  Button,
  ButtonRow,
  Combobox,
  Input,
  MYOBLogo,
  StandardTemplate,
} from '@myob/myob-widgets';
import React, { Component } from 'react';

import Industries from '../fixtures/Industries';
import businessRoles from '../fixtures/businessRoles';
import placeholder from '../assets/accountingyoga.svg';
import styles from './OnboardingView.module.css';

const industryData = [{ columnName: 'industry', showData: true }];
const businessRolesData = [{ columnName: 'businessRole', showData: true }];

class OnboardingView extends Component {
  constructor({ settingsService }) {
    super();
    this.settingsService = settingsService;
    this.state = {
      businessName: settingsService.getBusinessName(),
      industry: '',
      businessRole: 'Business owner',
    };
  }

  setBusinessName = businessName => this.setState({ businessName });

  setBusinessRole = businessRole => this.setState(businessRole);

  setIndustry = industry => this.setState(industry);

  businessRoleItems = () => businessRoles.map(businessRole => ({ businessRole }));

  industryItems = () => Industries.map(industry => ({ industry }))

  saveSettings = (event) => {
    event.preventDefault();
    console.log(this.state);
    this.settingsService.save(this.state);
  };

  render() {
    const { businessRoleItems, industryItems } = this;
    const { businessName, businessRole, industry } = this.state;

    return (
      <div className={styles.fullScreen}>
        <StandardTemplate pageHead="">
          <div style={{ width: '100px', marginBottom: '20px' }}>
            <MYOBLogo />
          </div>

          <div className={styles.row}>
            <div className={styles.column}>
              <img src={placeholder} alt="placeholder" width="440" height="auto" />
            </div>

            <div className={styles.column}>
              <h1>Welcome to MYOB!</h1>
              <p>
                Let&apos;s start with a few details that will help us personalise your experience.
              </p>

              <div>
                <Input
                  name="default"
                  label="What's the name of your business?"
                  value={businessName}
                  onChange={val => this.setBusinessName(val.target.value)}
                  requiredLabel="You need to enter a business name"
                  autoFocus
                />
              </div>

              <div>
                <Combobox
                  items={industryItems()}
                  metaData={industryData}
                  defaultItem={{ industry }}
                  name="industry"
                  label="What industry is your business in?"
                  requiredLabel="You need to select an industry"
                  onChange={val => this.setIndustry(val)}
                />
              </div>

              <div>
                <Combobox
                  items={businessRoleItems()}
                  metaData={businessRolesData}
                  defaultItem={{ businessRole }}
                  name="businessRole"
                  label="How would you best describe your role?"
                  requiredLabel="You need to select a role"
                  onChange={val => this.setBusinessRole(val)}
                />
              </div>

              <div>
                <ButtonRow>
                  <Button onClick={this.saveSettings}>Get down to business</Button>
                </ButtonRow>
              </div>
            </div>
          </div>
        </StandardTemplate>
      </div>
    );
  }
}

export default OnboardingView;
