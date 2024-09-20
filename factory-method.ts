interface ITransport {
  deliver(): string;
}

class Truck implements ITransport {
  private constructor() {}

  deliver(): string {
    return '{Result of the trunk}';
  }

  static new() {
    return new Truck();
  }
}

class Ship implements ITransport {
  private constructor() {}

  deliver(): string {
    return '{Result of the ship}';
  }

  static new(): Ship {
    return new Ship();
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
  protected createTransport(): ITransport {
    return Truck.new();
  }
}

class SeaLogistics extends Logistics {
  protected createTransport(): ITransport {
    return Ship.new();
  }
}

(() => {
  const road = new RoadLogistics();
  console.log(road.plainDelivery());

  console.log('');

  const sea = new SeaLogistics();
  console.log(sea.plainDelivery());
})();
