import StpDeclarationInformationMapping from '../stepModules/DeclarationInformation/mappings/MemoryStpDeclarationInformationMapping';
import StpNotifyAtoMapping from '../stepModules/NotifyAto/mappings/MemoryStpNotifyAtoMapping';
import StpYourRoleMapping from '../stepModules/StpYourRole/mappings/MemoryStpYourRoleMapping';

const StpSetupMapping = {
  ...StpYourRoleMapping,
  ...StpDeclarationInformationMapping,
  ...StpNotifyAtoMapping,
};

export default StpSetupMapping;
