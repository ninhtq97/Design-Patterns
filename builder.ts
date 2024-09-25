interface IBuilder {
  setName(name: string): IBuilder;
  setAge(age: number): IBuilder;
  setPosition(position: string): IBuilder;
  setJob(job: string): IBuilder;
  build<T>(): T;
}

class EmployeeBuilder implements IBuilder {
  private employee = new Employee();

  setName(name: string) {
    this.employee.name = name;
    return this;
  }

  setAge(age: number) {
    this.employee.age = age;
    return this;
  }

  setPosition(position: string) {
    this.employee.position = position;
    return this;
  }

  setJob(job: string) {
    this.employee.job = job;
    return this;
  }

  build<T>(): T {
    return this.employee as T;
  }
}

class Employee {
  public name: string;
  public age: number;
  public position: string;
  public job: string;

  toString(): string {
    return `Employee:
- Name: ${this.name}
- Age: ${this.age}
- Position: ${this.position}
- Job: ${this.job}`;
  }
}

class Director {
  private builder: IBuilder;

  public setBuilder(builder: IBuilder): IBuilder {
    this.builder = builder;
    return builder;
  }

  public buildEmployee(
    name: string,
    age: number,
    position: string,
    job: string,
  ) {
    return this.builder
      .setName(name)
      .setAge(age)
      .setPosition(position)
      .setJob(job)
      .build<Employee>();
  }
}

(() => {
  const director = new Director();
  const builder = new EmployeeBuilder();

  const directorBuilder = director.setBuilder(builder);
  const player = directorBuilder
    .setName('J')
    .setAge(22)
    .setPosition('A')
    .setJob('W')
    .build<Employee>();

  console.log(player.toString());

  console.log('');

  console.log(director.buildEmployee('K', 23, 'A', 'M').toString());
})();
