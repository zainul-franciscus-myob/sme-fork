export default class MemoryIntegration {
  constructor(config) {
    this.data = config || {};
  }

  read(entity) {
    return this.data[entity];
  }

  write() {
    return true;
  }
}