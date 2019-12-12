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
  state = {
    businessName: '',
    industry: '',
    businessRole: '',
  }

  setBusinessName = businessName => this.setState({ businessName })

  setIndustry = industry => this.setState({ industry })

  setBusinessRole = businessRole => this.setState({ businessRole })

  businessRoleItems = () => businessRoles.map(businessRole => ({ businessRole }));

  industryItems = () => Industries.map(industry => ({ industry }))

  saveSettings = (event) => {
    event.preventDefault();
    const { businessName, industry, businessRole } = this.state;
    const { saveSettingsList } = this.props;

    saveSettingsList({ businessName, industry, businessRole });
  };

  render() {
    const { businessRoleItems, industryItems } = this;
    const { businessName, industry, businessRole } = this.state;

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
                  label="My business name is"
                  value={businessName}
                  onChange={val => this.setBusinessName(val.target.value)}
                  requiredLabel="This field is required"
                  autoFocus
                />
              </div>

              <div>
                <Combobox
                  items={industryItems()}
                  metaData={industryData}
                  defaultItem={{ industry }}
                  name="industry"
                  label="My industry is"
                  requiredLabel="This field is required"
                  onChange={val => this.setIndustry(val)}
                />
              </div>

              <div>
                <Combobox
                  items={businessRoleItems()}
                  metaData={businessRolesData}
                  defaultItem={{ businessRole }}
                  name="businessRole"
                  label="I describe my role as"
                  requiredLabel="This field is required"
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
