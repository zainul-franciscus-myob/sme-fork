import { BaseTemplate, Card, PageState } from '@myob/myob-widgets';
import React from 'react';

import permissionDeniedImage from './permissionDenied.svg';

const PermissionDeniedView = () => (
  <BaseTemplate>
    <Card>
      <PageState
        title="You don't have permission to access this page"
        description="If you need to access this page please contact your administrator"
        image={<img src={permissionDeniedImage} alt="permission denied" />}
      />
    </Card>
  </BaseTemplate>
);

export default PermissionDeniedView;
