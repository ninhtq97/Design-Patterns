interface ITransport {
  deliver(): string;
}

class Truck implements ITransport {
  deliver(): string {
    return '{Result of the trunk}';
  }
}

class Ship implements ITransport {
  deliver(): string {
    return '{Result of the ship}';
  }
}

abstract class Logistics {
  plainDelivery(): string {
    const transport = this.createTransport();
    return `Transport: The same transport's delivered with ${transport.deliver()}`;
  }
  protected abstract createTransport(): ITransport;
}

class RoadLogistics extends Logistics {
  private constructor() {
    super();
  }

  protected createTransport(): ITransport {
    return new Truck();
  }

  static new() {
    return new this();
  }
}

class SeaLogistics extends Logistics {
  private constructor() {
    super();
  }

  protected createTransport(): ITransport {
    return new Ship();
  }

  static new() {
    return new this();
  }
}

const mapLogistics = {
  road: RoadLogistics.new(),
  sea: SeaLogistics.new(),
};

const getLogistics = (type: 'road' | 'sea') => {
  const logistics = mapLogistics[type];

  if (!logistics) {
    throw new Error('Invalid type');
  }

  return logistics;
};

(() => {
  const road = getLogistics('road');
  console.log(road.plainDelivery());

  console.log('');

  const sea = getLogistics('sea');
  console.log(sea.plainDelivery());
})();
