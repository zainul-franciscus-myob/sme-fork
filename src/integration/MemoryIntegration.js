import intentMapping from './memoryMapping/rootMapper'

export default class MemoryIntegration {

  read(intent, onSuccess, onFailure) {
    intentMapping[intent](onSuccess, onFailure);
  }

  write(intent, params, onSuccess, onFailure) {
    intentMapping[intent](params, onSuccess, onFailure)
  }
}
