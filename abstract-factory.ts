interface IFurniture {
  getType(): string;
}

abstract class Furniture implements IFurniture {
  protected type: string;

  getType(): string {
    return this.type;
  }
}

abstract class Victorian extends Furniture {
  constructor() {
    super();
    this.type = Victorian.name;
  }
}

abstract class Modern extends Furniture {
  constructor() {
    super();
    this.type = Modern.name;
  }
}

interface IChair extends IFurniture {}

class VictorianChair extends Victorian implements IChair {}

class ModernChair extends Modern implements IChair {}

interface ISofa extends IFurniture {
  isSameSet(collaborator: IFurniture): boolean;
}

class VictorianSofa extends Victorian implements ISofa {
  isSameSet(collaborator: IFurniture): boolean {
    return this.getType() === collaborator.getType();
  }
}

class ModernSofa extends Modern implements ISofa {
  isSameSet(collaborator: IFurniture): boolean {
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

interface IDecoration {
  chair: IChair;
  coffeeTAble: ICoffeeTable;
  sofa: ISofa;
}

const getDecorations = (factory: IFurnitureFactory): IDecoration => {
  return {
    chair: factory.createChair(),
    coffeeTAble: factory.createCoffeeTable(),
    sofa: factory.createSofa(),
  };
};

(() => {
  console.log('Client: Testing client code with the first factory type...');
  const victorian = new VictorianFurnitureFactory();
  const victorianDecorations = getDecorations(victorian);

  console.log(victorianDecorations.chair.getType());
  console.log(victorianDecorations.sofa.isSameSet(victorianDecorations.chair));

  console.log('');

  console.log(
    'Client: Testing the same client code with the second factory type...',
  );
  const modern = new ModernFurnitureFactory();
  const modernDecorations = getDecorations(modern);

  console.log(modernDecorations.chair.getType());
  console.log(modernDecorations.sofa.isSameSet(modernDecorations.chair));
})();
