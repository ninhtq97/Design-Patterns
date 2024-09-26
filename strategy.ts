class Operator {
  constructor(private strategy: Strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }

  execute(a: number, b: number): number {
    console.log('Context: Running algorithm');
    const result = this.strategy.execute(a, b);
    console.log('Result:', result);
    return result;
  }
}

interface Strategy {
  execute(a: number, b: number): number;
}

class Plus implements Strategy {
  public execute(a: number, b: number): number {
    return a + b;
  }
}

class Minus implements Strategy {
  public execute(a: number, b: number): number {
    return a - b;
  }
}

class Times implements Strategy {
  public execute(a: number, b: number): number {
    return a * b;
  }
}

class Div implements Strategy {
  public execute(a: number, b: number): number {
    return a / b;
  }
}

(() => {
  const context = new Operator(new Plus());
  console.log('Client: Strategy is set to plus number.');
  context.execute(5, 10);

  console.log('');

  console.log('Client: Strategy is set to minus number.');
  context.setStrategy(new Minus());
  context.execute(10, 2);

  console.log('');

  console.log('Client: Strategy is set to times number.');
  context.setStrategy(new Times());
  context.execute(10, 2);

  console.log('');

  console.log('Client: Strategy is set to div number.');
  context.setStrategy(new Div());
  context.execute(10, 2);
})();
