interface Notifier {
  send(message: string): void;
}

class EmailNotifier implements Notifier {
  send(message: string): void {
    console.log('Email sending message:', message);
  }
}

class SMSNotifier implements Notifier {
  send(message: string): void {
    console.log('SMS sending message:', message);
  }
}

class TelegramNotifier implements Notifier {
  send(message: string): void {
    console.log('Telegram sending message:', message);
  }
}

class NotifierDecorator implements Notifier {
  private core: NotifierDecorator;
  private notifier: Notifier;

  constructor(notifier: Notifier, core?: NotifierDecorator) {
    this.notifier = notifier;
    this.core = core;
  }

  send(message: string): void {
    this.notifier.send(message);

    if (this.core) {
      this.core.send(message);
    }
  }

  decorate(notifier: Notifier) {
    return new NotifierDecorator(notifier, this);
  }
}

(() => {
  const notifier = new NotifierDecorator(new EmailNotifier())
    .decorate(new SMSNotifier())
    .decorate(new TelegramNotifier());

  notifier.send('Hello World');
})();
