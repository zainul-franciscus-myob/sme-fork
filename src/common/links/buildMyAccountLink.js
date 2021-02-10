import Config from '../../Config';

const buildMyAccountLink = (businessId) =>
  `${Config.SELF_SERVICE_PORTAL_URL}/#/accountDetails?businessId=${businessId}`;

export default buildMyAccountLink;
