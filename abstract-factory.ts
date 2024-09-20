interface IFurniture {
  getType(): string;
}

abstract class Victorian implements IFurniture {
  private type = Victorian.name;

  getType(): string {
    return this.type;
  }
}

abstract class Modern implements IFurniture {
  private type = Modern.name;

  getType(): string {
    return this.type;
  }
}

interface IChair {}

class VictorianChair extends Victorian implements IChair {}

class ModernChair extends Modern implements IChair {}

interface ISofa {
  isSameSet(collaborator: IFurniture): boolean;
}

class VictorianSofa extends Victorian implements ISofa {
  isSameSet(collaborator: IFurniture): boolean {
    return this.getType() === collaborator.getType();
  }
}

class ModernSofa extends Modern implements ISofa {
  isSameSet(collaborator: IFurniture): boolean {
    const type = collaborator.getType();
    return this.getType() === collaborator.getType();
  }
}

interface ICoffeeTable {}

class VictorianCoffeeTable implements ICoffeeTable {}

class ModernCoffeeTable implements ICoffeeTable {}

interface IFurnitureFactory {
  createChair(): IChair;
  createCoffeeTable(): ICoffeeTable;
  createSofa(): ISofa;
}

class VictorianFurnitureFactory implements IFurnitureFactory {
  createChair() {
    return new VictorianChair();
  }
  createCoffeeTable() {
    return new VictorianCoffeeTable();
  }
  createSofa() {
    return new VictorianSofa();
  }
}

class ModernFurnitureFactory implements IFurnitureFactory {
  createChair() {
    return new ModernChair();
  }
  createCoffeeTable() {
    return new ModernCoffeeTable();
  }
  createSofa() {
    return new ModernSofa();
  }
}

(() => {
  console.log('Client: Testing client code with the first factory type...');
  const victorian = new VictorianFurnitureFactory();
  const victorianChair = victorian.createChair();
  const victorianCoffeeTable = victorian.createCoffeeTable();
  const victorianSofa = victorian.createSofa();

  console.log(victorianChair.getType());
  console.log(victorianSofa.isSameSet(victorianChair));

  console.log('');

  console.log(
    'Client: Testing the same client code with the second factory type...',
  );
  const modern = new ModernFurnitureFactory();
  const modernChair = modern.createChair();
  const modernCoffeeTable = modern.createCoffeeTable();
  const modernSofa = modern.createSofa();

  console.log(modernChair.getType());
  console.log(modernSofa.isSameSet(modernChair));
})();
