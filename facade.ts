class Facade {
  constructor(protected account?: Account, protected product?: Product) {
    this.account = account || new Account();
    this.product = product || new Product();
  }

  public buyProduct(): string {
    let result = 'Facade initializes account:\n';
    result += this.account.balance();
    result += this.product.buy();
    result += 'Facade orders subsystems to perform the action:\n';
    result += this.account.inventory();

    return result;
  }
}

class Account {
  public inventory(): string {
    return 'Get inventory!\n';
  }

  public balance(): string {
    return 'Get balance!\n';
  }
}

class Product {
  public buy(): string {
    return 'Buy product!\n';
  }
}

(() => {
  const account = new Account();
  const product = new Product();
  const facade = new Facade(account, product);
  console.log(facade.buyProduct());
})();
