import StpDeclarationInformationMapping from '../stepModules/DeclarationInformation/mappings/HttpStpDeclarationInformationMapping';
import StpNotifyAtoMapping from '../stepModules/NotifyAto/mappings/HttpStpNotifyAtoMapping';
import StpYourRoleMapping from '../stepModules/StpYourRole/mappings/HttpStpYourRoleMapping';

const StpSetupMapping = {
  ...StpYourRoleMapping,
  ...StpDeclarationInformationMapping,
  ...StpNotifyAtoMapping,
};

export default StpSetupMapping;
