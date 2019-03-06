import { Icons, Navigation } from '@myob/myob-widgets';
import React from 'react';

const Logout = () => <Navigation.Link url="#/logout" label="Logout" icon={<Icons.SignOut />} />;

export default Logout;
