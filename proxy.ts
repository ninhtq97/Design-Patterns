interface IDataStorage {
  getValue(): Promise<number>;
}

class DataStorage implements IDataStorage {
  async getValue(): Promise<number> {
    const promise = new Promise((resolve) =>
      setTimeout(() => resolve(100), 2000),
    );

    return promise.then((val: number) => {
      return val;
    });
  }
}

class ProxyDataStorage implements IDataStorage {
  private cache: number;

  constructor(private storage: IDataStorage) {
    this.storage = storage;
  }

  async getValue(): Promise<number> {
    if (this.cache) return this.cache;
    const val = await this.storage.getValue();
    this.cache = val;
    return val;
  }
}

(async () => {
  const storage = new ProxyDataStorage(new DataStorage());
  const value = await storage.getValue();
  console.log('Value:', value);
  console.log('Value:', value);
})();
