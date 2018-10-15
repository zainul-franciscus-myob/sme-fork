export default class Inbox {
  constructor() {
    this.inbox = [];
  }

  pushMessage = (message) => {
    this.inbox.push(message);
  }

  popMessages = (types = []) => {
    const messsages = this.inbox.filter(({ type }) => types.includes(type));

    this.inbox = [];
    return messsages;
  }

  clearInbox = () => {
    this.inbox = [];
  }
}
