export default class Inbox {
  constructor() {
    this.inbox = [];
  }

  pushMessage = (message) => {
    this.inbox.push(message);
  }

  popMessages = (types = []) => {
    const messages = this.inbox.filter(({ type }) => types.includes(type));

    this.inbox = [];
    return messages;
  }

  clearInbox = () => {
    this.inbox = [];
  }
}
