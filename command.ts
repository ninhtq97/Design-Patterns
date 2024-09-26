abstract class Command {
  constructor(public v: Value, public param: number) {}

  abstract execute(): void;
  abstract undo(): void;
}

class CommandAdd extends Command {
  constructor(public v: Value, public param: number) {
    super(v, param);
  }

  execute(): void {
    this.v.add(this.param);
  }
  undo(): void {
    this.v.sub(this.param);
  }
}

class CommandSub extends Command {
  constructor(public v: Value, public param: number) {
    super(v, param);
  }

  execute(): void {
    this.v.sub(this.param);
  }
  undo(): void {
    this.v.add(this.param);
  }
}

class Value {
  constructor(protected v: number) {}

  add(n: number) {
    this.v += n;
  }

  sub(n: number) {
    this.v -= n;
  }

  getVal() {
    return this.v;
  }
}

class CommandNode {
  constructor(public cmd: Command, public next: CommandNode | null) {
    this.cmd = cmd;
    this.next = next;
  }
}

class CommandStack {
  private current: CommandNode | null = null;

  push(cmd: Command): void {
    this.current = new CommandNode(cmd, this.current);
  }

  pop(): Command | null {
    if (this.current) {
      const cmdNode = this.current;
      this.current = cmdNode.next;
      return cmdNode.cmd;
    }
    return null;
  }
}

class UndoableService {
  private value: Value;
  private addCmd: Command;
  private subCmd: Command;
  private cmdStack: CommandStack;

  constructor(initValue: number, incrStep: number, decrStep: number) {
    this.value = new Value(initValue);
    this.addCmd = new CommandAdd(this.value, incrStep);
    this.subCmd = new CommandSub(this.value, decrStep);
    this.cmdStack = new CommandStack();
  }

  doAdd(): void {
    this.addCmd.execute();
    this.cmdStack.push(this.addCmd);
  }

  doSub(): void {
    this.subCmd.execute();
    this.cmdStack.push(this.subCmd);
  }

  getValue(): number {
    return this.value.getVal();
  }

  undo(): void {
    const cmd = this.cmdStack.pop();
    if (cmd) {
      cmd.undo();
    }
  }
}

(() => {
  const service = new UndoableService(10, 2, 1);
  console.log(service.getValue()); // 10

  service.doAdd();
  service.doAdd();
  console.log(service.getValue()); // 14

  service.doSub();
  console.log(service.getValue()); // 13

  service.undo();
  console.log(service.getValue()); // 14

  service.undo();
  service.undo();
  console.log(service.getValue()); // 10

  service.undo();
  console.log(service.getValue()); // 10 - nothing changed
})();
