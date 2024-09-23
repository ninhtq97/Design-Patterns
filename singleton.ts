class DB {
  static #instance: DB;
  #connected: boolean;

  constructor() {
    if (DB.#instance) return DB.#instance;
    DB.#instance = this;
  }

  async connect() {
    const promise = new Promise((resolve, _reject) =>
      setTimeout(() => {
        this.#connected = true;
        resolve(this.#connected);
      }, 2000),
    );

    console.log('Connect to database');
    return await promise.then((connected: boolean) => connected);
  }

  static get instance() {
    return DB.#instance;
  }

  get connected() {
    return this.#connected;
  }
}

(async () => {
  const con1 = new DB();
  await con1.connect();
  const con2 = new DB();

  console.log('Con1:', con1);
  console.log('Con2:', con2);

  console.log(con1 === con2);
  console.log(con1.connected, con2.connected);
})();
