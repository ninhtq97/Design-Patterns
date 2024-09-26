interface IVisitor {
  visitPost(post: Post): void;
  visitCategory(category: Category): void;
  visitUser(user: User): void;
}

interface IVisitable {
  accept(v: IVisitor): void;
}

class PrinterVisitor implements IVisitor {
  visitPost(p: Post): void {
    console.log('post:', p.name);
  }
  visitCategory(c: Category): void {
    console.log('category:', c.title);
  }
  visitUser(u: User): void {
    console.log('user:', u.firstName, u.lastName);
  }
}

class Post implements IVisitable {
  constructor(public name: string) {}

  accept(v: IVisitor): void {
    v.visitPost(this);
  }
}

class Category implements IVisitable {
  constructor(public title: string) {}

  accept(v: IVisitor): void {
    v.visitCategory(this);
  }
}

class User implements IVisitable {
  constructor(public firstName: string, public lastName: string) {}

  accept(v: IVisitor): void {
    v.visitUser(this);
  }
}

class JSONEncoderVisitor implements IVisitor {
  visitPost(p: Post): void {
    console.log('JSON post:', JSON.stringify(p));
  }
  visitCategory(c: Category): void {
    console.log('JSON category:', JSON.stringify(c));
  }
  visitUser(u: User): void {
    console.log('JSON user:', JSON.stringify(u));
  }
}

(() => {
  const items: IVisitable[] = [
    new Post('Hello world'),
    new Category('Cate'),
    new User('Ken', 'Jack'),
  ];

  const printerVisitor = new PrinterVisitor();
  const jsonEncoderVisitor = new JSONEncoderVisitor();

  for (const item of items) {
    item.accept(printerVisitor);
    item.accept(jsonEncoderVisitor);
  }
})();
