interface IFurniture {
  getType(): string;
  isSameSet(collaborator: IFurniture): boolean;
}

abstract class Furniture implements IFurniture {
  protected type: string;

  getType(): string {
    return this.type;
  }

  isSameSet(collaborator: IFurniture): boolean {
    return this.getType() === collaborator.getType();
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

interface ISofa extends IFurniture {}

class VictorianSofa extends Victorian implements ISofa {}

class ModernSofa extends Modern implements ISofa {}

interface ICoffeeTable extends IFurniture {}

class VictorianCoffeeTable extends Victorian implements ICoffeeTable {}

class ModernCoffeeTable extends Modern implements ICoffeeTable {}

interface IFurnitureFactory {
  createChair(): IChair;
  createSofa(): ISofa;
  createCoffeeTable(): ICoffeeTable;
}

class VictorianFurnitureFactory implements IFurnitureFactory {
  private constructor() {}

  createChair() {
    return new VictorianChair();
  }

  createSofa() {
    return new VictorianSofa();
  }

  createCoffeeTable() {
    return new VictorianCoffeeTable();
  }

  static new() {
    return new this();
  }
}

class ModernFurnitureFactory implements IFurnitureFactory {
  private constructor() {}

  createChair() {
    return new ModernChair();
  }

  createSofa() {
    return new ModernSofa();
  }

  createCoffeeTable() {
    return new ModernCoffeeTable();
  }

  static new() {
    return new this();
  }
}

const mapFurniture = {
  victorian: VictorianFurnitureFactory.new(),
  modern: ModernFurnitureFactory.new(),
};

const getFurnitureFactory = (type: 'victorian' | 'modern') => {
  const factory = mapFurniture[type];

  if (!factory) {
    throw new Error('Invalid type');
  }

  return factory;
};

interface IDecoration {
  chair: IChair;
  sofa: ISofa;
  coffeeTable: ICoffeeTable;
}

const getDecorations = (factory: IFurnitureFactory): IDecoration => {
  return {
    chair: factory.createChair(),
    sofa: factory.createSofa(),
    coffeeTable: factory.createCoffeeTable(),
  };
};

(() => {
  const victorian = getFurnitureFactory('victorian');
  const victorianDecorations = getDecorations(victorian);

  console.log('Decorations:', victorianDecorations);
  console.log(
    'Is same set:',
    victorianDecorations.chair.isSameSet(victorianDecorations.sofa) &&
      victorianDecorations.sofa.isSameSet(victorianDecorations.coffeeTable),
  );
  console.log('');

  const modern = getFurnitureFactory('modern');
  const modernDecorations = getDecorations(modern);

  console.log('Decorations:', modernDecorations);
  console.log(
    'Is same set:',
    modernDecorations.chair.isSameSet(modernDecorations.sofa) &&
      modernDecorations.sofa.isSameSet(modernDecorations.coffeeTable),
  );
})();
