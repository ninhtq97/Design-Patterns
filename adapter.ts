class Target {
  public request(): string {
    return "Target: The default target's behavior.";
  }
}

class Adaptee {
  public specificRequest(): string {
    return '.eetpadA eht fo roivaheb laicepS';
  }
}

class Adapter {
  public request(msg: string) {
    const result = msg.split('').reverse().join('');
    return () => `Adapter: (TRANSLATED) ${result}`;
  }
}

function execFunc(fn: () => string) {
  return fn();
}

(() => {
  console.log('Client: I can work just fine with the Target objects:');
  const target = new Target();
  console.log(execFunc(target.request));

  console.log('');

  const adaptee = new Adaptee();
  console.log(
    "Client: The Adaptee class has a weird interface. See, I don't understand it:",
  );
  console.log(`Adaptee: ${adaptee.specificRequest()}`);

  console.log('');

  console.log('Client: But I can work with it via the Adapter:');
  const adapter = new Adapter();
  const adapterFn = adapter.request(adaptee.specificRequest());
  console.log(execFunc(adapterFn));
})();
